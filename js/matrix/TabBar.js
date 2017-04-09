'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';

import { connect } from 'react-redux';
import { setShowMenu, addMatrix } from '../actions';

var SlideUpMenu = require('../common/SlideUpMenu');
var MenuItems = require('./MenuItems');

const calcIcon = require('./img/ic_mode_edit_white_18dp.png'),
      createIcon = require('./img/ic_extension_white_18dp.png'),
      saveIcon = require('./img/ic_add_box_white_18dp.png'),
      backIcon = require('./img/ic_expand_more_white_18dp.png'),
      { C_BASE } = require('../common/ELColors');

var defaultData = [
  ['保存', saveIcon, 'onPressSave'],
  ['创建', createIcon, 'onPressCreate'],
  ['计算', calcIcon, 'onPressCalculate'],
];

class TabBar extends Component{
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <View>
          <SlideUpMenu
            show={this.state.showMenu}>
            <MenuItems onPress={() => this.setState({showMenu: false})}/>
          </SlideUpMenu>
        </View>
        <View style={styles.tabBar}>
          {this.state.showMenu
            ? this._renderHideMenu()
          : this._renderRow()}
        </View>
      </View>
    );
  }

  _createTouchableItem(rowData) {
    return (
      <TouchableOpacity
        key={rowData[0]}
        delayPressIn={60}
        onPress={() => this[rowData[2]]()}
        style={styles.item}>
        <Image
          style={styles.image}
          source={rowData[1]} />
        <Text style={styles.text}>{rowData[0]}</Text>
      </TouchableOpacity>
    );
  }
  _renderRow() {
    return defaultData.map(function(rowData) {
      return this._createTouchableItem(rowData);
    }.bind(this));
  }
  _renderHideMenu() {
    return this._createTouchableItem(['', backIcon, 'onPressBack']);
  }
  onPressCreate() {this.setState({showMenu: true});}
  onPressBack() {this.setState({showMenu: false});}
  onPressCalculate() {this.props.navigator.push({calc: true});}
  onPressSave() {
    this.props.dispatch(addMatrix(this.props.matrix));
    ToastAndroid.show('保存矩阵 ' + this.props.matrix.name,
                      ToastAndroid.SHORT);
  }
}

const mapStateToProps = (state) => {
  return {
    matrix: state.matrix,
  };
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
  },
  tabBar: {
    height: 65,
    flexDirection: 'row',
    justifyContent: 'space-around',
    zIndex: 100,
    backgroundColor: C_BASE || '#28b0bc',
  },
  item: {
    marginTop: 10,
    flexDirection: 'column',
  },
  image: {
    width: 36,
    height: 36,
  },
  text: {
    fontSize: 10,
    color: 'white',
    textAlign: 'center',
  },
});

module.exports = connect(mapStateToProps)(TabBar);
