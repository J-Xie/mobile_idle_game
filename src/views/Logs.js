import React from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, Image } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import { compose } from 'recompose';
import { connect } from 'react-redux';
import {
  selectResources,
  selectUnlockedResources,
  selectLogs,
} from '../redux/resource/selector';

import { Text } from './components';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
  logContainer: {
    margin: 10,
  },
  resourceContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  text: {
    color: '$textColor',
    textAlign: 'center',
  },
});

const LogContainer = ({ resources, unlockedResources, logs }) => (
  <View style={styles.container}>
    <View style={styles.resourceContainer}>
      {unlockedResources.map(resource => (
        <Text key={resource.name} style={styles.text}>
          {resources[resource.name].value}
          {resource.icon && (
            <Image style={{ width: 24, height: 24 }} source={resource.icon} />
          )}
          {!resource.icon && ` ${resource.name}`}
        </Text>
      ))}
    </View>
    <ScrollView style={styles.logContainer}>
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
);

LogContainer.propTypes = {
  resources: PropTypes.object.isRequired,
  unlockedResources: PropTypes.array.isRequired,
  logs: PropTypes.array.isRequired,
};

export default compose(
  connect(state => ({
    resources: selectResources(state),
    unlockedResources: selectUnlockedResources(state),
    logs: selectLogs(state),
  }))
)(LogContainer);
