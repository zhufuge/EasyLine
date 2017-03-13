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


var MatrixView = React.createClass({
  render() {
    return (
      <View style={styles.container}>
        <Header navigator={this.props.navigator}/>
        <View style={styles.main}>
          <Description />
          <Matrix />
          <Record />
        </View>
        <TabBar />
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    flex: 8.5,
    marginTop: 24,
    marginBottom: 24,
    marginLeft: 20,
    marginRight: 20,
    flexDirection: 'column',
  },
});

module.exports = MatrixView;
