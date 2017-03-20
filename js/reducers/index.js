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

export default combineReducers({
  det,
  mType,
  col,
  row,
  transpose
});
