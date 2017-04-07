'use strict';

const Algm = require('../common/Algebra.js');

const name = 'A',
      row = 3,
      col = 3,
      mType = 0,
      initialMatrix = Algm.create(row, col, mType),
      initialMatrixObject = {
        matrix: initialMatrix,
        name,
        row,
        col,
        mType,
      };

function matrix(state = initialMatrixObject, action) {
  switch(action.type) {
  case 'MATRIX':{
    let row = action.row,
        col = action.col,
        mType = action.mType,
        matrix = Algm.create(row, col, mType);
    return {...state, matrix, row, col, mType};
  }
  case 'SET_MATRIX': {
    let matrix = Algm.clone(action.matrix);
    return {
      matrix,
      name: action.name,
      row: action.row,
      col: action.col,
      mType: action.mType,
    };
  }
  case 'MATRIX_NAME': {
    let name = action.name;
    return {...state, name};
  }
  case 'MATRIX_TYPE': {
    let mType = action.mType,
        matrix = Algm.create(state.row, state.col, (mType === '\\') ? 0 : mType);
    return {...state, matrix, mType};
  }
  case 'MATRIX_ROW': {
    let row = action.row,
        matrix = Algm.clone(state.matrix);
    Algm.changeRow(matrix, row - state.row);
    return {...state, matrix, row};
  }
  case 'MATRIX_COL': {
    let col = action.col,
        matrix = Algm.clone(state.matrix);
    Algm.changeCol(matrix, col - state.col);
    return {...state, matrix, col};
  }
  case 'MATRIX_ITEM': {
    let matrix = Algm.clone(state.matrix);
    matrix[action.i][action.j] = action.val;
    return {...state, matrix};
  }
  case 'MATRIX_TRANSPOSE': {
    let row = state.row,
        col = state.col,
        matrix = Algm.clone(state.matrix);
    [row, col] = [col, row];
    matrix = Algm.transpose(matrix);
    return {...state, matrix, row, col};
  }
  default:
    return state;
  }
}

module.exports = matrix;
