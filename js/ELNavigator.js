'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  Navigator,
} = ReactNative;


var MatrixView = require('./MatrixView/main');
var Settings = require('./actions/settings');

var ELNavigator = React.createClass({
  render: function() {
    return (
      <Navigator
        initialRoute={{}}
        renderScene={this.renderScene}
        configureScene={(route) => {
            return Navigator.SceneConfigs.FloatFromBottomAndroid;
        }}/>
    );
  },
  renderScene: function(route, navigator) {
    if (route.settings) {
      return <Settings />;
    }
    return <MatrixView navigator={navigator}/>;
  }
});

module.exports = ELNavigator;
