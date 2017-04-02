var alg = require('./Algebra');

var a = alg.create(3, 3);

// a = [
//   [  1,  3, 9 ],
//   [  2,  0, 6 ],
//   [  -3, 1, -7]
// ];

function f(a, b) {
  var list = [...a],
      index = list.findIndex((m) => m.name === b.name);
  console.log(index);
  if (index >= 0) {
    list[index] = b;
    return list;
  } else {
    return [
      ...a,
      b
    ];
  }
}

var list = [{name: 'A', matrix: alg.create(3,3)}];
console.log(list);
list = f(list, {name: 'A', matrix: alg.create(2,3)});
console.log(list);
