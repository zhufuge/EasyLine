'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  View,
  StyleSheet,
  Animated,
  TouchableOpacity,
} = ReactNative;

class SilidUpMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slideUp: new Animated.Value(0),
    };
  }

  static defaultProps = {
    height: 85,
  }
  slideUp() {
    Animated.spring(
      this.state.slideUp,
      {
        toValue: this.props.height,
        velocity: 1,
        friction: 3,
      }
    ).start();
  }
  SlideDown() {
    Animated.timing(
      this.state.slideUp, {
        toValue: 0,
        duration: 400,
      }
    ).start();
  }

  componentWillReceiveProps(nextProps) {
    (nextProps.show)
      ? this.slideUp()
      : this.SlideDown();
  }

  render() {
    return (
      <Animated.View
        style={[
          styles.container,
          {height: this.state.slideUp}
        ]}>
        <View style={styles.menu}>
          {this.props.children}
        </View>
      </Animated.View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
    flexDirection: 'column',
  },
  menu: {
    flex: 1,
    borderTopWidth: 0.4,
    borderColor: '#ccc',
  },
});

module.exports = SilidUpMenu;
