'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  StyleSheet,
  View,
} = ReactNative;

var Header = require('./Header');
var MatrixView = require('./MatrixView/main');

var ELApp = React.createClass({
  render() {
    return (
      <View style={styles.container}>
        <Header />
        <MatrixView />
        <View style={footer.container}></View>
      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const footer = StyleSheet.create({
  container: {
    flex: 1.3,
    backgroundColor: '#28b0bc',
  },
});

module.exports = ELApp;
