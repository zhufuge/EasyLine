'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Modal,
  View,
} from 'react-native';
import { connect } from 'react-redux';

var TabBar = require('../common/TabBar');
var MenuItems = require('./MenuItems');

class Footer extends Component {
  render() {
    return (
      <TabBar>
        <MenuItems/>
      </TabBar>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  }
});

module.exports = connect()(Footer);
