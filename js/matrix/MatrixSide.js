'use strict';

var React =require('react');
var ReactNative = require('react-native');
var {
  StyleSheet,
  View,
  Text,
} = ReactNative;

import { C_BASE, C_INVERT } from '../common/ELColors';
const Algm = require('../common/Algebra');

class MatrixColSide extends React.Component{
  render() {
    return (
      <View style={[styles.container, {
              flexDirection: this.props.direction,
              width: this.props.direction === 'row' ? 277.5 : 45,
              height: this.props.direction === 'column' ? 277.5 : 45,
            }]}>
        {this._createItems()}
      </View>
    );
  }
  _createItems() {
    return Algm.range(this.props.num).map(function(item) {
      return (
        <Text
          key={this.props.direction + item}
          style={[styles.item, item % 2 === 0 ? {} : styles.itemOpacity]}>
          {(item + 1).toString()}
        </Text>
      );
    }.bind(this));
  }
}

var styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  item: {
    width: 45,
    height: 45,
    marginBottom: 1.5,
    marginRight: 1.5,
    backgroundColor: C_BASE || '#28b0bc',

    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    textAlignVertical: 'center',
  },
  itemOpacity: {
    backgroundColor: C_BASE + '99' || '#28b0bc99',
  }
});

module.exports = MatrixColSide;
