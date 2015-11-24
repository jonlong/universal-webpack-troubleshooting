import App from '../components/App';
import Login from '../components/Login';

/**
 * Webpack Code Splitting Polyfill
 *
 * `require.ensure` is a Webpack function that defines code splitting points in
 * the app.
 *
 * On the server, `require.ensure` gets a polyfill so that Node can use a normal
 * `require` instead.
 */

if (typeof require.ensure !== 'function') {
  require.ensure = (d, c) => c(require);
}

export default {
  path: '/',
  component: App,

  getChildRoutes(location, cb) {
    require.ensure([], (require) => {
      cb(null, [

        // Unauthenticated
        require('./Login'),
        // require('./Register'),
        // require('./ForgotPassword'),
        // require('./NotFound'),

        // Authenticated
        // require('./authenticated/Index')
      ]);
    })
  },

  indexRoute: {
    component: Login
  }
};