'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} = ReactNative;

import { connect } from 'react-redux';
import { setCol, setRow } from '../actions';

var NumberPicker = require('../common/NumberPicker');

class Description extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 0
    };
  }
  render() {
    const mode = (this.state.mode === 0) ? 'A' : '|A|';
    return (
      <View style={styles.container}>
        <View style={[styles.name, styles.common]}>
          <TextInput
            autoCapitalize='characters'
            caretHidden='true'
            defaultValue='A'
            maxLength={6}
            placeholder='A'
            placeholderTextColor='#ddd'
            underlineColorAndroid='transparent'
            style={[styles.value, styles.textInput]}/>
          <Text style={styles.id}>名称</Text>
        </View>
        <NumberPicker
          selectedNumber={this.props.col}
          min={1}
          onNumberChange={(number) => this.props.dispatch(setCol(number))}
          style={[styles.cR, styles.common]}
          numberStyles={styles.value}>
          <Text style={styles.id}>行</Text>
        </NumberPicker>
        <NumberPicker
          selectedNumber={this.props.row}
          min={1}
          onNumberChange={(number) => this.props.dispatch(setRow(number))}
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
    col: state.col,
    row: state.row
  };
};

var styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    height: 54,
    flexDirection: 'row',
  },
  common: {
    marginRight: 1,
    backgroundColor: '#28b0bc',
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
