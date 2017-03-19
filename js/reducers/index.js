'use strict';

import { combineReducers } from 'redux';
import { DET } from '../actions/index';

function det(state = 'NaN', action) {
  switch(action.type){
  case 'DET':
    return action.det;
  default:
    return state;
  }
}

export default combineReducers({
  det
});

