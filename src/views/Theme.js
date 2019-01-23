import React from 'react';
import { View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { compose, withState, withPropsOnChange } from 'recompose';

import { connect } from 'react-redux';
import { selectTheme } from '../redux/settings/selector';
import theme from '../config/theme';

const styles = EStyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: '$bgColor',
  },
});

const Theme = ({ children, themeKey }) => (
  <View style={styles.app}>{children}</View>
);

const mapStateToProps = state => ({
  theme: selectTheme(state),
});

export default compose(
  connect(mapStateToProps),
  withState('themeKey', 'update'),
  withPropsOnChange(['theme'], ({ theme: themeName, update }) => {
    if (!theme[themeName]) {
      console.warn('Unknown theme :', themeName);
    } else {
      EStyleSheet.build(theme[themeName]);
    }
    update(themeName);
  })
)(Theme);
