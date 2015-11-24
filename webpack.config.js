var createConfig = require('hjs-webpack');
var _ = require('lodash');
var isDev = process.env.NODE_ENV !== 'production';

var config = createConfig({
  in: 'src/client.js',
  out: 'public/dist',
  html: false,
  isDev: isDev,
  clearBeforeBuild: true
});
console.log(config.module.loaders);
module.exports = config;