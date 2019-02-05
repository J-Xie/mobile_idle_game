import React from 'react';
import PropTypes from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';
import { compose, withState, withHandlers } from 'recompose';
// import { TabView, TabBar, SceneMap } from 'react-native-tab-view';

import TabNav from './navigation/TopTab';
import Exploration from './Exploration';
import Embarkment from './Embarkment';

// const styles = EStyleSheet.create({
//   indicatorStyle: {
//     backgroundColor: '$textColor',
//   },
//   tabView: {
//     backgroundColor: 'transparent',
//   },
// });

// const Tabs = props => (
//   <TabBar
//     {...props}
//     style={styles.tabView}
//     indicatorStyle={styles.indicatorStyle}
//   />
// );

// const Discovery = ({ onTabChange, navState }) => (
//   <TabView
//     navigationState={navState}
//     renderTabBar={Tabs}
//     onIndexChange={onTabChange}
//     renderScene={SceneMap({ explore: Exploration, embark: Embarkment })}
//   />
// );

const Discovery = ({ onIndexChange, navState }) => (
  <TabNav
    onTabChange={onIndexChange}
    navState={navState}
    scenes={{ explore: Exploration, embark: Embarkment }}
  />
);
Discovery.propTypes = {
  onIndexChange: PropTypes.func.isRequired,
  navState: PropTypes.shape({
    index: PropTypes.number.isRequired,
    routes: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
      })
    ),
  }).isRequired,
};

export default compose(
  withState('navState', 'setNavState', {
    index: 0,
    routes: [
      { key: 'explore', title: 'Explore' },
      { key: 'embark', title: 'Embark' },
    ],
  }),
  withHandlers({
    onIndexChange: ({ setNavState, navState }) => index =>
      setNavState({ ...navState, index }),
  })
)(Discovery);
