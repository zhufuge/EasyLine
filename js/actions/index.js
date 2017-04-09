'use strict';

const matrixAction = require('./matrix');
const matrixList = require('./matrixList');
const calcStack = require('./calculateStack');

module.exports = {
  ...matrixAction,
  ...matrixList,
  ...calcStack,
};
