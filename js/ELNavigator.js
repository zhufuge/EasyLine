'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  Navigator,
  BackAndroid,
  ToastAndroid,
} = ReactNative;
import { connect } from 'react-redux';

import MatrixView from './matrix';
import CalcView from './calculation';
import Settings from './views/settings';
import About from './views/about';

class ELNavigator extends React.Component{
  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton = () => {
    const { navigator } = this.refs;
    if (navigator && navigator.getCurrentRoutes().length > 1) {
      navigator.pop();
      return true;
    }
    if (this.lastBackPressed && this.lastBackPressed + 3000 >= Date.now()) {
      return false;
    }
    this.lastBackPressed = Date.now();
    ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
    return true;
  }

  render() {
    return (
      <Navigator
        ref="navigator"
        initialRoute={{}}
        renderScene={this.renderScene}
        configureScene={(route) => {
            return Navigator.SceneConfigs.PushFromRight;
        }}/>
    );
  }

  renderScene(route, navigator) {
    return <CalcView navigator={navigator}/>;
    if (route.settings) {
      return <Settings navigator={navigator}/>;
    }
    if (route.about) {
      return <About navigator={navigator}/>;
    }
    if (route.calc) {
      return <CalcView navigator={navigator}/>;
    }
    return <MatrixView navigator={navigator}/>;
  }
}

module.exports = connect()(ELNavigator);
