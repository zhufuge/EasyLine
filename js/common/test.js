var Algm = require('./Algebra');

var a = Algm.create(3, 3);

// a = [
//   [  1,  3, 9 ],
//   [  2,  0, 6 ],
//   [  -3, 1, -7]
// ];

var b = [
  [0, 0, 1],
  [0, 1, 0],
  [1, 0, 0]
];

a = [
  [1, 2, 0],
  [3, 4, 4],
  [5, 6, 3]
];

function fn(matrix) {
  var A = Algm.clone(matrix),
      n = Algm.rows(A),
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
  return [L, U];
}


b = [
  [0, 0, 1, 0],
  [1, 0, 0, 0],
  [0, 0, 0, 1],
  [0, 1, 0, 0]
];

a = [
  [2, 0, 2, 0.6],
  [3, 3, 4, -2],
  [5, 5, 4, 2],
  [-1, -2, 3.4, -1]
];
b = Algm.mulUp(b, a);

var [l, u, x] = Algm.LUP(a);
console.log(l);
console.log(u);
console.log(x);
//console.log(Algm.mulUp(l, u));

console.log(a);
