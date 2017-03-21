'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  Picker,
} = ReactNative;

var Header = require('../common/BackHeader');
import NumberPicker from '../common/NumberPicker';
import { C_BASE } from '../common/ELColors';

class Settings extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      defaultCol: 3,
      defaultRow: 3,
      storageSize: 6,
      nightMode: false,
    };
  }
  render() {
    const prevChildren = (text) => <Text style={styles.itemLabel}>{text}</Text>;
    return (
      <View style={styles.container}>
        <Header navigator={this.props.navigator} title='设置'/>
        <ScrollView
          style={styles.body}>
          <NumberPicker
            min={1}
            selectedNumber={3}
            style={styles.item}
            numberStyles={styles.itemValue}
            prevChildren={prevChildren('默认行数')}
            />
          <NumberPicker
            min={1}
            selectedNumber={3}
            style={styles.item}
            numberStyles={styles.itemValue}
            prevChildren={prevChildren('默认列数')}
            />
          <NumberPicker
            min={1}
            max={26}
            selectedNumber={6}
            style={styles.item}
            numberStyles={styles.itemValue}
            prevChildren={prevChildren('保存数量')}
            />
          <TouchableOpacity
            onPress={() => this.setState({nightMode: !this.state.nightMode})}
            activeOpacity={1}
            style={styles.item}>
            <Text style={styles.itemLabel}>夜间模式</Text>
            <Switch
              onValueChange={() => this.setState({nightMode: !this.state.nightMode})}
              value={this.state.nightMode}
              />
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    paddingVertical: 18,
    backgroundColor: '#e6e6e6',
  },
  item: {
    height: 54,
    width: '100%',
    marginBottom: 6,
    backgroundColor: 'white',

    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemLabel: {
    fontSize: 16,
    color: '#333',
  },
  itemValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 20,
  }
});

module.exports = Settings;
