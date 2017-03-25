'use strict';

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ListView,
  Text,
} from 'react-native';

import { connect } from 'react-redux';
import { C_BASE } from '../common/ELColors';

class MatrixGroup extends Component {
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([0, 1, 2, 3, 4])
    };
  }
  render() {
    return (
      <ListView
        style={styles.container}
        dataSource={this.state.dataSource}
        renderRow={this._matrixItem}
        />
    );
  }
  _matrixItem = () => {
    return (
      <View style={styles.matrixGroup}>

      </View>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  matrixGroup: {
    height: 68,
    right: -1,
    marginVertical: 9,
    marginHorizontal: 16,
    // marginLeft: 16,
    //    borderColor: '#28b0bc',
    borderRadius: 34,
    // borderTopLeftRadius: 34,
    // borderBottomLeftRadius: 34,
    //    borderWidth: 1,
    backgroundColor: C_BASE,
  }
});

module.exports = connect()(MatrixGroup);
