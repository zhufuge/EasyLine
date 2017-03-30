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
const Algm = require('../common/Algebra.js');

const Det = (matrix) => (matrix.length === matrix[0].length)
      ? Algm.det(matrix) : 'NaN';

class Record extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDet: false,
      showRank: false,
      det: 0,
      rank: 0,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.showDet) {
      this.setState({det: Det(nextProps.matrix)});
    }

    if (this.state.showRank) {
      this.setState({rank: Algm.rank(nextProps.matrix)});
    }
  }

  render() {
    const displayDet = () => {
      if (this.state.showDet) {
        const det = this.state.det;
        if (det === 'NaN') return '行≠列';
        if (Math.round(det) === det) return det + '';
        return det.toPrecision(4) + '';
      }
      return '行列值';
    };

    const displayRank = () => this.state.showRank ? this.state.rank : '秩';

    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.detContainer}
          onPress={() => this._onPressDet()}>
          <Text
            style={[
              styles.det,
              this.state.showDet ? styles.onShow : {}
            ]}>{displayDet()}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={true}
          style={styles.recordContainer}>
          <Text style={styles.rank}>操作记录</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this._onPressRank()}
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
  _onPressDet() {
    var det,
        show = !this.state.showDet;
    if (show) det = Det(this.props.matrix);
    det = (det === void 0) ? this.state.det : det;
    this.setState({showDet: show, det: det});
  }
  _onPressRank() {
    var rank,
        show = !this.state.showRank;
    if (show) rank = Algm.rank(this.props.matrix);
    rank = (rank === void 0) ? this.state.rank : rank;
    this.setState({showRank: show, rank: rank});
  }
};

const mapStateToProps = (state) => {
  return {
    matrix: state.matrix.matrix,
  };
};

var styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 40,
  },
  detContainer: {
    flex: 3,
    marginRight: 1,
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
    marginRight: 1,
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
    backgroundColor: C_INVERT + 'cc',
  }
});

module.exports = connect(mapStateToProps)(Record);
