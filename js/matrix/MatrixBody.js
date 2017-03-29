'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  StyleSheet,
  View,
  TextInput,
} = ReactNative;

import { connect } from 'react-redux';
import { C_INVERT } from '../common/ELColors';

const ItemInput = require('./MatrixItemInput');
const Algm = require('../common/Algebra');

class MatrixItems extends React.Component{
  render() {
    return (
      <View style={styles.container}>
        {this._createCol()}
      </View>
    );
  }
  _createCol() {
    return Algm.range(this.props.col).map(function(col){
      return (
        <View key={'col' + col}
              style={styles.col}>
          {this._createItem(col)}
        </View>);
    }.bind(this));
  }
  _createItem(col) {
    return Algm.range(this.props.row).map(function(row) {
      return (
        <ItemInput
          key={col + ',' + row}
          col={col}
          row={row}
          style={(col + row) % 2 === 0 ? {} : styles.itemOpacity}
          />
      );
    }.bind(this));
  }
}

const mapStateToProps = (state) => {
  return {
    col: state.matrix.col,
    row: state.matrix.row,
  };
};

var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    width: 277.5,
    height: 277.5,
    marginRight: 5.5,
  },
  col: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 1.5,
    height: 45,
  },
  itemOpacity: {
    backgroundColor: C_INVERT + '99' || '#ffbd4099',
  }
});

module.exports = connect(mapStateToProps)(MatrixItems);
