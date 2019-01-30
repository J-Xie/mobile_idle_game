import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import { View } from 'react-native';
import { Text } from './components';

const styles = EStyleSheet.create({
  container: {
    margin: 'auto',
    textAlign: 'center',
    flexDirection: 'row',
  },
  text: {
    color: '$textColor',
  },
});

export default ({ costs, style }) => (
  <View style={[styles.container, style]}>
    <Text>Cost: </Text>
    <View>
      {Object.keys(costs).map(key => (
        <Text key={key}>
          {costs[key]} {key}
        </Text>
      ))}
    </View>
  </View>
);
