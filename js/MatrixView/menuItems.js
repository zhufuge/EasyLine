'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} = ReactNative;

const defaultDate = [
  ['(0)', '全零', 0],
  ['(1)', '全壹', 1],
  ['(E)', '单位', 2],
  ['(R)', '随机', 3],
  ['(\\)', '对称', 4]
];

class MenuItems extends React.Component {
  render() {
    const items = ((that) => defaultDate.map(function(val) {
      return (
        <TouchableOpacity
          onPress={() => that.props.setType(+val[2])}
          key={val[0]}
          style={styles.item}>
          <Text style={styles.icon}>{val[0]}</Text>
          <Text style={styles.text}>{val[1]}</Text>
        </TouchableOpacity>
      );
    }))(this);
    return (
      <View style={styles.container}>
        {items}
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  item: {
    marginTop: 10,
    flexDirection: 'column',
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#ffbd40cc',
  },
  icon: {
    fontSize: 24,
    fontWeight: '900',
    color: 'white',
    textAlign: 'center',
  },
  text: {
    fontSize: 10,
    color: 'white',
    textAlign: 'center',
  }
});

module.exports = MenuItems;
