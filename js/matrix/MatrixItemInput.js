'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
} from 'react-native';

class ItemInput extends Component{
  constructor(props) {
    super(props);
    this.state = {
      text: props.value,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({text: nextProps.value});
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.text === this.state.text) {
      return false;
    }
    return true;
  }

  onChangeText(text) {
    if(+text === +text || text === '-' || text==='+'){
      this.setState({text: text});
    }
  }

  onEndEditing(event) {
    this.props.setNumber(event.nativeEvent.text);
  }

  render() {
    return (
      <TextInput
        onChangeText={(text) => this.onChangeText(text)}
        onEndEditing={(text) => this.onEndEditing(text)}
        value={this.state.text}
        maxLength={3}
        keyboardType='numeric'
        placeholder='0'
        placeholderTextColor='#ddd'
        caretHidden='true'
        returnKeyType='next'
        selectTextOnFocus={true}
        underlineColorAndroid='transparent'
        style={[styles.container, this.props.style]}
        />
    );
  }
}

var styles = StyleSheet.create({
  container: {
    width: 41,
    height: 41,
    margin: 2,
    padding: 0,
    backgroundColor: '#ffbd40',

    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    textAlignVertical: 'center',
  },
});

module.exports = ItemInput;
