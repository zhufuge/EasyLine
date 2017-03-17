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

  var floor = Math.floor,
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

  Alg.calculateDet = function(A) {
    var det = 0,
        col = A.length;

    if (col === 1) return A[0];

    for (let i = 0; i < col; i++) {
      det += A[0][i] *
        ((i % 2 === 0)
         ? +(Alg.calculateCof(A, 0, i))
         : -(Alg.calculateCof(A, 0, i)));
    }
    return det;
  };

  Alg.calculateCof = function(A, i, j) {
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

    return Alg.calculateDet(Cof);
  };

}).call(this);
