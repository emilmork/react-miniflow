var should = require('chai').should(),
    miniFLow = require('../lib/index.js'),
    Enhance = miniFLow.EnhancedComponent,
    State = miniFLow.State;


describe('State', function() {
  it('Should create structure', function(done) {
    State.init({foo : 'bar'});

    State.on('foo', function(data) {
      data.value.should.equal("zoo");
      done();
    });

    State.set('foo', 'zoo');
  });

  it('Should append structure', function(done) {
    State.init({list : [1,2,3]});

    State.on('list', function(data) {
      data.value.should.have.length(7);
      done();
    });

    State.update('list','someId', [4,5,6,7], true);
  });
});