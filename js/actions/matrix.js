const setMatrix = (row, col, mType) => {
  return {
    type: 'MATRIX',
    row,
    col,
    mType,
  };
};

const setMatrixFromList = (matrixObj) => {
  return {
    type: 'FROM_LIST',
    matrix: matrixObj.matrix,
    name: matrixObj.name,
    row: matrixObj.row,
    col: matrixObj.col,
    mType: matrixObj.mType,
  };
};

const setMatrixName = (name) => {
  return {
    type: 'MATRIX_NAME',
    name,
  };
};

const setMatrixType = (mType) => {
  return {
    type: 'MATRIX_TYPE',
    mType,
  };
};

const setMatrixRow = (row) => {
  return {
    type: 'MATRIX_ROW',
    row,
  };
};

const setMatrixCol = (col) => {
  return {
    type: 'MATRIX_COL',
    col,
  };
};

const setMatrixItem = (i, j, val) => {
  return {
    type: 'MATRIX_ITEM',
    i,
    j,
    val,
  };
};

const setMatrixTranspose = () => {
  return {
    type: 'MATRIX_TRANSPOSE'
  };
};

module.exports = {
  setMatrix,
  setMatrixFromList,
  setMatrixName,
  setMatrixType,
  setMatrixRow,
  setMatrixCol,
  setMatrixItem,
  setMatrixTranspose,
};
