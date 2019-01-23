import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import { compose, withHandlers } from 'recompose';
import { Header, Left, Body, Right, Button, Icon } from 'native-base';

const styles = EStyleSheet.create({
  headerContainer: {
    backgroundColor: '$bgColor',
  },
  header: {
    backgroundColor: '$bgColor',
    height: 50,
  },
  icon: {
    color: '$textColor',
  },
});

const AppHeader = ({ openDrawer }) => (
  <Header style={styles.header}>
    <Left>
      <Button transparent onPress={openDrawer} title="Menu">
        <Icon name="menu" style={styles.icon} />
      </Button>
    </Left>
    <Body />
    <Right />
  </Header>
);

export default compose(
  withHandlers({
    openDrawer: props => () => props.navigation.openDrawer(),
  })
)(AppHeader);
