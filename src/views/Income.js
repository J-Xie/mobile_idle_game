import React from 'react';
import { View } from 'react-native';
import { map, tail, first } from 'lodash';
import PropTypes from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import { Text } from './components';
import { selectCurrentIncomes } from '../redux/resource/selector';

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

const styles = EStyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  incomeRow: {
    padding: 10,
  },
  text: { textAlign: 'center' },
  even: { backgroundColor: '$bgColorLight' },
  odd: { backgroundColor: '$bgColorDark' },
});

const Row = ({ style, children }) => (
  <View style={[styles.row, style]}>{children}</View>
);
Row.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]).isRequired,
};
const Col = ({ children, size }) => (
  <View style={{ width: `${size}%` }}>{children}</View>
);
Col.propTypes = {
  children: PropTypes.element,
  size: PropTypes.number.isRequired,
};
Col.defaultProps = {
  children: null,
};

const PerUnitIncome = ({ type, perUnit }) => (
  <Text>
    + {perUnit} {type} /u
  </Text>
);
PerUnitIncome.propTypes = {
  type: PropTypes.string.isRequired,
  perUnit: PropTypes.number.isRequired,
};
const TotalIncome = ({ total }) => <Text>{total}</Text>;
TotalIncome.propTypes = {
  total: PropTypes.number.isRequired,
};

const IncomeRow = ({ style, incomeDesc }) => (
  <View style={[styles.incomeRow, style]}>
    <Row style={style}>
      <Col size={33.3}>
        <Text>{incomeDesc.name}</Text>
      </Col>
      <Col size={33.3}>
        {first(incomeDesc.incomes) && (
          <PerUnitIncome {...first(incomeDesc.incomes)} />
        )}
      </Col>
      <Col size={33.3}>
        {first(incomeDesc.incomes) && (
          <TotalIncome {...first(incomeDesc.incomes)} />
        )}
      </Col>
    </Row>

    {map(tail(incomeDesc.incomes), ({ type, perUnit, total }) => (
      <Row key={type}>
        <Col size={33.3} />
        <Col size={33.3}>
          <PerUnitIncome perUnit={perUnit} type={type} />
        </Col>
        <Col size={33.3}>
          <TotalIncome total={total} />
        </Col>
      </Row>
    ))}
  </View>
);
IncomeRow.propTypes = {
  incomeDesc: PropTypes.shape({
    name: PropTypes.string,
    incomes: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.string,
        perUnit: PropTypes.number,
        total: PropTypes.number,
      })
    ),
  }).isRequired,
};

const Income = ({ incomes }) => (
  <View>
    <Row style={styles.incomeRow}>
      <Col size={33.3}>
        <Text style={styles.text}>Resource</Text>
      </Col>
      <Col size={33}>
        <Text style={styles.text}>Income</Text>
      </Col>
      <Col size={33}>
        <Text style={styles.text}>Total</Text>
      </Col>
    </Row>
    {map(incomes, (incomeDesc, index) => (
      <IncomeRow
        style={index % 2 ? styles.odd : styles.even}
        incomeDesc={incomeDesc}
        key={incomeDesc.name}
      />
    ))}
  </View>
);
Income.propTypes = {
  incomes: PropTypes.array.isRequired,
};

export default compose(
  connect(state => ({
    incomes: selectCurrentIncomes(state),
  }))
)(Income);
