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
import { setDet } from '../actions';

const floor = Math.floor,
      random = Math.random;

var ItemInput = require('./MatrixItemInput');
var Alg = require('../common/Algebra');

class MatrixItems extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      col: +props.col,
      row: +props.row,
      type: props.type,
      matrix: Alg.create((+props.col || 6), (+props.row || 6), props.type),
    };
  }

  componentWillReceiveProps(nextProps) {
    const col = nextProps.col,
          row = nextProps.row,
          type = nextProps.type;
    var matrix = this.state.matrix;
    if (this.state.type !== type) {
      let t = type;
      switch(type) {
      case 2: t = 'E'; break;
      case 3: t = void 0; break;
      case 4: break;
      default: break;
      }
      matrix = Alg.create(col, row, t);
    }

    if (this.props.col !== col ||
        this.props.row !== row) {
      matrix = Alg.copy(this.state.matrix);
      Alg.changeCol(matrix, (col - this.state.col));
      Alg.changeRow(matrix, (row - this.state.row));
    }

    this.props.dispatch(setDet(
      this.state.col === this.state.row
        ? Alg.calculateDet(matrix)
        : 'NaN'
    ));

    this.setState({
      col: col,
      row: row,
      type: type,
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
    if (this.state.type !== -1) {
      this.setState({
        matrix: matrix,
        type: -1
      });
    } else {
      this.setState({matrix: matrix});
    }

    this.props.dispatch(setDet(
      this.state.col === this.state.row
        ? Alg.calculateDet(matrix)
        : 'NaN'
    ));
  }
}

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

module.exports = connect()(MatrixItems);
