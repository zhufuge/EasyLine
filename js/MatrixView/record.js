'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} = ReactNative;


class Record extends React.Component {
  constructor(props) {
    super(props);
    this.state = {det: 1};
  }

  render() {
    let det = (this.state.det === 0) ? '0' : '行列值';
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={{flex: 3}}
          onPress={() => this.setState({det: this.state.det ^ 1})}>
          <Text style={styles.det}>{det}</Text>
        </TouchableOpacity>
        <View style={styles.record}></View>
        <Text style={styles.undo}></Text>
      </View>
    );
  }
};

var styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 0.8,
  },
  det: {
    backgroundColor: '#28b0bc',
    flex: 3,
    marginRight: 4,

    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  record: {
    backgroundColor: '#28b0bc',
    flex: 9.6,
    marginRight: 4,
  },
  undo: {
    backgroundColor: '#28b0bc',
    flex: 2,
  },
});

module.exports = Record;
