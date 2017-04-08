'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import { connect } from 'react-redux';
import { calcPopAll, setMatrixFromList } from '../actions';
import { C_BASE, C_INVERT } from '../common/ELColors';
const Algm = require('../common/Algebra');

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
            onPress={() => this.onPressCalc()}
            activeOpacity={0.5}
            disabled={this.touchDisabled()}
            style={styles.calculateTouchable}>
            <Text style={styles.calculateText}>计算</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.segment}></View>
        <MatrixGroup navigator={this.props.navigator}/>
      </View>
    );
  }
  touchDisabled() {
    if (this.props.calcStack !== void 0 &&
        this.props.calcStack.length === 3) {
      return false;
    } else {
      return true;
    }
  }
  onPressCalc() {
    const stack = this.props.calcStack;
    if (stack.length === 3) {
      let first = stack[0].matrix,
          second = stack[2].matrix,
          operator = stack[1],
          number = stack[2];
      switch(operator) {
      case '+': {
        this.setMatrixAndPop(Algm.addUp(first, second));
        break;
      }
      case '-': {
        this.setMatrixAndPop(Algm.subUp(first, second));
        break;
      }
      case '·': {
        this.setMatrixAndPop(Algm.mulUp(first, second));
        break;
      }
      case '/': {
        this.setMatrixAndPop(Algm.divUp(first, second));
        break;
      }
      case '×': {
        this.setMatrixAndPop(Algm.mulN(first, number));
        break;
      }
      case '÷': {
        this.setMatrixAndPop(Algm.divN(first, number));
        break;
      }
      default:
        break;
      }
    }
  }
  setMatrixAndPop(A) {
    let matrixObj = {
      matrix: A,
      name: 'Z',
      row: Algm.rows(A),
      col: Algm.cols(A),
      mType: 0,
    };
    this.props.dispatch(setMatrixFromList(matrixObj));
    this.props.dispatch(calcPopAll());
    this.props.navigator.pop();
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

const mapStateToProps = (state) => {
  return {
    calcStack: state.calcStack
  };
};

module.exports = connect(mapStateToProps)(CalcMain);
