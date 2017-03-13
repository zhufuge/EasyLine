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

class Description extends React.Component {
  constructor(props) {
    super(props);
    this.state = {mode: 0};
  }

  render() {
    let mode = (this.state.mode === 0) ? 'A' : '|A|';
    return (
      <View style={styles.container}>
        <View style={[styles.name, styles.common]}>
          <Text style={styles.sectionValue}>A</Text>
          <Text style={styles.sectionId}>名称</Text>
        </View>
        <View style={[styles.colAndRow, styles.common]}>
          <Text style={styles.sectionValue}>6</Text>
          <Text style={styles.sectionId}>行</Text>
        </View>
        <View style={[styles.colAndRow, styles.common]}>
          <Text style={styles.sectionValue}>6</Text>
          <Text style={styles.sectionId}>列</Text>
        </View>
        <TouchableOpacity
          style={[styles.common, styles.mode]}
          onPress={() => this.setState({mode: this.state.mode ^ 1})}>
          <Text style={styles.sectionValue}>{mode}</Text>
          <Text style={styles.sectionId}>模式</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    flex: 1,
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
  colAndRow: {
    flex: 3,
  },
  mode: {
    marginRight: 0,
    flex: 2.4,
  },
  sectionValue: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  sectionId: {
    fontSize: 11,
    color: '#ddd',
    marginBottom: 2,
  },
});

module.exports = Description;
