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

const initialName = 'A',
      initialCol = 3,
      initialRow = 3,
      initialMType = 0,
      initialMatrix = Algm.create(initialCol, initialRow, initialMType);

const initialMatrixObject = {
  matrix: initialMatrix,
  name: initialName,
  col: initialCol,
  row: initialRow,
  mType: initialMType
};

function matrix(state = initialMatrixObject, action) {
  var matrix = Algm.clone(state.matrix),
      name = state.name,
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
  case 'MATRIX_NAME': {
    name = action.name;
    break;
  }
  case 'MATRIX_TYPE': {
    mType = action.mType;
    matrix = Algm.create(col, row, (mType === '\\') ? 0 : mType);
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
    name: name,
    col: col,
    row: row,
    mType: mType,
  };
}

export default combineReducers({
  showMenu,
  matrix
});
