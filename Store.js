var Immutable = require('immutable');
var events = require('events');
var utils = require('util');

var Store = function() {
    this.structure = Immutable.Map();

    if (Store.instance) return Store.instance;
    Store.instance = this;

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

    this.get = (type) => this.structure.get(type);

    this.fire = (type, data) => { 
        this.emit(type, data)
    }
}

utils.inherits(Store, events.EventEmitter);
module.exports = new Store();