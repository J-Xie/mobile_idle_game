import React from 'react';
import PropTypes from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';
import { View, ViewPropTypes } from 'react-native';
import { map } from 'lodash';

import { Text } from './components';

const styles = EStyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cost: {
    textAlign: 'center',
    fontSize: 12,
  },
});

const Costs = ({ costs, style, textStyle }) => (
  <View style={[styles.container, style]}>
    <Text style={[styles.cost, textStyle]}>
      {map(costs, (value, resName) => `${value} ${resName}`).join('  ')}
    </Text>
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
