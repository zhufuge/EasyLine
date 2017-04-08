'use strict';

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Animated,
} from 'react-native';

import { connect } from 'react-redux';
import { setMatrixFromList, removeMatrix } from '../../actions';
import { C_BASE } from '../../common/ELColors';

class InnerListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slide: new Animated.Value(0),
      showDelete: false,
    };
  }

  render() {
    const matrix = this.props.matrix;
    return (
      <View
        style={styles.container}>
        <TouchableOpacity
          delayPressIn={100}
          delayPressOut={100}
          onLongPress={() => this.onLongPress()}
          onPress={() => this.onPress()}
          style={styles.itemTouchable}>
          <Text style={styles.itemName}>{matrix.name}</Text>
          <Text style={styles.itemCR}>{`(${matrix.row}, ${matrix.col})`}</Text>
          <Text style={styles.itemData}>{this.firstRowInfo(matrix.matrix)}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.dispatch(removeMatrix(matrix))}>
          <Animated.View
            style={[
              styles.deleteButton,
              {width: (this.state.slide || 0)}
            ]}>
            <Text style={styles.deleteLabel}>删除</Text>
          </Animated.View>
        </TouchableOpacity>
      </View>
    );
  }

  onPress() {
    if (this.state.showDelete) {
      const showDelete =  !this.state.showDelete;
      this.setState({showDelete});
      this.slide(showDelete);
    } else {
      this.props.dispatch(setMatrixFromList(this.props.matrix));
      this.props.drawer.closeDrawer();
    }
  }

  onLongPress() {
    const showDelete =  !this.state.showDelete;
    this.setState({showDelete});
    this.slide(showDelete);
  }

  slide(isIn=true) {
    Animated.timing(
      this.state.slide, {
        toValue: isIn ? 72 : 0,
        duration: 300,
      }
    ).start();
  }

  firstRowInfo(matrix) {
    const first = matrix[0];
    var info = first.join(' ');
    if (info.length <= 12) {
      return info;
    } else {
      return info.substr(0, 12) + '...';
    }
  }
}

var styles = StyleSheet.create({
  container: {
    height: 54,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderBottomWidth: 1,
    borderBottomColor: C_BASE,
  },
  deleteButton: {
    width: 0,
    height: 54,
    backgroundColor: '#dd4400',
  },
  deleteLabel: {
    position: 'absolute',
    top: 16,
    left: 20,
    height: 20,
    width: 40,
    fontSize: 15,
    fontWeight: '100',
    color: 'white',
  },
  itemTouchable: {
    height: 54,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemName: {
    width: 64,
    color: C_BASE,
    fontWeight: 'bold',
    fontSize: 28,
    textAlign: 'center',
  },
  itemCR: {
    width: 54,
    color: C_BASE,
    fontSize: 14,
    textAlign: 'center',
    paddingTop: 4,
  },
  itemData: {
    marginLeft: 16,
    color: '#999',
    paddingTop: 5,
  },
});

const mapStateToProps = (state, ownProps) => {
  return {
    matrix: state.matrixList[ownProps.index]
  };
};

module.exports = connect(mapStateToProps)(InnerListItem);
