'use strict';

import React, { Component } from 'react';
import {
  Alert,
  View,
  StyleSheet,
  Image,
} from 'react-native';
import AppIntro from 'react-native-app-intro';
import { connect } from 'react-redux';
import { doneIntro } from '../actions';

const Logo = require('./img/ELLOGO.png');

class Intro extends Component {
  onBtnHandle = (index) => {
    if (this.props.intro) {
      this.props.dispatch(doneIntro());
    }
    this.props.navigator.pop();
  }

  render() {
    const pageArray = [{
      title: 'Page 1',
      description: 'Description 1',
      backgroundColor: '#099c',
      fontColor: '#fff',
      level: 10,
    }, {
      title: 'Page 2',
      description: 'Description 2',
      backgroundColor: '#f90c',
      fontColor: '#fff',
      level: 10,
    }, {
      title: 'Page 3',
      description: 'Description 3',
      backgroundColor: '#f20c',
      fontColor: '#fff',
      level: 10,
    }, {
      title: 'EasyLine',
      img: Logo,
      imgStyle: {
        marginTop: 120,
      },
      backgroundColor: '#ddd',
      fontColor: '#fff',
      level: 20,
    }];

    return (
      <AppIntro
        skipBtnLabel='跳过'
        doneBtnLabel='进入'
        onDoneBtnClick={this.onBtnHandle}
        onSkipBtnClick={this.onBtnHandle}
        pageArray={pageArray}
        />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    intro: state.intro
  };
};

module.exports = connect(mapStateToProps)(Intro);
