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
  text: {
    color: '$textColor',
    fontSize: 12,
  },
});

const Tabs = props => (
  <TabBar
    {...props}
    style={[styles.tabView, styles.text]}
    labelStyle={styles.text}
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
// export default compose(
//   connect(state => ({
//     theme: selectTheme(state),
//   })),
//   withProps(props => ({
//     activeTintColor: activeTint[props.theme],
//     style: styles.content,
//   }))
// )(TabNav);
