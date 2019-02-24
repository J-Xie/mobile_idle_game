import React from 'react';
import PropTypes from 'prop-types';
import EStyleSheet, { build } from 'react-native-extended-stylesheet';
import { View, ScrollView, Image } from 'react-native';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Button, Text, Divider } from './components';
import Cost from './Cost';

import { buyResources } from '../redux/resource/action';
import {
  selectUnlockedBuildings,
  selectResources,
} from '../redux/resource/selector';
import { selectTheme } from '../redux/settings/selector';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
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

const itemStyle = EStyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 5,
    paddingHorizontal: 5,
  },
  header: {
    flexDirection: 'row',
    width: '33%',
  },
  actions: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infos: {
    justifyContent: 'center',
    maxWidth: 150,
    flexWrap: 'wrap',
  },
  text: {
    textAlign: 'center',
  },
  actionText: {
    fontSize: 14,
  },
});
const BuildingItem = ({ building, resources, buyResources }) => (
  <View>
    <View key={building.name} style={itemStyle.container}>
      <View style={itemStyle.header}>
        {/* <Image width={32} height={32} source={building.icon || ''} /> */}
        <Text>{building.name}</Text>
      </View>

      <View style={itemStyle.actions}>
        <Button
          text="-"
          onPress={() => buyResources({ type: building.name, qty: -1 })}
        />
        <View style={itemStyle.infos}>
          <Text style={[itemStyle.text, itemStyle.actionText]}>
            {resources[building.name].value}
          </Text>
          <Cost costs={building.cost} />
        </View>
        {(building.name === 'frigate' ||
          building.name === 'caravel' ||
          building.name === 'bark') &&
        (resources.frigate.value ||
          resources.bark.value ||
          resources.caravel.value) ? (
          <Button text="+" disabled />
        ) : (
          <Button
            text="+"
            onPress={() => buyResources({ type: building.name, qty: 1 })}
          />
        )}
      </View>
    </View>
  </View>
);
const Building = compose(
  connect(
    state => ({ resources: selectResources(state) }),
    { buyResources }
  )
)(BuildingItem);

const BuildingsView = ({ unlockedBuildings, theme }) => (
  <View style={styles.container}>
    <ScrollView style={styles.actions}>
      {unlockedBuildings.map(building => (
        <Building key={building.name} building={building} />
      ))}
    </ScrollView>
    {/* <LogContainer /> */}
  </View>
);

BuildingsView.propTypes = {
  // resources: PropTypes.object.isRequired,
};

export default compose(
  connect(state => ({
    theme: selectTheme(state),
    unlockedBuildings: selectUnlockedBuildings(state),
  }))
)(BuildingsView);
