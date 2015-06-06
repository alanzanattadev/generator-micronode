var express = require('express');
var app = require('../configs/api').app;
var db = require('../configs/database');

var router = express.Router();
<% if (method.get) { %>
router.get('/', function(req, res) {

});
<% } %>
<% if (method.getid) { %>
router.get('/:id', function(req, res) {

});
<% } %>
<% if (method.post) { %>
router.post('/', function(req, res) {

});
<% } %>
<% if (method.postid) { %>
router.post('/:id', function(req, res) {

});
<% } %>
<% if (method.delete) { %>
router.delete('/', function(req, res) {

});
<% } %>
<% if (method.deleteid) { %>
router.delete('/:id', function(req, res) {

});
<% } %>
<% if (method.put) { %>
router.put('/', function(req, res) {

});
<% } %>
<% if (method.putid) { %>
router.put('/:id', function(req, res) {

});
<% } %>
module.exports = router;
