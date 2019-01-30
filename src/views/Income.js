import React from 'react';
import { reduce, map } from 'lodash';
import { View } from 'react-native';
import { Grid, Col, Row } from 'native-base';

import {
  compose,
  withState,
  withHandlers,
  withProps,
  lifecycle,
} from 'recompose';
import { connect } from 'react-redux';
import { incomes, allResources } from '../config/resources';
import { selectResources } from '../redux/resource/selector';

import { Text } from './components';

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

// const incomes = reduce();

const Income = () => (
  <Grid>
    <Row>
      <Col size={1}>
        <Text>Resource</Text>
      </Col>
      <Col size={1}>
        <Text>Income</Text>
      </Col>
      <Col size={1}>
        <Text>Total /s</Text>
      </Col>
    </Row>
    {/* {map(allResources, resource => (
      <Row key={resource.name} size={}>
        <Col size={1}>
          <Text>{resource.name}</Text>
        </Col>
        <Col size={1}>
          {map(resource.income, (value, key) => (
            <Text key={key}>
              {key}: {value}
            </Text>
          ))}
        </Col>
        <Col size={1}>
          <Text>aze</Text>
        </Col>
      </Row>
    ))} */}
  </Grid>
);

export default compose(
  withState('incomes', 'setIncomes', {}),
  withHandlers({
    setTotalIncomes: props => totalIncomes => props.setIncomes(totalIncomes),
    // onIncrement: props => payload => props.setCounter(props.counter + 1),
    // onDecrement: props => () => props.setCounter(props.counter + 2),
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
