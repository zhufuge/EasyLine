'use strict';

import { combineReducers } from 'redux';

function intro(state=true, action) {
  switch(action.type) {
  case 'DONE_INTRO':
    return false;
  default:
    return state;
  }
}

export default combineReducers({
  matrix: require('./matrix'),
  matrixList: require('./matrixList'),
  calcStack: require('./calculateStack'),
  intro,
});
