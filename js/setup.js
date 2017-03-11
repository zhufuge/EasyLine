'use strict';

var React = require('react');

var ELApp = require('./ELApp');

function setup() {
  var Root = React.createClass({
    render() {
      return (
        <ELApp />
      );
    }
  });
  return Root;
}

module.exports = setup;
