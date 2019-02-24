import React from 'react';
import { View, ScrollView } from 'react-native';
import { map, tail, first } from 'lodash';
import PropTypes from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';
import { compose, withState, withHandlers } from 'recompose';
import { connect } from 'react-redux';

import { Text } from './components';
import TabNav from './navigation/TopTab';
// import Artifact from './Artifacts';
import {
  selectResources,
  selectCurrentIncomes,
  selectUnlockedArtifacts,
} from '../redux/resource/selector';

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

const IncomeComponent = ({ incomes }) => (
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
IncomeComponent.propTypes = {
  incomes: PropTypes.array.isRequired,
};

const Income = compose(
  connect(state => ({
    incomes: selectCurrentIncomes(state),
  }))
)(IncomeComponent);

const artifactStyle = EStyleSheet.create({
  card: {
    borderColor: '$borderColor',
    borderWidth: 1,
    margin: 15,
    borderRadius: 5,
  },
  container: {
    // flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  bottomBorder: {
    borderBottomColor: '$borderColor',
    borderBottomWidth: 1,
  },
  infos: {
    flex: 1,
    justifyContent: 'center',
    padding: 5,
  },
  title: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 5,
  },
  desc: {},
  actions: {},
});
const ArtifactComponent = ({ resources, unlockedArtifacts }) => (
  <ScrollView>
    {unlockedArtifacts.map(artifact => {
      if (resources[artifact.name].value) {
        return (
          <View key={artifact.name} style={artifactStyle.card}>
            <View style={[artifactStyle.container, artifactStyle.bottomBorder]}>
              <Text style={artifactStyle.title}>{artifact.name}</Text>
              <Text>{artifact.desc}</Text>
            </View>
          </View>
        );
      }
      return null;
    })}
  </ScrollView>
);
ArtifactComponent.propTypes = {
  resources: PropTypes.object.isRequired,
  unlockedArtifacts: PropTypes.array.isRequired,
};

const Artifact = compose(
  connect(state => ({
    resources: selectResources(state),
    unlockedArtifacts: selectUnlockedArtifacts(state),
  }))
)(ArtifactComponent);

const Incomes = ({ onIndexChange, navState }) => (
  <TabNav
    navState={navState}
    scenes={{ income: Income, artifact: Artifact }}
    onTabChange={onIndexChange}
  />
);
Incomes.propTypes = {
  onIndexChange: PropTypes.func.isRequired,
  navState: PropTypes.shape({
    index: PropTypes.number.isRequired,
    routes: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
      }).isRequired
    ).isRequired,
  }).isRequired,
};

export default compose(
  withState('navState', 'setNavState', {
    index: 0,
    routes: [
      { key: 'income', title: 'Income' },
      { key: 'artifact', title: 'Artifact' },
    ],
  }),
  withHandlers({
    onIndexChange: ({ navState, setNavState }) => index =>
      setNavState({ ...navState, index }),
  })
)(Incomes);
