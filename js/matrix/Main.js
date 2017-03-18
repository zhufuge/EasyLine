'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView
} from 'react-native';

var Description = require('./Description');
var MatrixPanel = require('./MatrixPanel');
var Record = require('./Record');

class MatrixMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      col: 3,
      row: 3,
      det: 0,
    };

    this.setCol = this.setCol.bind(this);
    this.setRow = this.setRow.bind(this);
    this.setDet = this.setDet.bind(this);
  }
  setCol(col) {this.setState({col: col});}
  setRow(row) {this.setState({row: row});}
  setDet(det) {this.setState({det: det});}

  render() {
    return (
      <ScrollView style={styles.container}>
        <Description
          setCol={(col) => this.setCol(col)}
          setRow={(row) => this.setRow(row)}>
        </Description>
        <MatrixPanel
          type={this.props.type}
          col={this.state.col}
          row={this.state.row}
          setDet={(det) => this.setDet(det)}>
        </MatrixPanel>
        <Record
          det={this.state.det}>
        </Record>
      </ScrollView>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginTop: 78,
    marginLeft: 20,
    marginRight: 20,
  },
});

module.exports = MatrixMain;
