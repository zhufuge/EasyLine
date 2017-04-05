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

  Algm.rows = (matrix) => matrix.length;
  Algm.cols = (matrix) => matrix[0].length;

  Algm.isNumRow = (row) =>
    NativeIsArray(row) &&
    row.every((num) => typeof num === 'number');

  Algm.array = (len, num=0) => Array(len).fill(num);
  Algm.clone = (matrix) => matrix.map((row) => ArrayProto.slice.call(row));

  var create = (fn) =>
      (row=1, col=row) =>
      Algm.array(row).map(
        (r, rIndex) => Algm.array(col).map(
          (c, cIndex) => fn(rIndex, cIndex, c)));

  Algm.eye = create((i, j) => (i === j) ? 1 : 0);

  Algm.randomMatrix = create(() => floor(random() * 10));

  Algm.create = (row=1, col=row, num='R') => {
    if (num === 'R') return Algm.randomMatrix(row, col);
    if (num === 'E') return Algm.eye(row, col);
    if (typeof num !== 'number') num = 0;
    return create(() => num)(row, col);
  };

  Algm.diag = (array) => {
    if (!Algm.isNumRow(array)) return [[]];
    return create((i, j) => (i === j) ? array[i] : 0)(array.length);
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

  Algm.gcd = function(a, b) {
    [a, b] = [abs(a), abs(b)];
    while (b > 0) [a, b] = [b, a % b];
    return a;
  };

  Algm.lcm = (a, b) => a * b / Algm.gcd(a, b);

  Algm.isZeroRow = (row) => row.every((num) => num === 0);
  Algm.hasZeroRow = (matrix) => matrix.some((row) => Algm.isZeroRow(row));

  Algm.isSquare = (matrix) => Algm.rows(matrix) === Algm.cols(matrix);

  Algm.isMatrix = function(matrix) {
    if (!NativeIsArray(matrix) && !NativeIsArray(matrix[0])) return false;
    const cols = Algm.cols(matrix);
    return cols > 0 &&
      matrix.every((r) => Algm.isNumRow(r) && r.length === cols);
  };

  Algm.changeRow = function(matrix, row=0, num=0) {
    const cols = Algm.cols(matrix);
    for (let i = 0; i < abs(row); i++) {
      if (row > 0) {
        matrix.push(Algm.array(cols, num));
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

  Algm.T = Algm.transpose = function(matrix) {
    if (!Algm.isMatrix(matrix)) return NaN;
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

  function mulNumber(mul=true) {
    const operator = (a, b) => mul ? a * b : a / b;
    return (matrix, num) =>
      (Algm.isMatrix(matrix))
      ? matrix.map((row) => row.map((col) => operator(col, num)))
      : matrix;
  };

  Algm.mulNumber = mulNumber();
  Algm.divNumber = mulNumber(false);

  Algm.isMulable = (matrix, another) =>
    Algm.isMatrix(matrix) &&
    Algm.isMatrix(another) &&
    Algm.cols(matrix) === Algm.rows(another);

  Algm.mulUp = function(matrix, another) {
    if (Algm.isMulable(matrix, another)) {
      const rows = Algm.rows(matrix),
            cols = Algm.cols(another),
            counts = Algm.cols(matrix);
      var A = Algm.create(rows, cols, 0);
      for (let i = 0; i < rows; i++)
        for (let j = 0; j < cols; j++)
          for (let k = 0; k < counts; k++)
            A[i][j] += matrix[i][k] * another[k][j];

      return A;
    }
    return matrix;
  };

  function permutationOrder(matrix) {
    var A = Algm.clone(matrix),
        n = Algm.rows(A),
        order = Algm.range(n);

    var swap = (a, i, j) => [a[i], a[j]] = [a[j], a[i]];
    for (let k = 0; k < n; k++) {
      var kCol = A.map((r, rIndex) => (rIndex >= k) ? abs(r[k]) : 0),
          maxIndex = kCol.indexOf(max(...kCol));

      swap(order, k, maxIndex);
      swap(A, k, maxIndex);

      for (let i = k + 1; i < n; i++) {
        A[i][k] = A[i][k] / A[k][k];
        for (let j = k + 1; j < n; j++) {
          A[i][j] = A[i][j] - A[i][k] * A[k][j];
        }
      }
    }
    return order;
  }

  function permutation(matrix) {
    const order = permutationOrder(matrix),
          n = order.length;
    var e = Algm.eye(n),
        p = Algm.array(n);
    for (let i = 0; i < n; i++) {
      p[i] = e[order[i]];
    }
    return p;
  };

  Algm.LUP = function(matrix) {
    const n = Algm.rows(matrix),
          P = permutation(matrix);

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

  // TODO: Algm.divUp

  // TODO: LUP 求逆

    // TODO: 改用LUP 分解计算
  function detInner(matrix) {
    if (Algm.rows(matrix) === 1) return matrix[0][0];
    if (Algm.hasZeroRow(matrix) ||
        Algm.hasZeroRow(Algm.T(matrix)) ||
        Algm.rank(matrix) !== Algm.rows(matrix)) {
      return 0;
    }

    return matrix[0].reduce((det, c, cIndex) => {
      if (c === 0) return det;
      return det += ((cIndex % 2 === 0) ? 1 : -1) * c *
        detInner(Algm.cof(matrix, 0, cIndex));
    }, 0);
  }

  Algm.det = (matrix) =>
    (Algm.isMatrix(matrix) && Algm.isSquare(matrix))
    ? detInner(matrix)
    : NaN;

  Algm.cof = function(matrix, i, j) {
    const RCfilter = (pass) => (val, index) => (index === pass) ? false : true;
    return matrix.filter(RCfilter(i)).map((r) => r.filter(RCfilter(j)));
  };



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
    // 最小非0数在前，0在最后
    const putZeroBottom = (a, b) => {
      if (a[step] === 0) return 1;
      if (b[step] === 0) return -1;
      return a[step] - b[step];
    };
    const cols = Algm.cols(A);
    while (step < cols && Algm.rows(A) > 0) {
      A.sort(putZeroBottom);

      var firstRow = A[0],
          firstRowStep = firstRow[step];
      // step 列 全为0 推进一列
      if (firstRowStep !== 0) {
        // 初等行变换
        for (let i = 1, len = Algm.rows(A); i < len; i++) {
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
      }
      step++;
    }

    return B;
  };

  Algm.rank = (matrix) => Algm.rows(Algm.rowEchelon(matrix));
}).call(this);
