import React from 'react';
import PropTypes from 'prop-types';
import EStyleSheet, { build } from 'react-native-extended-stylesheet';
import { View, Image } from 'react-native';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Button, Text, Divider } from './components';
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
    // alignItems: 'center',
    // justifyContent: 'center',
    // flexDirection: 'row',
    // flexWrap: 'wrap',
    // marginTop: 10,
    // marginBottom: 10,
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

// const ListItem = ({ header, content }) => {};
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
  text: {
    textAlign: 'center',
  },
  actionText: {
    fontSize: 14,
  },
});
const BuildingItem = ({ building, buyResources }) => (
  <View>
    <View key={building.name} style={itemStyle.container}>
      <View style={itemStyle.header}>
        {/* <Image width={32} height={32} source={building.icon || ''} /> */}
        <Text>{building.name}</Text>
      </View>

      <View style={itemStyle.actions}>
        <Button text="-" />
        <View style={{ justifyContent: 'center' }}>
          <Text style={[itemStyle.text, itemStyle.actionText]}>
            Qty actuelle
          </Text>
          <Cost costs={building.cost} />
        </View>
        <Button text="+" />
      </View>
    </View>
  </View>
);
const Building = compose(
  connect(
    null,
    { buyResources }
  )
)(BuildingItem);

const BuildingsView = ({ unlockedBuildings }) => (
  <View style={styles.container}>
    <View style={styles.actions}>
      {unlockedBuildings.map(building => (
        <Building key={building.name} building={building} />
      ))}
    </View>
    {/* <LogContainer /> */}
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
