'use strict';

import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';

import ELApp from './ELApp';

let store = createStore(reducers);

function setup() {
  class Root extends React.Component{
    render() {
      return (
        <Provider store={store}>
          <ELApp />
        </Provider>
      );
    }
  }
  return Root;
}

module.exports = setup;
