import React from 'react';
import PropTypes from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';
import { View, ViewPropTypes } from 'react-native';

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

Tag.propTypes = {
  style: ViewPropTypes.style,
  // children: PropTypes.arrayOf(PropTypes.element.isRequired).isRequired,
};

Tag.defaultProps = {
  style: null,
};

export default Tag;
