import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { composeWithDevTools } from 'remote-redux-devtools';

import persistConfig from '../config/persist';

import rootReducer from './root/rootReducer';

const createReduxStore = () => {
  const middlewares = [];
  const enhancers = [];

  if (middlewares.length > 0) {
    enhancers.push(applyMiddleware(...middlewares));
  }

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const store = createStore(
    persistedReducer,
    composeWithDevTools(...enhancers),
  );
  const persistor = persistStore(store);

  return { store, persistor };
};

export const { store, persistor } = createReduxStore();
export default store;
