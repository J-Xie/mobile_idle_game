import React from 'react';
import PropTypes from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';
import { View } from 'react-native';
import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { get } from 'lodash';

import {
  selectResource,
  selectMap,
  selectResources,
  selectIsResUnlocked,
} from '../redux/resource/selector';

import { Text, ProgressButton } from './components';
import { withAddNotif } from './components/Notif';
import { createExplorationEvent } from '../config/events';
import { addMultResources } from '../redux/resource/action';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 15,
    padding: 10,
  },
  card: {
    width: '100%',
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '$borderColor',
    margin: 5,
    padding: 5,
  },
  actions: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingTop: 30,
  },
  infos: {
    marginTop: 10,
    alignItems: 'center',
  },
});

// const styles = EStyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: 20,
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   card: {
//     width: '100%',
//     justifyContent: 'center',
//     borderRadius: 5,
//     borderWidth: 1,
//     borderColor: '$borderColor',
//     margin: 5,
//     padding: 5,
//   },
// });

const itemStyle = EStyleSheet.create({
  container: {
    width: 300,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 5,
    paddingHorizontal: 5,
  },
  header: {
    flexDirection: 'row',
    width: '50%',
  },
  // actions: {
  //   flex: 1,
  //   flexDirection: 'row',
  //   justifyContent: 'center',
  // },
  // infos: {
  //   justifyContent: 'center',
  //   maxWidth: 150,
  //   flexWrap: 'wrap',
  // },
  text: {
    textAlign: 'center',
  },
  label: {
    fontSize: 11,
    textAlign: 'center',
  },
  actionText: {
    fontSize: 14,
  },
  artifactContainer: {
    flexDirection: 'row',
  },
  artifact: {
    marginRight: 5,
    padding: 5,
    borderColor: 'grey',
    borderRadius: '$borderRadius',
    borderWidth: 1,
  },
});

// const Exploration = ({
//   mapDiscovered,
//   forest,
//   plain,
//   cave,
//   map,
//   ironDeposit,
//   goldDeposit,
//   onExplore,
// }) => (
//   <View style={styles.container}>
//     <ProgressButton
//       style={{ flex: 1 }}
//       text="Explore island"
//       onPress={onExplore}
//       cooldown={200}
//     />
//     {map && (
//       <View style={styles.infos}>
//         <Text>Island infos :</Text>
//         {mapDiscovered.value ? (
//           <Text>Island type : {get(map, 'type')}</Text>
//         ) : null}
//         <Text>
//           {forest.total}/{mapDiscovered.value ? get(map, 'forest') : '???'}{' '}
//           forest
//         </Text>
//         <Text>
//           {plain.total}/{mapDiscovered.value ? get(map, 'plain') : '???'} plain
//         </Text>
//         <Text>
//           {cave.total}/{mapDiscovered.value ? get(map, 'cave') : '???'} cave
//         </Text>
//         <Text>
//           {ironDeposit.total}/
//           {mapDiscovered.value ? get(map, 'ironDeposit') : '???'} iron deposit
//         </Text>
//         <Text>
//           {goldDeposit.total}/
//           {mapDiscovered.value ? get(map, 'goldDeposit') : '???'} gold deposit
//         </Text>
//       </View>
//     )}
//   </View>
// );
const Exploration = ({
  mapDiscovered,
  forest,
  plain,
  cave,
  map,
  ironDeposit,
  goldDeposit,
  onExplore,
}) => (
  <View style={styles.container}>
    <View style={styles.card}>
      <Text style={itemStyle.text}>Island infos : </Text>
      <View>
        <View style={itemStyle.container}>
          <View style={itemStyle.header}>
            <Text>Island type</Text>
          </View>
          <View style={itemStyle.actions}>
            <View style={itemStyle.infos}>
              <Text style={[itemStyle.text, itemStyle.actionText]}>
                {mapDiscovered.value ? get(map, 'type') : '????'}
              </Text>
            </View>
          </View>
        </View>
        <View style={itemStyle.container}>
          <View style={itemStyle.header}>
            <Text>Forest</Text>
          </View>
          <View style={itemStyle.actions}>
            <View style={itemStyle.infos}>
              <Text style={[itemStyle.text, itemStyle.actionText]}>
                {forest.total}/
                {mapDiscovered.value ? get(map, 'forest') : '????'}
              </Text>
            </View>
          </View>
        </View>
        <View style={itemStyle.container}>
          <View style={itemStyle.header}>
            <Text>Plain</Text>
          </View>
          <View style={itemStyle.actions}>
            <View style={itemStyle.infos}>
              <Text style={[itemStyle.text, itemStyle.actionText]}>
                {plain.total}/{mapDiscovered.value ? get(map, 'plain') : '????'}
              </Text>
            </View>
          </View>
        </View>
        <View style={itemStyle.container}>
          <View style={itemStyle.header}>
            <Text>Cave</Text>
          </View>
          <View style={itemStyle.actions}>
            <View style={itemStyle.infos}>
              <Text style={[itemStyle.text, itemStyle.actionText]}>
                {cave.total}/{mapDiscovered.value ? get(map, 'cave') : '????'}
              </Text>
            </View>
          </View>
        </View>
        <View style={itemStyle.container}>
          <View style={itemStyle.header}>
            <Text>Iron deposit</Text>
          </View>
          <View style={itemStyle.actions}>
            <View style={itemStyle.infos}>
              <Text style={[itemStyle.text, itemStyle.actionText]}>
                {ironDeposit.total}/
                {mapDiscovered.value ? get(map, 'ironDeposit') : '????'}
              </Text>
            </View>
          </View>
        </View>
        <View style={itemStyle.container}>
          <View style={itemStyle.header}>
            <Text>Gold deposit</Text>
          </View>
          <View style={itemStyle.actions}>
            <View style={itemStyle.infos}>
              <Text style={[itemStyle.text, itemStyle.actionText]}>
                {goldDeposit.total}/
                {mapDiscovered.value ? get(map, 'goldDeposit') : '????'}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
    <ProgressButton
      style={{ width: 100 }}
      text="Explore island"
      onPress={onExplore}
      cooldown={200}
    />
  </View>
);
Exploration.propTypes = {
  mapDiscovered: PropTypes.shape({
    value: PropTypes.number.isRequired,
  }).isRequired,
  map: PropTypes.shape({
    forest: PropTypes.number.isRequired,
    plain: PropTypes.number.isRequired,
    cave: PropTypes.number.isRequired,
  }),
  forest: PropTypes.shape({
    total: PropTypes.number,
  }).isRequired,
  plain: PropTypes.shape({
    total: PropTypes.number,
  }).isRequired,
  cave: PropTypes.shape({
    total: PropTypes.number,
  }).isRequired,
  ironDeposit: PropTypes.shape({
    total: PropTypes.number,
  }).isRequired,
  goldDeposit: PropTypes.shape({
    total: PropTypes.number,
  }).isRequired,
  onExplore: PropTypes.func.isRequired,
};
Exploration.defaultProps = {
  map: null,
};

export default compose(
  connect(
    state => ({
      mapDiscovered: selectResource(state, 'mapDiscovered'),
      map: selectMap(state),
      stateRes: selectResources(state),
      forest: selectResource(state, 'forest'),
      plain: selectResource(state, 'plain'),
      cave: selectResource(state, 'cave'),
      ironDeposit: selectResource(state, 'ironDeposit'),
      goldDeposit: selectResource(state, 'goldDeposit'),
    }),
    { addMultResources }
  ),
  withAddNotif(),
  withHandlers({
    onExplore: ({
      addNotif,
      map,
      stateRes,
      addMultResources: addResources,
    }) => () => {
      const event = createExplorationEvent(map, stateRes);
      if (event && event.notif) {
        addNotif(event.notif.title, event.notif.message, event.notif.type);
      }
      if (event.resFound) {
        addResources(event.resFound);
      }
    },
  })
)(Exploration);
