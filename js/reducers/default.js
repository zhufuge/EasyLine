'use strict';

const col = 3, row = 3, storage = 6, night = false,
      initialState = {col, row, storage, night};

function defaultSet(state = initialState, action) {
  switch(action.type) {
  case 'DEFAULT_COL':
    return {...state, col: action.col};
  case 'DEFAULT_ROW':
    return {...state, row: action.row};
  case 'DEFAULT_STORAGE':
    return {...state, storage: action.storage};
  case 'DEFAULT_NIGHT':
    return {...state, night: !state.night};
  default:
    return state;
  }
}

module.exports = defaultSet;
