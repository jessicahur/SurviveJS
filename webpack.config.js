const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge'); //Concatenates arrays and merges objs. Used to merge "common" config obj on line 10 with custom configs for each npm script
const NpmInstallPlugin = require('npm-install-webpack-plugin');
const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
  app: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'build')
};

const common = {
  // Entry accepts a path or an object of entries. We'll be using the
  // latter form given it's convenient with more complex configurations.
  entry: {
    app: PATHS.app
  },
  //Note that resolve.extensions setting will allow you to refer to JSX files without an extension
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: PATHS.build,
    filename: 'bundle.js'
  },
  devtool: 'eval-source-map',
  module: {
    preLoaders: [ //preLoaders section of the configuration gets executed before loaders
      {
        test: /\.js?$/,
        loaders: ['eslint'],
        // define an include so we check just the files we need
        include: PATHS.app
      }
    ],
    loaders: [
      {
        // Test expects a RegExp! Note the slashes!
        test: /\.css$/,
        loaders: ['style', 'css'],
        // Include accepts either a path or an array of paths.
        include: PATHS.app
      },
      // {
      //   test: /\.jsx$/,
      //   include: PATHS.app,
      //   loader: ['babel'],
      //   query: {
      //     cacheDirectory: true,
      //     presets: ['react', 'es2015', 'survivejs-kanban']
      //   }
      // }
      {
        test: /\.jsx$/,
        include: PATHS.app,
        loader: 'babel',
          query: {
            presets: ['react', 'es2015', 'survivejs-kanban'],
            cacheDirectory: true,
            plugins: [ 'transform-runtime' ]//https://www.npmjs.com/package/babel-plugin-transform-runtime
          }
      },
    ]
  }
};

// Default configuration
if(TARGET === 'start' || !TARGET) {
  module.exports = merge(common, {
    devServer: {
      contentBase: PATHS.build,

      // Enable history API fallback so HTML5 History API based
      // routing works. This is a good default that will come
      // in handy in more complicated setups.
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,

      // Display only errors to reduce the amount of output.
      stats: 'errors-only',

      // Parse host and port from env so this is easy to customize.
      //
      // If you use Vagrant or Cloud9, set
      // host: process.env.HOST || '0.0.0.0';
      //
      // 0.0.0.0 is available to all network devices unlike default
      // localhost
      host: process.env.HOST,
      port: process.env.PORT
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new NpmInstallPlugin({
        save: true // --save
      })
    ]
  });
}

if(TARGET === 'build') {
  module.exports = merge(common, {});
}
