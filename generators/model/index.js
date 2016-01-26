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
      message : 'Enter the model\'s name'
    }, {
      type    : 'input',
      name    : 'filename',
      message : 'Enter the model\'s filename',
      default : function(answers) {
        return answers.name + '.js';
      }
    }], function (answers) {
      this.answers = answers;
      done();
    }.bind(this));
  },
  configuring: function() {
    this.templateConfig = {
      model: {
        name: this.answers.name
      }
    };
  },
  default: function() {

  },
  writing: function() {
    this.fs.copyTpl(this.templatePath("model.js"), this.destinationPath("./lib/models/" + this.answers.filename), this.templateConfig);
  },
  conflicts: function() {

  },
  install: function() {

  },
  end: function() {

  }
});
