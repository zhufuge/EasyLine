'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  Navigator,
} = ReactNative;


var MatrixView = require('./MatrixView/main');
var Settings = require('./actions/settings');
var About = require('./actions/about');

var ELNavigator = React.createClass({
  render: function() {
    return (
      <Navigator
        initialRoute={{}}
        renderScene={this.renderScene}
        configureScene={(route) => {
            return Navigator.SceneConfigs.PushFromRight;
        }}/>
    );
  },
  renderScene: function(route, navigator) {
    //    return <Settings navigator={navigator}/>;
    if (route.calculate) {
      return <Settings navigator={navigator}/>;
    }
    if (route.settings) {
      return <Settings navigator={navigator}/>;
    }
    if (route.about) {
      return <About navigator={navigator}/>;
    }
    return <MatrixView navigator={navigator}/>;
  }
});

module.exports = ELNavigator;
