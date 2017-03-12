'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  StyleSheet,
  View,
} = ReactNative;

var Description = require('./description');
var Matrix = require('./matrix');
var Record = require('./record');

var MatrixView = React.createClass({
  render() {
    return (
      <View style={styles.container}>
        <Description />
        <Matrix />
        <Record />
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
});

module.exports = MatrixView;
