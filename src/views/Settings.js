import React from 'react';
import { Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Content, Grid, Col, Row } from 'native-base';
import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { changeTheme, reset } from '../redux/settings/action';
import { selectTheme } from '../redux/settings/selector';

import { changeMaxLogs } from '../redux/resource/action';
import { selectMaxLogs } from '../redux/resource/selector';

import { TextInput, Button, Text, Divider } from './components';

const styles = EStyleSheet.create({
  container: {
    backgroundColor: '$bgColor',
  },
  row: {
    marginBottom: 15,
  },
  title: {
    fontSize: 25,
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  colTitle: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 10,
    color: '$textColor',
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    color: '$textColor',
    marginBottom: 10,
  },
  input: { flex: 1, textAlign: 'center' },
});

const Settings = ({ maxLogs, theme, setMaxLogs, setTheme, validateWipe }) => (
  <Content style={styles.container}>
    <Text style={styles.title}>Main settings</Text>
    <Grid>
      <Row style={styles.row}>
        <Col style={styles.colTitle}>
          <Text style={{ marginBottom: 4 }}>Change log number</Text>
          <Text>Defines the number of log displayed.</Text>
        </Col>
        <Col style={styles.content}>
          {maxLogs && (
            <TextInput
              style={styles.input}
              value={maxLogs.toString()}
              placeholder={`${maxLogs}`}
              keyboardType="number-pad"
              onChangeText={value => setMaxLogs(Number(value))}
            />
          )}
        </Col>
      </Row>
      <Divider style={{ flex: 1, justifyContent: 'center' }} />
      <Row style={styles.row}>
        <Col style={styles.colTitle}>
          <Text style={{ marginBottom: 4 }}>Change theme</Text>
          <Text>Changes the main colors of the app.</Text>
        </Col>
        <Col style={styles.content}>
          <Button
            onPress={() => setTheme('light')}
            text="light"
            selected={theme === 'light'}
          />
          <Button
            onPress={() => setTheme('dark')}
            text="dark"
            selected={theme === 'dark'}
          />
        </Col>
      </Row>
      <Divider />
      <Row style={styles.row}>
        <Col style={styles.colTitle}>
          <Text style={{ marginBottom: 4 }}>Wipe data</Text>
          <Text>Delete current save.</Text>
        </Col>
        <Col style={styles.content}>
          <Button text="Wipe data" onPress={validateWipe} />
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
  reset,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withHandlers({
    validateWipe: props => () => {
      Alert.alert(
        'Validation',
        'Do you really want to wipe data ?',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          { text: 'OK', onPress: () => props.reset() },
        ],
        { cancelable: false }
      );
    },
  })
)(Settings);
