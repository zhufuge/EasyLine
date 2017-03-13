'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  StyleSheet,
  View,
} = ReactNative;


var ELNavigator = require('./ELNavigator');

var ELApp = React.createClass({
  render() {
    return (
      <View style={styles.container}>
        <ELNavigator />
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
