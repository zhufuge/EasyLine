'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  StyleSheet,
  View,
  ScrollView,
} = ReactNative;

import { connect } from 'react-redux';

var Header = require('../common/Header');
var Main = require('./Main');
var Footer = require('./Footer');

class MatrixView extends React.Component {
  constructor(props) {
    super(props);
  }
  setType(type) {this.setState({type: type});}
  render() {
    return (
      <View
        style={styles.container}>
        <Header navigator={this.props.navigator}/>
        <Main />
        <Footer
          navigator={this.props.navigator}/>
      </View>
    );
  }

};


var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

module.exports = connect()(MatrixView);
