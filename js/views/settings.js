'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ListView,
} = ReactNative;

var Header = require('../common/BackHeader');
var NumberPicker = require('../common/NumberPicker');

class MView extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <View style={{
              flex: 1,
              backgroundColor: 'skyblue',
              margin: 30,
            }}>
        <View style={{
                flex: 1,
                backgroundColor: 'steelblue',
                margin: 30,
                justifyContent: 'center',
                alignItems: 'center',
              }}>

          <NumberPicker/>

        </View>
      </View>
    );
  }
}

class Settings extends React.Component{
  render() {
    return (
      <View style={styles.container}>
        <Header navigator={this.props.navigator} title='设置'/>
        <View style={styles.body}>
        </View>
        <View style={styles.footer}>
        </View>
      </View>
    );
  }
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 10,
  },
  footer: {
    flex: 1,
    backgroundColor: '#28b0bc',
  }
});

module.exports = Settings;
