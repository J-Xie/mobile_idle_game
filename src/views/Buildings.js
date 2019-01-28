import React from 'react';
import PropTypes from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';
import { View } from 'react-native';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Button, Text } from './components';
import Cost from './Cost';
import LogContainer from './Logs';

import { buyResources } from '../redux/resource/action';
import {
  selectUnlockedBuildings,
  selectResources,
} from '../redux/resource/selector';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
  actions: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    paddingTop: 30,
  },
  button: {
    margin: 'auto',
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 16,
    color: '$textColor',
  },
  text: {
    color: '$textColor',
    textAlign: 'center',
  },
});

const BuildingView = ({ building, buyResources }) =>
  console.log(building.cost) || (
    <View
      key={building.name}
      style={{
        flexDirection: 'row',
        marginBottom: 15,
      }}
    >
      <Button
        text={building.buttonText}
        onPress={() => buyResources({ type: building.name, qty: 1 })}
      />
      <Cost costs={building.cost} />
    </View>
  );
const Building = compose(
  connect(
    null,
    { buyResources }
  )
)(BuildingView);

const BuildingsView = ({ resources, unlockedBuildings }) => (
  <View style={styles.container}>
    <View>
      <Text>
        Population: {resources.villager.value}/
        {resources.availableVillager.total}
      </Text>
      <Text>
        Available space: {resources.forest.value} forest {resources.plain.value}{' '}
        plain {resources.cave.value} cave
      </Text>
    </View>
    <View style={styles.actions}>
      {unlockedBuildings.map(building => (
        <Building key={building.name} building={building} />
      ))}
    </View>
    <LogContainer />
  </View>
);

BuildingsView.propTypes = {
  resources: PropTypes.object.isRequired,
};

export default compose(
  connect(state => ({
    resources: selectResources(state),
    unlockedBuildings: selectUnlockedBuildings(state),
  }))
)(BuildingsView);
