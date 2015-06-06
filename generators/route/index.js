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
        return answers.name + '.js';
      }
    }, {
      type    : 'checkbox',
      name    : 'methods',
      message : 'Choose methods you\'ll use',
      choices : [
        "get /",
        "get /:id",
        "post /",
        "post /:id",
        "delete /",
        "delete /:id",
        "put /",
        "put /:id"
      ]
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
    this.templateConfig = {
      method: {

      }
    };
    if (this.answers.methods.indexOf('get /') != -1)
      this.templateConfig.method.get = true;
    if (this.answers.methods.indexOf('get /:id') != -1)
      this.templateConfig.method.getid = true;
    if (this.answers.methods.indexOf('post /') != -1)
      this.templateConfig.method.post = true;
    if (this.answers.methods.indexOf('post /:id') != -1)
      this.templateConfig.method.postid = true;
    if (this.answers.methods.indexOf('delete /') != -1)
      this.templateConfig.method.delete = true;
    if (this.answers.methods.indexOf('delete /:id') != -1)
      this.templateConfig.method.deleteid = true;
    if (this.answers.methods.indexOf('put /') != -1)
      this.templateConfig.method.put = true;
    if (this.answers.methods.indexOf('put /:id') != -1)
      this.templateConfig.method.putid = true;
  },
  default: function() {

  },
  writing: function() {
    this.fs.copyTpl(this.templatePath("controller.js"), this.destinationPath("./lib/" + this.answers.filename), this.templateConfig);
    this.fs.copyTpl(this.templatePath("test.js"), this.destinationPath("./specs/" + this.answers.filename), this.templateConfig);
  },
  conflicts: function() {

  },
  install: function() {

  },
  end: function() {

  }
});
