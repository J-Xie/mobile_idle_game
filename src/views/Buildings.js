import React from 'react';
import PropTypes from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';
import { View, Image } from 'react-native';
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
import { allResources } from '../config/resources';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
  actions: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    marginBottom: 10,
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
  addMarge: {
    margin: 5,
  },
  icon: {
    width: 24,
    height: 24,
  },
});

const BuildingView = ({ building, buyResources }) => (
  <View
    key={building.name}
    style={{
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Button
      text={building.buttonText}
      onPress={() => buyResources({ type: building.name, qty: 1 })}
      style={styles.addMarge}
    />
    <Cost
      style={{ flexDirection: 'row', marginLeft: 10 }}
      costs={building.cost}
    />
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
    {/* <View>
      <Text style={styles.addMarge}>
        {resources.villager.value}/{resources.availableVillager.total}
        <Image style={styles.icon} source={allResources.villager.icon} />
      </Text>
      <Text style={styles.addMarge}>
        Available space: {resources.forest.value} forest {resources.plain.value}{' '}
        plain {resources.cave.value} cave
      </Text>
    </View> */}
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
