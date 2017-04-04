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

function compareMatrixName(a, b) {
  const aName = a.name,
        bName = b.name;
  if (aName < bName) {
    return -1;
  } else if (aName > bName) {
    return 1;
  } else {
    return 0;
  }
}

function matrixList(state = [], action) {
  switch(action.type) {
  case 'ADD_MATRIX': {
    let list = [...state],
        index = list.findIndex((matrix) => matrix.name === action.matrix.name);
    if (index >= 0) {
      list[index] = matrix(action.matrix);
      return list;
    } else {
      return [
        ...state,
        matrix(action.matrix),
      ].sort(compareMatrixName);
    }
  }
  case 'REMOVE_MATRIX': {
    let list = [...state],
        index = list.findIndex((matrix) => matrix.name === action.matrix.name);
    if (index >= 0) {
      list.splice(index, 1);
    }
    return list;
  }
  default:
    return state;
  }
}

module.exports = matrixList;
