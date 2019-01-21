import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import { compose, withHandlers } from 'recompose';
import {
  Container, Header, Left, Body, Right, Button, Icon,
} from 'native-base';

const styles = EStyleSheet.create({
  headerContainer: {
    backgroundColor: EStyleSheet.value('themeBackground'),
  },
  header: {
    backgroundColor: EStyleSheet.value('themeBackground'),
    height: 50,
  },
});

const AppHeader = ({ openDrawer }) => (
  <Header style={styles.header}>
    <Left>
      <Button
        transparent
        onPress={openDrawer}
        title="Menu"
      >
        <Icon name="menu" style={{ color: 'black' }} />
      </Button>
    </Left>
    <Body />
    <Right />
  </Header>
);

export default compose(
  withHandlers({
    openDrawer: props => () => props.navigation.openDrawer(),
  }),
)(AppHeader);
