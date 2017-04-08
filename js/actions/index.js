'use strict';

const matrixAction = require('./matrix');
const matrixList = require('./matrixList');
const calcStack = require('./calculateStack');

const setShowMenu = (showMenu) => {
  return {
    type: 'SHOW_MENU',
    showMenu: showMenu
  };
};


module.exports = {
  ...matrixAction,
  ...matrixList,
  ...calcStack,
  setShowMenu,
};
