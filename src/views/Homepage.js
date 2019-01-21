import React from 'react';
import {
  compose, withState, withHandlers, onlyUpdateForPropTypes, lifecycle,
} from 'recompose';
import { connect } from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';

import {
  Container, Content, Drawer, Button, Text,
} from 'native-base';

import AppHeader from './navigation/Header';
import Sidebar from './navigation/Sidebar';

import { selectTheme } from '../redux/settings/selector';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    paddingLeft: 15,
    paddingRight: 15,
    margin: 'auto',
  },
});

const Homepage = ({
  setDrawer, openDrawer, closeDrawer, navigation,
}) => (
  console.log('azeaze')
  || (
  <Container style={styles.container}>
    <Drawer
      ref={(ref) => { setDrawer(ref); }}
      content={<Sidebar navigator={navigation} />}
      onClose={closeDrawer}
    >
      <AppHeader navigation={navigation} />
      <Button bordered info style={styles.button} onPress={() => console.log(navigation)}>
        <Text>Owned resources</Text>
      </Button>
      <Button bordered info>
        <Text>Info</Text>
      </Button>
      <Button onPress={() => navigation.navigate('Resources')}>
        <Text>List</Text>
      </Button>
    </Drawer>
  </Container>
  )
);

Homepage.propTypes = {};

const mapStateToProps = state => ({
  theme: selectTheme(state),
});

export default compose(
  connect(mapStateToProps),
  withState('drawer', 'setDrawer', null),
  lifecycle({
    componentDidMount() {
      const theme = this.props.theme ? '' : '';
      EStyleSheet.build(theme);
    },
  }),
  // withHandlers({
  // openDrawer: props => () => props.navigation.openDrawer(),
  // closeDrawer: props => () => props.navigation.closeDrawer(),
  // closeDrawer: props => () => props.drawer._root.close(),
  // }),
  onlyUpdateForPropTypes,
)(Homepage);
