'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  View,
  StyleSheet,
} = ReactNative;

var Header = require('../common/BackHeader');

class Settings extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Header navigator={this.props.navigator} title='设置'/>
        <View style={styles.body}>
        </View>
      </View>
    );
  }
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 10.6,
  },
});

module.exports = Settings;
