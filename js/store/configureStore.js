'use strict';

import { compose, applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, autoRehydrate } from 'redux-persist';
import { AsyncStorage } from 'react-native';

import reducers from '../reducers';

function configureStore(onComplete) {
  const store = createStore(
    reducers,
    undefined,
    compose(
      applyMiddleware(thunk),
      autoRehydrate()
    )
  );
  const ps = persistStore(store, {storage: AsyncStorage}, onComplete);
//  ps.purge();
  return store;
}

module.exports = configureStore;
