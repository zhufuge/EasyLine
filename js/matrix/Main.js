'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView
} from 'react-native';

import { connect } from 'react-redux';

var Description = require('./Description');
var MatrixPanel = require('./MatrixPanel');
var Record = require('./Record');

class MatrixMain extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <ScrollView style={styles.container}>
        <Description />
        <MatrixPanel />
        <Record />
      </ScrollView>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginTop: 78,
    marginLeft: 20,
    marginRight: 20,
  },
});

module.exports = connect()(MatrixMain);
