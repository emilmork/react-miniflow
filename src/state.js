var Immutable = require('immutable');
var events = require('events');
var utils = require('util');

var Types = {
  List: Immutable.List.of(),
  Map: Immutable.Map()
};

var State = function() {
    this.structure = Immutable.Map();

    if (State.instance) return State.instance;
    State.instance = this;

    this.init = (structure) => this.structure = Immutable.Map(structure);

    this.set = (type, data) => {
        this.structure = this.structure.set(type, data);
        this.emit(type, { id: type, value: this.structure.get(type) });
    }

    this.update = (type, id, data, append) => {
        if(!append) {
            this.structure = this.structure.set(type, data);
        } else {
            this.structure = this.structure.set(type, this.structure.get(type).concat(data));
        }
        this.emit(type, { id: id, value: this.structure.get(type) });
    }

    this.get = (type) => {
        return { id: type, value: this.structure.get(type) };
    }

    this.fire = (type, data) => { 
        this.emit(type, data)
    }
}

utils.inherits(State, events.EventEmitter);
module.exports = new State();