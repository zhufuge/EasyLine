'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import { connect } from 'react-redux';
import { C_BASE, C_INVERT } from '../common/ELColors';
import MatrixGroup from './MatrixGroup';

const Screen = require('./Screen');
const Operators = require('./Operators');

class CalcMain extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Screen />
        <Operators />
        <View style={styles.calculate}>
          <TouchableOpacity
            style={styles.calculateTouchable}>
            <Text style={styles.calculateText}>计算</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.segment}></View>
        <MatrixGroup navigator={this.props.navigator}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  calculate: {
    height: 48,
    marginHorizontal: 90,
    backgroundColor: C_BASE,
    borderRadius: 24,
    padding: 1,
  },
  calculateTouchable: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
    backgroundColor: 'white',
  },
  calculateText: {
    fontSize: 19,
    fontWeight: '100',
    color: C_BASE,
  },
  segment: {
    height: 1,
    backgroundColor: C_BASE,
    top: -24,
    marginBottom: 16,
    zIndex: -1,
  },
});

module.exports = connect()(CalcMain);
