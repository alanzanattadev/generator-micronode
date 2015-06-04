var express = require('express');
var multer = require('multer');
var app = express();
exports.app = app;
// var router = require('../lib/controller.js');

app.use(multer({
  inMemory: true,
  rename: function (fieldname, filename, req, res) {
    req.fileUploaded = filename;
    return filename;
  }
}));

// app.use('/route', router);
