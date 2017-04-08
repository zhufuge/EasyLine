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

const Header = require('./Header');
const Main = require('./Main');
const Footer = require('./Footer');
const Drawer = require('./Drawer');

class MatrixView extends React.Component {
  renderDrawer() {
    return <Drawer drawer={this.refs.drawer} navigator={this.props.navigator}/>;
  }
  render() {
    return (
      <DrawerLayoutAndroid
        ref="drawer"
        drawerWidth={236}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        keyboardDismissMode='on-drag'
        renderNavigationView={() => this.renderDrawer()} >
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
