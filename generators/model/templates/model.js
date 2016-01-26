var mongoose = require('mongoose');
var moment = require('moment');

var <%= model.name %>Schema = new mongoose.Schema({

});

var <%= model.name %>Model = mongoose.model('<%= model.name %>', <%= model.name %>Schema);

module.exports = {
  schema: <%= model.name %>Schema,
  model: <%= model.name %>Model
};
