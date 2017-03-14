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

    const itemView = (col) => rowItems.map(function(item) {
      let style = [styles.item];
      if ((col + item) % 2 === 1) {
        style.push(styles.itemOpacity);
      }
      return (<Text key={col + ',' + item} style={style}>0</Text>);
    });

    const colView = colItems.map(function(col) {
      return (
        <View key={'col' + (col + 1)}
              style={styles.col}>
          {itemView(col)}
        </View>
      );
    });


    return (
      <View style={styles.container}>
        {colView}
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
  itemOpacity: {
    backgroundColor: '#ffbd4099',
  }
});

module.exports = MatrixItems;
