var express = require('express');
var app = express();
exports.app = app;
var assetsRouter = require('../lib/assets');
var multer = require('multer');

app.use(multer({
  inMemory: true,
  rename: function (fieldname, filename, req, res) {
    req.fileUploaded = filename;
    return filename;
  }
}));
app.use('/assets', assetsRouter);
