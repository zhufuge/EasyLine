'use strict';

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';

import { connect } from 'react-redux';
import { C_BASE, C_INVERT } from '../common/ELColors';

import { setMatrixFromList } from '../actions';

const Algm = require('../common/Algebra');
const rowEcheIcon = require('./img/ic_row_echelon_white_18dp.png');

const C_INVERT_2 = '#ffcc44';
const defaultData = {
  colors: ['ff', 'cc', '88', '44'],
  t: ['', '\'', '*', '^'],
  b: ['', '逆矩阵', '伴随矩阵', '行阶梯'],
};

class MatrixStorey extends Component {
  _color(i, j) {
    return ((i % 2 === 0) ? C_INVERT_2 : C_BASE) + defaultData.colors[j]
  }
  _style(j) {
    let width = 72,
        left = width * j + 10,
        right = left;
    if (j === 0) {
      width = 82;
      left = right = 0;
    }

    const i = this.props.i;
    if (i % 2 === 0) {
      return {
        width,
        left,
        backgroundColor: this._color(i, j),
      };
    } else {
      return {
        width,
        right,
        backgroundColor: this._color(i, j),
      };
    }
  }
  _renderTouchable(child, i, onPress, disabled=false) {
    return (
      <TouchableOpacity
        delayPressIn={60}
        onPress={onPress}
        disabled={disabled}
        style={[styles.opt, this._style(i)]}>
        {child}
      </TouchableOpacity>
    );
  }
  _renderFirst() {
    const matrixObj = this.props.matrix;
    const body = [(
      <Text key={'tf'} style={styles.itemT}>
        {matrixObj.name}
      </Text>
    ), (
      <Text key={'bf'} style={styles.itemB}>
        {`(${matrixObj.row}, ${matrixObj.col})`}
      </Text>
    )];
    return this._renderTouchable(body, 0);
  }
  _renderInv() {
    const matrixObj = this.props.matrix,
          isSingular = Algm.isSingular(matrixObj.matrix),
          name = matrixObj.name,
          i = 1,
          color = isSingular ? {color: '#999'} : {};
    const body = [(
      <Text key={'t' + i} style={[styles.itemT, color]}>
        {name}
      </Text>
    ), (
      <Text
        key={'-' + i}
        style={[styles.inv, color]}>-1</Text>
    ),(
      <Text key={'b' + i} style={[styles.itemB, color]}>
        {defaultData.b[i]}
      </Text>
    )];
    const onPress = () => {
      var m = {
        ...matrixObj,
        matrix: Algm.inv(matrixObj.matrix),
        name: 'Z',
      };
      this.props.dispatch(setMatrixFromList(m));
      this.props.navigator.pop();
    };
    return this._renderTouchable(body, i, onPress, isSingular);
  }
  _renderCompan() {
    const matrixObj = this.props.matrix,
          name = matrixObj.name,
          isSquare = Algm.isSquare(matrixObj.matrix),
          i = 2,
          color = isSquare ? {} : {color: '#999'};
    const body = [(
      <Text
        key={'t' + i}
        style={[styles.itemT, color]}>
        {name + defaultData.t[i]}
      </Text>
    ), (
      <Text
        key={'b' + i}
        style={[styles.itemB, color]}>
        {defaultData.b[i]}
      </Text>
    )];
    const onPress = () => {
      var m = {
        ...matrixObj,
        matrix: Algm.compan(matrixObj.matrix),
        name: 'Z',
      };
      this.props.dispatch(setMatrixFromList(m));
      this.props.navigator.pop();
    };
    return this._renderTouchable(body, i, onPress, !isSquare);
  }
  _renderRowEch() {
    const matrixObj = this.props.matrix,
          name = this.props.matrix.name,
          i = 3,
          color = this._color(this.props.i, 0);
    const body = [(
      <Image
        key={'t' + i}
        style={[styles.icon, {tintColor: color}]}
        source={rowEcheIcon}/>
    ), (
      <Text
        key={'b' + i}
        style={[styles.itemB, {color}]}>
        {defaultData.b[i]}
      </Text>
    )];
    const onPress = () => {
      var m = {
        ...matrixObj,
        matrix: Algm.rowEchelon(matrixObj.matrix),
        name: 'Z',
      };
      this.props.dispatch(setMatrixFromList(m));
      this.props.navigator.pop();
    };
    return this._renderTouchable(body, i, onPress);
  }
  render() {
    const matrix = this.props.matrix;
    return (
      <View
        style={styles.container}>
        {this._renderFirst()}
        {this._renderInv()}
        {this._renderCompan()}
        {this._renderRowEch()}
      </View>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    matrix: state.matrixList[ownProps.i]
  };
};

var styles = StyleSheet.create({
  container: {
    height: 72,
    marginHorizontal: 24,
    flexDirection: 'row',
  },
  opt: {
    position: 'absolute',
    height: 72,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemT: {
    height: 44,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 32,
  },
  itemB: {
    height: 24,
    color: 'white',
    fontSize: 12,
  },
  icon: {
    height: 30,
    width: 36,
    margin: 6,
  },
  inv: {
    color: 'white',
    position: 'absolute',
    top: 8,
    right: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

module.exports = connect(mapStateToProps)(MatrixStorey);
