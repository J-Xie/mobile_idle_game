import React from 'react';
import { View, TouchableOpacity, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { compose, withState, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import {
  selectResources,
  selectUnlockedConversions,
} from '../redux/resource/selector';
import { convertResources } from '../redux/resource/action';
import { withAddNotif } from './components/Notif';
import { Text, Button } from './components';
import Cost from './Cost';

// const recycledResources = [
//   {
//     key: 'cave',
//     name: 'cave',
//     incomes: [
//       {
//         name: 'plain',
//         qty: 1,
//         cost: {
//           cave: 7,
//         },
//       },
//       {
//         name: 'forest',
//         qty: 1,
//         cost: {
//           cave: 7,
//         },
//       },
//       {
//         name: 'ironDeposit',
//         qty: 1,
//         cost: {
//           cave: 7,
//         },
//       },
//       {
//         name: 'goldDeposit',
//         qty: 1,
//         cost: {
//           cave: 12,
//         },
//       },
//     ],
//   },
//   {
//     key: 'forest',
//     name: 'forest',
//     incomes: [
//       {
//         name: 'plain',
//         qty: 1,
//         cost: {
//           cave: 7,
//         },
//       },
//       {
//         name: 'cave',
//         qty: 1,
//         cost: {
//           cave: 7,
//         },
//       },
//     ],
//   },
//   {
//     key: 'plain',
//     name: 'plain',
//     incomes: [
//       {
//         name: 'forest',
//         qty: 1,
//         cost: {
//           cave: 7,
//         },
//       },
//       {
//         name: 'cave',
//         qty: 1,
//         cost: {
//           cave: 7,
//         },
//       },
//     ],
//   },
// ];

const resStyle = EStyleSheet.create({
  card: {
    borderColor: 'white',
    borderWidth: 1,
    margin: 10,
    borderRadius: 5,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    paddingTop: 5,
    paddingHorizontal: 5,
  },
  header: {
    flexDirection: 'row',
    width: '33%',
  },
  actions: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  infos: {
    justifyContent: 'center',
    maxWidth: 150,
    flexWrap: 'wrap',
  },
  text: {
    textAlign: 'center',
  },
  actionText: {
    fontSize: 14,
    paddingHorizontal: 10,
  },
});

// const RecycleRes = ({ item, onPress }) => (
//   <TouchableOpacity onPress={() => console.log(item)}>
//     <View>
//       <Text style={resStyle.text}>{item.name}</Text>
//     </View>
//   </TouchableOpacity>
// );
// RecycleRes.propTypes = {
//   item: PropTypes.shape({
//     key: PropTypes.string.isRequired,
//     name: PropTypes.string.isRequired,
//     qty: PropTypes.number.isRequired,
//     cost: PropTypes.object.isRequired,
//   }).isRequired,
//   onPress: PropTypes.func.isRequired,
// };

const converterItemStyle = EStyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 5,
    borderColor: '$borderColor',
    borderRadius: '$borderRadius',
    borderWidth: '$borderWidth',
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: '$textColor',
  },
  margeRight: {
    marginRight: 2,
  },
});

const ConverterItem = ({ converter, onPress, selected }) => (
  <TouchableOpacity onPress={onPress}>
    <View
      style={[
        converterItemStyle.container,
        selected
          ? { backgroundColor: 'grey', color: 'white' }
          : { backgroundColor: 'transparent' },
      ]}
    >
      <View style={converterItemStyle.bottom}>
        <Text style={converterItemStyle.margeRight}>-</Text>
        <Cost costs={converter.product} />
      </View>
      <View style={converterItemStyle.separator} />
      <View style={converterItemStyle.top}>
        <Text style={converterItemStyle.margeRight}>+</Text>
        <Cost costs={converter.result} />
      </View>
    </View>
  </TouchableOpacity>
);
ConverterItem.propTypes = {
  converter: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
};

const Recycler = ({
  unlockedConversions,
  conversions,
  onSelectItem,
  onSelectConverter,
  selectedConverter,
  onConvert,
}) => (
  <View style={{ flex: 1, justifyContent: 'space-between', marginTop: 5 }}>
    {/* RESULTS LIST */}
    <View style={resStyle.container}>
      <View>
        <Text style={{ textAlign: 'center', marginBottom: 5 }}>
          Desired result
        </Text>
        <FlatList
          data={unlockedConversions}
          keyExtractor={item => item.title}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => onSelectItem(item)}>
              <Text style={resStyle.text}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* CONVERTERS LIST */}
      <View style={{ width: '66%' }}>
        <Text style={{ ...resStyle.text, marginBottom: 5 }}>Formula</Text>
        <FlatList
          data={conversions.converters}
          extraData={selectedConverter}
          keyExtractor={item => item.name}
          renderItem={({ item }) => (
            <ConverterItem
              converter={item}
              selected={selectedConverter === item}
              onPress={() => onSelectConverter(item)}
            />
          )}
        />
      </View>
    </View>
    <Button
      onPress={onConvert}
      disabled={!selectedConverter}
      text="Convert"
      full
    />
  </View>
);
Recycler.propTypes = {
  unlockedConversions: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      converters: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
    })
  ).isRequired,
  onSelectItem: PropTypes.func.isRequired,
  onConvert: PropTypes.func.isRequired,
};

export default compose(
  connect(
    state => ({
      resources: selectResources(state),
      unlockedConversions: selectUnlockedConversions(state),
    }),
    { convertResources }
  ),
  withState('conversions', 'setConversions', {
    converters: [],
    products: [],
    results: [],
  }),
  withState('selectedConverter', 'setSelectedConverter', null),
  withHandlers({
    onSelectItem: ({
      conversions,
      setConversions,
      setSelectedConverter,
    }) => conversion => {
      setConversions({ ...conversions, converters: conversion.converters });
      setSelectedConverter(null);
    },
    onSelectConverter: ({
      conversions,
      setConversions,
      setSelectedConverter,
    }) => converter => {
      setConversions({
        ...conversions,
        products: converter.product,
        results: converter.result,
      });
      setSelectedConverter(converter);
    },
    onConvert: ({ conversions, convertResources: convert }) => () =>
      convert({ products: conversions.products, results: conversions.results }),
  }),
  withAddNotif()
)(Recycler);
