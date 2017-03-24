'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import { connect } from 'react-redux';
import { C_BASE } from '../common/ELColors';
import MatrixGroup from './MatrixGroup';

class CalcMain extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.screen}></View>
        <View style={styles.operator}></View>
        <View style={styles.calculate}></View>
        <MatrixGroup />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  screen: {
    height: 54,
    backgroundColor: C_BASE,
  },
  operator: {
    height: 54,
    marginHorizontal: 12,
    marginVertical: 12,
    backgroundColor: C_BASE,
  },
  calculate: {
    height: 48,
    marginBottom: 16,
    marginHorizontal: 30,
    backgroundColor: 'white' || C_BASE,

    borderRadius: 24,
    borderColor: C_BASE,
    borderWidth: 1,
  },
});

module.exports = connect()(CalcMain);
