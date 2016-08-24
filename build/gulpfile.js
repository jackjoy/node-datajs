// Build for datajs

// include gulp
var gulp = require('gulp'); 
 
// include plug-ins
// var jshint = require('gulp-jshint');
var concat  = require('gulp-concat');
var uglify  = require('gulp-uglify');
var rename  = require('gulp-rename');
var rimraf  = require('gulp-rimraf');
var shell   = require('gulp-shell');
var newer   = require('gulp-newer');
var through = require('through');
var eventStream = require('event-stream');
var replace = require('gulp-replace');
var handlebars = require('gulp-compile-handlebars');
 
var srcDir = '../JSLib/src/';
var destDir = './lib/';

var fileNames     = [ '*.js'];

buildMinify('', fileNames);

gulp.task('default', ['minify'], function() {

});


function buildMinify(extn, fileNames, destName) {
  var destName = 'datajs' + extn + '.js'
  var minName = 'datajs' + extn + '.min.js'
  gulp.task('minify' + extn, function() {
    return gulp.src( mapPath(srcDir, fileNames))
      .pipe(newer(destDir + destName))
      .pipe(concat(destName,  {newLine: ';'}))
      .pipe(gulp.dest(destDir))
      .pipe(uglify())
      .pipe(rename(minName))
      .pipe(gulp.dest(destDir));
  });
}

function mapPath(dir, fileNames) {
  return fileNames.map(function(fileName) {
    return dir + fileName;
  });
}