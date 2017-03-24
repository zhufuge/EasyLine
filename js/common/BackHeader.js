'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} = ReactNative;

const { C_BASE } = require('./ELColors');

class BackHeader extends React.Component {
  render() {
    return (
      <View style={[styles.container,this.props.style]}>
        <TouchableOpacity onPress={() => this.props.navigator.pop()}>
          <Image style={[styles.backIcon, this.props.iconStyle]}
                 source={require('./img/ic_arrow_back_white_18dp.png')}/>
        </TouchableOpacity>
        <Text style={[styles.title, this.props.textStyle]}>
          {this.props.title}</Text>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    height: 54,
    flexDirection: 'row',
    paddingLeft: 12,
    backgroundColor: C_BASE || '#28b0bc',
  },
  backIcon: {
    width: 36,
    height: 36,
    marginTop: 10,
  },
  title: {
    flex: 1,
    paddingTop: 6,
    paddingRight: 48,
    color: 'white',
    textAlignVertical: 'center',
    textAlign: 'center',
    fontSize: 22,
  },
});

module.exports = BackHeader;
