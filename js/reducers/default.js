'use strict';

const night = false,
      initialState = {night};

function defaultSet(state=initialState, action) {
  switch(action.type) {
  case 'DEFAULT_NIGHT':
    return {...state, night: !state.night};
  default:
    return state;
  }
}

module.exports = defaultSet;
