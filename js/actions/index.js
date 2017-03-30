'use strict';


export const setShowMenu = (showMenu) => {
  return {
    type: 'SHOW_MENU',
    showMenu: showMenu
  };
};

export const setMatrix = (col, row, mType) => {
  return {
    type: 'MATRIX',
    col: col,
    row: row,
    mType: mType
  };
};

export const setMatrixName = (name) => {
  return {
    type: 'MATRIX_NAME',
    name: name
  };
};

export const setMatrixType = (mType) => {
  return {
    type: 'MATRIX_TYPE',
    mType: mType
  };
};

export const setMatrixCol = (col) => {
  return {
    type: 'MATRIX_COL',
    col: col
  };
};

export const setMatrixRow = (row) => {
  return {
    type: 'MATRIX_ROW',
    row: row
  };
};

export const setMatrixItem = (i, j, val) => {
  return {
    type: 'MATRIX_ITEM',
    i: i,
    j: j,
    val: val
  };
};

export const setMatrixTranspose = () => {
  return {
    type: 'MATRIX_TRANSPOSE'
  };
};
