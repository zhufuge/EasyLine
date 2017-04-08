'use strict';

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  BackAndroid,
} from 'react-native';

import { connect } from 'react-redux';
import { setMatrixFromList } from '../../actions';
import { C_BASE } from '../../common/ELColors';

const logo = require('./img/ELLOGO_144.png');
const quit = require('./img/ic_power_settings_new_white_18dp.png');

const InnerList = require('./InnerList');

class Drawer extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={logo} />
        </View>
        <InnerList drawer={this.props.drawer}/>
        <View style={styles.quitContainer}>
          <TouchableOpacity
            onPress={() => BackAndroid.exitApp()}
            style={styles.quitTouchable}>
          <Image source={quit}
                 style={styles.quit}/>
          <Text style={styles.quitText}>退出应用</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    paddingTop: 10,
    alignItems: 'center',
  },
  quitContainer: {
    position: 'absolute',
    bottom: 0,
    height: 64,
    width: '100%',
  },
  quitTouchable: {
    flex: 1,
    marginVertical: 10,
    marginHorizontal: 16,
    backgroundColor: C_BASE,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quit: {
    width: 28,
    height: 28,
  },
  quitText: {
    marginLeft: 10,
    fontSize: 16,
    color: 'white',
  }
});

module.exports = connect()(Drawer);
