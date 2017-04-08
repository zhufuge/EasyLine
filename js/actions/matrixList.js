'use strict';

const addMatrix = (matrix) => {
  return {
    type: 'ADD_MATRIX',
    matrix,
  };
};

const removeMatrix = (matrix) => {
  return {
    type: 'REMOVE_MATRIX',
    matrix,
  };
};

module.exports = {
  addMatrix,
  removeMatrix,
};
