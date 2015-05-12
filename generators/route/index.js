var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  // The name `constructor` is important here
  constructor: function () {
    // Calling the super constructor is important so our generator is correctly set up
    generators.Base.apply(this, arguments);
  },
  initializing: function() {

  },
  prompting: function () {
    var done = this.async();
    this.prompt([{
      type    : 'input',
      name    : 'name',
      message : 'Enter the route\'s name'
    }, {
      type    : 'input',
      name    : 'filename',
      message : 'Enter the router\'s filename',
      default : function(answers) {
        return answers.name;
      }
    }, {
      type    : 'checkbox',
      name    : 'methods',
      message : 'Choose methods you\'ll use',
      choices : [
        "get",
        "post",
        "delete",
        "put"
      ]
    }, {
      type    : 'list',
      name    : 'withid',
      message : 'With id ?',
      choices : [
        "Yes",
        "No"
      ]
    }, {
      type    : 'checkbox',
      name    : 'methodswithid',
      message : 'Choose methods you\'ll use with id',
      choices : function(answers) {
        return answers.methods;
      }
    }, {
      type    : 'input',
      name    : 'mountingroute',
      message : 'Choose mounting route',
      default : function(answers) {
        return ("/" + answers.name);
      }
    }], function (answers) {
      this.answers = answers;
      done();
    }.bind(this));
  },
  configuring: function() {

  },
  default: function() {

  },
  writing: function() {

  },
  conflicts: function() {

  },
  install: function() {

  },
  end: function() {

  }
});
