import React from 'react';
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation';
import EStyleSheet from 'react-native-extended-stylesheet';
import { connect } from 'react-redux';

import { compose, withProps } from 'recompose';
import ResourceList from '../ResourceListView';
import Buildings from '../Buildings';
import Income from '../Income';
import Settings from '../Settings';
import { selectTheme } from '../../redux/settings/selector';
import { activeTint } from '../../config/theme';

const styles = EStyleSheet.create({
  content: {
    backgroundColor: '$bgColor',
  },
});

const tabBarComponent = compose(
  connect(state => ({ theme: selectTheme(state) })),
  withProps(props => ({
    activeTintColor: activeTint[props.theme],
    style: styles.content,
  }))
)(BottomTabBar);

export default createBottomTabNavigator(
  {
    Resources: { screen: ResourceList },
    Buildings: { screen: Buildings },
    Income: { screen: Income },
    Settings: { screen: Settings },
  },
  {
    tabBarComponent,
  }
);
