'use strict';

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  ScrollView,
} from 'react-native';

import { connect } from 'react-redux';
import { setMatrixFromList } from '../../actions';
import { C_BASE } from '../../common/ELColors';

const InnerListItem = require('./InnerListItem');

class InnerList extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.listTitle}>矩阵列表</Text>
        <ScrollView
          pagingEnabled={true}>
          {this.props.matrixList.map((matrix, i) => this.renderRow(matrix, i))}
        </ScrollView>
      </View>
    );
  }
  renderRow(matrix, i) {
    return (
      <InnerListItem
        key={'item' + matrix.name}
        drawer={this.props.drawer}
        index={i}/>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    matrixList: state.matrixList
  };
};

var styles = StyleSheet.create({
  container: {
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
});

module.exports = connect(mapStateToProps)(InnerList);
