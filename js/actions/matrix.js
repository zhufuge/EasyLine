export const setMatrix = (col, row, mType) => {
  return {
    type: 'MATRIX',
    col,
    row,
    mType,
  };
};

export const setMatrixName = (name) => {
  return {
    type: 'MATRIX_NAME',
    name,
  };
};

export const setMatrixType = (mType) => {
  return {
    type: 'MATRIX_TYPE',
    mType,
  };
};

export const setMatrixCol = (col) => {
  return {
    type: 'MATRIX_COL',
    col,
  };
};

export const setMatrixRow = (row) => {
  return {
    type: 'MATRIX_ROW',
    row,
  };
};

export const setMatrixItem = (i, j, val) => {
  return {
    type: 'MATRIX_ITEM',
    i,
    j,
    val,
  };
};

export const setMatrixTranspose = () => {
  return {
    type: 'MATRIX_TRANSPOSE'
  };
};