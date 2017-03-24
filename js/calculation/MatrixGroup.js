'use strict';

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

import { connect } from 'react-redux';

class MatrixGroup extends Component {
  render() {
    return (
      <View style={styles.container}>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'skyblue',
  },
});

module.exports = connect()(MatrixGroup);
