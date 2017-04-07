'use strict';

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';

import { connect } from 'react-redux';
import { C_BASE, C_INVERT } from '../common/ELColors';

const MatrixStorey = require('./MatrixStorey');

class MatrixGroup extends Component {
  render() {
    return (
      <ScrollView
        style={styles.container}>
        {this.props.matrixList.map((matrix, i) => this._matrixItem(matrix, i))}
      </ScrollView>
    );
  }
  _matrixItem = (matrix, i) =>
    (<MatrixStorey
     key={'storey' + i}
     navigator={this.props.navigator}
     i={i}/>);
}

const mapStateToProps = (state) => {
  return {
    matrixList: state.matrixList
  };
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  matrix: {
    height: 72,
    marginHorizontal: 24,
    flexDirection: 'row',
  },
  self: {
    position: 'absolute',
    width: 86,
    height: 72,
  },
  opt: {
    position: 'absolute',
    width: 72,
    height: 72,
  },
});

module.exports = connect(mapStateToProps)(MatrixGroup);
