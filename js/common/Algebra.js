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
  const {abs, floor, random, max} = Math;

  Algm.array = (len, num=0) => Array(len).fill(num);
  var create = (fn) =>
      (row=1, col=row) =>
      Algm.array(row).map(
        (r, rIndex) => Algm.array(col).map(
          (c, cIndex) => fn(rIndex, cIndex)));

  Algm.zeros = create(() => 0);
  Algm.ones = create(() =>　1);
  Algm.eye = create((i, j) => (i === j) ? 1 : 0);
  Algm.rand = create(() => floor(random() * 10));

  Algm.create = (row=1, col=row, num='R') => {
    if (num === 'R') return Algm.rand(row, col);
    if (num === 'E') return Algm.eye(row, col);
    if (typeof num !== 'number') return Algm.zeros(row, col);
    return create(() => num)(row, col);
  };

  Algm.diag = (array) => {
    if (!isNumArray(array)) return [[]];
    return create((i, j) => (i === j) ? array[i] : 0)(array.length);
  };

  Algm.rows = (matrix) => matrix.length;
  Algm.cols = (matrix) => matrix[0].length;
  Algm.clone = (matrix) => matrix.map((row) => ArrayProto.slice.call(row));


  Algm.range = function(start, stop, step=1) {
    if (stop == null) {
      stop = start || 0;
      start = 0;
    }
    var length = max(Math.ceil((stop - start) / step), 0);
    var range = Array(length);

    for (let idx = 0; idx < length; idx++, start += step) {
      range[idx] = start;
    }

    return range;
  };

  var gcd = function(a, b) {
    [a, b] = [abs(a), abs(b)];
    while (b > 0) [a, b] = [b, a % b];
    return a;
  };

  var lcm = (a, b) => a * b /  gcd(a, b);

  Algm.isMatrix = function(matrix) {
    if (!NativeIsArray(matrix) && !NativeIsArray(matrix[0])) return false;
    const cols = Algm.cols(matrix);
    return cols > 0 && matrix.every((r) =>
                                    isNumArray(r) && r.length === cols);
  };

  var isNumArray = (array) =>
    NativeIsArray(array) && array.every((num) => typeof num === 'number');
  var isIntArray = (array) =>
      NativeIsArray(array) && array.every((num) => Number.isInteger(num));
  var isZeroRow = (row) => row.every((num) => num === 0);
  var hasZeroRow = (matrix) => matrix.some((row) => isZeroRow(row));

  Algm.isSquare = (matrix) => Algm.rows(matrix) === Algm.cols(matrix);
  Algm.isSingular = (matrix) =>
    (!Algm.isSquare(matrix) ||
     hasZeroRow(matrix) ||
     hasZeroRow(Algm.T(matrix)) ||
     Algm.rank(matrix) !== Algm.rows(matrix))
    ? true : false;

  Algm.changeRow = function(matrix, row=0, num=0) {
    const cols = Algm.cols(matrix);
    for (let i = 0; i < abs(row); i++) {
      (row > 0)
        ? matrix.push(Algm.array(cols, num))
        : matrix.pop();
    }
  };
  Algm.changeCol = function(matrix, col=0, num=0) {
    for (let row of matrix) {
      for (let i = 0; i < abs(col); i++) {
        (col > 0)
          ? row.push(num)
          : row.pop();
      }
    }
  };

  Algm.T = Algm.transpose = function(matrix) {
    if (!Algm.isMatrix(matrix)) return [[]];
    const cols = Algm.cols(matrix),
          rows = Algm.rows(matrix);
    return  Algm.array(cols).map(
      (r, rIndex) => Algm.array(rows).map(
        (c, cIndex) => matrix[cIndex][rIndex]
      )
    );
  };

  Algm.isAddable = (matrix, another) =>
    Algm.isMatrix(matrix) &&
    Algm.isMatrix(another) &&
    Algm.rows(matrix) === Algm.rows(another) &&
    Algm.cols(matrix) === Algm.cols(another);

  function addiction(add=true) {
    const operator = (a, b) => add ? a + b : a - b;
    return (matrix, another) =>
      (!Algm.isAddable(matrix, another))
      ? matrix
      : matrix.map(
        (row, rIndex) => row.map(
          (col, cIndex) => operator(col, another[rIndex][cIndex])));
  }

  Algm.addUp = addiction();
  Algm.subUp = addiction(false);

  function mulN(mul=true) {
    const operator = (a, b) => mul ? a * b : a / b;
    return (matrix, num=1) =>
      (Algm.isMatrix(matrix) && typeof num === 'number')
      ? matrix.map((row) => row.map((col) => operator(col, num)))
      : matrix;
  };

  Algm.mulN = mulN();
  Algm.divN = mulN(false);

  Algm.isMulable = (matrix, another) =>
    Algm.isMatrix(matrix) &&
    Algm.isMatrix(another) &&
    Algm.cols(matrix) === Algm.rows(another);

  Algm.mulUp = function(matrix, another) {
    if (Algm.isMulable(matrix, another)) {
      const rows = Algm.rows(matrix),
            cols = Algm.cols(another);
      var A = Algm.create(rows, cols, 0);
      for (let i = 0; i < rows; i++)
        for (let j = 0; j < cols; j++)
          for (let k = 0, n = Algm.cols(matrix); k < n; k++)
            A[i][j] += matrix[i][k] * another[k][j];

      return A;
    }
    return matrix;
  };

  Algm.isDivable = (matrix, another) => {
    return Algm.isMulable(matrix, another) &&
      !Algm.isSingular(another);
  };
  Algm.divUp = (matrix, another) => (Algm.isDivable(matrix, another))
    ? Algm.mulUp(matrix, Algm.inv(another))
    : matrix;

  var arrayGcd = (row) => row.reduce((g, val) =>  gcd(g, val), 0);
  var reduceRow = function(row) {
    if (isIntArray(row)) {
      const gcd = arrayGcd(row);
      row.forEach((n, i, r) => {if (n !== 0) r[i] /= gcd;});
    }
  };

  var rowEchelon = function(matrix) {
    var A = Algm.clone(matrix),
        B = Array(),
        col = Algm.cols(A);
    for (let c = 0; c < col; c++) {
      A.sort((a, b) => {
        if (a[c] === 0) return 1;
        if (b[c] === 0) return -1;
        return abs(a[c]) - abs(b[c]);
      });

      var topR = A[0],
          topRC = topR[c];
      if (topRC !== 0) {
        for (let i = 1, row = Algm.rows(A); i < row; i++) {
          var iRow = A[i],
              iRowC = iRow[c],
              l = lcm(topRC, iRowC);
          if (iRowC !== 0) {
            for (let j = c; j < col; j++) {
              iRow[j] = (iRow[j] * l / iRowC) - (topR[j] * l / topRC);
            }
          }
          reduceRow(iRow);
        }
        B.push(A.shift());
      }
    }

    return B;
  };

  Algm.rank = (matrix) => Algm.rows(rowEchelon(matrix));
  Algm.rowEchelon = function(matrix) {
    var e = rowEchelon(matrix),
        rows = Algm.rows(e);
    if (rows === 0) {
      return Algm.zeros(Algm.rows(matrix));
    } else {
      Algm.changeRow(e, Algm.rows(matrix) - rows);
      return e;
    }
  };

  function pmOrder(matrix) {
    var A = Algm.clone(matrix),
        n = Algm.rows(A),
        order = Algm.range(n);
    var swapOf = (i, j, array) => [array[i], array[j]] = [array[j], array[i]];
    for (let k = 0; k < n; k++) {
      var max = 0, maxIndex = 0;
      for (let i = k; i < n; i++) {
        var A_ik = abs(A[i][k]);
        if (A_ik > max) {
          max = A_ik;
          maxIndex = i;
        }
      }

      if (max === 0) throw Error('Singular matrix');

      swapOf(k, maxIndex, order);
      swapOf(k, maxIndex, A);

      for (let i = k + 1; i < n; i++) {
        A[i][k] = A[i][k] / A[k][k];
        for (let j = k + 1; j < n; j++) {
          A[i][j] = A[i][j] - A[i][k] * A[k][j];
        }
      }
    }
    return order;
  }

  var orderToPm = (o) => create((i, j) => (j === o[i]) ? 1 : 0)(o.length);
  var pmToOrder = (matrix) => matrix.map((r) => r.indexOf(1));

  Algm.LUP = function(matrix) {
    const n = Algm.rows(matrix),
          P = orderToPm(pmOrder(matrix));

    var A = Algm.mulUp(P, matrix),
        U = Algm.create(n, n, 0),
        L = Algm.eye(n);

    for (let k = 0; k < n; k++) {
      U[k][k] = A[k][k];

      for (let i = k + 1; i < n; i++) {
        L[i][k] = A[i][k] / U[k][k];
        U[k][i] = A[k][i];
      }

      for (let i = k + 1; i < n; i++) {
        for (let j = k + 1; j < n; j++) {
          A[i][j] = A[i][j] - (L[i][k] * U[k][j]);
        }
      }
    }

    return [L, U, P];
  };

  var precFloat = (n, f=12) => Number.parseFloat(n.toFixed(f));

  function LUPSolve(L, U, p, b) {
    const n = Algm.rows(L);
    var x = Algm.array(n),
        y = Algm.array(n);
    for (let i = 0; i < n; i++) {
      var ly = 0;
      for (let j = 0; j < i; j++) {
        ly += L[i][j] * y[j];
      }
      y[i] = b[p[i]] - ly;
    }

    for (let i = n - 1; i >= 0; i--) {
      var ux = 0;
      for (let j = i + 1; j < n; j++) {
        ux += U[i][j] * x[j];
      }
      x[i] = precFloat((y[i] - ux) / U[i][i]);
    }
    return x;
  }

  Algm.inv = function(matrix) {
    const n = Algm.rows(matrix);
    var A = Array(n),
        [L, U, P] = Algm.LUP(matrix),
        p = pmToOrder(P);
    for (let i = 0; i < n; i++) {
      var b = Algm.array(n);
      b[i] = 1;
      A[i] = LUPSolve(L, U, p, b);
    }
    return Algm.T(A);
  };

  function permutationDet(matrix) {
    const n = Algm.rows(matrix);
    var det = 1;
    for (let i = 0; i < n - 1; i++) {
      for (var j = 0; matrix[j][i] !== 1; j++);
      det *= (j % 2 === 0) ? 1 : -1;
      matrix.splice(j, 1);
    }
    return det;
  }

  var diagDet = (matrix) => matrix.reduce((det, r, i) => det * r[i], 1);

  Algm.det = function(matrix) {
    if (!(Algm.isMatrix(matrix) && Algm.isSquare(matrix))) return NaN;
    if (Algm.isSingular(matrix)) return 0;

    var [L, U, P] = Algm.LUP(matrix);
    return precFloat(diagDet(L) * diagDet(U), 5) * permutationDet(P);
  };

  Algm.cof = function(matrix, i, j) {
    const RCfilter = (pass) => (val, index) => (index === pass) ? false : true;
    return matrix.filter(RCfilter(i)).map((r) => r.filter(RCfilter(j)));
  };

  Algm.compan = function(matrix) {
    if (!(Algm.isMatrix(matrix) && Algm.isSquare(matrix))) return [[]];
    if (!Algm.isSingular(matrix)) {
      let A = Algm.mulN(Algm.inv(matrix), Algm.det(matrix));
      for (let i = 0, n = Algm.rows(matrix); i < n; i++) {
        for (let j = 0; j < n; j++) {
          A[i][j] = precFloat(A[i][j], 5);
        }
      }
      return A;
    } else {
      let n = Algm.rows(matrix),
          A = Array(n);
      if (n > 1) {
        for (let i = 0; i < n; i++) {
          A[i] = Array(n);
          for (let j = 0; j < n; j++) {
            A[i][j] = Algm.det(Algm.cof(matrix, i, j));
          }
        }
      } else {
        A[0] = [matrix[0][0]];
      }
      return A;
    }
  };
}).call(this);
