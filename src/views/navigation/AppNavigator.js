import React from 'react';
import { createDrawerNavigator } from 'react-navigation';

import Homepage from '../Homepage';
import ResourceList from '../ResourceListView';
import Income from '../Income';
import Settings from '../Settings';

export default createDrawerNavigator({
  Home: { screen: Homepage },
  Resources: { screen: ResourceList },
  Income: { screen: Income },
  Settings: { screen: Settings },
},
  // {
  //   contentComponent: props => <SideBar {...props} />,
  // },
);
