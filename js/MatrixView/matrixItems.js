'use strict';

var React =require('react');
var ReactNative = require('react-native');
var {
  StyleSheet,
  View,
  TextInput,
} = ReactNative;

class MatrixItems extends React.Component{
  constructor(props) {
    super(props);
    const col = +(props.col) || 6,
          row = +(props.row) || 6;
    this.state = {
      matrix: new Array(col).fill(new Array(row).fill(0)),
    };
  }
  render() {
    var i,
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
    const itemView = (that, col) => rowItems.map(function(row) {
      let style = [styles.item];
      if ((col + row) % 2 === 1) {
        style.push(styles.itemOpacity);
      }
      return (
        <TextInput
          caretHidden='true'
          defaultValue={'' + that.state.matrix[col][row]}
          maxLength={3}
          selectTextOnFocus={true}
          keyboardType='numeric'
          underlineColorAndroid='transparent'
          placeholder='0'
          placeholderTextColor='white'
          key={col + ',' + row}
          style={style}/>);
    });
    const colView = ((that) => colItems.map(function(col){
      return (
        <View key={'col' + (col + 1)}
              style={styles.col}>
          {itemView(that, col)}
        </View>);
    }))(this);
    return (
      <View style={styles.container}>
        {colView}
      </View>
    );
  }
}

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
