'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
} from 'react-native';

export default class BlockInput extends Component {

  onChangeText(text) {
    if (this.props.onChangeText)
      this.props.onChangeText(text);
  }
  render() {
    return (
      <TextInput
        onChangeText={(text) => this.onChangeText(text)}
        caretHidden='true'
        maxLength={3}
        selectTextOnFocus={true}
        keyboardType='numeric'
        underlineColorAndroid='transparent'
        placeholder='0'
        placeholderTextColor='white'/>
    );
  }
}
