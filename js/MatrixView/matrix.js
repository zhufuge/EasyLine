'use strict';

var React =require('react');
var ReactNative = require('react-native');
var {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} = ReactNative;

var MatrixItems = require('./matrixItems');
var MatrixSide = require('./matrixSide');

var Matrix = React.createClass({
  render() {
    let MatrixCol = (this.props.col || 6).toString(),
        MatrixRow = (this.props.row || 6).toString();

    return (
      <View style={styles.container}>
        <View style={[styles.top]}>
          <MatrixItems col={MatrixCol} row={MatrixRow} />
          <MatrixSide num={MatrixCol} direction='column' flex='1' />
        </View>
        <View style={[styles.bottom]}>
          <MatrixSide num={MatrixRow} direction='row' flex='6'/>
          <TouchableOpacity style={[styles.switch]}>
            <Text style={styles.switchButton}>T</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    height: 330,
  },
  top: {
    flexDirection: 'row',
    flex: 6,
  },
  bottom: {
    flexDirection: 'row',
    flex: 1.1,
  },
  switch: {
    flex: 1,
  },
  switchButton: {
    width: 41,
    height: 41,
    backgroundColor: '#28b0bc',
    margin: 2,
    marginTop: 6,

    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    textAlignVertical: 'center',
  },
});

module.exports = Matrix;
