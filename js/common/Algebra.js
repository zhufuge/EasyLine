'use strict';

(function() {

  var root = this;

  var Algm = function(obj) {
    if (obj instanceof Algm) return obj;
    if (!(this instanceof Algm)) return new Algm(obj);
    this._wrapped = obj;
  };

  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = Algm;
    }
    exports.Algm = Algm;
  } else {
    root.Algm = Algm;
  }

  const ArrayProto = Array.prototype;
  const NativeIsArray = Array.isArray;

  const {abs, floor, random} = Math;

  Algm.create = function(col=1, row=1, num='R') {
    return  Array(col).fill(0).map(
      (c, cIndex) => Array(row).fill(0).map(
        (r, rIndex) => {
          if (num === 'R') return floor(random() * 10);
          if (num === 'E') return (cIndex === rIndex) ? 1 : 0;
          return num;
        }));
  };

  Algm.clone = function(matrix) {
    return ArrayProto.slice.call(matrix);
  };

  Algm.changeCol = function(matrix, col=0, num=0) {
    const length = matrix[0].length;
    for (let i = 0; i < abs(col); i++) {
      if (col > 0) {
        matrix.push(Array(length).fill(num));
      } else {
        matrix.pop();
      }
    }
  };

  Algm.changeRow = function(matrix, row=0, num=0) {
    for (let col of matrix) {
      for (let i = 0; i < abs(row); i++) {
        if (row > 0) {
          col.push(num);
        } else {
          col.pop();
        }
      }
    }
  };

  Algm.range = function(start, stop, step=1) {
    if (stop == null) {
      stop = start || 0;
      start = 0;
    }
    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var range = Array(length);

    for (let idx = 0; idx < length; idx++, start += step) {
      range[idx] = start;
    }

    return range;
  };

  Algm.det = function(matrix) {
    if (matrix === void 0 &&
        matrix.length !== matrix[0].length)
      return NaN;
    if (matrix.length === 1) return matrix[0][0];
    // 有某行或某列全为 0
    if (matrix.some((c) => (c.every((num) => num === 0))) ||
        Algm.transpose(matrix).some((c) => (c.every((num) => num === 0))))
      return 0;
    // 按行按列递归展开
    return matrix[0].reduce((det, c, cIndex) => {
      if (c === 0) return det;
      return det += ((cIndex % 2 === 0) ? 1 : -1) *
        c * (Algm.det(Algm.cof(matrix, 0, cIndex)));
    }, 0);
  };

  Algm.cof = function(matrix, i, j) {
    const CRfilter = (pass) => (val, index) => (index === pass) ? false : true;
    return matrix.map((c) => c.filter(CRfilter(j))).filter(CRfilter(i));
  };

  Algm.transpose = function(matrix) {
    if (!NativeIsArray(matrix)) return NaN;
    return  Array(matrix[0].length).fill(0).map(
      (c, cIndex) => Array(matrix.length).fill(0).map(
        (r, rIndex) => matrix[rIndex][cIndex]
      ));
  };

  Algm.gcd = function(a, b) {
    while (b > 0) [a, b] = [b, a % b];
    return a;
  };

  Algm.lcm = function(a, b) {
    return a * b / Algm.gcd(a, b);
  };

  Algm.rowEchelon = function(matrix) {
    var A = Algm.clone(matrix),
        B = Array(),            // 保存梯子稳定的行
        rowLen = A[0].length,
        rowStep = 0,
        lcm;                    // 最小公倍数
    while (rowStep < rowLen && A.length > 0) {
      // 最小非0数在前，0在最后
      A.sort((a, b) => {
        if (a[rowStep] === 0) return 1;
        if (b[rowStep] === 0) return -1;
        return a[rowStep] - b[rowStep];
      });

      // rowStep 列 全为0 推进一列
      if (A[0][rowStep] === 0) {
        rowStep++;
        continue;
      }

      // 初等行变换
      for (let i = 1, len = A.length; i < len; i++) {
        if (A[i][rowStep] === 0) continue;

        lcm = Algm.lcm(abs(A[0][rowStep]), abs(A[i][rowStep]));

        A[0] = A[0].map((val, index) => {
          if (index < rowStep) return val;
          return val * lcm / A[0][rowStep];
        });

        A[i] = A[i].map((val, index) => {
          if (index < rowStep) return val;
          return val * lcm / A[i][rowStep] - A[0][index];
        });
      }
      B.push(A.shift());
      rowStep++;
    }

    return B;
  };

  Algm.rank = function(matrix) {
    return Algm.rowEchelon(matrix).length;
  };
}).call(this);
