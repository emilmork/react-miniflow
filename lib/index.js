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

var Store = function Store() {
  var _this = this;

  this.structure = Immutable.Map();

  if (Store.instance) return Store.instance;
  Store.instance = this;

  this.init = function (structure) {
    return _this.structure = Immutable.Map(structure);
  };

  this.set = function (type, data) {
    _this.structure = _this.structure.set(type, data);
    _this.emit(type, { id: type, value: _this.structure.get(type) });
  };

  this.update = function (type, id, data, append) {
    if (!append) {
      _this.structure = _this.structure.set(type, data);
    } else {
      _this.structure = _this.structure.set(type, _this.structure.get(type).concat(data));
    }
    _this.emit(type, { id: id, value: _this.structure.get(type) });
  };

  this.get = function (type) {
    return _this.structure.get(type);
  };

  this.fire = function (type, data) {
    _this.emit(type, data);
  };
};

var EnhancedComponent = function EnhancedComponent(Component, listeners) {
  var View = (function (_Component) {
    _inherits(View, _Component);

    function View(props) {
      var _this2 = this;

      _classCallCheck(this, View);

      _get(Object.getPrototypeOf(View.prototype), 'constructor', this).call(this, props);

      this.state = { data: null };

      this.handlers = listeners.map(function (l) {
        return function (data) {
          _this2.setState(Object.assign(_this2.state, { data: l.handler ? l.handler(data) : data }));
        };
      });

      listeners.forEach(function (l, i) {
        return Store.on(l.event, _this2.handlers[i]);
      });
    }

    _createClass(View, [{
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        var _this3 = this;

        listeners.forEach(function (l, i) {
          return Store.removeListener(l.event, _this3.handlers[i]);
        });
      }
    }, {
      key: 'render',
      value: function render() {
        return React.createElement(Component, _extends({}, this.props, { data: this.state.data }));
      }
    }]);

    return View;
  })(Component);

  return View;
};

utils.inherits(Store, events.EventEmitter);
module.exports.Store = new Store();
module.exports.EnhancedComponent = EnhancedComponent;