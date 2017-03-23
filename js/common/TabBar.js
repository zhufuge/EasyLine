'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} = ReactNative;

import { connect } from 'react-redux';
import { setShowMenu } from '../actions';

var SlideUpMenu = require('./SlideUpMenu');

const calcIcon = require('./img/ic_mode_edit_white_18dp.png'),
      createIcon = require('./img/ic_extension_white_18dp.png'),
      othersIcon = require('./img/ic_add_box_white_18dp.png'),
      backIcon = require('./img/ic_expand_more_white_18dp.png'),
      { C_BASE } = require('./ELColors');

var defaultData = [
  ['计算', calcIcon, 'onPressCalculate'],
  ['创建', createIcon, 'onPressCreate'],
  ['其他', othersIcon, 'onPressOthers']
];

class TabBar extends React.Component{
  render() {
    return (
      <View style={styles.container}>
        <View>
          <SlideUpMenu
            show={this.props.showMenu}>
            {this.props.children}
          </SlideUpMenu>
        </View>
        <View style={styles.tabBar}>
          {this.props.showMenu
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
  onPressCreate() {this.props.dispatch(setShowMenu(true));}
  onPressBack() {this.props.dispatch(setShowMenu(false));}
  onPressCalculate() {}
  onPressOthers() {}
}

const mapStateToProps = (state) => {
  return {
    showMenu: state.showMenu
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
