'use strict';

import React, { Component } from 'react';
import {
  Alert,
  View,
  StyleSheet,
  Image,
  Text,
} from 'react-native';
import AppIntro from 'react-native-app-intro';
import { connect } from 'react-redux';
import { doneIntro } from '../actions';

const Logo = require('./img/ELLOGO.png');
const IntroImg_1 = require('./img/intro_matrix.png');
const IntroImg_2 = require('./img/intro_list.png');
const IntroImg_3 = require('./img/intro_calc.png');

class Intro extends Component {
  onBtnHandle = (index) => {
    if (this.props.intro) {
      this.props.dispatch(doneIntro());
    }
    this.props.navigator.pop();
  }

  render() {
    return (
      <AppIntro
        skipBtnLabel='跳过'
        doneBtnLabel='进入'
        onDoneBtnClick={this.onBtnHandle}
        onSkipBtnClick={this.onBtnHandle}>
        <View style={[styles.slide,{ backgroundColor: '#0999' }]}>
          <View style={styles.imgContainer} level={10}>
            <Image source={IntroImg_1} />
          </View>
          <View level={0}><Text style={styles.title}>矩阵操作</Text></View>
          <View level={-10}><Text style={styles.text}>
              简单地改变矩阵的大小，</Text></View>
          <View level={-20}><Text style={styles.text}>
              查看矩阵行列值和矩阵的秩</Text></View>
        </View>
        <View style={[styles.slide, { backgroundColor: '#f909' }]}>
          <View style={styles.imgContainer} level={10}>
            <Image source={IntroImg_2} />
          </View>
          <View level={0}><Text style={styles.title}>侧栏列表</Text></View>
          <View level={-10}><Text style={styles.text}>
              简单地查看和选择矩阵，</Text></View>
          <View level={-20}><Text style={styles.text}>
              以及删除矩阵</Text></View>
        </View>
        <View style={[styles.slide,{ backgroundColor: '#f209' }]}>
          <View style={styles.imgContainer} level={10}>
            <Image source={IntroImg_3} />
          </View>
          <View level={0}><Text style={styles.title}>矩阵运算</Text></View>
          <View level={-10}><Text style={styles.text}>
              简单地矩阵运算，</Text></View>
          <View level={-20}><Text style={styles.text}>
              各种运算符和转换</Text></View>
        </View>
        <View style={[styles.slide,
              {backgroundColor: '#ddd', justifyContent: 'center'}]}>
          <View level={10}>
            <Image style={styles.logo} source={Logo} />
          </View>
          <View level={-15}><Text style={styles.logoTitle}>EasyLine</Text></View>
        </View>
      </AppIntro>
    );
  }
}

var styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    padding: 15,
  },
  imgContainer: {
    marginTop: 25,
    marginBottom: 25,
    height: 300,
  },
  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 12,
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
  logo: {
    width: 200,
    height: 200,
  },
  logoTitle: {
    top: -10,
    color: 'white',
    fontSize: 36,
    fontWeight: 'bold',
  }
});

const mapStateToProps = (state) => {
  return {
    intro: state.intro
  };
};

module.exports = connect(mapStateToProps)(Intro);
