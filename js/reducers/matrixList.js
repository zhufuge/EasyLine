'use strict';

const Algm = require('../common/Algebra');

function matrix(matrixObject) {
  const matrix = Algm.clone(matrixObject.matrix);
  return {
    matrix,
    name: matrixObject.name,
    col: matrixObject.col,
    row: matrixObject.row,
    mType: matrixObject.mType
  };
}

function matrixList(state = [], action) {
  switch(action.type) {
  case 'ADD_MATRIX': {
    let list = [...state],
        index = list.findIndex((matrix) => matrix.name == action.matrix.name);
    if (index >= 0) {
      list[index] = matrix(action.matrix);
      return list;
    } else {
      return [
        ...state,
        matrix(action.matrix),
      ];
    }
  }
  default:
    return state;
  }
}

module.exports = matrixList;
