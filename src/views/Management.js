import React from 'react';
import PropTypes from 'prop-types';
import { compose, withState, withHandlers, withPropsOnChange } from 'recompose';
import { connect } from 'react-redux';
import { without, omit, filter } from 'lodash';

import TabNav from './navigation/TopTab';
import Buildings from './Buildings';
import Jobs from './Jobs';
import Research from './Research';
import Recycler from './Recycler';
import {
  selectResource,
  selectIsResearchUnlocked,
  selectIsAnyJobUnlocked,
} from '../redux/resource/selector';

const Management = ({ onIndexChange, tabs }) => (
  <TabNav
    onTabChange={onIndexChange}
    navState={tabs.nav}
    scenes={tabs.scenes}
  />
);
Management.propTypes = {
  onIndexChange: PropTypes.func.isRequired,
  tabs: PropTypes.shape({
    nav: PropTypes.shape({
      index: PropTypes.number.isRequired,
      routes: PropTypes.arrayOf(
        PropTypes.shape({
          key: PropTypes.string.isRequired,
          title: PropTypes.string.isRequired,
        })
      ),
    }),
    scenes: PropTypes.object.isRequired,
  }).isRequired,
};

export default compose(
  connect(state => ({
    jobUnlocked: selectIsAnyJobUnlocked(state),
    researchUnlocked: selectIsResearchUnlocked(state),
    recyclerUnlocked: selectResource(state, 'recycler.value'),
  })),
  withState('tabs', 'setTabs', {
    nav: {
      index: 0,
      routes: [
        {
          key: 'build',
          title: 'Buildings',
        },
      ],
    },
    scenes: {
      build: Buildings,
    },
  }),
  withHandlers({
    onIndexChange: ({ setTabs, tabs }) => index =>
      setTabs({ ...tabs, nav: { ...tabs.nav, index } }),
  }),
  withPropsOnChange(['jobUnlocked'], ({ jobUnlocked, tabs, setTabs }) => {
    if (jobUnlocked) {
      setTabs(tabs => ({
        nav: {
          ...tabs.nav,
          routes: [
            ...tabs.nav.routes,
            {
              key: 'job',
              title: 'Jobs',
            },
          ],
        },
        scenes: {
          ...tabs.scenes,
          job: Jobs,
        },
      }));
    } else {
      const { index } = tabs.nav;
      let idx = index;
      if (tabs.nav.routes[tabs.nav.index] === { key: 'job', title: 'Jobs' }) {
        idx = 0;
      }
      setTabs(tabs => ({
        nav: {
          index: idx,
          // routes: without(tabs.nav.routes, { key: 'job', title: 'Jobs' }),
          routes: filter(tabs.nav.routes, route => route.key !== 'job'),
        },
        scenes: omit(tabs.scenes, ['job']),
      }));
    }
  }),
  withPropsOnChange(
    ['researchUnlocked'],
    ({ researchUnlocked, tabs, setTabs }) => {
      if (researchUnlocked) {
        setTabs(tabs => ({
          nav: {
            ...tabs.nav,
            routes: [
              ...tabs.nav.routes,
              {
                key: 'research',
                title: 'Research',
              },
            ],
          },
          scenes: {
            ...tabs.scenes,
            research: Research,
          },
        }));
      } else {
        const { index } = tabs.nav;
        let idx = index;
        if (
          tabs.nav.routes[tabs.nav.index] ===
          { key: 'research', title: 'Research' }
        ) {
          idx = 0;
        }
        setTabs(tabs => ({
          nav: {
            index: idx,
            routes: filter(tabs.nav.routes, route => route.key !== 'research'),
            // routes: without(tabs.nav.routes, {
            //   key: 'recycle',
            //   title: 'Recycler',
            // }),
          },
          scenes: omit(tabs.scenes, ['research']),
        }));
      }
    }
  ),
  withPropsOnChange(
    ['recyclerUnlocked'],
    ({ recyclerUnlocked, tabs, setTabs }) => {
      if (recyclerUnlocked) {
        setTabs(tabs => ({
          nav: {
            ...tabs.nav,
            routes: [
              ...tabs.nav.routes,
              {
                key: 'recycle',
                title: 'Recycler',
              },
            ],
          },
          scenes: {
            ...tabs.scenes,
            recycle: Recycler,
          },
        }));
      } else {
        const { index } = tabs.nav;
        let idx = index;
        if (
          tabs.nav.routes[tabs.nav.index] ===
          { key: 'recycle', title: 'Recycler' }
        ) {
          idx = 0;
        }
        setTabs(tabs => ({
          nav: {
            index: idx,
            routes: filter(tabs.nav.routes, route => route.key !== 'recycle'),
            // routes: without(tabs.nav.routes, {
            //   key: 'recycle',
            //   title: 'Recycler',
            // }),
          },
          scenes: omit(tabs.scenes, ['recycle']),
        }));
      }
    }
  )
)(Management);
