/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

/**
 * Custom NSLayoutManager subclass that draws rounded-rectangle backgrounds
 * for inline text spans that have the RCTTextBorderRadius attribute set.
 *
 * For multiline spans, only the outer corners are rounded: left corners on the
 * first line rect, right corners on the last line rect (flipped for RTL).
 */
@interface RCTTextLayoutManagerWithBorderRadius : NSLayoutManager

@end

NS_ASSUME_NONNULL_END
