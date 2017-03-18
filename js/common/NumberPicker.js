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
      number: props.selectedNumber || props.min || 0,
    };
  }
  static defaultProps = {
    velocity: 40,
    min: 1,
    max: 6,
    selectedNumber: 3,
  }

  onStart(evt) {
    this.setState({pageY: evt.nativeEvent.pageY});
  }

  onMove(evt) {
    const state = this.state,
          props = this.props,
          pageY = evt.nativeEvent.pageY,
          move = state.pageY - pageY;

    if (Math.abs(move) < props.velocity) return ;

    var max = props.max,
        min = props.min,
        number = (move > 0) ? state.number + 1 : state.number - 1;
    if (min !== void 0) {
      number = (number < min) ? min : number;
    }

    if (max !== void 0) {
      number = (number > max) ? max : number;
    }

    if (number !== state.number) {
      this.setState({number: number, pageY: pageY});
      if (props.onNumberChange) {
        props.onNumberChange(number);
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.number === nextState.number) {
      return false;
    }
    return true;
  }

  render() {
    return (
      <View
        onStartShouldSetResponder={(evt) => true}
        onResponderGrant={(evt) => this.onStart(evt)}
        onResponderMove={(evt) => this.onMove(evt)}
        style={[styles.container, this.props.style]}>
        <Text
          style={[styles.number, this.props.numberStyles]}>
          {this.state.number}
        </Text>
        {this.props.children}
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: 48,
    height: 30,
  },
  number: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#666',
  }
});

module.exports = NumberPicker;
