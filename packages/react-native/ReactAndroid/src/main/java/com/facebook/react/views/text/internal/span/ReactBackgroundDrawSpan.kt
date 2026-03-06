/* Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

package com.facebook.react.views.text.internal.span

import android.graphics.Canvas
import android.graphics.Paint
import android.graphics.Path
import android.graphics.RectF
import android.text.Layout
import androidx.annotation.ColorInt

/**
 * A [DrawCommandSpan] that draws a rounded-rectangle background behind inline text spans. When
 * borderRadius is 0, this draws a plain rectangle identical to [ReactBackgroundColorSpan].
 *
 * For multiline spans, only the outer corners are rounded: left corners on the first line, right
 * corners on the last line (flipped for RTL).
 */
internal class ReactBackgroundDrawSpan(
    @ColorInt private val backgroundColor: Int,
    private val borderRadius: Float,
) : DrawCommandSpan() {

  private val paint =
      Paint().apply {
        color = backgroundColor
        isAntiAlias = true
        style = Paint.Style.FILL
      }

  private val rectF = RectF()
  private val path = Path()

  override fun onPreDraw(start: Int, end: Int, canvas: Canvas, layout: Layout) {
    if (start >= end) return

    val startLine = layout.getLineForOffset(start)
    val endLine = layout.getLineForOffset(end)

    for (line in startLine..endLine) {
      val lineStart = layout.getLineStart(line)
      val lineEnd = layout.getLineEnd(line)

      // When the span starts at or before this line, use the line's left edge.
      // Otherwise use the actual character position of the span start.
      val left =
          if (start <= lineStart) {
            layout.getLineLeft(line)
          } else {
            layout.getPrimaryHorizontal(start)
          }

      // When the span extends past this line, use the line's right edge.
      // getLineEnd() returns the offset of the first char on the NEXT line for
      // soft-wrapped lines, so getPrimaryHorizontal(lineEnd) would incorrectly
      // give us the left margin of the next line instead of the right edge.
      val right =
          if (end >= lineEnd) {
            layout.getLineRight(line)
          } else {
            layout.getPrimaryHorizontal(end)
          }

      val top = layout.getLineTop(line).toFloat()
      val bottom = layout.getLineBottom(line).toFloat()

      val actualLeft = minOf(left, right)
      val actualRight = maxOf(left, right)

      rectF.set(actualLeft, top, actualRight, bottom)

      if (borderRadius == 0f) {
        canvas.drawRect(rectF, paint)
      } else {
        val isFirstLine = line == startLine
        val isLastLine = line == endLine
        val isSingleLine = isFirstLine && isLastLine

        if (isSingleLine) {
          canvas.drawRoundRect(rectF, borderRadius, borderRadius, paint)
        } else {
          val rtl = layout.getParagraphDirection(line) == Layout.DIR_RIGHT_TO_LEFT
          drawSelectiveRoundRect(canvas, rectF, isFirstLine, isLastLine, rtl)
        }
      }
    }
  }

  private fun drawSelectiveRoundRect(
      canvas: Canvas,
      rect: RectF,
      isFirstLine: Boolean,
      isLastLine: Boolean,
      rtl: Boolean,
  ) {
    // For LTR: first line rounds left corners, last line rounds right corners
    // For RTL: first line rounds right corners, last line rounds left corners
    val roundStart = isFirstLine
    val roundEnd = isLastLine
    val roundLeft = if (rtl) roundEnd else roundStart
    val roundRight = if (rtl) roundStart else roundEnd

    val topLeft = if (roundLeft) borderRadius else 0f
    val bottomLeft = if (roundLeft) borderRadius else 0f
    val topRight = if (roundRight) borderRadius else 0f
    val bottomRight = if (roundRight) borderRadius else 0f

    val radii =
        floatArrayOf(
            topLeft, topLeft,
            topRight, topRight,
            bottomRight, bottomRight,
            bottomLeft, bottomLeft,
        )

    path.reset()
    path.addRoundRect(rect, radii, Path.Direction.CW)
    canvas.drawPath(path, paint)
  }
}
