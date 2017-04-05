'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
} from 'react-native';

import ELNavigator from './ELNavigator';
import { C_APP } from './common/ELColors';

class ELApp extends Component{
  render() {
    return (
      <View style={styles.container}>
        <ELNavigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: C_APP,
  },
});

module.exports = connect()(ELApp);
