import React from 'react';
import { compose, withProps } from 'recompose';
import { Button, Text } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectTheme } from '../../redux/settings/selector';

const buttonStyle = {
  light: {
    info: true,
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
    <Text>{text}</Text>
  </Button>
);

ThemedButton.propTypes = {
  text: PropTypes.string.isRequired,
  selected: PropTypes.bool,
};

ThemedButton.defaultProps = {
  selected: false,
};

export default compose(
  connect(state => ({ theme: selectTheme(state) })),
  withProps(props =>
    props.selected ? buttonStyle.selected : buttonStyle[props.theme]
  )
)(ThemedButton);
