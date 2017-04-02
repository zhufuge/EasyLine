'use strict';

const Algm = require('../common/Algebra.js');

const name = 'A',
      col = 3,
      row = 3,
      mType = 0,
      initialMatrix = Algm.create(col, row, mType),
      initialMatrixObject = {
        matrix: initialMatrix,
        name,
        col,
        row,
        mType,
      };

function matrix(state = initialMatrixObject, action) {
  switch(action.type) {
  case 'MATRIX':{
    let col = action.col,
        row = action.row,
        mType = action.mType,
        matrix = Algm.create(col, row, mType);
    return {...state, matrix, col, row, mType};
  }
  case 'MATRIX_NAME': {
    let name = action.name;
    return {...state, name};
  }
  case 'MATRIX_TYPE': {
    let mType = action.mType,
        matrix = Algm.create(col, row, (mType === '\\') ? 0 : mType);
    return {...state, matrix, mType};
  }
  case 'MATRIX_COL': {
    let col = action.col,
        matrix = Algm.clone(state.matrix);
    Algm.changeCol(matrix, col - state.col);
    return {...state, matrix, col};
  }
  case 'MATRIX_ROW': {
    let row = action.row,
        matrix = Algm.clone(state.matrix);
    Algm.changeRow(matrix, row - state.row);
    return {...state, matrix, row};
  }
  case 'MATRIX_ITEM': {
    let matrix = Algm.clone(state.matrix);
    matrix[action.i][action.j] = action.val;
    return {...state, matrix};
  }
  case 'MATRIX_TRANSPOSE': {
    let col = state.col,
        row = state.row,
        matrix = Algm.clone(state.matrix);
    [col, row] = [row, col];
    matrix = Algm.transpose(matrix);
    return {...state, matrix, col, row};
  }
  default:
    return state;
  }
}

module.exports = matrix;
