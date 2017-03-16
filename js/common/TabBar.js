'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ListView,
} = ReactNative;

var calcIcon = require('./img/ic_mode_edit_white_18dp.png');
var createIcon = require('./img/ic_extension_white_18dp.png');
var othersIcon = require('./img/ic_add_box_white_18dp.png');
var backIcon = require('./img/ic_expand_more_white_18dp.png');

var defaultData = [
  ['计算', calcIcon, 'onPressCalculate'],
  ['创建', createIcon, 'onPressCreate'],
  ['其他', othersIcon, 'onPressOthers']
];

class TabBar extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      onShowMenu: false,
    };
  }

  render() {
    const TouchableItem = (that, rowData) => (
      <TouchableOpacity
        key={rowData[0]}
        onPress={() => that[rowData[2]]()}
        style={styles.item}>
        <Image
          style={styles.image}
          source={rowData[1]} />
        <Text style={styles.text}>{rowData[0]}</Text>
      </TouchableOpacity>
    );

    const renderRow = ((that) => defaultData.map(function(rowData) {
      return TouchableItem(that, rowData);
    }))(this);

    const renderHideMenu = TouchableItem(this, ['', backIcon, 'onPressBack']);

    return (
      <View style={styles.container}>
        {this.state.onShowMenu ? renderHideMenu : renderRow}
      </View>
    );
  }
  onPressCalculate() {
    if (this.props.navigator) {
      this.props.navigator.push({calculate: true});
    }
  }
  onPressCreate() {
    this.props.showMenu();
    this.setState({onShowMenu: true});
  }
  onPressOthers() {
  }
  onPressBack() {
    this.props.hideMenu();
    this.setState({onShowMenu: false});
  }
}

const styles = StyleSheet.create({
  container: {
    height: 65,
    flexDirection: 'row',
    justifyContent: 'space-around',
    zIndex: 100,
    backgroundColor: '#28b0bc',
  },
  item: {
    marginTop: 10,
    flexDirection: 'column',
  },
  image: {
    width: 36,
    height: 36,
  },
  text: {
    fontSize: 10,
    color: 'white',
    textAlign: 'center',
  },
});

module.exports = TabBar;
