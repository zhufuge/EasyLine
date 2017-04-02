const setMatrix = (col, row, mType) => {
  return {
    type: 'MATRIX',
    col,
    row,
    mType,
  };
};

const setMatrixFromList = (matrixObj) => {
  return {
    type: 'FROM_LIST',
    matrix: matrixObj.matrix,
    name: matrixObj.name,
    col: matrixObj.col,
    row: matrixObj.row,
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

const setMatrixCol = (col) => {
  return {
    type: 'MATRIX_COL',
    col,
  };
};

const setMatrixRow = (row) => {
  return {
    type: 'MATRIX_ROW',
    row,
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
  setMatrixCol,
  setMatrixRow,
  setMatrixItem,
  setMatrixTranspose,
}
