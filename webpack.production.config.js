var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    core: "./src/index",
  },
  output: {
    path: path.join(__dirname, "dist"),
    // path: 'D://job/2016/Form/Form/scripts',
    filename: "app.js",
    // library: ["FormDesigner", "[name]"],
    // libraryTarget: "var",
  },
  // externals: [
  //   "react",//当把react设为externals时，material会引用react，导致react再次被引用进来
  //   {"jquery": "jQuery"},
  // ],
  // plugins: [
  // ],
  module: {
    loaders: [{
      test: /\.js$|\.jsx$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'src')
    }, {
      test: /\.less$/,
      loader: "style!css!less"
    }, {
      test: /\.css$/,
      loader: "style-loader!css-loader"
    }]
  }
};
