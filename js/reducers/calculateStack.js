'use strict';

const Algm = require('../common/Algebra');

function isMatrixObject(object) {
  return object.matrix !== void 0;
}

const operators = ['+', '-', '·', '/', '×', '÷'];

function isOperator(object) {
  return operators.includes(object);
}
function operatorType(operator) {
  return operators.findIndex(operator);
}

function calcStack(state = [], action) {
  switch (action.type) {
  case 'CALC_PUSH': {
    const len = state.length;
    switch (len) {
    case 0: {
      let object = action.object;
      if (isMatrixObject(object)) {
        return [object];
      } else {
        return [];
      }
    }
    case 1: {
      let object = action.object;
      if (isOperator(object)) {
        return [...state, object];
      } else {
        return state;
      }
    }
    case 2: {
      // TODO: 
    }
    default:
      return state;
    }
  }
  case 'CALC_POP':
  case 'CALC_ALL':
  case 'CALC_POP_ALL':
  default:
    return state;
  }
}
