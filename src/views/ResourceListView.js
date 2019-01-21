import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {
  compose, withHandlers, withProps,
} from 'recompose';
import { StyleSheet, View } from 'react-native';
import {
  Content, Button, Text,
} from 'native-base';

import { connect } from 'react-redux';
import { selectWood, selectLogs } from '../redux/resource/selector';
import { selectMaxLog } from '../redux/settings/selector';
import { addWood } from '../redux/resource/action';

import AppHeader from './navigation/Header';

import { woodLogs } from '../logs/logs';
import withInterval from '../hoc/withInterval';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingTop: 30,
  },
  button: {
    margin: 'auto',
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 16,
  },
  logContainer: {
    flex: 2,
    margin: 10,
    textAlign: 'center',
  },
});

const ResourceListView = ({
  wood, pickRessource, navigation, logs,
}) => (
  <Content style={{ flex: 1 }}>
    <AppHeader navigation={navigation} />
    <View style={styles.container}>
      <Button large info bordered onPress={pickRessource} style={styles.button}>
        <Text style={styles.buttonText}>Pick up wood</Text>
      </Button>
      {/* {totalGold >= 30
        ? (gold >= 30 + (5 * villager)
          ? (
            <Button large onPress={() => onIncrementVillager(30 + (5 * villager))} bordered info>
              <Text style={styles.buttonText}>
                    Get villager
                {'\n'}
                    Cost:
                {' '}
                {30 + (5 * villager)}
              </Text>
            </Button>
          )
          : (
            <Button
              large
              disabled
              bordered
              onPress={() => Toast.show({
                text: 'Not!',
                buttonText: 'Okay',
              })}
            >
              <Text style={styles.buttonText}>
                    Get villager
                {'\n'}
                    Cost:
                {' '}
                {30 + (5 * villager)}
              </Text>
            </Button>
          ))
        : null
        } */}

      {/* <Text>{`You have ${villager} villagers.`}</Text> */}
    </View>
    <Text>{`You have ${wood} wood.`}</Text>
    <View style={styles.logContainer}>
      { logs && logs.map((log, idx) => <Text style={{ opacity: Math.max(0, (20 - idx)) / 20 }} key={idx}>{log}</Text>) }
    </View>
  </Content>
);

ResourceListView.propTypes = {
  wood: PropTypes.number.isRequired,
  logs: PropTypes.arrayOf(PropTypes.string),
};
ResourceListView.defaultProps = {
  logs: [],
};

const mapStateToProps = state => ({
  wood: selectWood(state),
  logs: selectLogs(state),
  maxLogs: selectMaxLog(state),
});

const mapDispatchToProps = {
  incWood: addWood,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withProps({
    incStep: 1, selectMaxLog,
  }),
  withHandlers({
    pickRessource: ({ incWood, incStep }) => () => incWood({ nbWood: incStep }),
  }),
)(ResourceListView);
