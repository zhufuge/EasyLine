'use strict';

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  BackAndroid,
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
            pagingEnabled={true}>
            {this.props.matrixList.map((matrix, i) => this.renderRow(matrix, i))}
          </ScrollView>
        </View>
        <View style={styles.quitContainer}>
          <TouchableOpacity
            onPress={() => BackAndroid.exitApp()}
            style={styles.quitTouchable}>
          <Image source={quit}
                 style={styles.quit}/>
          <Text style={styles.quitText}>退出应用</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  firstRowInfo(matrix) {
    const first = matrix[0];
    var info = first.join(' ');
    if (info.length <= 12) {
      return info;
    } else {
      return info.substr(0, 12) + '...';
    }
  }
  renderRow(matrix, i) {
    return (
      <View
        key={i + matrix.name}
        style={styles.item}>
        <TouchableOpacity
          delayPressIn={100}
          delayPressOut={100}
          onPress={() => this.onPressItem(matrix)}
          style={styles.itemTouchable}>
          <Text style={styles.itemName}>{matrix.name}</Text>
          <Text style={styles.itemCR}>{`(${matrix.row}, ${matrix.col})`}</Text>
          <Text style={styles.itemData}>{this.firstRowInfo(matrix.matrix)}</Text>
        </TouchableOpacity>
      </View>);
  }
  onPressItem(matrix) {
    this.props.dispatch(setMatrixFromList(matrix));
    this.props.drawer.closeDrawer();
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
    borderBottomWidth: 1,
    borderBottomColor: C_BASE,
  },
  listTitle: {
    height: 48,
    fontSize: 19,
    fontWeight: '100',
    color: 'white',
    backgroundColor: C_BASE,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: C_BASE,
  },
  itemTouchable: {
    height: 54,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemName: {
    width: 54,
    color: C_BASE,
    fontWeight: 'bold',
    fontSize: 26,
    textAlign: 'center',
  },
  itemCR: {
    width: 42,
    color: C_BASE,
    fontSize: 14,
    textAlign: 'center',
    paddingTop: 4,
  },
  itemData: {
    marginLeft: 16,
    color: '#999',
    paddingTop: 5,
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
