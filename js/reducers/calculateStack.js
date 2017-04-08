'use strict';

const Algm = require('../common/Algebra');

function isMatrixObject(object) {
  return object.matrix !== void 0;
}

const operators = ['+', '-', '·', '/', '×', '÷'];

function isOperator(object) {
  return operators.includes(object);
}

function calcStack(state = [], action) {
  switch (action.type) {
  case 'CALC_PUSH': {
    const len = state.length;
    switch (len) {
    case 0: {
      let object = action.object;
      if (isMatrixObject(object)) {
        return [{...object}];
      } else {
        return [];
      }
    }
    case 1: {
      let object = action.object;
      if (isOperator(object)) {
        if (object === '×' || object === '÷') {
          return [...state, object, 1];
        } else {
          return [...state, object];
        }
      } else {
        return state;
      }
    }
    case 2: {
      let object = action.object,
          firstMatrix = state[0].matrix,
          operator = state[1];

      if (operator === '+' || operator === '-') {
        if (isMatrixObject(object) &&
            Algm.isAddable(firstMatrix, object.matrix)) {
          return [...state, object];
        } else {
          return state;
        }
      } else if (operator === '·') {
        if (isMatrixObject(object) &&
            Algm.isMulable(firstMatrix, object.matrix)) {
          return [...state, object];
        } else {
          return state;
        }
      } else if (operator === '/') {
        if (isMatrixObject(object) &&
            Algm.isDivable(firstMatrix, object.matrix)) {
          return [...state, object];
        } else {
          return state;
        }
      } else {
        if (typeof object === 'number' && !Number.isNaN(object)) {
          return [...state, object];
        } else {
          return state;
        }
      }
    }
    default:
      return state;
    }
  }
  case 'CHANGE_STACK_NUMBER': {
    if (state.length === 3) {
      let stack = [...state];
      stack[2] = action.number;
      return stack;
    } else {
      return state;
    }
  }
  case 'CALC_POP': {
    let stack = [...state];
    if (typeof stack[stack.length - 1] === 'number') {
      stack.pop();
    }
    stack.pop();
    return stack;
  }
  case 'CALC_POP_ALL': {
    return [];
  }
  default:
    return state;
  }
}

module.exports = calcStack;
