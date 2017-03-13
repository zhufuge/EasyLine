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

var About = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => this.props.navigator.pop()}>
            <Image style={styles.backIcon}
                   source={require('../common/img/ic_arrow_back_white_18dp.png')}/>
          </TouchableOpacity>
          <Text style={styles.title}>About</Text>
        </View>
        <View style={styles.body}>
        </View>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 12,
    backgroundColor: '#28b0bc',
  },
  body: {
    flex: 10.6,
  },
  backIcon: {
    width: 36,
    height: 36,
    marginTop: 10,
  },
  title: {
    flex: 1,
    paddingTop: 5,
    paddingRight: 48,
    color: 'white',
    textAlignVertical: 'center',
    textAlign: 'center',
    fontSize: 24,
  },
});

module.exports = About;
