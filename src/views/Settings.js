import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Content, Grid, Col, Row } from 'native-base';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { changeTheme } from '../redux/settings/action';
import { selectTheme } from '../redux/settings/selector';

import { changeMaxLogs } from '../redux/resource/action';
import { selectMaxLogs } from '../redux/resource/selector';

import { TextInput, Button, Text } from './components';

const styles = EStyleSheet.create({
  container: {
    backgroundColor: '$bgColor',
  },
  title: {
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

const Settings = ({ maxLogs, theme, setMaxLogs, setTheme }) => (
  <Content style={styles.container}>
    <Grid>
      <Row>
        <Col style={styles.title}>
          <Text>Change log number</Text>
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
      <Row>
        <Col style={styles.title}>
          <Text>Change theme</Text>
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
    mapDispatchToProps
  )
)(Settings);
