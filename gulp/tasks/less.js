var gulp = require('gulp');

var less = require('gulp-less');
var rename = require('gulp-rename');
var minifyCSS = require('gulp-minify-css');
var handleErrors = require('../util/handleErrors');
var config       = require('../config').less;

gulp.task('less', function () {
  return gulp.src(config.entry)
    .pipe(less().on('error', handleErrors))
    .pipe(rename('main.css'))
    .pipe(gulp.dest(config.dest))
    .pipe(minifyCSS())
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest(config.dest));
});
