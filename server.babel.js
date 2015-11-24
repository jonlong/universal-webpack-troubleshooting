var path = require('path');
var rootDir = path.resolve(__dirname);
var WebpackIsomorphicTools = require('webpack-isomorphic-tools');

// Enable Babel syntax in require'd files
require('babel-core/register');

/**
 * Isomorphic constants for conditional use based on environment.
 *
 * Webpack sets these on the client side.
 */

global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production';

if (__DEVELOPMENT__) {
  if (!require('piping')({
      hook: true,
      ignore: /(\/\.|~$|\.json|\.less$)/i
    })) {
    return;
  }
}

/**
 * Configure `webpack-isomorphic-tools` for server use
 */

global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('./webpack/config.isomorphicTools'))
  .development(__DEVELOPMENT__)
  .server(rootDir, function() {
    require('./server');
  });