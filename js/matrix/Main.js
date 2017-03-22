'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  Dimensions,
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
      <ScrollView
        contentContainerStyle={styles.content}
        style={styles.container}>
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
    height: Dimensions.get('window').height - 90,
    paddingTop: 72,
    paddingHorizontal: 16,
  },
  content: {
    alignItems: 'center',
  }
});

module.exports = connect()(MatrixMain);
