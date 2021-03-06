'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} = ReactNative;

const ic_logo = require('./img/ELLOGO_72.png'),
      ic_settings = require('./img/ic_settings_white_18dp.png'),
      ic_about = require('./img/ic_bubble_chart_white_18dp.png'),
      { C_BASE } = require('../common/ELColors'),
      defaultData = {
        title: '简线'
      };

var Header = React.createClass({
  render: function() {
    return (
      <View style={[styles.container]}>
        <View style={styles.left}>
          <Image
            style={styles.logo}
            source={ic_logo} />
          <Text style={styles.title}>{defaultData.title}</Text>
        </View>
        <View style={styles.right}>
          <TouchableOpacity
            onPress={this.onPressAbout}>
            <Image style={styles.image}
                   source={ic_about}/>
          </TouchableOpacity>
        </View>
      </View>
    );
  },
  Settings: function() {
    return (
      <TouchableOpacity
        onPress={this.onPressSettings}>
        <Image style={styles.image}
               source={ic_settings}/>
      </TouchableOpacity>
    );
  },
  onPressSettings: function() {
    this.props.navigator.push({settings: true});
  },
  onPressAbout: function() {
    this.props.navigator.push({about: true});
  }
});

var styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    height: 54,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 100,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: C_BASE || '#28b0bc',
  },
  left: {
    flexDirection: 'row',
  },
  right: {
    flexDirection: 'row',
  },
  logo: {
    width: 48,
    height: 48,
    marginTop: 2,
    tintColor: 'white',
  },
  title: {
    paddingTop: 0,
    color: 'white',
    textAlignVertical: 'center',
    fontSize: 20,
  },
  image: {
    width: 32,
    height: 32,
    marginTop: 12,
    marginLeft: 14,
  },
});

module.exports = Header;
