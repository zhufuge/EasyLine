'use strict';

const matrixAction = require('./matrix');
const matrixList = require('./matrixList');

const setShowMenu = (showMenu) => {
  return {
    type: 'SHOW_MENU',
    showMenu: showMenu
  };
};


module.exports = {
  ...matrixAction,
  ...matrixList,
  setShowMenu,
};
