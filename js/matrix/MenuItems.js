'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} = ReactNative;

import { connect } from 'react-redux';
import { setMType } from '../actions';
import { C_APP, C_INVERT } from '../common/ELColors';

const defaultDate = [
  ['0', '全零阵', 0],
  ['1', '全壹阵', 1],
  ['E', '单位阵', 2],
  ['R', '随机阵', 3],
  ['\\', '对称阵', 4]
];

class MenuItems extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        {this.renderItems()}
      </View>
    );
  }

  renderItems() {
    return defaultDate.map(function(val) {
      const disabled = this.props.mType === val[2];
      return (
        <View key={val[0]}>
          <TouchableOpacity
            disabled={disabled}
            onPress={() => this._onPressItems(val[2])}
            style={[styles.item, disabled ? styles.disabled : {}]}>
            <Text style={styles.icon}>{val[0]}</Text>
          </TouchableOpacity>
          <Text style={styles.text}>{val[1]}</Text>
        </View>
      );
    }.bind(this));
  }
  _onPressItems(item) {
    this.props.hideMenu();
    this.props.dispatch(setMType(item));
  }
}

const mapStateToProps = (state) => {
  return {
    mType: state.mType
  };
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: C_APP,
  },
  item: {
    marginTop: 10,
    marginBottom: 5,
    flexDirection: 'column',
    justifyContent: 'center',
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: C_INVERT + 'cc' || '#ffbd40cc',
  },
  disabled: {
    backgroundColor: '#ccc',
  },
  icon: {
    fontSize: 26,
    fontWeight: '900',
    color: 'white',
    textAlign: 'center',
    marginBottom: 4,
  },
  text: {
    fontSize: 10,
    color: '#666',
    textAlign: 'center',
  }
});

module.exports = connect(mapStateToProps)(MenuItems);
