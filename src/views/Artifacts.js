import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { ScrollView, View } from 'react-native-gesture-handler';
import {
  selectUnlockedArtifacts,
  selectResources,
} from '../redux/resource/selector';
import { Text } from './components';

const Artifact = ({ resources, unlockedArtifacts }) => (
  <ScrollView>
    {unlockedArtifacts.map(artifact => {
      if (resources[artifact.name].value) {
        return (
          <View key={artifact.name}>
            <Text>{artifact.name}</Text>
            <Text>{artifact.desc}</Text>
          </View>
        );
      }
      return null;
    })}
  </ScrollView>
);
Artifact.propTypes = {
  resources: PropTypes.object.isRequired,
  unlockedArtifacts: PropTypes.array.isRequired,
};

export default compose(
  connect(state => ({
    resources: selectResources(state),
    unlockedArtifacts: selectUnlockedArtifacts(state),
  }))
)(Artifact);
