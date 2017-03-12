'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  StyleSheet,
  View,
} = ReactNative;


var Record = React.createClass({
  render() {
    return (
      <View style={styles.container}></View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#28b0bc',
    flex: 1,
  },
});

module.exports = Record;
