import React from 'react';
import { View, ScrollView, Alert, Text as NativeText } from 'react-native';
import { Button as NativeButton } from 'native-base';
import Dialog, {
  DialogTitle,
  DialogButton,
  DialogContent,
  ScaleAnimation,
} from 'react-native-popup-dialog';
import PropTypes from 'prop-types';
import { map, reduce, random } from 'lodash';
import EStyleSheet from 'react-native-extended-stylesheet';
import { compose, withState, withHandlers, withPropsOnChange } from 'recompose';
import { connect } from 'react-redux';
import {
  buyResources,
  addMultResources,
  finishGame,
} from '../redux/resource/action';
import {
  selectResources,
  selectResource,
  selectMap,
  selectShip,
  selectUnlockedArtifacts,
  selectShips,
} from '../redux/resource/selector';
import { withAddNotif } from './components/Notif';
import { Text, Button, ProgressButton } from './components';
import TabNav from './navigation/TopTab';
import Cost from './Cost';

import { createEmbarcationEvent } from '../config/events';
import { jobs, ships, artifacts } from '../config/resources';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    alignItems: 'center',
  },
});

const EmbarkComponent = ({ resources, onExplore, unlockedArtifacts }) => (
  <View style={styles.container}>
    <ProgressButton
      onPress={onExplore}
      text="Navigate on surrounding seas"
      cooldown={200}
    />
    <View style={{ marginTop: 30, height: '70%' }}>
      <Text style={{ textAlign: 'center' }}>Artifacts found :</Text>
      {unlockedArtifacts.map(artifact => {
        if (resources[artifact.name].value) {
          return (
            <View key={artifact.name} style={{ justifyContent: 'center' }}>
              <Text style={{ textAlign: 'center' }}>{artifact.name}</Text>
              {/* <Text style={{ textAlign: 'center' }}>{artifact.desc}</Text> */}
            </View>
          );
        }
        return null;
      })}
    </View>
  </View>
);
EmbarkComponent.propTypes = {
  resources: PropTypes.object.isRequired,
  onExplore: PropTypes.func.isRequired,
  unlockedArtifacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      desc: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export const Embark = compose(
  connect(
    state => ({
      map: selectMap(state),
      resources: selectResources(state),
      unlockedArtifacts: selectUnlockedArtifacts(state),
    }),
    { addMultResources }
  ),
  withAddNotif(),
  withHandlers({
    onExplore: ({
      addNotif,
      map,
      resources,
      addMultResources: addResources,
    }) => () => {
      const event = createEmbarcationEvent(map, resources);
      if (event && event.notif) {
        addNotif(event.notif.title, event.notif.message, event.notif.type);
      }
      if (event.resFound) {
        addResources(event.resFound);
      }
    },
  })
)(EmbarkComponent);

const travelStyle = EStyleSheet.create({
  card: {
    width: '100%',
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '$borderColor',
    margin: 5,
    padding: 5,
  },
});

const itemStyle = EStyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 5,
    paddingHorizontal: 5,
  },
  header: {
    flexDirection: 'row',
    width: '50%',
  },
  actions: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infos: {
    justifyContent: 'center',
    maxWidth: 150,
    flexWrap: 'wrap',
  },
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

const TravelComponent = ({
  showDialog,
  setShowDialog,
  currentShip,
  pearl,
  capacity,
  setCapacity,
  resources,
  onChangeCapacity,
  buyResources: buyArtifact,
  finishGame: endGame,
  onFinishGame,
}) =>
  console.log(pearl) || (
    <View style={{ ...styles.container, justifyContent: 'space-between' }}>
      <View style={travelStyle.card}>
        <Text style={itemStyle.text}>Ship type: {currentShip.name}</Text>
        {map(currentShip.capacity, (max, resName) => (
          <View key={resName}>
            <View style={itemStyle.container}>
              <View style={itemStyle.header}>
                <Text>{resName}</Text>
              </View>

              <View style={itemStyle.actions}>
                <Button
                  text="-"
                  onPress={() => onChangeCapacity({ type: resName, qty: -1 })}
                />
                <View style={itemStyle.infos}>
                  <Text style={[itemStyle.text, itemStyle.actionText]}>
                    {capacity[resName]}/{max}
                  </Text>
                  <Text style={itemStyle.label}>
                    Owned:{' '}
                    {resName === 'villager'
                      ? reduce(
                          jobs,
                          (acc, { name }) => acc + resources[name].value,
                          resources[resName].value
                        )
                      : Math.round(resources[resName].value)}
                  </Text>
                </View>
                <Button
                  text="+"
                  onPress={() => onChangeCapacity({ type: resName, qty: 1 })}
                />
              </View>
            </View>
          </View>
        ))}
      </View>
      <Button
        full
        onPress={() => onFinishGame(capacity)}
        // onPress={() => setShowDialog(true)}
        text="Navigate to other islands"
      />
      <Dialog
        width={0.9}
        visible={showDialog}
        dialogAnimation={new ScaleAnimation()}
        dialogTitle={
          <DialogTitle
            title="Get new stuff before you go"
            hasTitleBar={false}
          />
        }
        actions={[
          <DialogButton
            text="DISMISS"
            key="button-1"
            onPress={() => console.log('button clicked')}
            style={{ backgroundColor: 'blue' }}
          />,
        ]}
        onTouchOutside={async () => {
          await setShowDialog(false);
          endGame(capacity);
        }}
      >
        <DialogContent>
          <View>
            <NativeText style={{ textAlign: 'center' }}>
              You ve acquiered {capacity.pearl} pearls!
            </NativeText>
            <NativeText style={{ textAlign: 'center' }}>
              You have {pearl.value}
            </NativeText>
            <ScrollView style={itemStyle.artifactContainer} horizontal>
              {map(artifacts, artifact => {
                if (
                  !resources[artifact.name].value &&
                  resources[artifact.name].isUnlocked
                ) {
                  return (
                    <View
                      key={artifact.name}
                      style={{
                        ...itemStyle.artifact,
                        width: 160,
                        justifyContent: 'space-between',
                      }}
                    >
                      <View>
                        <NativeText>{artifact.name}</NativeText>
                        <NativeText>{artifact.desc}</NativeText>
                      </View>
                      <NativeButton
                        onPress={async () => {
                          if (pearl.value >= artifact.cost.pearl) {
                            await buyArtifact({ type: artifact.name, qty: 1 });
                            await setCapacity({
                              ...capacity,
                              [artifact.name]: 1,
                              pearl: pearl.value,
                              ...reduce(
                                artifact.bonus,
                                (acc, value, resName) => {
                                  acc[resName] = value;
                                  return acc;
                                },
                                {}
                              ),
                            });
                          }
                        }}
                        full
                        bordered
                        dark
                        style={{ padding: 5 }}
                      >
                        <Cost
                          costs={artifact.cost}
                          textStyle={{ color: 'black' }}
                        />
                      </NativeButton>
                    </View>
                  );
                }
                return null;
              })}
            </ScrollView>
          </View>
        </DialogContent>
      </Dialog>
    </View>
  );
