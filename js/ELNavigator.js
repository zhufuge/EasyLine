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
import AboutUs from './views/aboutUs';
import Intro from './views/intro';

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
        renderScene={(r, n) => this.renderScene(r, n)}
        configureScene={(route) => {
            return Navigator.SceneConfigs.PushFromRight;
        }}/>
    );
  }

  renderScene(route, navigator) {
    if (route.intro || this.props.intro) {
      return <Intro navigator={navigator}/>;
    }
    if (route.settings) {
      return <Settings navigator={navigator}/>;
    }
    if (route.about) {
      return <About navigator={navigator}/>;
    }
    if (route.aboutUs) {
      return <AboutUs navigator={navigator}/>;
    }
    if (route.calc) {
      return <CalcView navigator={navigator}/>;
    }
    return <MatrixView navigator={navigator}/>;
  }
}

const mapStateToProps = (state) => {
  return {
    intro: state.intro
  };
};



module.exports = connect(mapStateToProps)(ELNavigator);
