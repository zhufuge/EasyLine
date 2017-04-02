'use strict';

import { compose, applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, autoRehydrate } from 'redux-persist';
import { AsyncStorage } from 'react-native';

import reducers from '../reducers';

function configureStore() {
  const store = createStore(
    reducers,
    undefined,
    compose(
      applyMiddleware(thunk),
      autoRehydrate()
    )
  );
  persistStore(store, {blacklist: ['showMenu'], storage: AsyncStorage});
  return store;
}

module.exports = configureStore;
