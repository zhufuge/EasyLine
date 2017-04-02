'use strict';

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView
} from 'react-native';

import { connect } from 'react-redux';
import { setMatrixFromList } from '../actions';
import { C_BASE } from '../common/ELColors';

const logo = require('./img/ELLOGO_144.png');
const quit = require('./img/ic_power_settings_new_white_18dp.png');

class Drawer extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={logo} />
        </View>
        <View style={styles.listContainer}>
          <Text style={styles.listTitle}>矩阵列表</Text>
          <ScrollView
            style={styles.list}
            showsVerticalScrollIndicator={false}
            pagingEnabled={true}>
            {this.props.matrixList.map((matrix) => this._renderRow(matrix))}
          </ScrollView>
        </View>
        <View style={styles.quitContainer}>
          <TouchableOpacity
            style={styles.quitTouchable}>
          <Image source={quit}
                 style={styles.quit}/>
          <Text style={styles.quitText}>退出应用</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  _renderRow(matrix) {
    return (
      <TouchableOpacity
        key={matrix.name}
        onPress={() => this.props.dispatch(setMatrixFromList(matrix))}
        style={styles.itemTouchable}>
        <Text style={styles.itemName}>{matrix.name}</Text>
        <Text style={styles.itemCR}>{`(${matrix.col}, ${matrix.row})`}</Text>
      </TouchableOpacity>);
  }
}

const mapStateToProps = (state) => {
  return {
    matrixList: state.matrixList
  };
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    paddingTop: 10,
    alignItems: 'center',
  },
  listContainer: {
    height: Dimensions.get('window').height - 245,
    borderTopWidth: 1,
    borderTopColor: C_BASE,
    borderBottomWidth: 1,
    borderBottomColor: C_BASE,
  },
  listTitle: {
    height: 48,
    fontSize: 19,
    fontWeight: '100',
    color: C_BASE,
    textAlignVertical: 'center',
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: C_BASE,
  },
  list: {
    marginVertical: 16,
  },
  itemTouchable: {
    height: 48,
    marginVertical: 2,
    marginHorizontal: 16,
    backgroundColor: C_BASE,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemName: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 19,
    textAlign: 'center',
  },
  itemCR: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    paddingTop: 2,
    marginHorizontal: 10,
  },
  quitContainer: {
    position: 'absolute',
    bottom: 0,
    height: 64,
    width: '100%',
  },
  quitTouchable: {
    flex: 1,
    marginVertical: 10,
    marginHorizontal: 16,
    backgroundColor: C_BASE,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quit: {
    width: 28,
    height: 28,
  },
  quitText: {
    marginLeft: 10,
    fontSize: 16,
    color: 'white',
  }
});

module.exports = connect(mapStateToProps)(Drawer);
