var should = require('should');
var request = require('supertest');
var api = require('../configs/api').app;
var db = require('../configs/database');

describe('/route', function() {
  before(function(done) {
    db.connect(done);
  });

  after(function(done) {
    db.disconnect(done);
  });

  it('should ', function(done) {
    request(api)
      .post('/route')
      .send({
        key: '',
      })
      .expect(200)
      .end(function(err, res) {
        if (err)
          return done(err);
        done();
      });
  });

});
