'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import { connect } from 'react-redux';
import { setMatrixCol, setMatrixRow, setMatrixName } from '../actions';

import { C_BASE } from '../common/ELColors';

var NumberPicker = require('../common/NumberPicker');

class Description extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 0,
      name: props.name
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({name: nextProps.name});
  }

  _onChangeText(text) {
    if (text === '' || /^[A-Z]$/.test(text)) {
      this.setState({name: text});
    } else if (/^[a-z]$/.test(text)) {
      this.setState({name: text.toUpperCase()});
    }
  }

  _onEndEditing(event) {
    var name = event.nativeEvent.text;
    name = (name === '') ? this.props.name : name;
    this.setState({name: name});
    this.props.dispatch(setMatrixName(name));
  }

  render() {
    const mode = (this.state.mode === 0) ? 'A' : '|A|';
    return (
      <View style={styles.container}>
        <View style={[styles.name, styles.common]}>
          <TextInput
            onChangeText={(text) => this._onChangeText(text)}
            onEndEditing={(event) => this._onEndEditing(event)}
            value={this.state.name}
            autoCapitalize='characters'
            caretHidden='true'
            maxLength={1}
            selectTextOnFocus={true}
            underlineColorAndroid='transparent'
            style={[styles.value, styles.textInput]}/>
          <Text style={styles.id}>名称</Text>
        </View>
        <NumberPicker
          selectedNumber={this.props.row}
          min={1}
          onNumberChange={(number) => this.props.dispatch(setMatrixRow(number))}
          style={[styles.cR, styles.common]}
          numberStyles={styles.value}>
          <Text style={styles.id}>行</Text>
        </NumberPicker>
        <NumberPicker
          selectedNumber={this.props.col}
          min={1}
          onNumberChange={(number) => this.props.dispatch(setMatrixCol(number))}
          style={[styles.cR, styles.common]}
          numberStyles={styles.value}>
          <Text style={styles.id}>列</Text>
        </NumberPicker>
        <TouchableOpacity
          style={[styles.common, styles.mode]}
          onPress={() => this.setState({mode: this.state.mode ^ 1})}>
          <Text style={styles.value}>{mode}</Text>
          <Text style={styles.id}>模式</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    row: state.matrix.row,
    col: state.matrix.col,
    name: state.matrix.name
  };
};

var styles = StyleSheet.create({
  container: {
    height: 54,
    flexDirection: 'row',
  },
  common: {
    marginRight: 1,
    backgroundColor: C_BASE || '#28b0bc',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  name: {
    flex: 6,
  },
  cR: {
    flex: 3,
    height: '100%',
  },
  mode: {
    marginRight: 0,
    flex: 2.4,
  },
  value: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  id: {
    fontSize: 11,
    color: '#ddd',
    marginBottom: 2,
  },
  textInput: {
    marginBottom: -10,
    width: 120,
  },
});

module.exports = connect(mapStateToProps)(Description);
