var Alg = require('./Algebra');

var a = Alg.create(2, 3);

a = [
  [  1,  3, 9 ],
  [  2,  0, 6 ],
  [  -3, 1, -7]
];

console.log(Alg.rowEchelon(a));
console.log(Alg.rank(a));
