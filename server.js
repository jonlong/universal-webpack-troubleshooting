import bodyParser from 'body-parser';
import express from 'express';
import http from 'http';
import socketIO from 'socket.io';
import compression from 'compression';
import errorhandler from 'errorhandler';
import serveStatic from 'serve-static';
import cookieParser from 'cookie-parser';
import swig from 'swig';
import routes from './src/routes/Root';
import serverRouter from './src/server';
import { APP_PATHS, APP_SETTINGS } from './config';

// var api = require('./backend/api');
// var tokenApi = require('./backend/api/token');
const app = express();
const httpServer = http.Server(app);
const port = process.env.PORT || APP_SETTINGS.port;
const host = process.env.HOST || APP_SETTINGS.host;

let io = socketIO(httpServer);

/**
 * Set the rendering engine (Swig)
 */

app.engine('swig', swig.renderFile);
app.set('view engine', 'swig');
app.set('view cache', false);
app.set('views', APP_PATHS.views);

swig.setDefaults({
  cache: false
});

/**
 * Set Express middleware
 */

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(compression());
app.use(serveStatic(APP_PATHS.public.default));

if (process.env.NODE_ENV === 'development') {
  app.use(errorhandler());
}

/**
 * Routes
 */

// Token Endpoints (for cookies, token verification, etc)
// app.use('/token', tokenApi);

// Server API (used for pre-fetching app data from Firebase)
// app.use('/api', api);

// React app routes (powered by react-router)
app.use(serverRouter(routes));

/**
 * Fire it up
 */

httpServer.listen(port, host);

const serverType = __DEVELOPMENT__ ? '🚧  Development' : '✅ Production';

console.info(`==> ${serverType} Server is listening`);
console.info('==> 🌎  Go to ' + host + ':' + port);
