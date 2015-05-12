var gulp = require('gulp');
var jshint = require('gulp-jshint');
var gutil = require('gulp-util');
var mocha = require('gulp-mocha');

var build = 'development';

function handleError(error)
{
  this.emit('end');
}

function hint() {
  return gulp.src(['**/*.js', '!node_modules/**/*'])
              .pipe(jshint())
              .pipe(jshint.reporter('jshint-stylish'));
}

function test() {
  return gulp.src('specs/**/*.js')
              .pipe(mocha({
                reporter: 'spec'
              }))
              .on('error', handleError);
}

gulp.task('hint', function() {
  return hint();
});

gulp.task('test', function() {
  return test();
});

gulp.task('default', ['hint', 'test']);
