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
    this.state = {
      type: 0,
    };
    this.setType = this.setType.bind(this);
  }
  setType(type) {this.setState({type: type});}
  render() {
    return (
      <View
        style={styles.container}>
        <Header navigator={this.props.navigator}/>
        <Main type={this.state.type}/>
        <Footer setType={(type) => this.setType(type)}
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
