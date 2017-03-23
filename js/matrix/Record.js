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
      showRank: false,
    };
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

    const displayRank = () => {
      return this.state.showRank ? this.props.rank : '秩';
    };

    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.detContainer}
          onPress={() => this.setState({showDet: !this.state.showDet})}>
          <Text
            style={[
              styles.det,
              this.state.showDet ? styles.onShow : {}
            ]}>{displayDet()}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.recordContainer}>
          <Text style={styles.rank}>操作记录</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.setState({showRank: !this.state.showRank})}
          style={styles.rankContainer}>
          <Text
            style={[
              styles.rank,
              this.state.showRank ? styles.onShow : {}
            ]}>{displayRank()}</Text>
        </TouchableOpacity>
      </View>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    det: state.det,
    rank: state.rank
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
  onShow: {
    backgroundColor: C_INVERT + 'cc'
  }
});

module.exports = connect(mapStateToProps)(Record);
