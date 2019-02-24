import React from 'react';
import { View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { map } from 'lodash';
import { Button as NButton, Text as NText } from 'native-base';
import { selectResources } from '../redux/resource/selector';
import { buyResources } from '../redux/resource/action';
import { researchs } from '../config/resources';
import { Text, Button } from './components';
import Costs from './Cost';

const itemStyle = EStyleSheet.create({
  card: {
    borderColor: '$borderColor',
    borderWidth: 1,
    margin: 15,
    borderRadius: 5,
  },
  container: {
    flexDirection: 'row',
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

const ResearchItemCard = ({ item, resources, handler }) => (
  <View style={itemStyle.card}>
    <View style={[itemStyle.container, itemStyle.bottomBorder]}>
      <View style={itemStyle.infos}>
        <Text style={itemStyle.title}>{item.name}</Text>
        <Text style={itemStyle.desc}>{item.desc}</Text>
        <Costs costs={item.cost} />
      </View>
    </View>
    <View style={itemStyle.actions}>
      {!resources[item.name].value && (
        <Button
          onPress={() => handler({ type: item.name, qty: 1 })}
          text={item.buttonText}
          full
        />
      )}
      {resources[item.name].value > 0 && (
        <NButton
          text={item.buttonText}
          onPress={() => handler({ type: item.name, qty: 1 })}
          full
          bordered
          disabled
        >
          <NText>{item.buttonText}</NText>
        </NButton>
      )}
    </View>
  </View>
);
ResearchItemCard.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    buttonText: PropTypes.string.isRequired,
  }).isRequired,
  resources: PropTypes.object.isRequired,
  handler: PropTypes.func.isRequired,
};

const ResearchItem = compose(
  connect(state => ({ resources: selectResources(state) }))
)(ResearchItemCard);

const Researchs = ({ resources, buyResearch }) => (
  <View>
    {map(researchs, research => {
      if (
        resources[research.name].isUnlocked &&
        !resources[research.name].value
      ) {
        return (
          <ResearchItem
            key={research.name}
            item={research}
            handler={buyResearch}
          />
        );
      }
      return null;
    })}
  </View>
);
Researchs.propTypes = {
  resources: PropTypes.object.isRequired,
  buyResearch: PropTypes.func.isRequired,
};

export default compose(
  connect(
    state => ({ resources: selectResources(state) }),
    { buyResearch: buyResources }
  )
)(Researchs);
