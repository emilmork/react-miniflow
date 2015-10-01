var Immutable = require('immutable');
var events = require('events');
var utils = require('util');
var React = require('react');
var { Component } = React;
var State = require('./state');


var eventName = (e) => e.event ? e.event : e;
var eventData = (l, data) => l.handler ? l.handler(data) : data;

var EnhancedComponent = (Component, listeners) => {
  class View extends Component {
    constructor(props) {
      super(props);

      this.state = {};

      this.handlers = listeners.map((l) => {
        return (data) => {
          var o = {};
          o[eventName(l)] = eventData(l, data);
          this.setState(Object.assign(this.state, o));
        }
      });

      listeners.forEach((l,i) => {
        State.on(eventName(l), this.handlers[i]);
      });
    }
    
    componentDidMount() {
      var state = {};
      listeners.forEach((l) => {
        var event = eventName(l),
          data = State.get(event);
        state[event] = eventData(l, data);
      });
      this.setState(state);
    }

    componentWillUnmount() {
      listeners.forEach((l,i) => State.removeListener(l.event, this.handlers[i]));
    }

    render() {
      return <Component {...this.props} {...this.state} />
    }
  }
  return View;
}

var Types = {
  List: Immutable.List.of(),
  Map: Immutable.Map()
};


module.exports.State = State;
module.exports.EnhancedComponent = EnhancedComponent;
module.exports.Types = Types;