'use strict';

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
  ListView,
} from 'react-native';

import { connect } from 'react-redux';
import { C_BASE } from '../common/ELColors';

const logo = require('./img/ELLOGO_144.png');
const quit = require('./img/ic_power_settings_new_white_18dp.png');

class Drawer extends Component {
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(['A', 'B', 'C', 'D']),
    };
  }

  _renderRow(data) {
    return (
      <TouchableOpacity
        style={styles.itemTouchable}>
        <Text style={styles.itemName}>{data}</Text>
        <Text style={styles.itemCR}>3, 2</Text>
      </TouchableOpacity>);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={logo} />
        </View>
        <View style={styles.listContainer}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={(data) => this._renderRow(data)}
            centerContent={true}
            style={styles.list}/>
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
}

const styles = StyleSheet.create({
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
  list: {
    marginVertical: 18,
  },
  itemTouchable: {
    height: 48,
    marginVertical: 6,
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
    marginHorizontal: 20,
  },
  itemCR: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 20,
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

module.exports = connect()(Drawer);
