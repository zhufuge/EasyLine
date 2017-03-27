'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';

import { connect } from 'react-redux';
import { C_BASE } from '../common/ELColors';

const defaultData = [
  [ '+', '加法'],
  [ '-', '减法'],
  [ '·', '乘法'],
  [ '/', '除法'],
  [ '×', '乘数'],
  [ '÷', '除数']
];

class Operators extends Component {
  render() {
    return (
      <View style={styles.container}>
        {this._operators()}
      </View>
    );
  }
  _operators() {
    return defaultData.map(function(val, index) {
      return (
        <TouchableOpacity
          key={val[0]}
          style={[
            styles.operator,
            defaultData.length - 1 === index ? styles.operatorLast : {},
            index % 2 === 1 ? styles.operatorOpacity : {}
          ]}>
          <Text style={styles.operatorIcon}>{val[0]}</Text>
          <Text style={styles.operatorText}>{val[1]}</Text>
        </TouchableOpacity>);
    }.bind(this));
  }
}

const styles = StyleSheet.create({
  container: {
    height: 68,
    marginHorizontal: 10,
    marginVertical: 12,
    //    backgroundColor: C_BASE,
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 1,
  },
  operator: {
    flex: 1,
    backgroundColor: C_BASE,
    // backgroundColor: 'white',
    marginRight: 1,
    flexDirection: 'column',
  },
  operatorLast: {
    marginRight: 0,
  },
  operatorOpacity: {
    backgroundColor: C_BASE + '99',
  },
  operatorIcon: {
    textAlign: 'center',
    textAlignVertical: 'center',
    flex: 2,
    fontSize: 26,
    // color: C_BASE,
    color: 'white',
  },
  operatorText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    flex: 1,
    // color: C_BASE,
    color: 'white',
  }
});

module.exports = connect()(Operators);
