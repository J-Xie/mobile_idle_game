import React from 'react';
import PropTypes from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';
import _ from 'lodash';
import { compose, withHandlers } from 'recompose';
import { View, ScrollView } from 'react-native';

import { connect } from 'react-redux';
import {
  selectResources,
  selectResource,
  selectUnlockedPicks,
} from '../redux/resource/selector';
import { addResources } from '../redux/resource/action';

import { Button, Text } from './components';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$bgColor',
  },
  actions: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingTop: 30,
  },
  logContainer: {
    margin: 10,
    textAlign: 'center',
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

const ResourceListView = ({ pickRessource, logs, picks, resources }) => (
  <View style={styles.container}>
    <View style={styles.actions}>
      {picks.map(pick => (
        <Button
          key={pick.name}
          onPress={() => pickRessource(pick.name)}
          style={styles.button}
          text={pick.buttonText}
        />
      ))}
    </View>

    <View style={{ flex: 1 }}>
      <ScrollView style={styles.logContainer}>
        {picks.map(pick => (
          <Text key={pick.name} style={styles.text}>
            You have {resources[pick.name].value} {pick.name}.
          </Text>
        ))}
        {logs &&
          logs.map((log, idx) => (
            <Text
              style={{
                ...styles.text,
                opacity: Math.max(0, logs.length - idx) / logs.length,
              }}
              key={idx.toString()}
            >
              {log}
            </Text>
          ))}
      </ScrollView>
    </View>
  </View>
);

ResourceListView.propTypes = {
  logs: PropTypes.arrayOf(PropTypes.string),
  picks: PropTypes.array,
  resources: PropTypes.object.isRequired,
  pickRessource: PropTypes.func.isRequired,
};
ResourceListView.defaultProps = {
  logs: [],
  picks: [],
};

const mapStateToProps = state => ({
  resources: selectResources(state),
  logs: selectResource(state, 'logs'),
  picks: selectUnlockedPicks(state),
});

const mapDispatchToProps = {
  addResources,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withHandlers({
    pickRessource: props => type => props.addResources({ type, qty: 1 }),
  })
)(ResourceListView);
