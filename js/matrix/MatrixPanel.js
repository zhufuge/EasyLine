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
import { setMatrixTranspose } from '../actions';
import { C_BASE, C_INVERT } from '../common/ELColors';

var MatrixBody = require('./MatrixBody');
var MatrixSide = require('./MatrixSide');

class MatrixPanel extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      transpose: false
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.top]}>
          <MatrixBody />
          <MatrixSide num={this.props.row} direction='column'/>
        </View>
        <View style={[styles.bottom]}>
          <MatrixSide num={this.props.col} direction='row'/>
          <TouchableOpacity
            onPress={() => this._onPressTranspose()} >
            <Text style={[
                    styles.switchButton,
                    this.state.transpose ? styles.transpose : {}
                  ]}>T</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  _onPressTranspose() {
    this.setState({transpose: !this.state.transpose});
    this.props.dispatch(setMatrixTranspose());
  }
}

const mapStateToProps = (state) => {
  return {
    row: state.matrix.row,
    col: state.matrix.col
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
