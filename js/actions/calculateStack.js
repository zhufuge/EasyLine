'use strict';

const calcPush = (object) => {
  return {
    type: 'CALC_PUSH',
    object,
  };
};

// TODO more actions

module.exports = {
  calcPush,
};
