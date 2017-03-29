'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  StyleSheet,
  View,
  ScrollView,
  DrawerLayoutAndroid
} = ReactNative;

import { connect } from 'react-redux';

const Header = require('../common/Header');
const Main = require('./Main');
const Footer = require('./Footer');
const Drawer = require('./Drawer');

class MatrixView extends React.Component {
  render() {
    const drawer = <Drawer navigator={this.props.navigator}/>;
    return (
      <DrawerLayoutAndroid
        drawerWidth={224}
        drawerPosition={DrawerLayoutAndroid.positions.Right}
        keyboardDismissMode='on-drag'
        renderNavigationView={() => drawer} >
        <View
          style={styles.container}>
          <Header navigator={this.props.navigator}/>
          <ScrollView>
            <Main />
            <Footer
              navigator={this.props.navigator}/>
          </ScrollView>
        </View>
      </DrawerLayoutAndroid>
    );
  }
};


var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

module.exports = connect()(MatrixView);
