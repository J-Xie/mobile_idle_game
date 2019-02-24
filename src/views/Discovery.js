import React from 'react';
import PropTypes from 'prop-types';
import { filter, omit } from 'lodash';
import { compose, withState, withHandlers, withPropsOnChange } from 'recompose';
import { connect } from 'react-redux';

import TabNav from './navigation/TopTab';
import Exploration from './Exploration';
import { Embark, Travel } from './Embarkment';
import { selectIsShipUnlocked } from '../redux/resource/selector';

const Discovery = ({ onIndexChange, tabs }) => (
  <TabNav
    onTabChange={onIndexChange}
    navState={tabs.navState}
    scenes={tabs.scenes}
  />
);
Discovery.propTypes = {
  onIndexChange: PropTypes.func.isRequired,
  tabs: PropTypes.shape({
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
  }).isRequired,
};

export default compose(
  connect(state => ({
    isShipUnlocked: selectIsShipUnlocked(state),
  })),
  withState('tabs', 'setTabs', {
    navState: {
      index: 0,
      routes: [{ key: 'explore', title: 'Explore' }],
    },
    scenes: {
      explore: Exploration,
    },
  }),
  withHandlers({
    onIndexChange: ({ setTabs, tabs }) => index =>
      setTabs({ ...tabs, navState: { ...tabs.navState, index } }),
  }),
  withPropsOnChange(['isShipUnlocked'], ({ isShipUnlocked, tabs, setTabs }) => {
    if (isShipUnlocked) {
      setTabs(tabs => ({
        navState: {
          ...tabs.navState,
          routes: [
            ...tabs.navState.routes,
            {
              key: 'embark',
              title: 'Embark',
            },
            {
              key: 'travel',
              title: 'Travel',
            },
          ],
        },
        scenes: {
          ...tabs.scenes,
          embark: Embark,
          travel: Travel,
        },
      }));
    } else {
      const { index } = tabs.navState;
      let idx = index;
      if (
        tabs.navState.routes[tabs.navState.index] ===
          { key: 'embark', title: 'Embark' } ||
        tabs.navState.routes[tabs.navState.index] ===
          { key: 'travel', title: 'Travel' }
      ) {
        idx = 0;
      }
      setTabs(tabs => ({
        navState: {
          index: idx,
          routes: filter(
            tabs.navState.routes,
            route => route.key !== 'embark' && route.key !== 'travel'
          ),
        },
        scenes: omit(tabs.scenes, ['embark', 'travel']),
      }));
    }
  })
)(Discovery);
