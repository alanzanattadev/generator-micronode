var express = require('express');
<% if (packages.multer) { %>
var multer = require('multer');
<% } %>
var bodyParser = require('body-parser');
var app = express();
exports.app = app;
// var router = require('../lib/controller.js');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
<% if (packages.multer) { %>
app.use(multer({
  inMemory: true,
  rename: function (fieldname, filename, req, res) {
    req.fileUploaded = filename;
    return filename;
  }
}));
<% } %>

// app.use('/route', router);
