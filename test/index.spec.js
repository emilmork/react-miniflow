var should = require('chai').should(),
    miniFLow = require('../lib/index.js'),
    Enhance = miniFLow.EnhancedComponent,
    Store = miniFLow.Store;


describe('Store', function() {
  it('Should create structure', function(done) {
    Store.init({foo : 'bar'});

    Store.on('foo', function(data) {
      data.value.should.equal("zoo");
      done();
    });

    Store.set('foo', 'zoo');
  });

  it('Should append structure', function(done) {
    Store.init({list : [1,2,3]});

    Store.on('list', function(data) {
      data.value.should.have.length(7);
      done();
    });

    Store.update('list','someId', [4,5,6,7], true);
  });
});