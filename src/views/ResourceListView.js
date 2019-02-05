import React from 'react';
import PropTypes from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';
import { compose, withHandlers } from 'recompose';
import { View } from 'react-native';

import { connect } from 'react-redux';
import {
  selectResources,
  selectUnlockedPicks,
} from '../redux/resource/selector';
import { addResources } from '../redux/resource/action';

import { Button } from './components';
import LogContainer from './Logs';

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

const ResourceListView = ({ pickRessource, picks }) => (
  <View style={styles.container}>
    <View style={styles.actions}>
      {picks.map(pick => (
        <View key={pick.name}>
          <Button
            onPress={() => pickRessource(pick.name)}
            style={styles.button}
            text={pick.buttonText}
          />
        </View>
      ))}
    </View>
    <LogContainer />
  </View>
);

ResourceListView.propTypes = {
  picks: PropTypes.array,
  pickRessource: PropTypes.func.isRequired,
};
ResourceListView.defaultProps = {
  picks: [],
};

const mapStateToProps = state => ({
  resources: selectResources(state),
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
