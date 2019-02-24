import React from 'react';
import { ViewPropTypes } from 'react-native';
import { compose, withProps } from 'recompose';
import { Button } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Text from './Text';
import { selectTheme } from '../../redux/settings/selector';

const buttonStyle = {
  light: {
    dark: true,
    bordered: true,
  },
  dark: {
    light: true,
    bordered: true,
  },
  selected: {
    info: true,
  },
};

const ThemedButton = ({ text, style, ...props }) => (
  <Button style={[style]} {...props}>
    <Text>{text.toUpperCase()}</Text>
  </Button>
);

ThemedButton.propTypes = {
  text: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  style: ViewPropTypes.style,
};

ThemedButton.defaultProps = {
  selected: false,
  style: null,
};

export default compose(
  connect(state => ({ theme: selectTheme(state) })),
  withProps(props =>
    props.selected ? buttonStyle.selected : buttonStyle[props.theme]
  )
)(ThemedButton);
