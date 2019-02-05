import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import { View } from 'react-native';

const itemStyle = EStyleSheet.create({
  container: {
    flexDirection: 'row',
    marginLeft: 10,
    marginBottom: 10,
    borderColor: '$borderColor',
    borderWidth: '$borderWidth',
    borderRadius: '$borderRadius',
    padding: 5,
  },
});

const Tag = ({ style, children }) => (
  <View style={[itemStyle.container, style]}>{children}</View>
);

export default Tag;
