import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';
import {
  compose,
  withState,
  withHandlers,
  setPropTypes,
  defaultProps,
} from 'recompose';
import Text from '../Text';

import withControlledInterval from '../../../hoc/withControllerInterval';

const Progress = ({ percent, children }) => (
  <View
    style={{
      marginTop: 10,
      minHeight: 50,
      minWidth: 100,
      width: 250,
      // backgroundColor: 'black',
      borderRadius: 5,
      borderWidth: 1,
      borderColor: 'white',
    }}
  >
    {percent < 1 && (
      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <View
          style={{
            borderBottomRightRadius: 5,
            borderBottomLeftRadius: 5,
            width: `${percent * 100}%`,
            height: 5,
            backgroundColor: 'green',
          }}
        />
      </View>
    )}
    <View
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children}
    </View>
  </View>
);

const ProgressButton = ({ text, cd, cooldown, onPress, ProgressComponent }) => (
  <TouchableOpacity onPress={onPress} disabled={cd > 0}>
    <ProgressComponent percent={Math.max(0, 1 - cd / cooldown)}>
      <Text>{text}</Text>
    </ProgressComponent>
  </TouchableOpacity>
);
ProgressButton.propTypes = {
  text: PropTypes.string,
  cd: PropTypes.number.isRequired,
  cooldown: PropTypes.number.isRequired,
  onPress: PropTypes.func.isRequired,
  ProgressComponent: PropTypes.func,
};
ProgressButton.defaultProps = {
  text: '',
  ProgressComponent: Progress,
};

export default compose(
  setPropTypes({}),
  defaultProps({
    cooldown: 2 * 1000,
    onPress: () => {},
  }),
  withState('cd', 'setCd', 0),
  withControlledInterval(
    'startCountdown',
    'stopCountdown',
    (props, delay, stopCountdown) => {
      const newCd = Math.max(0, props.cd - delay);
      props.setCd(newCd);
      if (!newCd) {
        stopCountdown();
        props.onPress();
      }
    },
    10
  ),
  withHandlers({
    onPress: props => () => {
      props.setCd(props.cooldown);
      props.startCountdown();
    },
  })
)(ProgressButton);