TravelComponent.propTypes = {
  pearl: PropTypes.shape({
    value: PropTypes.number.isRequired,
  }).isRequired,
  currentShip: PropTypes.shape({
    name: PropTypes.string.isRequired,
    capacity: PropTypes.object.isRequired,
  }).isRequired,
  capacity: PropTypes.object.isRequired,
  resources: PropTypes.object.isRequired,
  onChangeCapacity: PropTypes.func.isRequired,
  buyResources: PropTypes.func.isRequired,
  onFinishGame: PropTypes.func.isRequired,
};

export const Travel = compose(
  connect(
    state => ({
      resources: selectResources(state),
      pearl: selectResource(state, 'pearl'),
      ships: selectShips(state),
      bark: selectShip(state, 'bark'),
      frigate: selectShip(state, 'frigate'),
      caravel: selectShip(state, 'caravel'),
    }),
    { buyResources, addMultResources, finishGame }
  ),
  withState('capacity', 'setCapacity', { pearl: 0 }),
  withState('currentShip', 'setCurrentShip', { name: '', capacity: {} }),
  withState('showDialog', 'setShowDialog', false),
  withHandlers({
    onChangeCapacity: ({ currentShip, capacity, setCapacity, resources }) => ({
      type,
      qty,
    }) => {
      const newValue = (capacity[type] || 0) + qty;
      if (
        newValue > resources[type].value ||
        newValue > currentShip.capacity[type] ||
        newValue < 0
      ) {
        return;
      }
      setCapacity({
        ...capacity,
        [type]: newValue,
      });
    },
    onFinishGame: ({
      finishGame: endGame,
      addMultResources: addResources,
      setShowDialog,
      setCapacity,
    }) => capacity => {
      Alert.alert(
        'Validation',
        'Do you really want to go to another island ?',
        [
          {
            text: 'No',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'Yes',
            onPress: async () => {
              setShowDialog(true);

              const pearlAcquired = random(1, 3);
              await setCapacity({ ...capacity, pearl: pearlAcquired });
              await addResources({
                pearl: { value: pearlAcquired, total: pearlAcquired },
              });
              // endGame({ ...capacity, pearl: pearlAcquired });
            },
          },
        ],
        { cancelable: false }
      );
    },
  }),
  withPropsOnChange(['currentShip'], ({ currentShip, setCapacity }) => {
    const capacity = reduce(
      currentShip.capacity,
      (acc, value, resName) => {
        acc[resName] = 0;
        return acc;
      },
      {}
    );
    setCapacity(capacity);
  }),
  withPropsOnChange(
    ['bark', 'frigate', 'caravel'],
    ({ bark, frigate, caravel, setCapacity, setCurrentShip }) => {
      const currentShip = { name: '', capacity: {} };
      if (bark.value) {
        currentShip.name = 'bark';
        currentShip.capacity = ships.bark.capacity;
      } else if (frigate.value) {
        currentShip.name = 'frigate';
        currentShip.capacity = ships.frigate.capacity;
      } else if (caravel.value) {
        currentShip.name = 'caravel';
        currentShip.capacity = ships.caravel.capacity;
      }
      const capacity = reduce(
        currentShip.capacity,
        (acc, value, resName) => {
          acc[resName] = 0;
          return acc;
        },
        {}
      );
      setCurrentShip(currentShip);
      setCapacity(capacity);
    }
  )
)(TravelComponent);

const NavBarComponent = ({ onIndexChange, navState }) => (
  <TabNav
    onTabChange={onIndexChange}
    navState={navState}
    scenes={{ embark: Embark, travel: Travel }}
  />
);
NavBarComponent.propTypes = {
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
      { key: 'embark', title: 'Embark' },
      { key: 'travel', title: 'Travel' },
    ],
  }),
  withHandlers({
    onIndexChange: ({ navState, setNavState }) => index => {
      setNavState({ ...navState, index });
    },
  })
)(NavBarComponent);
