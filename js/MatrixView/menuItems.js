'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} = ReactNative;

class MenuItems extends React.Component {
  static defaultProps = {
    items: [
      ['(0)', '全零'],
      ['(1)', '全壹'],
      ['(E)', '单位'],
      ['(R)', '随机'],
      ['(\\)', '对称']
    ],
  }
  render() {
    const items = this.props.items.map(function(val) {
      return (
        <TouchableOpacity
          key={val[0]}
          style={styles.item}>
          <Text style={styles.icon}>{val[0]}</Text>
          <Text style={styles.text}>{val[1]}</Text>
        </TouchableOpacity>
      );
    });
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
