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
        {this._renderRow()}
      </View>
    );
  }
  _renderRow() {
    return Algm.range(this.props.row).map(function(row){
      return (
        <View key={'row' + row}
              style={styles.row}>
          {this._createItem(row)}
        </View>);
    }.bind(this));
  }
  _createItem(row) {
    return Algm.range(this.props.col).map(function(col) {
      return (
        <ItemInput
          key={row + ',' + col}
          row={row}
          col={col}
          style={(row + col) % 2 === 0 ? {} : styles.itemOpacity}
          />
      );
    }.bind(this));
  }
}

const mapStateToProps = (state) => {
  return {
    row: state.matrix.row,
    col: state.matrix.col,
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
  row: {
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
