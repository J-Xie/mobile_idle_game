import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import {
  Content, Button, Text, Grid, Col, Row,
} from 'native-base';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import { changeTheme } from '../redux/settings/action';
import { selectTheme } from '../redux/settings/selector';

import { changeMaxLogs } from '../redux/resource/action';
import { selectMaxLogs } from '../redux/resource/selector';

import AppHeader from './navigation/Header';

const styles = StyleSheet.create({
  title: { flex: 1, justifyContent: 'center', marginLeft: 10 },
  content: { display: 'flex', flexDirection: 'row', justifyContent: 'space-around' },
  input: { flex: 1 },
});

console.log('test2');
const Settings = ({
  navigation, maxLogs, theme, setMaxLogs,
}) => (
  <Content>
    <AppHeader navigation={navigation} />
    <Grid>
      <Row>
        <Col style={styles.title}>
          <Text>Change log number :</Text>
        </Col>
        <Col style={styles.content}>
          <TextInput
            style={styles.input}
            underlineColorAndroid="black"
            placeholder={`${maxLogs}`}
            keyboardType="number-pad"
            onChangeText={value => setMaxLogs(Number(value))}
          />
        </Col>
      </Row>
      <Row>
        <Col style={styles.title}>
          <Text>Change theme</Text>
        </Col>
        <Col style={styles.content}>
          <Button bordered info>
            <Text>light</Text>
          </Button>
          <Button bordered info>
            <Text>dark</Text>
          </Button>
        </Col>
      </Row>
    </Grid>
  </Content>
);

const mapStateToProps = state => (
  console.log(state) || {
    maxLogs: selectMaxLogs(state),
    theme: selectTheme(state),
  });

const mapDispatchToProps = {
  setMaxLogs: changeMaxLogs,
  setTheme: changeTheme,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(Settings);
