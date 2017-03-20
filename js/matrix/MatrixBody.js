'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  StyleSheet,
  View,
  TextInput,
  ToastAndroid,
} = ReactNative;

import { connect } from 'react-redux';
import { setDet, setCol, setRow } from '../actions';

const floor = Math.floor,
      random = Math.random;

var ItemInput = require('./MatrixItemInput');
var Alg = require('../common/Algebra');

class MatrixItems extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      col: props.col,
      row: props.row,
      matrix: Alg.create(props.col, props.row, props.type),
    };
  }

  componentWillReceiveProps(nextProps) {
    var col = nextProps.col,
        row = nextProps.row,
        matrix = this.state.matrix;

    if (this.props.col !== col ||
        this.props.row !== row) {
      matrix = Alg.copy(this.state.matrix);
      Alg.changeCol(matrix, (col - this.state.col));
      Alg.changeRow(matrix, (row - this.state.row));
    } else if (this.props.transpose !== nextProps.transpose) {
      matrix = Alg.transpose(matrix);
      col = [row, row = col][0];
      this.props.dispatch(setCol(col));
      this.props.dispatch(setRow(row));
    } else {
      let type = nextProps.type;
      switch(type) {
      case 2: type = 'E'; break;
      case 3: type = void 0; break;
      case 4: type = 0; break;
      default: break;
      }
      matrix = Alg.create(col, row, type);
    }

    this._returnDet(col, row, matrix);
    this.setState({
      col: col,
      row: row,
      matrix: matrix
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {this._createCol()}
      </View>
    );
  }
  _createCol() {
    return Alg.range(this.state.col).map(function(col){
      return (
        <View key={'col' + col}
              style={styles.col}>
          {this._createItem(col)}
        </View>);
    }.bind(this));
  }
  _createItem(col) {
    return Alg.range(this.state.row).map(function(row) {
      return (
        <ItemInput
          key={col + ',' + row}
          setNumber={(text) => this._setNumber(col, row, text)}
          value={this.state.matrix[col][row] + ''}
          style={(col + row) % 2 === 0 ? {} : styles.itemOpacity}
          />
      );
    }.bind(this));
  }
  _setNumber(col, row, num) {
    var matrix = Alg.copy(this.state.matrix);
    matrix[col][row] = +num;
    this.setState({matrix: matrix});
    this._returnDet(this.state.col, this.state.row, matrix);
  }
  _returnDet(col, row, matrix) {
    this.props.dispatch(setDet(
      col === row
        ? Alg.det(matrix)
        : 'NaN'
    ));
  }
}

const mapStateToProps = (state) => {
  return {
    type: state.mType,
    col: state.col,
    row: state.row,
    transpose: state.transpose
  };
};

var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 6,
  },
  col: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 2,
    height: 41,
  },
  itemOpacity: {
    backgroundColor: '#ffbd4099',
  }
});

module.exports = connect(mapStateToProps)(MatrixItems);
