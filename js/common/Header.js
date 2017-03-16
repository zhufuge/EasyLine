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

const
ic_logo = require('./img/ic_dashboard_white_18dp.png'),
ic_settings = require('./img/ic_settings_white_18dp.png'),
ic_about = require('./img/ic_bubble_chart_white_18dp.png'),
defaultData = {
  title: 'EasyLinear'
};

var Header = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <View style={styles.left}>
          <Image
            style={styles.logo}
            source={ic_logo} />
          <Text style={styles.title}>{defaultData.title}</Text>
        </View>
        <View style={styles.right}>
          <TouchableOpacity
            onPress={this.onPressSettiings}>
            <Image style={styles.image}
                   source={ic_settings}/>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.onPressAbout}>
            <Image style={styles.image}
                   source={ic_about}/>
          </TouchableOpacity>
        </View>
      </View>
    );
  },
  onPressSettiings: function() {
    this.props.navigator.push({settings: true});
  },
  onPressAbout: function() {
    this.props.navigator.push({about: true});
  }
});

var styles = StyleSheet.create({
  container: {
    height: 54,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 100,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#28b0bc',
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
  },
  title: {
    paddingTop: 5,
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
