'use strict';

import { combineReducers } from 'redux';
const Algm = require('../common/Algebra.js');

function showMenu(state = false, action) {
  switch(action.type) {
  case 'SHOW_MENU':
    return action.showMenu;
  default:
    return state;
  }
}

const initialCol = 3,
      initialRow = 3,
      initialMType = 0,
      initialMatrix = Algm.create(initialCol, initialRow, initialMType);

initialMatrix = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8]
];

const initialMatrixObject = {
  matrix: initialMatrix,
  col: initialCol,
  row: initialRow,
  mType: initialMType
};

const Det = (matrix) => (matrix.length === matrix[0].length)
      ? Algm.det(matrix) : 'NaN';

function matrix(state = initialMatrixObject, action) {
  var matrix = Algm.clone(state.matrix),
      col = state.col,
      row = state.row,
      mType = state.mType;
  switch(action.type) {
  case 'MATRIX':{
    col = action.col;
    row = action.row;
    mType = action.mType;
    matrix = Algm.create(col, row, mType);
    break;
  }
  case 'MATRIX_TYPE': {
    mType = action.mType;
    matrix = Algm.create(col, row, mType);
    break;
  }
  case 'MATRIX_COL': {
    Algm.changeCol(matrix, action.col - col);
    col = action.col;
    break;
  }
  case 'MATRIX_ROW': {
    Algm.changeRow(matrix, action.row - row);
    row = action.row;
    break;
  }
  case 'MATRIX_ITEM': {
    matrix[action.i][action.j] = action.val;
    break;
  }
  case 'MATRIX_TRANSPOSE': {
    [col, row] = [row, col];
    matrix = Algm.transpose(matrix);
    break;
  }
  default:
    break;
  }
  return {
    matrix: matrix,
    col: col,
    row: row,
    mType: mType,
    det: Det(matrix),
    rank: Algm.rank(matrix)
  };
}

export default combineReducers({
  showMenu,
  matrix
});
