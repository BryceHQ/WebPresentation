/* browserify task
   ---------------
   Bundle javascripty things with browserify!
   This task is set up to generate multiple separate bundles, from
   different sources, and to use Watchify when run from the default task.
   See browserify.bundleConfigs in gulp/config.js
*/

var browserify = require('browserify');
var watchify = require('watchify');
var bundleLogger = require('../util/bundleLogger');
var gulp = require('gulp');
var handleErrors = require('../util/handleErrors');
var source = require('vinyl-source-stream');
var config = require('../config').browserify;
var babelify = require('babelify');
var uglify = require('gulp-uglify');
var streamify = require('gulp-streamify');
var rename = require('gulp-rename');

gulp.task('browserify', function (callback) {

  var bundleQueue = config.bundleConfigs.length;

  var browserifyThis = function (bundleConfig) {
    var opts = {
      // Required watchify args
      cache: {},
      packageCache: {},
      fullPaths: false,
      // Specify the entry point of your app
      entries: bundleConfig.entries,
      // Add file extentions to make optional in your requires
      extensions: config.extensions,
      // Enable source maps!
      debug: config.debug
    };
    //custom scripts
    var bundler = browserify(opts);
    //dependencies
    // var common = browserify();
    //
    // var dependencies = config.dependencies;
    // var alias = {"js-base64": "base-64"};
    // for(var key in dependencies){
    //   if(!dependencies.hasOwnProperty(key))continue;
    //   key = alias[key] || key;
    //   common.require(key);
		// 	bundler.exclude(key);
    // }


    var bundle = function () {
      // Log when bundling starts
      // bundleLogger.start(bundleConfig.lib + '.js');

      // common.bundle()
      //   .on('error', handleErrors)
      //   // Use vinyl-source-stream to make the
      //   // stream gulp compatible. Specifiy the
      //   // desired output filename here.
      //   .pipe(source(bundleConfig.lib + '.js'))
      //   // Specify the output destination
      //   // .pipe(rename(bundleConfig.lib + '.js'))
      //   .pipe(gulp.dest(bundleConfig.dest))
      //   // .pipe(streamify(uglify()))
      //   // .pipe(rename(bundleConfig.lib + '.min.js'))
      //   // .pipe(gulp.dest(bundleConfig.dest))
      //   .on('end', reportFinished.bind(null, bundleConfig.lib));

      bundleLogger.start(bundleConfig.outputName + '.js');

      return bundler
        .bundle()
        // Report compile errors
        .on('error', handleErrors)
        // Use vinyl-source-stream to make the
        // stream gulp compatible. Specifiy the
        // desired output filename here.
        .pipe(source(bundleConfig.outputName + '.js'))
        // Specify the output destination
        .pipe(gulp.dest(bundleConfig.dest))
        // .pipe(rename(bundleConfig.outputName + '.min.js'))
        // .pipe(streamify(uglify()))
        // .pipe(gulp.dest(bundleConfig.dest))
        .on('end', reportFinished.bind(null, bundleConfig.outputName));
    };

    bundler.transform(babelify.configure());
    // common.transform(babelify.configure());

    if (global.isWatching) {
      // Wrap with watchify and rebundle on changes
      bundler = watchify(bundler);
      // Rebundle on update
      bundler.on('update', bundle);
    }

    var reportFinished = function (name) {
      // Log when bundling completes
      bundleLogger.end(name);

      if (bundleQueue) {
        bundleQueue--;
        if (bundleQueue === 0) {
          // If queue is empty, tell gulp the task is complete.
          // https://github.com/gulpjs/gulp/blob/master/docs/API.md#accept-a-callback
          callback();
        }
      }
    };

    return bundle();
  };

  // Start bundling with Browserify for each bundleConfig specified
  config.bundleConfigs.forEach(browserifyThis);
});
