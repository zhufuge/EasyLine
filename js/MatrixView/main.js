'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  StyleSheet,
  View,
} = ReactNative;

var Description = require('./description.js');

var MatrixView = React.createClass({
  render() {
    return (
      <View style={styles.container}>
        <Description />
        <View style={styles.matrix}></View>
        <View style={styles.record}></View>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 9,
    marginTop: 12,
    marginBottom: 12,
    marginLeft: 20,
    marginRight: 20,
    flexDirection: 'column',
  },
  matrix: {
    marginBottom: 12,
    backgroundColor: 'skyblue',
    flex: 6,
  },
  record: {
    backgroundColor: 'steelblue',
    flex: 1,
  },
});

module.exports = MatrixView;
