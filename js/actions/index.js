'use strict';

const matrixAction = require('./matrix');
const matrixList = require('./matrixList');
const calcStack = require('./calculateStack');

const doneIntro = () => {
  return {
    type: 'DONE_INTRO'
  };
};

module.exports = {
  ...matrixAction,
  ...matrixList,
  ...calcStack,
  doneIntro,
};
