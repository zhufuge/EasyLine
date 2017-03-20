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
    var matrix = [];
    if (num === 'E') {
      for (let i = 0; i < col; i++) {
        matrix.push([]);
        for (let j = 0; j < row; j++) {
          if (i === j) matrix[i].push(1);
          else matrix[i].push(0);
        }
      }
      return matrix;
    }

    for (let i = 0; i < col; i++) {
      matrix.push([]);
      for (let j = 0; j < row; j++) {
        matrix[i].push((num !== void 0) ? num : floor(random() * 10));
      }
    }
    return matrix;
  };

  Alg.copy = function(A) {
    if (!A.length) return [A];
    var result = [];
    for (let i = 0, col = A.length; i < col; i++) {
      result.push([]);
      for (let j = 0, row = A[i].length; j < row; j++) {
        result[i].push(A[i][j]);
      }
    }
    return result;
  };

  Alg.addCol = function(A, col, num) {
    col = col !== void 0 ? col : 1;
    num = num || 0;

    var last = A.length - 1;
    for (let i = 0; i < col; i++) {
      A.push([]);
      last++;
      for (let j = 0, length = A[0].length; j < length; j++) {
        A[last].push(num);
      }
    }
    return col;
  };

  Alg.removeCol = function(A, col) {
    col = col !== void 0 ? col : 1;

    for (let i = 0; i < col; i++) {
      A.pop();
    }
    return col;
  };

  Alg.changeCol = function(A, col, num) {
    return col > 0
      ? Alg.addCol(A, col, num)
      : Alg.removeCol(A, abs(col));
  };

  Alg.addRow = function(A, row, num) {
    row = row !== void 0 ? row : 1;
    num = num || 0;

    for (let i = 0, length = A.length; i < length; i++) {
      for (let j = 0; j < row; j++) {
        A[i].push(num);
      }
    }
    return row;
  };

  Alg.removeRow = function(A, row) {
    row = row !== void 0 ? row : 1;

    for (let i = 0, length = A.length; i < length; i++) {
      for (let j = 0; j < row; j++) {
        A[i].pop();
      }
    }
    return row;
  };

  Alg.changeRow = function(A, row, num) {
    return row > 0
      ? Alg.addRow(A, row, num)
      : Alg.removeRow(A, abs(row));
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

  Alg.det = function(A) {
    if (A === void 0) return NaN;
    var det = 0,
        col = A.length;
    if (col === 1) return A[0];
    if (col !== A[0].length) return NaN;

    for (let i = 0; i < col; i++) {
      if (A[0][i] === 0) continue;
      det += A[0][i] *
        ((i % 2 === 0)
         ? +(Alg.cof(A, 0, i))
         : -(Alg.cof(A, 0, i)));
    }
    return det;
  };

  Alg.cof = function(A, i, j) {
    var Cof = [],
        count = 0,
        length = A.length;
    for (let col = 0; col < length; col++) {
      if (col !== i) {
        Cof.push([]);
        for (let row = 0; row < length; row++) {
          if (row !== j) {
            Cof[count].push(A[col][row]);
          }
        }
        count++;
      }
    }

    return Alg.det(Cof);
  };

  Alg.transpose = function(A) {
    if (!Array.isArray(A)) return NaN;
    const col = A.length,
          row = A[0].length;
    var transpose = Array(row);
    for (let i = 0; i < row; i++) {
      transpose[i] = Array(col);
      for (let j = 0; j < col; j++) {
        transpose[i][j] = A[j][i];
      }
    }
    return transpose;
  };

}).call(this);
