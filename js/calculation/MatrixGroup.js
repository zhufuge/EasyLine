'use strict';

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
} from 'react-native';

import { connect } from 'react-redux';
import { C_BASE } from '../common/ELColors';

class MatrixGroup extends Component {
  render() {
    return (
      <ScrollView
        style={styles.container}>
        {this.props.matrixList.map((matrix) => this._matrixItem(matrix))}
      </ScrollView>
    );
  }
  _matrixItem(matrix) {
    return (
      <View
        key={matrix.name}
        style={styles.matrixGroup}>
        <Text>{matrix.name}</Text>
      </View>);
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
  matrixGroup: {
    height: 68,
    right: -1,
    marginVertical: 9,
    marginHorizontal: 16,
    // marginLeft: 16,
    //    borderColor: '#28b0bc',
    borderRadius: 34,
    // borderTopLeftRadius: 34,
    // borderBottomLeftRadius: 34,
    //    borderWidth: 1,
    backgroundColor: C_BASE,
  }
});

module.exports = connect(mapStateToProps)(MatrixGroup);
