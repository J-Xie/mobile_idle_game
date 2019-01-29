import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import { View, ScrollView } from 'react-native';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import {
  selectForest,
  selectPlain,
  selectCave,
} from '../redux/resource/selector';

import { Button, ProgressButton } from './components';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
  actions: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingTop: 30,
  },
  logContainer: {
    margin: 10,
  },
});

const Exploration = () => (
  <View style={styles.container}>
    {/* <View style={styles.actions}>
      <Button text="Explore island" />
    </View> */}
    <ProgressButton text="Explore island" />
  </View>
);

export default compose(
  connect(state => ({
    forest: selectForest(state),
    plain: selectPlain(state),
    cave: selectCave(state),
  }))
)(Exploration);
