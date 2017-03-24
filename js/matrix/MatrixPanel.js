'use strict';

var React =require('react');
var ReactNative = require('react-native');
var {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} = ReactNative;

import { connect } from 'react-redux';
import { setTranspose } from '../actions';
import { C_BASE, C_INVERT } from '../common/ELColors';

var MatrixBody = require('./MatrixBody');
var MatrixSide = require('./MatrixSide');

class MatrixPanel extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      col: props.col,
      row: props.row,
      transpose: false
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      col: nextProps.col,
      row: nextProps.row
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.top]}>
          <MatrixBody />
          <MatrixSide num={this.state.col} direction='column'/>
        </View>
        <View style={[styles.bottom]}>
          <MatrixSide num={this.state.row} direction='row'/>
          <TouchableOpacity
            onPress={() => this.onPressSwitch()} >
            <Text style={[
                    styles.switchButton,
                    this.state.transpose ? styles.transpose : {}
                  ]}>T</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  onPressSwitch() {
    const transpose = this.state.transpose;
    this.setState({transpose: !transpose});
    this.props.dispatch(setTranspose(!transpose));
  }
}

const mapStateToProps = (state) => {
  return {
    col: state.col,
    row: state.row
  };
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 18,
    height: 328,
    width: 328,
  },
  top: {
    flexDirection: 'row',
    height: 283,
  },
  bottom: {
    flexDirection: 'row',
    height: 45,
  },
  switchButton: {
    width: 45,
    height: 45,
    marginLeft: 5.5,
    borderWidth: 1,
    borderColor: C_BASE || '#28b0bc',

    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: C_BASE || '#28b0bc',
    textAlignVertical: 'center',
  },
  transpose: {
    borderColor: C_INVERT || '#ffbd40',
    color: C_INVERT || '#ffbd40',
  }
});

module.exports = connect(mapStateToProps)(MatrixPanel);
