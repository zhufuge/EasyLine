'use strict';

export const setDet = (det) => {
  return {
    type: 'DET',
    det: det
  };
};

export const setMType = (mType) => {
  return {
    type: 'M_TYPE',
    mType: mType
  };
};

export const setCol = (col) => {
  return {
    type: 'COL',
    col: col
  };
};

export const setRow = (row) => {
  return {
    type: 'ROW',
    row: row
  };
};

export const setTranspose = (transpose) => {
  return {
    type: 'TRANSPOSE',
    transpose: transpose
  };
};

export const setShowMenu = (showMenu) => {
  return {
    type: 'SHOW_MENU',
    showMenu: showMenu
  };
};

export const setRank = (rank) => {
  return {
    type: 'RANK',
    rank: rank
  };
};
