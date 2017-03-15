'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  View,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Image,
} = ReactNative;

class SilidUpMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slideUp: new Animated.Value(0),
    };
  }

  static defaultProps = {
    height: 100,
  }

  componentDidMount() {
    this.SlideDown(this);
  }

  slideUp(that) {
    Animated.spring(
      that.state.slideUp,
      {
        toValue: that.props.height,
        velocity: 1,  // Velocity makes it move
        friction: 3,  // Oscillate a lot
      },
    ).start();
  }

  SlideDown(that) {
    Animated.timing(
      that.state.slideUp, {
        toValue: 0,
        duration: 300,
      },
    ).start();
  }

  shouldComponentUpdate() {
    (function(that) {
      if (that.props.show) {
        that.slideUp(that);
      } else {
        that.SlideDown(that);
      }
    })(this);

    return true;
  }

  render() {
    return (
      <Animated.View
        style={[styles.container,
                {height: this.state.slideUp}
        ]}>
        <View style={styles.menu}>
          {this.props.children}
        </View>
        <TouchableOpacity
          style={styles.slideDown}
          onPress={() => this.SlideDown(this)}>
          <Image style={styles.image}
                 source={require('./img/ic_expand_more_white_18dp.png')}/>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    width: 384,
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',

    flexDirection: 'column',
  },
  menu: {
    flex: 3,

    borderTopWidth: 0.4,
    borderColor: '#ccc',
  },
  slideDown: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  image: {
    width: 54,
    height: 20,
    tintColor: '#28b0bc',
  },
});

module.exports = SilidUpMenu;
