'use strict';

var React =require('react');
var ReactNative = require('react-native');
var {
  StyleSheet,
  View,
  Text,
} = ReactNative;

var MatrixItems = React.createClass({
  render() {
    let i,
        col = +(this.props.col),
        row = +(this.props.row),
        colItems = [],
        rowItems = [];
    for (i = 0; i < col; i++) {
      colItems.push(i);
    }

    for (i = 0; i < row; i++) {
      rowItems.push(i);
    }

    return (
      <View style={styles.container}>
        {colItems.map(function(col) {
          return (
            <View key={'col' + (col + 1)}style={styles.col}>
              {rowItems.map(function(item) {
                return (
                  <Text key={col + ',' + item} style={styles.item}>0</Text>
                );
              })}
            </View>
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
    flex: 6,
  },
  col: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 2,
    height: 41,
  },
  item: {
    width: 41,
    height: 41,
    margin: 2,
    backgroundColor: '#ffbd40',

    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    textAlignVertical: 'center',
  },
});

module.exports = MatrixItems;
