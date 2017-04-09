var Algm = require('./Algebra');

var a = [[1, 2], [3, 4], [5, 6]];
var b = [[0, 0], [1, 0]];
var c = Algm.mulUp(a, b);
// console.log(c);
// console.log(Algm.isDivable(c, b));
// console.log(Algm.divUp(c, b));

console.log(Algm.rowEchelon(Algm.T(a)));
