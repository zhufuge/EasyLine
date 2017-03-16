'use strict';

var React =require('react');
var ReactNative = require('react-native');
var {
  StyleSheet,
  View,
  TextInput,
} = ReactNative;

const floor = Math.floor,
      random = Math.random;

class MatrixItems extends React.Component{
  constructor(props) {
    super(props);
    const col = +(props.col) || 6,
          row = +(props.row) || 6;
    this.state = {
      matrix: this._createMatrix(col, row, 0),
    };
  }

  _createMatrix(col, row, num) {
    var matrix = [];
    for (let i = 0; i < col; i++) {
      matrix.push([]);
      for (let j = 0; j < row; j++) {
        matrix[i].push(num);
      }
    }
    return matrix;
  }

  componentWillReceiveProps(nextProps) {
    var col = (nextProps.col !== void 0) ? nextProps.col : this.props.col,
        row = (nextProps.row !== void 0) ? nextProps.row : this.props.row,
        type = (nextProps.type !== void 0) ? nextProps.type : this.props.type;
    switch(type) {
    case 0:
    case 1: {
      this.setState({matrix: this._createMatrix(col, row, type)});
      break;
    }
    case 2: {
      var matrix = this._createMatrix(col, row, 0),
          length = (col >= row) ? row : col;
      for (let i = 0; i < length; i++) {
        matrix[i][i] = 1;
      }
      this.setState({matrix: matrix});
      break;
    }
    case 3: {
      let matrix = this._createMatrix(col, row, 0);
      for (let i = 0; i < col; i++) {
        for (let j = 0; j < row; j++) {
          matrix[i][j] = floor(random() * 10);
        }
      }
      this.setState({matrix: matrix});
      break;
    }
    case 4: {
      if (col === row) {
        let matrix = this._createMatrix(col, row, 0);
        for (let i = 0; i < col; i++) {
          for (let j = i; j < row; j++){
            matrix[i][j] = matrix[j][i] = floor(random() * 10);
          }
        }
        this.setState({matrix: matrix});
      }
      break;
    }
    }
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
