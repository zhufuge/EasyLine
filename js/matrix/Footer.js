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
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false,
    };
  }

  render() {
    return (
      <TabBar
        show={this.props.showMenu}
        navigator={this.props.navigator}>
        <MenuItems
          hideMenu={() => this.hideMenu()}/>
      </TabBar>
    );
  }

  hideMenu() {
    this.setState({showMenu: false});
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
