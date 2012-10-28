/****************************************************************************
 Copyright (c) 2010-2012 cocos2d-x.org
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011      Zynga Inc.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

/**
 * @function
 * @param {Number} a
 * @param {Number} b
 * @param {Number} c
 * @param {Number} d
 * @param {Number} tx
 * @param {Number} ty
 */
cc.AffineTransform = function (a, b, c, d, tx, ty) {
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
    this.tx = tx;
    this.ty = ty;
};

cc.__AffineTransformMake = function (a, b, c, d, tx, ty) {
    return new cc.AffineTransform(a, b, c, d, tx, ty);
};

/**
 * @function
 * @param {Number} a
 * @param {Number} b
 * @param {Number} c
 * @param {Number} d
 * @param {Number} tx
 * @param {Number} ty
 * @return {cc.AffineTransform}
 * Constructor
 */
cc.AffineTransformMake = function (a, b, c, d, tx, ty) {
    return new cc.AffineTransform(a, b, c, d, tx, ty);
};

cc.__PointApplyAffineTransform = function (point, t) {
    var p = cc.p(0, 0);
    p.x = t.a * point.x + t.c * point.y + t.tx;
    p.y = t.b * point.x + t.d * point.y + t.ty;
    return p;
};

/**
 * @function
 * @param {cc.Point} point
 * @param {cc.AffineTransform} t
 * @return {cc.Point}
 * Constructor
 */
cc.PointApplyAffineTransform = function (point, t) {
    return cc.__PointApplyAffineTransform(point, t);
};

cc.__SizeApplyAffineTransform = function (size, t) {
    var s = cc.size(0, 0);
    s.width = t.a * size.width + t.c * size.height;
    s.height = t.b * size.width + t.d * size.height;
    return s;
};

/**
 * @function
 * @param {cc.Size} size
 * @param {cc.AffineTransform} t
 * @return {cc.Size}
 * Constructor
 */
cc.SizeApplyAffineTransform = function (size, t) {
    return cc.__SizeApplyAffineTransform(size, t);
};

/**
 * @function
 * @return {cc.AffineTransform}
 * Constructor
 */
cc.AffineTransformMakeIdentity = function () {
    return cc.__AffineTransformMake(1.0, 0.0, 0.0, 1.0, 0.0, 0.0);
};

/**
 * @function
 * @return {cc.AffineTransform}
 * Constructor
 */
cc.AffineTransformIdentity = function () {
    return cc.AffineTransformMakeIdentity();
};

/**
 * @function
 * @param {cc.Rect} rect
 * @param {cc.AffineTransform} anAffineTransform
 * @return {cc.Rect}
 * Constructor
 */
cc.RectApplyAffineTransform = function (rect, anAffineTransform) {
    var top = cc.Rect.CCRectGetMinY(rect);
    var left = cc.Rect.CCRectGetMinX(rect);
    var right = cc.Rect.CCRectGetMaxX(rect);
    var bottom = cc.Rect.CCRectGetMaxY(rect);

    var topLeft = cc.PointApplyAffineTransform(cc.p(left, top), anAffineTransform);
    var topRight = cc.PointApplyAffineTransform(cc.p(right, top), anAffineTransform);
    var bottomLeft = cc.PointApplyAffineTransform(cc.p(left, bottom), anAffineTransform);
    var bottomRight = cc.PointApplyAffineTransform(cc.p(right, bottom), anAffineTransform);

    var minX = Math.min(Math.min(topLeft.x, topRight.x), Math.min(bottomLeft.x, bottomRight.x));
    var maxX = Math.max(Math.max(topLeft.x, topRight.x), Math.max(bottomLeft.x, bottomRight.x));
    var minY = Math.min(Math.min(topLeft.y, topRight.y), Math.min(bottomLeft.y, bottomRight.y));
    var maxY = Math.max(Math.max(topLeft.y, topRight.y), Math.max(bottomLeft.y, bottomRight.y));

    return cc.rect(minX, minY, (maxX - minX), (maxY - minY));
};

/**
 * @function
 * @param {cc.AffineTransform} t
 * @param {Number} tx
 * @param {Number}ty
 * @return {cc.AffineTransform}
 * Constructor
 */
cc.AffineTransformTranslate = function (t, tx, ty) {
    return cc.__AffineTransformMake(t.a, t.b, t.c, t.d, t.tx + t.a * tx + t.c * ty, t.ty + t.b * tx + t.d * ty);
};

/**
 * @function
 * @param {cc.AffineTransform} t
 * @param {Number} sx
 * @param {Number} sy
 * @return {{cc.AffineTransform}}
 * Constructor
 */
cc.AffineTransformScale = function (t, sx, sy) {
    return cc.__AffineTransformMake(t.a * sx, t.b * sx, t.c * sy, t.d * sy, t.tx, t.ty);
};

/**
 * @function
 * @param {cc.AffineTransform} aTransform
 * @param {Number} anAngle
 * @return {cc.AffineTransform}
 * Constructor
 */
cc.AffineTransformRotate = function (aTransform, anAngle) {
    var fSin = Math.sin(anAngle);
    var fCos = Math.cos(anAngle);

    return cc.__AffineTransformMake(aTransform.a * fCos + aTransform.c * fSin,
        aTransform.b * fCos + aTransform.d * fSin,
        aTransform.c * fCos - aTransform.a * fSin,
        aTransform.d * fCos - aTransform.b * fSin,
        aTransform.tx,
        aTransform.ty);
};

/* Concatenate `t2' to `t1' and return the result:<br/>
 * t' = t1 * t2
 * @param {cc.AffineTransform} t1
 * @param {cc.AffineTransform} t2
 * @return {cc.AffineTransform}
 * Constructor
 */
cc.AffineTransformConcat = function (t1, t2) {
    return cc.__AffineTransformMake(t1.a * t2.a + t1.b * t2.c, t1.a * t2.b + t1.b * t2.d, //a,b
        t1.c * t2.a + t1.d * t2.c, t1.c * t2.b + t1.d * t2.d, //c,d
        t1.tx * t2.a + t1.ty * t2.c + t2.tx, //tx
        t1.tx * t2.b + t1.ty * t2.d + t2.ty);				  //ty
};

/**
 * Return true if `t1' and `t2' are equal, false otherwise.
 * @function
 * @param {cc.AffineTransform} t1
 * @param {cc.AffineTransform} t2
 * @return {Boolean}
 * Constructor
 */
cc.AffineTransformEqualToTransform = function (t1, t2) {
    return (t1.a == t2.a && t1.b == t2.b && t1.c == t2.c && t1.d == t2.d && t1.tx == t2.tx && t1.ty == t2.ty);
};

/**
 * @function
 * @param {cc.AffineTransform} t
 * @return {cc.AffineTransform}
 * Constructor
 */
cc.AffineTransformInvert = function (t) {
    var determinant = 1 / (t.a * t.d - t.b * t.c);

    return cc.__AffineTransformMake(determinant * t.d, -determinant * t.b, -determinant * t.c, determinant * t.a,
        determinant * (t.c * t.ty - t.d * t.tx), determinant * (t.b * t.tx - t.a * t.ty));
};
