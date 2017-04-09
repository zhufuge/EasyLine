'use strict';

import React from 'react';
import { Provider } from 'react-redux';

const configureStore = require('./store/configureStore');
import ELApp from './ELApp';
import Loading from './views/loading';

function setup() {
  class Root extends React.Component{
    constructor(props) {
      super(props);
      this.state = {
        isLoading: true,
        store: configureStore(() => this.setState({isLoading: false})),
      };
    }
    render() {
      if (this.state.isLoading) {
        return (<Loading />);
      }
      return (
        <Provider store={this.state.store}>
          <ELApp />
        </Provider>
      );
    }
  }
  return Root;
}

module.exports = setup;
