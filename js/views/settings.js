'use strict';

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { connect } from 'react-redux';
const Header = require('../common/BackHeader');
import { C_BASE } from '../common/ELColors';

class Settings extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      nightMode: false,
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <Header navigator={this.props.navigator} title='设置'/>
        <ScrollView
          style={styles.body}>
          <TouchableOpacity
            onPress={() => this.setState({nightMode: !this.state.nightMode})}
            activeOpacity={1}
            style={styles.item}>
            <Text style={styles.itemLabel}>夜间模式</Text>
            <Switch
              onValueChange={() => this.setState({nightMode: !this.state.nightMode})}
              value={this.state.nightMode}
              />
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
};

const mapStateToProps = (state) => {
  return {};
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    paddingVertical: 18,
    backgroundColor: '#e6e6e6',
  },
  item: {
    height: 54,
    width: '100%',
    marginBottom: 6,
    backgroundColor: 'white',

    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemLabel: {
    fontSize: 16,
    color: '#333',
  },
});

module.exports = connect(mapStateToProps)(Settings);
