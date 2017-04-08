'use strict';

const calcPush = (object) => {
  return {
    type: 'CALC_PUSH',
    object,
  };
};

const calcPop = () => {
  return {
    type: 'CALC_POP',
  };
};

const calcPopAll = () => {
  return {
    type: 'CALC_POP_ALL',
  };
};

const calcChangeNumber = (number) => {
  return {
    type: 'CHANGE_STACK_NUMBER',
    number
  };
};

module.exports = {
  calcPush,
  calcPop,
  calcPopAll,
  calcChangeNumber,
};
