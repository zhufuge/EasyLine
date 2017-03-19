'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} = ReactNative;

import { connect } from 'react-redux';

class Record extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      det: false,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.det === false && nextState.det === this.state.det) {
      return false;
    }
    return true;
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={{flex: 3}}
          onPress={() => this.setState({det: !this.state.det})}>
          <Text style={[
                  styles.det,
                  this.state.det ? {backgroundColor: '#ffbd40cc'} : {}
                ]}>
            {this.state.det ? this.props.det + '' : '行列值'}
          </Text>
        </TouchableOpacity>
        <View style={styles.record}></View>
        <Text style={styles.undo}></Text>
      </View>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    det: state.det
  };
};

var styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 40,
  },
  det: {
    backgroundColor: '#28b0bc',
    flex: 3,
    marginRight: 4,

    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  record: {
    backgroundColor: '#28b0bc',
    flex: 9.6,
    marginRight: 4,
  },
  undo: {
    backgroundColor: '#28b0bc',
    flex: 2,
  },
});

module.exports = connect(mapStateToProps)(Record);
