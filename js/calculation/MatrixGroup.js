'use strict';

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
} from 'react-native';

import { connect } from 'react-redux';
import { C_BASE, C_INVERT } from '../common/ELColors';

class MatrixContainer extends Component {
  render() {
  }
}

class MatrixGroup extends Component {
  render() {
    return (
      <ScrollView
        style={styles.container}>
        {this.props.matrixList.map((matrix, i) => this._matrixItem(matrix, i))}
      </ScrollView>
    );
  }
  _matrixItem(matrix, i) {
    const position = (pos) => (i % 2 === 0)
          ? {right: pos}
          : {left: pos};
    const color = (opa) => {
      let color,
          type = i % 3;
      if (type === 0) {
        color = '#fe666a' + opa;
      } else if (type === 1) {
        color = '#ffcf66' + opa;
      } else {
        color = C_BASE + opa;
      }
      return {backgroundColor: color};
    };
    return (
      <View
        key={i + matrix.name}
        style={[styles.matrix]}>
        <View style={[styles.self, position(0), color('dd')]}></View>
        <View style={[styles.opt1, position(86), color('aa')]}/>
        <View style={[styles.opt2, position(158), color('66')]}/>
        <View style={[styles.opt3, position(230), color('22')]}/>
      </View>
    );
  }
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
    backgroundColor: C_BASE,
  },
  opt1: {
    position: 'absolute',
    width: 72,
    height: 72,
    backgroundColor: C_BASE + 'cc',
  },
  opt2: {
    position: 'absolute',
    width: 72,
    height: 72,
    backgroundColor: C_BASE + '88',
  },
  opt3: {
    position: 'absolute',
    width: 72,
    height: 72,
    backgroundColor: C_BASE + '44',
  }
});

module.exports = connect(mapStateToProps)(MatrixGroup);
