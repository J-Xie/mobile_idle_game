import React from 'react';
import { View } from 'react-native';

import { compose, withState, withHandlers, withProps } from 'recompose';

import { Text } from './components';

// const picksMap = {
//   wood: {},
//   science: {},
// };

// const roles = {
//   lumberjack: {},
//   soldier: {},
//   scout: {},
// };

// const boats = {
//   bark: {},
//   frigate,
//   caravel,
//   liner: {},
// };

// const resourceIds = ['hut', 'study'];

const Income = () => (
  <View>
    <Text>Hello world !</Text>
  </View>
);

export default compose(
  withState('counter', 'setCounter', 0),
  withHandlers({
    onIncrement: props => payload => props.setCounter(props.counter + 1),
    onDecrement: props => () => props.setCounter(props.counter + 2),
  }),
  withProps(props => ({
    title: `TITLE :: ${props.counter}`,
  }))
)(Income);

// export default class Income extends React.PureComponent {
//     shouldComponentUpdate(prevState, prevProps) {

//     }

//     render() {
//         const { title, onIncrement, onDecrement } = this.props;
//         onIncrement('azeaze');
//         return (
//         );
//     }
// }
