import React from 'react';
import { createDrawerNavigator, createAppContainer } from "react-navigation";

// import Homepage from '../../../App';
import Homepage from '../Homepage';
import ResourceList from '../ResourceListView';
import Income from '../Income';

console.log(Homepage)

export default createDrawerNavigator({
    Home: {screen: Homepage},
    Resources: {screen: ResourceList},
    Income: {screen: Income},
  },
  // {
  //   contentComponent: props => <SideBar {...props} />,
  // },
);
