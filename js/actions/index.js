'use strict';

const matrixAction = require('./matrix');

const setShowMenu = (showMenu) => {
  return {
    type: 'SHOW_MENU',
    showMenu: showMenu
  };
};

const setDefaultCol = (col) => {
  return {
    type: 'DEFAULT_COL',
    col
  };
};

const addMatrix = (matrix) => {
  return {
    type: 'ADD_MATRIX',
    matrix,
  };
};

module.exports = {
  ...matrixAction,
  addMatrix,
  setShowMenu,
  setDefaultCol,
};
