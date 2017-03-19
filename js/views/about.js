'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  View,
  StyleSheet,
} = ReactNative;

var Header = require('../common/BackHeader');

var About = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <Header navigator={this.props.navigator} title='关于' />
        <View style={styles.body}>
        </View>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 10.6,
  },
});

module.exports = About;
