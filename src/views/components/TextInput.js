import React from 'react';
import { TextInput } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectTheme } from '../../redux/settings/selector';

const color = {
  light: 'black',
  dark: 'white',
};

const styles = EStyleSheet.create({
  input: {
    color: '$textColor',
  },
});

const ThemedTextInput = ({ theme, style, ...props }) => (
  <TextInput
    placeholderTextColor={color[theme]}
    underlineColorAndroid={color[theme]}
    style={[styles.input, style]}
    {...props}
  />
);

ThemedTextInput.propTypes = {
  theme: PropTypes.string.isRequired,
  style: TextInput.propTypes.style,
};
ThemedTextInput.defaultProps = {
  style: null,
};

export default connect(state => ({ theme: selectTheme(state) }))(
  ThemedTextInput
);
