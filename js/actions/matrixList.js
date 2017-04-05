'use strict';

const addMatrix = (matrix) => {
  return {
    type: 'ADD_MATRIX',
    matrix,
  };
};

module.exports = {
  addMatrix,
};
