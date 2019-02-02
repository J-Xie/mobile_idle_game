import React from 'react';
import PropTypes from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';
import { View, ViewPropTypes } from 'react-native';
import { Text } from './components';

const styles = EStyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cost: {
    textAlign: 'center',
    marginTop: -4,
    fontSize: 12,
  },
});

const Costs = ({ costs, style }) => (
  <View>
    <View style={[styles.container, style]}>
      {Object.keys(costs).map(key => (
        <Text style={styles.cost} key={key}>{`${costs[key]} ${key}  `}</Text>
      ))}
    </View>
  </View>
);
Costs.propTypes = {
  costs: PropTypes.object.isRequired,
  style: ViewPropTypes.style,
};
Costs.defaultProps = {
  style: null,
};

export default Costs;
