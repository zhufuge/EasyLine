'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  StyleSheet,
  View,
  ScrollView,
} = ReactNative;

var Description = require('./description');
var Matrix = require('./matrix');
var Record = require('./record');
var Header = require('../common/Header');
var TabBar = require('../common/TabBar');
var SlideUpMenu = require('../common/SlideUpMenu');
var MenuItems = require('./menuItems');


class MatrixView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenuCreate: false,
      col: 6,
      row: 6,
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <Header navigator={this.props.navigator}/>
        <ScrollView style={styles.main}>
          <Description
            setCol={this.setCol(this)}
            setRow={this.setRow(this)}/>
          <Matrix
            col={this.state.col}
            row={this.state.row}/>
          <Record />
        </ScrollView>
        <View>
          <SlideUpMenu
            show={this.state.showMenuCreate}>
            <MenuItems />
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
  setCol(that) {
    return function(col) {
      that.setState({col: col});
    };
  }
  setRow(that) {
    return function(row) {
      that.setState({row: row});
    };
  }
};


var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    flexDirection: 'column',
    marginTop: 24,
    marginBottom: 24,
    marginLeft: 20,
    marginRight: 20,
  },
});

module.exports = MatrixView;
