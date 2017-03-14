'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  StyleSheet,
  View,
} = ReactNative;

var Description = require('./description');
var Matrix = require('./matrix');
var Record = require('./record');
var Header = require('../common/Header');
var TabBar = require('../common/TabBar');
var SlideUpMenu = require('../common/SlideUpMenu');


class MatrixView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenuCreate: false,
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <Header navigator={this.props.navigator}/>
        <View style={styles.main}>
          <Description />
          <Matrix />
          <Record />
        </View>
        <View>
          <SlideUpMenu
            show={this.state.showMenuCreate}>
          </SlideUpMenu>
        </View>
        <TabBar showMenuCreate={this.toggleMenu(this)}
                navigator={this.props.navigator}/>
      </View>
    );
  }
  toggleMenu(that) {
    return that.showMenu(
      that,
      {showMenuCreate: !that.state.showMenuCreate}
    );
  }
  showMenu(that, show) {
    return function() {
      that.setState(show);
    };
  }
};


var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 24,
    marginBottom: 24,
    marginLeft: 20,
    marginRight: 20,
  },
});

module.exports = MatrixView;
