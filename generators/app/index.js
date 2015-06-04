var generators = require('yeoman-generator');
var fs = require('fs');
var spawn = require('cross-spawn');

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
      message : 'Your project name',
      default : this.appname // Default to current folder name
    }, {
      type    : 'input',
      name    : 'description',
      message : 'Your project description',
    }, {
      type    : 'input',
      name    : 'author',
      message : 'Your project author',
    }, {
      type    : 'checkbox',
      name    : 'frameworks',
      message : 'pluggable elements',
      choices : [
        'Database',
        'Web',
        'WebSocket',
        'Docker',
        'Git',
      ]
    }, {
      type    : 'input',
      name    : 'repo',
      message : 'Your project repository',
      when    : function(answers) {return answers.frameworks.indexOf('Git') != -1;}
    }, {
      type    : 'list',
      name    : 'httpfile',
      message : 'Will you receive multipart request ?',
      choices : [
        'Yes',
        'No'
      ],
      when    : function(answers) {return answers.frameworks.indexOf('Web') != -1;}
    }, {
      type    : 'list',
      name    : 'gridfs',
      message : 'Will you interact with gridfs ?',
      choices : [
        'Yes',
        'No'
      ],
      when    : function(answers) {return answers.frameworks.indexOf('Database') != -1;}
    }, {
      type    : 'list',
      name    : 'orm',
      message : 'ORM',
      choices : [
        'mongoose',
        'None'
      ],
      when    : function (answers) {return (answers.frameworks.indexOf('Database') != -1);}
    }], function (answers) {
      this.answers = answers;
      done();
    }.bind(this));
  },
  configuring: function() {
    // prepare package.json
    var packageJson = {
      name: this.answers.name,
      description: this.answers.description,
      author: this.answers.author,
      version: "0.1.0",
      license: "ISC",
      keywords: [
        "microservice",
        this.author,
        "node"
      ],
      repository: {
        type: "git",
        url: this.answers.repo
      },
      main: "server.js",
      scripts: {
        test: "gulp test"
      }
    };
    this.packageJson = packageJson;
    // prepare packages to install
    this.toInstall = [

    ];
    this.toInstallDev = [
      "mocha",
      "should",
      "sinon",
      "jshint-stylish",
      "gulp",
      "gulp-util",
      "gulp-mocha",
      "gulp-jshint"
    ];
    if (this.answers.orm != 'None') {
      this.toInstall.push(this.answers.orm);
      this.orm = this.answers.orm;
    }
    if (this.answers.frameworks.indexOf('Web') != -1) {
      this.toInstall.push("express");
      this.toInstallDev.push("supertest");
      this.express = true;
    }
    if (this.answers.frameworks.indexOf("WebSocket") != -1)
      this.toInstall.push("socket.io");
    if (this.answers.gridfs == "Yes")
      this.toInstall.push("gridfs-stream");
    if (this.answers.httpfile == "Yes")
      this.toInstall.push("multer");
    // prepare git
    if (this.answers.frameworks.indexOf('Git') != -1)
      this.git = true;
    if (this.answers.repo != "")
      this.repo = this.answers.repo;
    // prepare docker
    if (this.answers.frameworks.indexOf('Docker') != -1)
      this.docker = true;
  },
  default: function() {

  },
  writing: function() {
    if (this.git) {
      // init git
      spawn.sync('git', ['init']);
      spawn.sync('git', ['commit', '--allow-empty', '-m', 'initial commit']);
      // write .gitignore
      this.fs.copyTpl(this.templatePath("gitignore"), this.destinationPath("./.gitignore"));
    }
    // write yeoman rc
    this.config.save();
    // write README.md
    this.fs.copyTpl(this.templatePath("README.md"), this.destinationPath("README.md"));
    // write package.json
    this.fs.writeJSON("./package.json", this.packageJson);
    // create lib folder
    fs.mkdirSync(this.destinationPath("./lib"));
    // create spec folder
    fs.mkdirSync(this.destinationPath("./specs"));
    // create config folder
    fs.mkdirSync(this.destinationPath("./configs"));
    if (this.express)
      this.fs.copyTpl(this.templatePath("api.js"), this.destinationPath("configs/api.js"));
    if (this.orm == "mongoose")
      this.fs.copyTpl(this.templatePath("database.js"), this.destinationPath("configs/database.js"));
    // write gulpfile.js
    this.fs.copyTpl(this.templatePath("gulpfile.js"), this.destinationPath("./gulpfile.js"));
    // write server.json

    // if express : write config/api.js

    // if orm : write config/database.js

    // if docker : write Dockerfile
    if (this.docker)
      this.fs.copyTpl(this.templatePath("Dockerfile"), this.destinationPath("./Dockerfile"));
    // if repo : git remote add origin ...
    if (this.repo)
      spawn.sync('git', ['remote', 'add', 'origin', this.repo]);
  },
  conflicts: function() {

  },
  install: function() {
    // install npm devDependencies
    if (this.toInstallDev)
      this.npmInstall(this.toInstallDev, {'saveDev': true});
    // install npm dependencies
    if (this.toInstall)
      this.npmInstall(this.toInstall, {'save': true});
  },
  end: function() {
    // if repo : git add / git commit / git push
    if (this.git) {
      spawn.sync('git', ['add', '.gitignore']);
      spawn.sync('git', ['commit', '-m', '.gitignore']);
      spawn.sync('git', ['add', '.']);
      spawn.sync('git', ['commit', '-m', 'base project']);
      if (this.repo)
        spawn.sync('git', ['push', 'origin', 'master']);
    }
  }
});
