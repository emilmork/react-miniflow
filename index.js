var Immutable = require('immutable');
var events = require('events');
var utils = require('util');
var React = require('react');
var { Component } = React;
var Store = require('./Store');

var EnhancedComponent = (Component, listeners) => {
  class View extends Component {
    constructor(props) {
      super(props);

      this.state = {data: null};

      this.handlers = listeners.map((l) => {
        return (data) => {
          this.setState(Object.assign(this.state,{ data: l.handler ? l.handler(data) : data }));
        }
      });

      listeners.forEach((l,i) => Store.on(l.event, this.handlers[i]));
    }

    componentWillUnmount() {
      listeners.forEach((l,i) => Store.removeListener(l.event, this.handlers[i]));
    }

    render() {
      return <Component {...this.props} data={this.state.data} />
    }
  }
  return View;
}


module.exports.Store = Store;
module.exports.EnhancedComponent = EnhancedComponent;