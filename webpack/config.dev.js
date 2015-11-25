import fs from 'fs';
import path from 'path';
import webpack from 'webpack';
import { APP_PATHS, APP_SETTINGS, RELATIVE_APP_PATHS } from '../config';
import WebpackIsomorphicToolsPlugin from 'webpack-isomorphic-tools/plugin';
import _ from 'lodash';

const rootDir = path.resolve(__dirname, '..');
/**
 * Webpack Isomorphic Tools
 *
 * Helps to mirror Webpack's `require()` magic for
 * server-rendered templates.
 */

const webpackIsomorphicToolsPlugin =
  new WebpackIsomorphicToolsPlugin(require('./config.isomorphicTools'));

// Create the babel loader module's query
const babelLoaderQuery = createBabelLoaderQuery();

/**
 * Create Babel Loader Query
 *
 * Creates the babel loader module's configuration from our `.babelrc`
 */

function createBabelLoaderQuery() {
  const babelrc = fs.readFileSync(`${APP_PATHS.root}/.babelrc`);
  let config;
  let devConfig;
  let query;

  try {
    config = JSON.parse(babelrc);
  }

  catch (err) {
    console.error('Error parsing .babelrc');
    console.error(err);
  }

  devConfig = config.env && config.env.development || {};

  query = _.assign({}, config, devConfig);

  delete query.env;

  return query;
};

/**
 * Webpack Config
 */
module.exports = {

  // Enable Source Maps (most performative option chosen)
  devtool: 'eval',

  // Resolve all relative paths from the project root folder
  context: path.resolve(__dirname, '..'),

  entry: {

    /**
     * Main Entry Point
     *
     * - Our main client-side React component
     * - `webpack-hot-middleware` adds hot-reloading into an existing
     * server (Express in our case) without using `webpack-dev-server`.
     */

    'main': [
      `webpack-hot-middleware/client?path=http://${APP_SETTINGS.webpack.host}:${APP_SETTINGS.webpack.port}`,
      APP_PATHS.react.main
    ]

  },

  /**
   * Output File
   *
   * `app.js`
   */

  output: {
    path: APP_PATHS.build.default,
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: '/dist/'
  },


  /**
   * Module Configuration
   */

  module: {

    loaders: [

      {
        test: /\.jsx?$/,
        exclude: [
          '/node_modules/'
        ],
        loaders: [ `babel?${JSON.stringify(babelLoaderQuery)}` ]
      },

      {
        test: /\.json$/,
        loader: 'json-loader'
      },

      {
        test: /\.less$/,
        loaders: [
          'style-loader',
          'css-loader?importLoaders=2&sourceMap',
          'autoprefixer-loader?browsers=last 2 version',
          'less-loader?outputStyle=expanded&sourceMap=true'
        ]
      },

      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff'
      },

      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff'
      },

      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/octet-stream'
      },

      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file'
      },

      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=image/svg+xml'
      },

      {
        test: webpackIsomorphicToolsPlugin.regular_expression('images'),
        include: APP_PATHS.public.images,
        loader: 'url-loader?limit=10240'
      }
    ]
  },
  progress: true,

  /**
   * Resolve Configuration
   *
   * The criteria webpack will use to resolve module paths in the app
   */

  resolve: {
    modulesDirectories: [
      RELATIVE_APP_PATHS.src,
      'node_modules'
    ],
    extensions: [ '', '.js', '.jsx' ]
  },

  /**
   * Plugins Configuration
   */

  plugins: [

    // hot reload
    new webpack.HotModuleReplacementPlugin(),

    new webpack.IgnorePlugin(/webpack-stats\.json$/),

    // Isomorphic constants
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: true,
      __DEVTOOLS__: true
    }),

    // Disable asset caching and enable hot reload in dev mode
    webpackIsomorphicToolsPlugin.development()
  ]
};