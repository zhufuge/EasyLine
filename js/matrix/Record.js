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
import { C_BASE, C_INVERT } from '../common/ELColors';

class Record extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDet: false,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.showDet === false && nextState.det === this.state.showDet) {
      return false;
    }
    return true;
  }

  render() {
    const displayDet = () => {
      if (this.state.showDet) {
        const det = this.props.det;
        if (det === 'NaN') return '行≠列';
        if (Math.round(det) === det) return det + '';
        return det.toPrecision(4) + '';
      }
      return '行列值';
    };

    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.detContainer}
          onPress={() => this.setState({showDet: !this.state.showDet})}>
          <Text
            style={[
              styles.det,
              this.state.showDet ? {backgroundColor: C_INVERT + 'cc'} : {}
            ]}>{displayDet()}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.recordContainer}>
          <Text style={styles.rank}>操作记录</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.rankContainer}>
          <Text style={styles.rank}>秩</Text>
        </TouchableOpacity>
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
  detContainer: {
    flex: 3,
    marginRight: 4,
  },
  det: {
    backgroundColor: C_BASE || '#28b0bc',
    flex: 1,

    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  recordContainer: {
    flex: 9,
    marginRight: 4,
  },
  record: {
    backgroundColor: C_BASE || '#28b0bc',
  },
  rankContainer: {
    flex: 3,
  },
  rank: {
    backgroundColor: C_BASE || '#28b0bc',
    flex: 1,

    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

module.exports = connect(mapStateToProps)(Record);
