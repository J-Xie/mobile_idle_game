import React from 'react';
import {
  compose, withState, withHandlers, onlyUpdateForPropTypes,
} from 'recompose';
import { StyleSheet, View } from 'react-native';
import { Switch, Route, Link } from 'react-router-native';

import {
  Container, Content, Drawer, Button, Text,
} from 'native-base';

import AppHeader from './navigation/Header';
import Sidebar from './navigation/Sidebar';
import ResourceList from './ResourceListView';
import Income from './Income';


const styles = StyleSheet.create({
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
  setDrawer, openDrawer, closeDrawer, navigator,
}) => (
  <Container style={styles.container}>
    <Drawer
      ref={(ref) => { setDrawer(ref); }}
      content={<Sidebar navigator={navigator} />}
      onClose={closeDrawer}
    >
      <AppHeader openDrawer={openDrawer} />
      <Button bordered info style={styles.button} onPress={() => navigator.navigate('Resources')}>
        <Text>Owned resources</Text>
      </Button>
      <Button bordered info>
        <Text>Info</Text>
      </Button>
      <Button onPress={() => navigator.navigate('Resources')}>
        <Text>List</Text>
      </Button>
      {/* <Switch>
            <Route path='/income' component={Income} />
            <Route path='/resourceList' component={ResourceList} />
            </Switch> */}
    </Drawer>
  </Container>
);

Homepage.propTypes = {};

export default compose(
  withState('drawer', 'setDrawer', null),
  withHandlers({
    openDrawer: props => () => props.navigation.openDrawer(),
    // closeDrawer: props => () => props.navigation.closeDrawer(),
    // closeDrawer: props => () => props.drawer._root.close(),
  }),
  onlyUpdateForPropTypes,
)(Homepage);
