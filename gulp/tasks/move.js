var gulp = require('gulp');
var config = require('../config').move;

gulp.task('moveScripts', function() {
  return gulp.src(config.scripts.src)
    .pipe(gulp.dest(config.scripts.dest));
});

gulp.task('moveCss', function() {
  return gulp.src(config.css.src)
    .pipe(gulp.dest(config.css.dest));
});

gulp.task('move', ['moveScripts', 'moveCss'], function() {
  gulp.watch(config.watch, ['move']);
});
