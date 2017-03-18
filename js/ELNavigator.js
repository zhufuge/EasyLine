'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  Navigator,
  BackAndroid,
  ToastAndroid,
} = ReactNative;


var MatrixPage = require('./matrix/container');
var Settings = require('./actions/settings');
var About = require('./actions/about');

class ELNavigator extends React.Component{
  componentWillMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
  }

  onBackAndroid() {
    const nav = this.navigator;
    if (nav && nav.getCurrentRoutes().length > 1) {
      nav.pop();
      return true;
    }
    // if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
    //   return false;
    // }
    // this.lastBackPressed = Date.now();
    // ToastAndroid.show('再按一次退出应用');
    // return true;
    return false;
  }

  render() {
    return (
      <Navigator
        initialRoute={{}}
        renderScene={this.renderScene}
        configureScene={(route) => {
            return Navigator.SceneConfigs.PushFromRight;
        }}/>
    );
  }

  renderScene(route, navigator) {
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
    return <MatrixPage navigator={navigator}/>;
  }
}

module.exports = ELNavigator;
