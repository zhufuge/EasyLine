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
      showMenu: false,
      col: 6,
      row: 6,
      type: 0,
    };

    this.showMenu = this.showMenu.bind(this);
    this.hideMenu = this.hideMenu.bind(this);
    this.setCol = this.setCol.bind(this);
    this.setRow = this.setRow.bind(this);
    this.setType = this.setType.bind(this);
  }
  render() {
    return (
      <View style={styles.container}>
        <Header navigator={this.props.navigator}/>
        <ScrollView style={styles.main}>
          <Description
            setCol={(col) => this.setCol(col)}
            setRow={(row) => this.setRow(row)}/>
          <Matrix
            type={this.state.type}
            col={this.state.col}
            row={this.state.row}/>
          <Record />
        </ScrollView>
        <View>
          <SlideUpMenu
            show={this.state.showMenu}>
            <MenuItems
              />
          </SlideUpMenu>
        </View>
        <TabBar
          showMenu={() => this.showMenu()}
          hideMenu={() => this.hideMenu()}
                navigator={this.props.navigator}/>
      </View>
    );
  }
  showMenu() {
    this.setState({showMenu: true});
  }
  hideMenu() {
    this.setState({showMenu: false});
  }
  setCol(col) {
    this.setState({col: col});
  }
  setRow(row) {
    this.setState({row: row});
  }
  setType(type) {
    this.setState({type: type});
    this.hideMenu();
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
