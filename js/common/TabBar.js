'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} = ReactNative;

var TabBar = React.createClass({
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.item}>
          <Image source={require('./img/ic_mode_edit_white_18dp.png')} />
          <Text style={styles.text}>计算</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Image source={require('./img/ic_extension_white_18dp.png')} />
          <Text style={styles.text}>创建</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Image source={require('./img/ic_add_box_white_18dp.png')} />
          <Text style={styles.text}>其他</Text>
        </TouchableOpacity>
      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1.3,
    backgroundColor: '#28b0bc',

    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  item: {
    marginTop: 10,
    flexDirection: 'column',
  },
  text: {
    fontSize: 10,
    color: 'white',
    textAlign: 'center',
  },
});

module.exports = TabBar;
