'use strict';

import { combineReducers } from 'redux';

function det(state = 0, action) {
  switch(action.type) {
  case 'DET':
    return action.det;
  default:
    return state;
  }
}

function mType(state = 0, action) {
  switch(action.type) {
  case 'M_TYPE':
    return action.mType;
  default:
    return state;
  }
}

function col(state = 3, action) {
  switch(action.type) {
  case 'COL':
    return action.col;
  default:
    return state;
  }
}

function row(state = 3, action) {
  switch(action.type) {
  case 'ROW':
    return action.row;
  default:
    return state;
  }
}

function transpose(state = false, action) {
  switch(action.type) {
  case 'TRANSPOSE':
    return action.transpose;
  default:
    return state;
  }
}

function showMenu(state = false, action) {
  switch(action.type) {
  case 'SHOW_MENU':
    return action.showMenu;
  default:
    return state;
  }
}

function rank(state = 0, action) {
  switch(action.type) {
  case 'RANK':
    return action.rank;
  default:
    return state;
  }
}

export default combineReducers({
  det,
  mType,
  col,
  row,
  transpose,
  showMenu,
  rank
});
