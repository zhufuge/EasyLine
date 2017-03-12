'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  StyleSheet,
  View,
} = ReactNative;

var Header = require('./common/Header');
var MatrixView = require('./MatrixView/main');
var TabBar = require('./common/TabBar.js');

var ELApp = React.createClass({
  render() {
    return (
      <View style={styles.container}>
        <Header />
        <MatrixView />
        <TabBar />
      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});


module.exports = ELApp;
