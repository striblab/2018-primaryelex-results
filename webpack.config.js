/**
 * Webpack config for building project
 * https://webpack.js.org/
 */
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

// Loader options
let loaders = {
  babel: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true
    }
  },
  svelte: {
    loader: 'svelte-loader',
    options: {
      hydratable: true,
      store: true,
      legacy: true
    }
  }
};

module.exports = {
  mode: process.env.NODE_ENV || 'production',
  devtool: 'source-map',
  entry: './app/index.js',
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'app.bundle.js'
  },
  module: {
    rules: [
      // Loaded top to bottom.  Right to left.
      {
        test: /\.(svelte\.html|svelte)$/,
        exclude: /node_modules/,
        use: [loaders.babel, loaders.svelte]
      },
      {
        test: /app.*\.js$/,
        exclude: /node_modules/,
        use: [loaders.babel]
      }
    ]
  },
  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        sourceMap: true,
        uglifyOptions: {
          ecma: 5,
          compress: true,
          safari10: true,
          mangle: {
            safari10: true
          }
        }
      })
    ]
  }
};
