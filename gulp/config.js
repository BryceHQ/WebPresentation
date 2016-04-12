var dest = './build',
  src = './src',
  mui = './node_modules/material-ui/src';

var package = require('../package.json');

module.exports = {
  browserSync: {
    server: {
      // We're serving the src folder as well
      // for sass sourcemap linking
      baseDir: [dest, src]
    },
    files: [
      dest + '/**'
    ]
  },
  markup: {
    src: src + "/www/**",
    dest: dest
  },
  less: {
    entry: src + "/less/entry.less",
    src: src + "/less/**",
    dest: dest
  },
  browserify: {
    // Enable source maps
    debug: true,
    // A separate bundle will be generated for each
    // bundle config in the list below
    bundleConfigs: [{
      entries: src + '/app/app.jsx',
      dest: dest,
      outputName: 'app',
      // lib: 'common',
    }],
    // dependencies: package.dependencies
  },

  move: {
    watch: src + "/www/index.html",
    scripts: {
      src: dest + "/*.js",
      dest: 'D:/job/2016/presentation/web/Scripts'
    },
    css: {
      src: dest + "/*.css",
      dest: 'D:/job/2016/presentation/web/Content'
    },
  },
};
