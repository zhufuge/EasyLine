'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  StyleSheet,
  View,
} = ReactNative;


var ELNavigator = require('./ELNavigator');

class ELApp extends React.Component{
  render() {
    return (
      <View style={styles.container}>
        <ELNavigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});


module.exports = ELApp;
