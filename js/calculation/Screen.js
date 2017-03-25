'use strict';

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

import { connect } from 'react-redux';
import { C_BASE } from '../common/ELColors';

const backspace = require('./img/ic_backspace_white_18dp.png');

class Screen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.backspaceContainer}>
          <Image
            source={backspace}
            style={styles.backspace}/>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 54,
    flexDirection: 'row',
    justifyContent: 'center',

    backgroundColor: C_BASE + '88',
    // borderTopWidth: 1,
    // borderBottomWidth: 1,
    // borderColor: C_BASE,
  },
  backspaceContainer: {
    width: 62,
    height: 54,
    position: 'absolute',
    right: 0,
    borderLeftWidth: 1,
    borderColor: C_BASE,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: C_BASE,
  },
  backspace: {
    height: 42,
    width: 42,
  },
});

module.exports = connect()(Screen);
