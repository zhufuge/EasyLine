'use strict';

import React from 'react';
import { Provider } from 'react-redux';

const configureStore = require('./store/configureStore');
import ELApp from './ELApp';

function setup() {
  class Root extends React.Component{
    render() {
      return (
        <Provider store={configureStore()}>
          <ELApp />
        </Provider>
      );
    }
  }
  return Root;
}

module.exports = setup;
