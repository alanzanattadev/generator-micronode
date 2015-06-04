var mongoose = require('mongoose');
<% if (packages.gridfs) { %>
var Grid = require('gridfs-stream');
<% } %>
var app = require('./api').app;

var envIp = process.env.MICROSERVICE_DATABASE_IP;
var db = "<%= project.name %>";
var ip = envIp === undefined ? "localhost" : envIp;

exports.connect = function(done) {
  console.log('Connecting to ' + ip + '.');
  mongoose.connect('mongodb://' + ip + '/' + db);

  var conn = mongoose.connection;
  app.set('conn', conn);
  <% if (packages.gridfs) { %>
  Grid.mongo = mongoose.mongo;
  <% } %>

  conn.once('open', function () {
    console.log('Connected.');
    <% if (packages.gridfs) { %>
    console.log('Connecting to GridFS');
    app.set('gfs', Grid(conn.db));
    console.log('GridFS connected.');
    <% } %>
    if (done)
      done();
  });
}

exports.disconnect = function(done) {
  mongoose.connection.close(done);
};
