var api = require('./configs/api');
var db = require('./configs/database');

db.connect(function() {
  api.app.listen(80);
});
