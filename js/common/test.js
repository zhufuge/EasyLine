var alg = require('./Algebra');

var a = alg.create(3, 3);

// a = [
//   [  1,  3, 9 ],
//   [  2,  0, 6 ],
//   [  -3, 1, -7]
// ];

// console.log(alg.rowEchelon(a));
// console.log(alg.rank(a));

//a = alg.create(3, 3, 'E');

console.log(a);

var rowEchelon = function(matrix) {
  var A = alg.clone(matrix),
      B = Array(),            // 保存梯子稳定的行
      rowLen = A[0].length,
      rowStep = 0,
      lcm;                    // 最小公倍数
  while (rowStep < rowLen && A.length > 0) {
    // 最小非0数在前，0在最后
    A.sort((a, b) => {
      if (a[rowStep] === 0) return 1;
      if (b[rowStep] === 0) return -1;
      return a[rowStep] - b[rowStep];
    });

    // rowStep 列 全为0 推进一列
    if (A[0][rowStep] === 0) {
      rowStep++;
      continue;
    }

    // 初等行变换
    for (let i = 1, len = A.length; i < len; i++) {
      if (A[i][rowStep] === 0) continue;

      lcm = alg.lcm(Math.abs(A[0][rowStep]), Math.abs(A[i][rowStep]));

      A[0].forEach((val, index) => {
        if (index >= rowStep)
          val = val * lcm / A[0][rowStep];
      });

      A[i].forEach((val, index) => {
        if (index >= rowStep)
        val = val * lcm / A[i][rowStep] - A[0][index];
      });
    }
    B.push(A.shift());
    rowStep++;
  }

  return B;
};

console.log(rowEchelon(a));
console.log(alg.rowEchelon(a));
