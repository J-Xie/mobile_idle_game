// @flow

import React from 'react';
import { StyleSheet } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon } from 'native-base';


export default props => (
        <Header style={styles.header}>
            <Left>
                <Button
                    transparent
                    onPress={props.openDrawer}
                    title="Menu"
                >
                    <Icon name="menu" style={{ color: 'black' }} />
                </Button>
            </Left>
            <Body />
            <Left />
        </Header>
)

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: 'white',
    },
    header: {
        backgroundColor: 'white',
        height: 50,
    }
})