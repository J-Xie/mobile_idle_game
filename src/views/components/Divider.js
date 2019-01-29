import React from 'react';
import PropTypes from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';
import { View } from 'react-native';

const styles = EStyleSheet.create({
  divider: {
    flex: 1,
    borderBottomColor: '$textColor',
    borderBottomWidth: 1,
    margin: 20,
  },
});

const Divider = ({ style, ...props }) => (
  <View style={[styles.divider, style]} {...props} />
);

Divider.propTypes = {
  style: PropTypes.object,
};
Divider.defaultProps = {
  style: {},
};

export default Divider;
