'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
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

  componentWillReceiveProps(nextProps) {
    this.setState({text: nextProps.item});
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (nextState.text === this.state.text) ? false : true;
  }

  onChangeText(text) {
    if (text.length <= 6) {
      if (+text === +text || text === '-' || text==='+'){
        this.setState({text: text});
      }
    }
  }

  onEndEditing(event) {
    const dispatch = this.props.dispatch,
          row = this.props.row,
          col = this.props.col,
          val = +event.nativeEvent.text;
    if (this.props.type === '\\' &&
        col !== row) {
      dispatch(setMatrixItem(row, col, val));
      dispatch(setMatrixItem(col, row, val));
    } else {
      dispatch(setMatrixItem(row, col, val));
    }
  }

  render() {
    const text = this.state.text;
    const dots = (text.toString().length > 4) ? <Text style={styles.dots}>...</Text> : undefined;
    return (
      <View
        style={[styles.container, this.props.style]}>
        <TextInput
          onChangeText={(text) => this.onChangeText(text)}
          onEndEditing={(text) => this.onEndEditing(text)}
          value={'' + text}
          keyboardType='numeric'
          caretHidden='true'
          returnKeyType='next'
          selectTextOnFocus={true}
          underlineColorAndroid='transparent'
          style={[styles.input]} />
          {dots}
      </View>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    item: state.matrix.matrix[ownProps.row][ownProps.col],
    type: state.matrix.mType
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
  },
  dots: {
    position: 'absolute',
    bottom: -2,
    fontSize: 24,
    color: 'white',
  },
});

module.exports = connect(mapStateToProps)(ItemInput);
