import React from 'react';
import { map } from 'lodash';
import { View } from 'react-native';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Button } from './components';

import { buyResources } from '../redux/resource/action';
import { selectUnlockedBuildings } from '../redux/resource/selector';

const BuildingView = ({ building, buyResources }) => (
  <Button
    text={building.name}
    onPress={() => buyResources({ type: building.name, qty: 1 })}
  />
);
const Building = compose(
  connect(
    null,
    { buyResources }
  )
)(BuildingView);

const BuildingsView = ({ unlockedBuildings }) => (
  <View>
    {map(unlockedBuildings, building => (
      <Building key={building.name} building={building} />
    ))}
  </View>
);

export default compose(
  connect(state => ({
    unlockedBuildings: selectUnlockedBuildings(state),
  }))
)(BuildingsView);
