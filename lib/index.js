'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Immutable = require('immutable');
var events = require('events');
var utils = require('util');
var React = require('react');
var Component = React.Component;

var State = require('./state');

var eventName = function eventName(e) {
  return e.event ? e.event : e;
};
var eventData = function eventData(l, data) {
  return l.handler ? l.handler(data) : data;
};

var EnhancedComponent = function EnhancedComponent(Component, listeners) {
  var View = (function (_Component) {
    _inherits(View, _Component);

    function View(props) {
      var _this = this;

      _classCallCheck(this, View);

      _get(Object.getPrototypeOf(View.prototype), 'constructor', this).call(this, props);

      this.state = {};

      this.handlers = listeners.map(function (l) {
        return function (data) {
          var o = {};
          o[eventName(l)] = eventData(l, data);
          _this.setState(Object.assign(_this.state, o));
        };
      });

      listeners.forEach(function (l, i) {
        State.on(eventName(l), _this.handlers[i]);
      });
    }

    _createClass(View, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        var state = {};
        listeners.forEach(function (l) {
          var event = eventName(l),
              data = State.get(event);
          state[event] = eventData(l, data);
        });
        this.setState(state);
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        var _this2 = this;

        listeners.forEach(function (l, i) {
          return State.removeListener(l.event, _this2.handlers[i]);
        });
      }
    }, {
      key: 'render',
      value: function render() {
        return React.createElement(Component, _extends({}, this.props, this.state));
      }
    }]);

    return View;
  })(Component);

  return View;
};

var Types = {
  List: Immutable.List.of(),
  Map: Immutable.Map()
};

module.exports.State = State;
module.exports.EnhancedComponent = EnhancedComponent;
module.exports.Types = Types;