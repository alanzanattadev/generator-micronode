var mongoose = require('mongoose');
var Grid = require('gridfs-stream');
var app = require('./api').app;

var envIp = process.env.RESOURCE_DATABASE_IP;
var db = "assets";
var ip = envIp === undefined ? "localhost" : envIp;

exports.connect = function(done) {
  console.log('Connecting to ' + ip + '.');
  mongoose.connect('mongodb://' + ip + '/' + db);
  console.log('Connected.');

  var conn = mongoose.connection;
  app.set('conn', conn);
  Grid.mongo = mongoose.mongo;

  conn.once('open', function () {
    console.log('Connecting to GridFS');
    app.set('gfs', Grid(conn.db));
    console.log('GridFS connected.');
    if (done)
      done();
  });
}
