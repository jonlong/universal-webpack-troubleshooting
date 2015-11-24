import Express from 'express';
import webpack from 'webpack';
import { APP_SETTINGS } from '../config';
import webpackConfig from './config.dev';

const compiler = webpack(webpackConfig);

const host = APP_SETTINGS.webpack.host;
const port = APP_SETTINGS.webpack.port;

const serverOptions = {
  contentBase: 'http://' + host + ':' + port,
  quiet: true,
  noInfo: true,
  hot: true,
  inline: true,
  lazy: false,
  publicPath: webpackConfig.output.publicPath,
  headers: { 'Access-Control-Allow-Origin': '*' },
  stats: { colors: true }
};

const app = new Express();

app.use(require('webpack-dev-middleware')(compiler, serverOptions));
app.use(require('webpack-hot-middleware')(compiler));

app.listen(port, function onAppListening(err) {
  if (err) {
    console.error(err);
  } else {
    console.info('==> 🚧  Webpack development server listening on port %s', port);
  }
});