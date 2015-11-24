import path from 'path';

function makeAppPaths(APP_NAME, cwd) {
  cwd = cwd || '';

  const srcPath = path.join(cwd, 'src');
  const serverPath = path.join(srcPath, 'server');
  const assetsPath = path.join(cwd, 'assets');
  const publicPath = path.join(cwd, 'public');
  const buildPath = path.join(publicPath, 'dist');
  const testsPath = path.join(cwd, 'tests');

  return {
    root: cwd,
    src: srcPath,
    package: path.join(cwd, '/package.json'),
    components: path.join(srcPath, 'components'),
    views: path.join(serverPath, 'views'),
    node_modules: path.join(cwd, 'node_modules'),
    backend: {
      default: path.join(cwd, 'index.js'),
      server: path.join(srcPath, 'server.js')
    },
    react: {
      all: path.join(srcPath, '**/*.jsx'),
      routes: path.join(srcPath, 'routes.jsx'),
      main: path.join(srcPath, 'client.js')
    },
    less: {
      default: path.join(srcPath, 'less')
    },
    tests: {
      default: testsPath,
      functional: path.join(testsPath, 'functional')
    },
    public: {
      default: path.join(cwd, 'public')
    },
    build: {
      default: buildPath,
      css: path.join(buildPath, 'css'),
      img: path.join(buildPath, 'img'),
      js: path.join(buildPath, 'js'),
      fonts: path.join(buildPath, 'fonts'),
      html: path.join(buildPath, 'html'),
      tests: path.join(testsPath, 'build')
    }
  };
};

const APP_NAME = 'Goodfoot';

const APP_PATHS = makeAppPaths(APP_NAME, process.cwd());

const RELATIVE_APP_PATHS = makeAppPaths(APP_NAME);

const APP_SETTINGS = {
  webpack: {
    host: process.env.WHOST ? process.env.WHOST : 'localhost',
    port: process.env.WPORT ? process.env.WPORT : 8080
  },
  host: process.env.HOST || 'localhost',
  port: process.env.PORT ? process.env.PORT : 3000,
  fakeUserRecord: '19ec99f0-cf46-4559-b205-f6cb9db38309',
  cookieMaxAgeInSeconds: 10 * 24 * 60 * 60,
  ssl: {
    port: 3443
  }
};

const PROTOCOL = process.env.NODE_ENV === 'development' ? 'http' : 'https';

const APP_URL = `${PROTOCOL}://${APP_SETTINGS.host}:${APP_SETTINGS.port}`;

const API_URL = `${APP_URL}/api`;

module.exports = {
  APP_NAME: APP_NAME,
  APP_PATHS: APP_PATHS,
  APP_SETTINGS: APP_SETTINGS,
  RELATIVE_APP_PATHS: RELATIVE_APP_PATHS,
  API_URL: API_URL,
  APP_URL: APP_URL
};
