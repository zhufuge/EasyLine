'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
} = ReactNative;

const Header = require('../common/BackHeader');
const logo = require('./img/ELLOGO_144.png');
const rightIcon = require('./img/ic_chevron_right_white_18dp.png');

var About = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <Header navigator={this.props.navigator} title='关于' />
        <View style={styles.body}>
          <Image source={logo} />
          <Text style={styles.imgLabel}>EasyLine</Text>
          <Text style={styles.version}>V 0.2.0</Text>
          <TouchableOpacity
            onPress={() => this.props.navigator.push({intro: true})}
            activeOpacity={0.6}
            style={styles.item}>
            <Text style={styles.itemLabel}>应用介绍</Text>
            <Image style={styles.rightIcon}
                   source={rightIcon}/>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigator.push({aboutUs: true})}
            activeOpacity={0.6}
            style={styles.item}>
            <Text style={styles.itemLabel}>关于我们</Text>
            <Image style={styles.rightIcon}
                   source={rightIcon}/>
          </TouchableOpacity>
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
    backgroundColor: '#f8f8f8',
  },
  imgLabel: {
    top: -24,
    left: 2,
    fontSize: 28,
    color: 'black',
  },
  version: {
    fontSize: 14,
    top: -20,
  },
  item: {
    height: 54,
    width: '100%',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemLabel: {
    paddingHorizontal: 24,
    fontSize: 17,
    color: '#333',
  },
  rightIcon: {
    width: 36,
    height: 36,
    tintColor: '#aaa',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    height: 48,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

module.exports = About;
