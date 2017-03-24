'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import { connect } from 'react-redux';
import { C_BASE } from '../common/ELColors';
import BackHeader from '../common/BackHeader';
const Main = require('./Main');

class CalcView extends Component {
  render() {
    return (
      <View style={styles.container}>
        <BackHeader
          navigator={this.props.navigator}
          style={styles.header}
          iconStyle={styles.headerIcon}
          textStyle={styles.headerText}
          title='计算'/>
        <Main />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: 'white',
  },
  headerIcon: {
    tintColor: C_BASE,
  },
  headerText: {
    color: C_BASE,
  }
});

module.exports = connect()(CalcView);
