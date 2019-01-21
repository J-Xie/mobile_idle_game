import React from 'react';
import {
  Platform, Text, View,
} from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { createAppContainer } from 'react-navigation';

// import { NativeRouter, Route, Link } from 'react-router-native';
import AppNavigator from './src/views/navigation/AppNavigator';

import Store, { persistor } from './src/redux';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n'
    + 'Shake or press menu button for dev menu',
});

const AppContent = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return (
    // <NativeRouter>
      <Provider store={Store}>
        <PersistGate persistor={persistor}>
          <AppContent />
          {/* <View style={styles.container}> */}
          {/* <Text style={styles.welcome}>Welcome to React Native!</Text>
              <Text style={styles.instructions}>To get started, edit App.js</Text>
              <Text style={styles.instructions}>{instructions}</Text> */}

          {/* <Homepage />
            </View> */}
        </PersistGate>
      </Provider>
    // </NativeRouter>
    );
  }
}

// const styles = EStyleSheet.create({
// container: {
// flex: 1,
// justifyContent: 'center',
// alignItems: 'center',
// backgroundColor: '#F5FCFF',
// },
// welcome: {
//   fontSize: 20,
//   textAlign: 'center',
//   margin: 10,
// },
// instructions: {
//   textAlign: 'center',
//   color: '#333333',
//   marginBottom: 5,
// },
// });
