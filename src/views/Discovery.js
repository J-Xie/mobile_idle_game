import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import { compose, withState, withHandlers } from 'recompose';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';

import Exploration from './Exploration';
import Embarkment from './Embarkment';

const styles = EStyleSheet.create({
  indicatorStyle: {
    backgroundColor: '$textColor',
  },
  tabView: {
    backgroundColor: 'transparent',
  },
});
// console.
// export default createMaterialTopTabNavigator(
//   {
//     Exploration,
//     Embarkment,
//   },
//   {

//     tabBarOptions: {
//       labelStyle: {
//         fontSize: 12,
//       },
//       indicatorStyle: styles.indicatorStyle,
//       style: {
//         backgroundColor: 'transparent',
//       },
//     },
//   }
// );

const Tabs = props => (
  <TabBar
    {...props}
    style={styles.tabView}
    indicatorStyle={styles.indicatorStyle}
  />
);

const Discovery = ({ onTabChange, navState }) => (
  <TabView
    navigationState={navState}
    renderTabBar={Tabs}
    onIndexChange={onTabChange}
    renderScene={SceneMap({ explore: Exploration, embark: Embarkment })}
  />
);

export default compose(
  withState('navState', 'setNavState', {
    index: 0,
    routes: [
      { key: 'explore', title: 'Explore' },
      { key: 'embark', title: 'Embark' },
    ],
  }),
  withHandlers({
    onTabChange: ({ setNavState, navState }) => index =>
      setNavState({ ...navState, index }),
    renderScene: props => () =>
      SceneMap({ explore: Exploration, embark: Embarkment }),
  })
)(Discovery);
