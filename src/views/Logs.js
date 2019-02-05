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

import { Text, Tag } from './components';

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
    fontSize: 12,
  },
  labelSize: {
    fontSize: 12,
  },
  icon: {
    width: 15,
    height: 15,
  },
});

const ResourceItem = ({ resource, stateResources }) => (
  <PopoverTooltip
    buttonComponent={
      <Tag>
        <Text style={itemStyle.name}>
          {Math.round(stateResources[resource.name].value)}
        </Text>
        {Boolean(resource.icon) && (
          <Image style={itemStyle.icon} source={resource.icon} />
        )}
        {!resource.icon && (
          <Text style={itemStyle.labelSize}>{`${resource.name}`}</Text>
        )}
      </Tag>
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
