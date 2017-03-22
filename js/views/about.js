'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  View,
  StyleSheet,
  Image,
  Text,
} = ReactNative;

var Header = require('../common/BackHeader');
const logo = require('./img/ELLOGO_144.png');

var About = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <Header navigator={this.props.navigator} title='关于' />
        <View style={styles.body}>
          <Image source={logo} />
          <Text style={styles.imgLabel}>EasyLine</Text>
          <Text>版本号：v0.1.0</Text>
          <Text>策划：江流南</Text>
          <Text>开发：zhufuge</Text>
          <Text>设计：6ml </Text>
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
    flex: 1,
    paddingVertical: 20,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  imgLabel: {
    top: -24,
    left: 2,
    fontSize: 28,
    color: 'black',
  },
});

module.exports = About;
