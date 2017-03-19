'use strict';

import React from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
} from 'react-native';

import ELNavigator from './ELNavigator';

class ELApp extends React.Component{
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
  },
});


module.exports = connect()(ELApp);
