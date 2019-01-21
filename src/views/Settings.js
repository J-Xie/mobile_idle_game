import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import { TextInput } from 'react-native';
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

const styles = EStyleSheet.create({
  title: { flex: 1, justifyContent: 'center', marginLeft: 10 },
  content: { display: 'flex', flexDirection: 'row', justifyContent: 'space-around' },
  input: { flex: 1 },
});

const Settings = ({
  navigation, maxLogs, theme, setMaxLogs, setTheme,
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
          <Button bordered info onPress={() => setTheme('light')}>
            {/* TOGGLE LIGHT THEME */}
            <Text>light</Text>
          </Button>
          <Button bordered info onPress={() => setTheme('dark')}>
            {/* TOGGLE DARK THEME */}
            <Text>dark</Text>
          </Button>
        </Col>
      </Row>
    </Grid>
  </Content>
);

const mapStateToProps = state => ({
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
