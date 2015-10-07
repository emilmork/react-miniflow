jest.dontMock('immutable');

jest.dontMock('../lib/index.js');
jest.dontMock('../lib/state.js');
var miniFlow = require('../lib/index');
var {
  Enhance,
  State,
  Types
} = miniFlow;
var Immutable = require('immutable');


var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

var Component = React.createClass({
    render: function() {
      return <div ref="child"/>
    }
});

describe('State', function() {
  it('Should create and update structure', function(done) {
    State.init({foo : 'bar'});

    State.on('foo', function(data) {
      expect(data).toBe("zoo");
    });

    expect(State.get('foo')).toBe("bar");
    State.set('foo', 'zoo');
  });
});

describe('Enhance', function() {
   it('Should get initial props from state', function() {
      State.init({number: 0, list: Types.List});

      var App = React.createFactory(Enhance(Component,['number','list']));

      var parent = TestUtils.renderIntoDocument(App());

      expect(parent.state.number).toEqual(0);
      expect(parent.state.list).toBe(Immutable.List.of());

   });

  it('Should get new props from state', function() {
    var App = React.createFactory(Enhance(Component,['number','list']));

    var parent = TestUtils.renderIntoDocument(App());

    expect(parent.state.number).toEqual(0);
    expect(parent.state.list).toBe(Immutable.List.of());

    State.set('number', 1);
    State.set('list', [1,2,3,4]);
    
    expect(parent.state.list).toEqual([1,2,3,4]);
    expect(parent.state.number).toEqual(1);

  });

  it('Should get props from custom handler', function() {
    State.init({name: 'Bond'});

    var App = React.createFactory(Enhance(Component,[{event: 'name', handler: function(name) {
      return `Hello ${name}`;
    }}]));

    var parent = TestUtils.renderIntoDocument(App());

    expect(parent.state.name).toEqual("Hello Bond");

    State.set('name', 'Odjob');
    
    expect(parent.state.name).toEqual("Hello Odjob");
  });

});