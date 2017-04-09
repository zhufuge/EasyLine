'use strict';

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
} from 'react-native';

const Logo = require('./img/ELLOGO.png');

class Loading extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={Logo} />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 256,
    height: 256,
  }
});

module.exports = Loading;
