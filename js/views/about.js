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
          <Text>版本号：0.2.0</Text>
          <Text>策划：江流南</Text>
          <Text>开发：zhufuge</Text>
          <Text>设计：6ml </Text>
        </View>
        <View style={styles.footer}>
          <Text>Copyright © 2017 zhufuge</Text>
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
  footer: {
    position: 'absolute',
    bottom: 0,
    height: 54,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

module.exports = About;
