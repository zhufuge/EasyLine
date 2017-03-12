'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  StyleSheet,
  View,
  Text,
} = ReactNative;


var Record = React.createClass({
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.det}>行列值</Text>
        <View style={styles.record}></View>
        <Text style={styles.undo}></Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 0.8,
  },
  det: {
    backgroundColor: '#28b0bc',
    flex: 3,
    marginRight: 4,

    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  record: {
    backgroundColor: '#28b0bc',
    flex: 9.6,
    marginRight: 4,
  },
  undo: {
    backgroundColor: '#28b0bc',
    flex: 2,
  },
});

module.exports = Record;
