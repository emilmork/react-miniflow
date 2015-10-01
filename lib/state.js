'use strict';

var Immutable = require('immutable');
var events = require('events');
var utils = require('util');

var Types = {
    List: Immutable.List.of(),
    Map: Immutable.Map()
};

var State = function State() {
    var _this = this;

    this.structure = Immutable.Map();

    if (State.instance) return State.instance;
    State.instance = this;

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
        return { id: type, value: _this.structure.get(type) };
    };

    this.fire = function (type, data) {
        _this.emit(type, data);
    };
};

utils.inherits(State, events.EventEmitter);
module.exports = new State();