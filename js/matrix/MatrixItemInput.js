'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  ToastAndroid,
} from 'react-native';

import { connect } from 'react-redux';
import { setMatrixItem } from '../actions';
import { C_INVERT } from '../common/ELColors';

class ItemInput extends Component{
  constructor(props) {
    super(props);
    this.state = {
      text: props.item
    };
  }

  ComponentWillReceiveProps(nextProps) {
    ToastAndroid.show(this.props.matrix.matrix + '', ToastAndroid.SHORT);
    this.setState({text: nextProps.item});
  }

  shouldComponentUpdate() {
    return true;
  }

  onChangeText(text) {
    if(+text === +text || text === '-' || text==='+'){
      this.setState({text: text});
    }
  }

  onEndEditing(event) {
    this.props.dispatch(
      setMatrixItem(this.props.col, this.props.row, +event.nativeEvent.text)
    );
    ToastAndroid.show(this.state.text + '', ToastAndroid.SHORT);
  }

  render() {
    return (
      <View
        style={[styles.container, this.props.style]}>
        <TextInput
          onChangeText={(text) => this.onChangeText(text)}
          onEndEditing={(text) => this.onEndEditing(text)}
          value={'' + this.state.text}
          maxLength={3}
          keyboardType='numeric'
          caretHidden='true'
          returnKeyType='next'
          selectTextOnFocus={true}
          underlineColorAndroid='transparent'
          style={[styles.input]} />
      </View>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    item: state.matrix.matrix[ownProps.col][ownProps.row],
    matrix: state.matrix
  };
};

var styles = StyleSheet.create({
  container: {
    width: 45,
    height: 45,
    marginRight: 1.5,
    marginBottom: 1.5,
    backgroundColor: C_INVERT || '#ffbd40',

    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: 64,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    textAlignVertical: 'center',
  }
});

module.exports = connect(mapStateToProps)(ItemInput);
