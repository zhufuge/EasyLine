'use strict';

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
} from 'react-native';

import { connect } from 'react-redux';
import { calcPop, calcChangeNumber } from '../actions';
import { C_BASE } from '../common/ELColors';

const backspace = require('./img/ic_backspace_white_18dp.png');

class Screen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: this.stackNumber(this.props.calcStack)
    };
  }

  stackNumber(stack) {
    if (stack.length === 3 &&
        typeof stack[2].object === 'number') {
      return stack[2].object;
    } else {
      return 1;
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({number: this.stackNumber(nextProps.calcStack)});
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.screen}>
          {this.props.calcStack.map((o, i) => this.renderBlock(o, i))}
        </View>
        <TouchableOpacity
          onPress={() => this.onPressDelete()}
          style={styles.backspaceContainer}>
          <Image
            source={backspace}
            style={styles.backspace}/>
        </TouchableOpacity>
      </View>
    );
  }

  onPressDelete() {
    this.props.dispatch(calcPop());
    this.setState({number: 1});
  }

  renderBlock(object, i) {
    if (object.matrix !== void 0) {
      return (
        <View
          key={object.name + i}
          style={styles.block}>
          <Text style={styles.matrixName}>{object.name}</Text>
          <Text style={styles.matrixRC}>{`(${object.row}, ${object.col})`}</Text>
        </View>
      );
    } else if (typeof object === 'number'){
      return (
        <View
          key={object + i + ''}
          style={styles.block}>
          <TextInput
            onChangeText={(text) => this.onChangeText(text)}
            onEndEditing={(text) => this.onEndEditing(text)}
            defaultValue={object + ''}
            returnKeyType='next'
            maxLength={20}
            keyboardType='numeric'
            caretHidden='true'
            selectTextOnFocus={true}
            underlineColorAndroid='transparent'
            style={[styles.numberInput]} />
        </View>
      );
    } else {
      return (
        <View
          key={object + i + ''}
          style={styles.block}>
          <Text style={styles.operator}>{object}</Text>
        </View>
      );
    }
  }

  onChangeText(text) {
    if (text.length <= 6) {
      if (+text === +text || text === '-' || text==='+'){
        this.setState({text: text});
      }
    }
  }

  onEndEditing(event) {
    this.props.dispatch(calcChangeNumber(+event.nativeEvent.text));
  }
}

const styles = StyleSheet.create({
  container: {
    height: 54,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderWidth: 1,
    borderColor: C_BASE,
    backgroundColor: C_BASE + '88',
  },
  screen: {
    flexDirection: 'row',
  },
  block: {
    width: 52,
    height: 52,
    backgroundColor: C_BASE + 'cc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  matrixName: {
    height: 32,
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  matrixRC: {
    fontSize: 12,
    color: 'white',
  },
  operator: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 14,
  },
  numberInput: {
    width: 72,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    textAlignVertical: 'center',
    marginBottom: 9,
  },
  backspaceContainer: {
    width: 62,
    height: 54,
    position: 'absolute',
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: C_BASE + 'cc',
  },
  backspace: {
    height: 36,
    width: 36,
  },
});

const mapStateToProps = (state) => {
  return {
    calcStack: state.calcStack
  };
};

module.exports = connect(mapStateToProps)(Screen);
