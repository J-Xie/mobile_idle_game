import React from 'react';
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation';
import EStyleSheet from 'react-native-extended-stylesheet';
import { connect } from 'react-redux';

import { compose, withProps, withHandlers } from 'recompose';
import ResourceList from '../ResourceListView';
// import Buildings from '../Buildings';
// import Exploration from '../Exploration';
import Management from '../Management';
import Discovery from '../Discovery';
import Income from '../Income';
import Settings from '../Settings';
import { selectTheme } from '../../redux/settings/selector';
import { addIncomes, addMultResources } from '../../redux/resource/action';
import { activeTint } from '../../config/theme';
import withInterval from '../../hoc/withInterval';
import { selectMap, selectResources } from '../../redux/resource/selector';
import { createVillagerEvent } from '../../config/events';
import { withAddNotif } from '../components/Notif';

const styles = EStyleSheet.create({
  content: {
    backgroundColor: '$bgColor',
  },
});

const tabBarComponent = compose(
  connect(
    state => ({
      map: selectMap(state),
      resources: selectResources(state),
      theme: selectTheme(state),
    }),
    { addIncomes, addMultResources }
  ),
  withProps(props => ({
    activeTintColor: activeTint[props.theme],
    style: styles.content,
  })),
  withAddNotif(),
  withHandlers({
    createRandomEvent: ({
      map,
      resources,
      addNotif,
      addMultResources: addResources,
    }) => () => {
      const event = createVillagerEvent(map, resources);
      console.log(event);
      if (event && event.notif) {
        addNotif(event.notif.title, event.notif.message, event.notif.type);
      }
      if (event.resFound) {
        addResources(event.resFound);
      }
    },
  }),
  withInterval(props => props.addIncomes(), 1000),
  withInterval(props => props.createRandomEvent(), 10000)
)(BottomTabBar);

export default createBottomTabNavigator(
  {
    Resources: { screen: ResourceList },
    Buildings: { screen: Management },
    Exploration: { screen: Discovery },
    Income: { screen: Income },
    Settings: { screen: Settings },
  },
  {
    // initialRouteName: 'Buildings',
    tabBarComponent,
  }
);
