'use strict';

import { combineReducers } from 'redux';

function showMenu(state = false, action) {
  switch(action.type) {
  case 'SHOW_MENU':
    return action.showMenu;
  default:
    return state;
  }
}


export default combineReducers({
  showMenu,
  matrix: require('./matrix'),
  matrixList: require('./matrixList'),
  default: require('./default'),
});
