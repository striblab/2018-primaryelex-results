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
      cacheDirectory:
        process.env.NODE_ENV === 'development' || process.env.DEBUG
          ? false
          : true,
      presets: [
        // Use debug: true to see what transforms are happening
        // and what browsers needed them
        [
          '@babel/preset-env',
          {
            debug: true,
            targets: { browsers: ['ie >= 7'] }
          }
        ]
      ],
      plugins: [
        'lodash',
        [
          '@babel/plugin-transform-runtime',
          {
            regenerator: true
          }
        ]
      ]
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
  entry: './templates/_index-content.svelte.html',
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'test-content.bundle.js'
  },
  module: {
    rules: [
      // Loaded top to bottom.  Right to left.
      {
        test: /.*\.(svelte\.html|svelte)$/,
        use: [loaders.babel, loaders.svelte]
      },
      {
        test: /.*\.(js)$/,
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
          ie8: true,
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
