var Alg = require('./Algebra');

var a = Alg.create(2, 3);


//console.log(Alg.calculateDet(a));
// console.log(Alg.range(6));

var b = Alg.copy(a);
var c = Alg.transpose(a);
//b[0][0] = -9;

// Alg.addCol(b, 2);
// Alg.addRow(b, 2);

c = [b, b = c][0];

console.log(a);
console.log(b);
console.log(c);

// Alg.removeCol(a);
// console.log(a);
// Alg.removeRow(a, 3);
// console.log(a);

// Alg.changeCol(b, 2);
// Alg.changeRow(b, -1);
// console.log(a);
// console.log(b);
