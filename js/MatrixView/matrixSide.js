'use strict';

var React =require('react');
var ReactNative = require('react-native');
var {
  StyleSheet,
  View,
  Text,
} = ReactNative;

var MatrixColSide = React.createClass({
  render() {
    let i,
        col = +(this.props.num),
        colItems = [];
    for (i = 0; i < col; i++) {
      colItems.push(i);
    }

    let container = {
      flexDirection: this.props.direction,
      flex: +(this.props.flex),
    };

    return (
      <View style={[styles.container, container]}>
        {colItems.map(function(item) {
          let style = [styles.item];
          if (item % 2 === 1) {
            style.push(styles.itemOpacity);
          }
          return (
            <Text key={container.flexDirection + item}
                  style={style}>
              {(item + 1).toString()}
            </Text>
          );
        })}
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
    marginTop: 4,
  },
  item: {
    width: 41,
    height: 41,
    margin: 2,
    backgroundColor: '#28b0bc',

    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    textAlignVertical: 'center',
  },
  itemOpacity: {
    backgroundColor: '#28b0bc99',
  }
});

module.exports = MatrixColSide;
