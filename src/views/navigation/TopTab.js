import React from 'react';
import PropTypes from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';

import { TabView, TabBar, SceneMap } from 'react-native-tab-view';

const styles = EStyleSheet.create({
  indicatorStyle: {
    backgroundColor: '$textColor',
  },
  tabView: {
    backgroundColor: 'transparent',
  },
});

const Tabs = props => (
  <TabBar
    {...props}
    style={styles.tabView}
    indicatorStyle={styles.indicatorStyle}
  />
);

const TabNav = ({ onTabChange, navState, scenes }) => (
  <TabView
    navigationState={navState}
    renderTabBar={Tabs}
    onIndexChange={onTabChange}
    renderScene={SceneMap(scenes)}
  />
);
TabNav.propTypes = {
  onTabChange: PropTypes.func.isRequired,
  navState: PropTypes.shape({
    index: PropTypes.number.isRequired,
    routes: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
      })
    ),
  }).isRequired,
  scenes: PropTypes.object.isRequired,
};

export default TabNav;
