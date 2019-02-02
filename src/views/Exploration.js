import React from 'react';
import PropTypes from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';
import { View, ScrollView } from 'react-native';
import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { find, sample } from 'lodash';

import {
  selectResource,
  selectMap,
  selectResources,
} from '../redux/resource/selector';

import { Text, ProgressButton } from './components';
import { withNotif, withAddNotif } from './components/Notif';
import { explorationNotifs } from '../logs/notifs';
import {
  eventTypeRange,
  generateExplorationEvent,
  createEvent,
} from '../config/events';
import { addMultResources } from '../redux/resource/action';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actions: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingTop: 30,
  },
  infos: {
    alignItems: 'center',
  },
});

const Exploration = ({ forest, plain, cave, onExplore }) => (
  <View style={styles.container}>
    {/* <View style={styles.actions}>
      <Button text="Explore island" />
    </View> */}
    <ProgressButton
      style={{ flex: 1 }}
      text="Explore island"
      onPress={onExplore}
      cooldown={200}
    />
    <View style={styles.infos}>
      <Text>{forest.total}/??? forest</Text>
      <Text>{plain.total}/??? plain</Text>
      <Text>{cave.total}/??? cave</Text>
    </View>
  </View>
);
export default compose(
  connect(
    state => ({
      map: selectMap(state),
      stateRes: selectResources(state),
      forest: selectResource(state, 'forest'),
      plain: selectResource(state, 'plain'),
      cave: selectResource(state, 'cave'),
    }),
    { addMultResources }
  ),
  withAddNotif(),
  withHandlers({
    onExplore: ({
      addNotif,
      map,
      stateRes,
      addMultResources: addResources,
    }) => () => {
      const event = createEvent(map, stateRes);
      if (event && event.notif) {
        addNotif(event.notif.title, event.notif.message, event.notif.type);
      }
      if (event.resFound) {
        addResources(event.resFound);
      }
    },
  })
)(Exploration);
