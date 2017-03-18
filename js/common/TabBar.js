'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} = ReactNative;

var SlideUpMenu = require('./SlideUpMenu');

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
      showMenu: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({showMenu: nextProps.show});
  }

  _createTouchableItem(rowData) {
    return (
      <TouchableOpacity
        key={rowData[0]}
        onPress={() => this[rowData[2]]()}
        style={styles.item}>
        <Image
          style={styles.image}
          source={rowData[1]} />
        <Text style={styles.text}>{rowData[0]}</Text>
      </TouchableOpacity>
    );
  }

  _renderRow() {
    return defaultData.map(function(rowData) {
      return this._createTouchableItem(rowData);
    }.bind(this));

  }

  _renderHideMenu() {
    return this._createTouchableItem(['', backIcon, 'onPressBack']);
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <SlideUpMenu
            show={this.state.showMenu}>
            {this.props.children}
          </SlideUpMenu>
        </View>
        <View style={styles.tabBar}>
          {this.state.showMenu
            ? this._renderHideMenu()
          : this._renderRow()}
        </View>
      </View>
    );
  }

  onPressCreate() {this.setState({showMenu: true});}
  onPressBack() {this.setState({showMenu: false});}
  onPressCalculate() {}
  onPressOthers() {}
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
  },
  tabBar: {
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
