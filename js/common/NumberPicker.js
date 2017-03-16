'use strict';

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';

const floor = Math.floor;

class NumberPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageY: 0,
      change: props.selectedNumber || props.min || 0,
      number: props.selectedNumber || props.min || 0,
    };
  }
  static defaultProps = {
    velocity: 1,
  }

  render() {
    return (
      <View
        onStartShouldSetResponder={(evt) => true}
        onResponderGrant={(evt) => this.onStart(evt)}
        onResponderMove={(evt) => this.onMove(evt)}
        onResponderRelease={(evt) => this.onRelease(evt)}
        style={[styles.container, this.props.style]}>
        <Text
          style={[styles.number, this.props.numberStyles]}>
          {this.state.number}
        </Text>
        {this.props.children}
      </View>
    );
  }

  onStart(evt) {
    this.setState({pageY: evt.nativeEvent.pageY});
  }
  onMove(evt) {
    const state = this.state;
    var max = this.props.max,
        min = this.props.min;
    var number = state.change +
        floor((state.pageY - evt.nativeEvent.pageY) /
                   (this.props.velocity * 60));
    if (min !== void 0) {
      number = (number < min) ? min : number;
    }

    if (max !== void 0) {
      number = (number > max) ? max : number;
    }

    if (number !== state.number) {
      this.props.onNumberChange(number);
    }
    this.setState({number: number});
  }
  onRelease(evt) {
    this.setState({change: this.state.number});
  }
}

var styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  number: {
    fontSize: 16,
    color: '#333',
  }
});

module.exports = NumberPicker;
