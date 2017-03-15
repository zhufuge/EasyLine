'use strict';

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';


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
        onResponderGrant={(evt) => this.onStart(this, evt)}
        onResponderMove={(evt) => this.onMove(this, evt)}
        onResponderRelease={(evt) => this.onRelease(this, evt)}
        style={[styles.container, this.props.style]}>
        <Text
          style={[styles.number, this.props.numberStyles]}>
          {this.state.number}
        </Text>
        {this.props.children}
      </View>
    );
  }

  onStart(that, evt) {
    that.setState({pageY: evt.nativeEvent.pageY});
  }
  onMove(that, evt) {
    var number = that.state.change +
        Math.floor((that.state.pageY - evt.nativeEvent.pageY) /
                   (that.props.velocity * 60));
    if (that.props.min !== void 0) {
      number = (number < that.props.min) ? that.props.min : number;
    }

    if (that.props.max !== void 0) {
      number = (number > that.props.max) ? that.props.max : number;
    }

    that.setState({number: number});
    that.props.onNumberChange(number);
  }
  onRelease(that, evt) {
    that.setState({change: this.state.number});
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
