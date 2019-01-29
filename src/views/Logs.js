import React from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, Image } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import { compose } from 'recompose';
import { connect } from 'react-redux';
import PopoverTooltip from 'react-native-popover-tooltip';
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
    marginLeft: 10,
    textAlign: 'center',
  },
});

const itemStyle = EStyleSheet.create({
  container: {
    flexDirection: 'row',
    marginLeft: 10,
    borderColor: '$borderColor',
    borderWidth: '$borderWidth',
    borderRadius: '$borderRadius',
    padding: 5,
  },
  name: {
    marginRight: 5,
  },
  icon: {
    width: 24,
    height: 24,
  },
});

const ResourceItem = ({ resource, stateResources }) => (
  <PopoverTooltip
    buttonComponent={
      <View style={itemStyle.container}>
        <Text style={itemStyle.name}>
          {stateResources[resource.name].value}
        </Text>
        {resource.icon && (
          <Image style={itemStyle.icon} source={resource.icon} />
        )}
        {!resource.icon && <Text>{`${resource.name}`}</Text>}
      </View>
    }
    items={[{ label: resource.name, onPress: () => {} }]}
  />
);
ResourceItem.propTypes = {
  resource: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  stateResources: PropTypes.object.isRequired,
};

const LogContainer = ({ resources, unlockedResources, logs }) => (
  <View style={styles.container}>
    <View style={styles.resourceContainer}>
      {unlockedResources.map(resource => (
        <ResourceItem
          key={resource.name}
          resource={resource}
          stateResources={resources}
        />
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
