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

var Alg = require('../common/Algebra');

class MatrixItems extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      matrix: Alg.create((+props.col || 6), (+props.row || 6), 0),
    };

    this._changeMatrix = this._changeMatrix.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    var col = (nextProps.col !== void 0) ? nextProps.col : this.props.col,
        row = (nextProps.row !== void 0) ? nextProps.row : this.props.row,
        type = (nextProps.type !== void 0) ? nextProps.type : this.props.type;

    switch(type) {
    case 2: type = 'E'; break;
    case 3: type = void 0; break;
    case 4: break;
    }

    this.setState({matrix: Alg.create(col, row, type)});
  }

  _changeMatrix(col, row, num) {
    if (num === '-') {
      num = -0;
    } else if (typeof +num !== 'number' || +num !== +num) {
      num = 0;
    }

    var matrix = this.state.matrix,
        prev = matrix[col][row];
    alert(matrix);
    matrix[col][row] = (+prev === 0 && 1 / +prev === 1 / -0) ? -num : num;
    this.setState({matrix: matrix});

    var det = 'NaN';
    if (this.props.col === this.props.row) {
      det = Alg.calculateDet(matrix);
    }
    alert(matrix);
    this.props.setDet(det);
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
          onChangeText={(text) => that._changeMatrix(col, row, text)}
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
