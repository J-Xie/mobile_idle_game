import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { createAppContainer } from 'react-navigation';

import AppNavigator from './src/views/navigation/AppNavigator';
import Theme from './src/views/Theme';
import Store, { persistor } from './src/redux';

const AppContent = createAppContainer(AppNavigator);

export default () => (
  <Provider store={Store}>
    <PersistGate persistor={persistor}>
      <Theme>
        <AppContent />
      </Theme>
    </PersistGate>
  </Provider>
);
