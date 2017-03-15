'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} = ReactNative;

var Header = require('../common/BackHeader');
var NumberPicker = require('../common/NumberPicker');

class MView extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      text: 0,
      change: 0,
      pageY: 0,
      Y: 0,
    };
  }

  static defaultProps = {
    min: 0,
    max: 9,
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
          <TouchableOpacity
            >
            <NumberPicker
              style={{
                backgroundColor: 'skyblue',
                height: 100,
                width: 100,
              }}
              numberStyles={{
                fontSize: 20,
                color: 'white',
              }}
              max={10}
              min={0}>
            </NumberPicker>
          </TouchableOpacity>
          <View
            onStartShouldSetResponder={(evt) => true}
            onResponderGrant={(evt) => this.setState({
              pageY: Math.floor(evt.nativeEvent.pageY)
            })}
            onResponderMove={(evt) => this.onMove(this, evt)}
            onResponderRelease={(evt) => this.setState({
              change: this.state.text
            })}
            style={{
              height: 100,
              width: 100,
              backgroundColor: '#ffbd40',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>{this.state.pageY}</Text>
            <Text>{this.state.Y}</Text>
            <Text>{this.state.text}</Text>
            <Text>{this.props.min}</Text>
            <Text>{this.props.max}</Text>
          </View>
        </View>
      </View>
    );
  }

  onMove(that, evt) {
    var number = that.state.change +
        Math.floor((evt.nativeEvent.pageY - that.state.pageY) / 90);
    if (that.props.min !== void 0) {
      number = (number < that.props.min) ? that.props.min : number;
    }

    if (that.props.max !== void 0) {
      number = (number > that.props.max) ? that.props.max : number;
    }
    this.setState({
      text: number,
      Y: Math.floor(evt.nativeEvent.pageY)
    });
  }
}

class Settings extends React.Component{
  render() {
    return (
      <View style={styles.container}>
        <Header navigator={this.props.navigator} title='设置'/>
        <View style={styles.body}>
          <MView />
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
