'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  StyleSheet,
  Text,
  View,
} = ReactNative;
var ToolbarAndroid = require('ToolbarAndroid');

var Header = React.createClass({
  render() {
    return (
      <ToolbarAndroid
        logo={require('./ic_border_all_white_36dp.png')}
        title="EasyLinear"
        titleColor="white"
        style={styles.toolbar}
        actions={toolbarActions}/>
    );
  }
});


var toolbarActions = [{
  title: 'menu',
  icon: require('./ic_more_vert_white_36dp.png'),
  show: 'always',
  showWithText: false
}];

var styles = StyleSheet.create({
  toolbar: {
    backgroundColor: '#28b0bc',
    height: 54,
  },
});

module.exports = Header;
