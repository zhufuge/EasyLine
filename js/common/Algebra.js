'use strict';

(function() {

  var root = this;

  var Alg = function(obj) {
    if (obj instanceof Alg) return obj;
    if (!(this instanceof Alg)) return new Alg(obj);
    this._wrapped = obj;
  };

  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = Alg;
    }
    exports.Alg = Alg;
  } else {
    root.Alg = Alg;
  }

  const abs = Math.abs,
        floor = Math.floor,
        random = Math.random;

  Alg.create = function(col, row, num) {
    var A = [];
    if (num === 'E') {
      for (let i = 0; i < col; i++) {
        A.push([]);
        for (let j = 0; j < row; j++) {
          if (i === j) A[i].push(1);
          else A[i].push(0);
        }
      }
      return A;
    }

    for (let i = 0; i < col; i++) {
      A.push([]);
      for (let j = 0; j < row; j++) {
        A[i].push((num !== void 0) ? num : floor(random() * 10));
      }
    }
    return A;
  };

  Alg.createEye = function(len) {
    var A = Array(len);
    for (let i = 0; i < len; i++) {
      A[i] = Array(len);
      for (let j = 0; j < len; j++) {
        if (i === j) A[i][j] = 1;
        else A[i][j] = 0;
      }
    }
    return A;
  };

  Alg.copy = function(matrix) {
    if (!matrix.length) return [matrix];
    var result = [];
    for (let i = 0, col = matrix.length; i < col; i++) {
      result.push([]);
      for (let j = 0, row = matrix[i].length; j < row; j++) {
        result[i].push(matrix[i][j]);
      }
    }
    return result;
  };

  Alg.addCol = function(matrix, col, num) {
    col = col !== void 0 ? col : 1;
    num = num || 0;

    for (let i = 0, last = matrix.length; i < col; i++, last++) {
      matrix.push([]);
      for (let j = 0, length = matrix[0].length; j < length; j++) {
        matrix[last].push(num);
      }
    }
    return col;
  };

  Alg.removeCol = function(matrix, col) {
    col = col !== void 0 ? col : 1;
    for (let i = 0; i < col; i++) matrix.pop();
    return col;
  };

  Alg.changeCol = function(matrix, col, num) {
    return col > 0
      ? Alg.addCol(matrix, col, num)
      : Alg.removeCol(matrix, abs(col));
  };

  Alg.addRow = function(matrix, row, num) {
    row = row !== void 0 ? row : 1;
    num = num || 0;

    for (let i = 0, length = matrix.length; i < length; i++)
      for (let j = 0; j < row; j++)
        matrix[i].push(num);
    return row;
  };

  Alg.removeRow = function(matrix, row) {
    row = row !== void 0 ? row : 1;
    for (let i = 0, length = matrix.length; i < length; i++)
      for (let j = 0; j < row; j++)
        matrix[i].pop();
    return row;
  };

  Alg.changeRow = function(matrix, row, num) {
    return row > 0
      ? Alg.addRow(matrix, row, num)
      : Alg.removeRow(matrix, abs(row));
  };

  Alg.range = function(start, stop, step) {
    if (stop == null) {
      stop = start || 0;
      start = 0;
    }
    step = step || 1;

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var range = Array(length);

    for (var idx = 0; idx < length; idx++, start += step) {
      range[idx] = start;
    }

    return range;
  };

  Alg.det = function(matrix) {
    if (matrix === void 0) return NaN;
    var det = 0,
        col = matrix.length;
    if (col === 1) return matrix[0][0];
    if (col !== matrix[0].length) return NaN;

    const transpose = Alg.transpose(matrix);
    for (let i = 0; i < col; i++) {
      if (matrix[i].every((num) => num === 0) ||
          transpose[i].every((num => num === 0))) {
        return 0;
      }
    }

    for (let i = 0; i < col; i++) {
      if (matrix[0][i] === 0) continue;
      det += matrix[0][i] *
        ((i % 2 === 0)
         ? +(Alg.det(Alg.cof(matrix, 0, i)))
         : -(Alg.det(Alg.cof(matrix, 0, i))));
    }
    return det;
  };

  Alg.cof = function(matrix, i, j) {
    var Cof = [],
        count = 0,
        length = matrix.length;
    for (let col = 0; col < length; col++) {
      if (col !== i) {
        Cof.push([]);
        for (let row = 0; row < length; row++) {
          if (row !== j) Cof[count].push(matrix[col][row]);
        }
        count++;
      }
    }
    return Cof;
  };

  Alg.transpose = function(matrix) {
    if (!Array.isArray(matrix)) return NaN;
    const col = matrix.length,
          row = matrix[0].length;
    var transpose = Array(row);
    for (let i = 0; i < row; i++) {
      transpose[i] = Array(col);
      for (let j = 0; j < col; j++) {
        transpose[i][j] = matrix[j][i];
      }
    }
    return transpose;
  };

  Alg.gcd = function(a, b) {
    while (b > 0) {
      [a, b] = [b, a % b];
    }
    return a;
  };

  Alg.lcm = function(a, b) {
    return a * b / Alg.gcd(a, b);
  };

  Alg.rowEchelon = function(matrix) {
    var A = Alg.copy(matrix),
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

        lcm = Alg.lcm(abs(A[0][rowStep]), abs(A[i][rowStep]));

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

  Alg.rank = function(matrix) {
    return Alg.rowEchelon(matrix).length;
  };
}).call(this);
