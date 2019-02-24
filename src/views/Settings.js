import React from 'react';
import { Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Content, Grid, Col, Row } from 'native-base';
import { compose, withHandlers, withState, withPropsOnChange } from 'recompose';
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
    fontSize: 23,
    marginTop: 20,
    marginBottom: 23,
    textAlign: 'center',
  },
  colTitle: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 15,
    color: '$textColor',
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    color: '$textColor',
    marginBottom: 5,
    marginRight: 15,
  },
  input: { flex: 1, textAlign: 'center' },
});

const Settings = ({
  maxLogs,
  theme,
  setMaxLogs,
  setTheme,
  validateWipe,
  logs,
  setLogs,
}) =>
  console.log(maxLogs) || (
    <Content style={styles.container}>
      <Text style={styles.title}>Main settings</Text>
      <Grid>
        <Row style={styles.row}>
          <Col style={styles.colTitle}>
            <Text>Change maximum log number</Text>
            {/* <Text>Defines the number of log displayed.</Text> */}
          </Col>
          <Col style={styles.content}>
            <TextInput
              style={styles.input}
              value={logs || '0'}
              keyboardType="number-pad"
              onChangeText={value => {
                setLogs(value);
                setMaxLogs(value);
                if (!value) {
                  setLogs('0');
                }
              }}
              placeholder=""
            />
          </Col>
        </Row>
        <Divider style={{ flex: 1, justifyContent: 'center' }} />
        <Row style={styles.row}>
          <Col style={styles.colTitle}>
            <Text>Change current theme</Text>
            {/* <Text>Changes the main colors of the app.</Text> */}
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
            <Text>Wipe data</Text>
            {/* <Text>Delete current save.</Text> */}
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
  withState('logs', 'setLogs', ''),
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
  }),
  withPropsOnChange(['maxLogs'], ({ maxLogs, setLogs }) => {
    setLogs(maxLogs.toString());
  })
)(Settings);
