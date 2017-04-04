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

  Algm.clone = (matrix) => ArrayProto.slice.call(matrix);
  Algm.row = (matrix) => matrix.length;
  Algm.col = (matrix) => matrix[0].length;
  Algm.array = (len, num) => Array(len).fill(num);

  Algm.create = function(row=1, col=1, num='R') {
    return  Algm.array(row, 0).map(
      (r, rIndex) => Algm.array(col, 0).map(
        (c, cIndex) => {
          if (num === 'R') return floor(random() * 10);
          if (num === 'E') return (cIndex === rIndex) ? 1 : 0;
          return num;
        }
      )
    );
  };

  Algm.changeRow = function(matrix, row=0, num=0) {
    const colLen = Algm.col(matrix);
    for (let i = 0; i < abs(row); i++) {
      if (row > 0) {
        matrix.push(Algm.array(colLen, num));
      } else {
        matrix.pop();
      }
    }
  };

  Algm.changeCol = function(matrix, col=0, num=0) {
    for (let row of matrix) {
      for (let i = 0; i < abs(col); i++) {
        if (col > 0) {
          row.push(num);
        } else {
          row.pop();
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

  Algm.isZeroRow = (row) => row.every((num) => num === 0);
  Algm.hasZeroRow = (matrix) => matrix.some((row) => Algm.isZeroRow(row));
  Algm.isSquare = (matrix) => Algm.row(matrix) === Algm.col(matrix);
  Algm.isNumRow = (row) => NativeIsArray(row) &&
    row.every((num) => typeof num === 'number');

  Algm.isMatrix = function(matrix) {
    if (!NativeIsArray(matrix) && !NativeIsArray(matrix[0])) return false;
    const colLen = Algm.col(matrix);
    return matrix.every((r) => Algm.isNumRow(r) && r.length === colLen);
  };

  function detInner(matrix) {
    if (Algm.row(matrix) === 1) return matrix[0][0];
    if (Algm.hasZeroRow(matrix) || Algm.hasZeroRow(Algm.T(matrix))) {
      return 0;
    }

    return matrix[0].reduce((det, c, cIndex) => {
      if (c === 0) return det;
      return det += ((cIndex % 2 === 0) ? 1 : -1) * c *
        detInner(Algm.cof(matrix, 0, cIndex));
    }, 0);
  }

  Algm.det = function(matrix) {
    if (!Algm.isMatrix(matrix) || !Algm.isSquare(matrix)) {
      return NaN;
    } else {
      return detInner(matrix);
    }
  };

  Algm.cof = function(matrix, i, j) {
    const RCfilter = (pass) => (val, index) => (index === pass) ? false : true;
    return matrix.filter(RCfilter(i)).map((r) => r.filter(RCfilter(j)));
  };

  Algm.T = Algm.transpose = function(matrix) {
    if (!Algm.isMatrix(matrix)) return NaN;
    const colLen = Algm.col(matrix),
          rowLen = Algm.row(matrix);
    return  Algm.array(colLen, 0).map(
      (r, rIndex) => Algm.array(rowLen, 0).map(
        (c, cIndex) => matrix[cIndex][rIndex]
      )
    );
  };

  Algm.gcd = function(a, b) {
    [a, b] = [abs(a), abs(b)];
    while (b > 0) [a, b] = [b, a % b];
    return a;
  };

  Algm.lcm = (a, b) => a * b / Algm.gcd(a, b);

  var arrayGcd = (row) => row.reduce((gcd, val) => Algm.gcd(gcd, val), 0);

  Algm.reduceRow = function(row) {
    if (Algm.isNumRow(row)) {
      // 取第一个非0数的符号
      const gcd = arrayGcd(row) *
            ((row.find((val) => val !== 0) > 0) ? 1 : -1);
      row.forEach((n, i, r) => {if (n !== 0) r[i] /= gcd;});
    }
  };

  Algm.reduceAllRow = function(matrix) {
    if (Algm.isMatrix(matrix)) {
      matrix.forEach((r) => Algm.reduceRow(r));
    }
  };

  Algm.rowEchelon = function(matrix) {
    var A = Algm.clone(matrix),
        B = Array(),            // 保存梯子稳定的行
        step = 0;
    const colLen = Algm.col(A);
    while (step < colLen && Algm.row(A) > 0) {
      // 最小非0数在前，0在最后
      A.sort((a, b) => {
        if (a[step] === 0) return 1;
        if (b[step] === 0) return -1;
        return a[step] - b[step];
      });

      var firstRow = A[0],
          firstRowStep = firstRow[step];
      // step 列 全为0 推进一列
      if (firstRowStep === 0) {
        step++;
        continue;
      }

      // 初等行变换
      for (let i = 1, len = Algm.row(A); i < len; i++) {
        var IRowStep = A[i][step];
        if (IRowStep !== 0) {
          var lcm = Algm.lcm(firstRowStep, IRowStep);

          A[i] = A[i].map((val, index, row) => {
            if (index < step) return val;
            return (val * lcm / IRowStep) -
              (firstRow[index] * lcm / firstRowStep);
          });
        }
      }
      B.push(A.shift());
      step++;
    }

    return B;
  };

  Algm.rank = (matrix) => Algm.row(Algm.rowEchelon(matrix));
}).call(this);
