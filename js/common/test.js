var alg = require('./Algebra');

var a = alg.create(3, 3);

a = [
  [  1,  3, 9 ],
  [  2,  0, 6 ],
  [  -3, 1, -7]
];

console.log(a);
var b = alg.rowEchelon(a);
console.log(b);
alg.reduceAllRow(b);
console.log(b);
