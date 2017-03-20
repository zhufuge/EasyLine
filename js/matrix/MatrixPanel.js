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
          <MatrixSide num={this.state.col} direction='column' flex={1} />
        </View>
        <View style={[styles.bottom]}>
          <MatrixSide num={this.state.row} direction='row' flex={6}/>
          <TouchableOpacity
            onPress={() => this.onPressSwitch()}
            style={[styles.switch]}>
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
  transpose: {
    backgroundColor: '#ffbd4099'
  }
});

module.exports = connect(mapStateToProps)(MatrixPanel);
