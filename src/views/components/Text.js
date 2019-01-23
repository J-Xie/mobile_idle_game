import React from 'react';
// import PropTypes from 'prop-types';
import { Text } from 'native-base';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  text: {
    color: '$textColor',
  },
});

const ThemedText = ({ style, ...props }) => (
  <Text style={[styles.text, style]} {...props} />
);

ThemedText.propTypes = {};

export default ThemedText;
