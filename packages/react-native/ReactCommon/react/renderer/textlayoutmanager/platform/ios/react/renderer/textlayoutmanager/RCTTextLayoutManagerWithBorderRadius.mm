/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "RCTTextLayoutManagerWithBorderRadius.h"
#import "RCTAttributedTextUtils.h"

@implementation RCTTextLayoutManagerWithBorderRadius

- (void)fillBackgroundRectArray:(const CGRect *)rectArray
                          count:(NSUInteger)rectCount
              forCharacterRange:(NSRange)charRange
                          color:(UIColor *)color
{
  NSNumber *borderRadiusValue = [self.textStorage attribute:RCTTextBorderRadiusAttributeName
                                                    atIndex:charRange.location
                                             effectiveRange:nil];

  if (borderRadiusValue == nil || borderRadiusValue.floatValue == 0) {
    [super fillBackgroundRectArray:rectArray count:rectCount forCharacterRange:charRange color:color];
    return;
  }

  CGFloat borderRadius = borderRadiusValue.floatValue;

  CGContextRef context = UIGraphicsGetCurrentContext();
  if (context == nil) {
    return;
  }

  CGContextSaveGState(context);
  CGContextSetFillColorWithColor(context, color.CGColor);

  for (NSUInteger i = 0; i < rectCount; i++) {
    CGRect rect = rectArray[i];

    BOOL isFirstRect = (i == 0);
    BOOL isLastRect = (i == rectCount - 1);

    UIBezierPath *path;
    UIRectCorner corners = 0;

    // For multiline: round left corners on first rect, right corners on last rect.
    if (isFirstRect) {
      corners |= UIRectCornerTopLeft | UIRectCornerBottomLeft;
    }
    if (isLastRect) {
      corners |= UIRectCornerTopRight | UIRectCornerBottomRight;
    }

    path = [UIBezierPath bezierPathWithRoundedRect:rect
                                 byRoundingCorners:corners
                                       cornerRadii:CGSizeMake(borderRadius, borderRadius)];

    CGContextAddPath(context, path.CGPath);
    CGContextFillPath(context);
  }

  CGContextRestoreGState(context);
}

@end
