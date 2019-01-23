import React from 'react';
import PropTypes from 'prop-types';
import { compose, withState, onlyUpdateForPropTypes } from 'recompose';
import { connect } from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';

import { Container, Button } from 'native-base';

import AppHeader from './navigation/Header';
import { Text } from './components';

import { selectTheme } from '../redux/settings/selector';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$bgColor',
  },
  button: {
    paddingLeft: 15,
    paddingRight: 15,
    margin: 'auto',
  },
});

const Homepage = ({ navigation, themeKey }) => (
  <Container style={styles.container} key={themeKey}>
    {/* <Drawer
      ref={(ref) => { setDrawer(ref); }}
      content={<Sidebar navigator={navigation} />}
      onClose={closeDrawer}
    > */}
    <AppHeader navigation={navigation} />
    <Button
      bordered
      info
      style={styles.button}
      onPress={() => console.log(navigation)}
    >
      <Text>Owned resources</Text>
    </Button>
    <Button bordered info>
      <Text>Info</Text>
    </Button>
    <Button onPress={() => navigation.navigate('Resources')}>
      <Text>List</Text>
    </Button>
    {/* </Drawer> */}
  </Container>
);

Homepage.propTypes = {
  theme: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  theme: selectTheme(state),
});

export default compose(
  connect(mapStateToProps),
  withState('drawer', 'setDrawer', null),
  withState('themeKey', 'update'),
  // withPropsOnChange(['theme'], ({ theme: themeName, update }) => {
  //   console.log(theme);
  //   if (!theme[themeName]) {
  //     console.warn('Unknown theme :', themeName);
  //   } else {
  //     EStyleSheet.build(theme[themeName]);
  //   }
  //   update(themeName);
  // }),
  onlyUpdateForPropTypes
)(Homepage);
