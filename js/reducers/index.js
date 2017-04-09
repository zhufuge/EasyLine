'use strict';

import { combineReducers } from 'redux';

export default combineReducers({
  matrix: require('./matrix'),
  matrixList: require('./matrixList'),
  calcStack: require('./calculateStack'),
  default: require('./default'),
});
