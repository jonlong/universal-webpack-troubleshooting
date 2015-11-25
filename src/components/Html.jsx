import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom/server';

/**
 * Wrapper component containing boilerplate data.
 * Used in server-side code only to wrap the string output of the
 * rendered route component.
 *
 * The only thing this component doesn't (and can't) include is the
 * HTML doctype declaration, because React can only render wrapped components.
 * The doctype is added to the rendered output by the server.js file.
 */

export default class App extends Component {

  render() {
    const { assets, head, content, asyncProps } = this.props;

    return (
      <html lang="en-us">

        <head>

          {/* Metadata from rendered components */}

          { head.title.toComponent() }
          { head.meta.toComponent() }
          { head.link.toComponent() }

          {
            /**
             * External Styles
             *
             * These are present only in production with webpack extract text plugin
             */

            Object.keys(assets.styles).map((style, key) =>
              <link href={assets.styles[style]}
                    key={key}
                    media="screen, projection"
                    rel="stylesheet"
                    type="text/css"
                    charSet="UTF-8"/>)
          }

          {
            /**
             * Inline Styles (Development Mode only)
             *
             * Smooths page load in development mode by inlining styles in a <style /> tag.
             *
             * Webpack doesn't resolve files here — `webpack-isomorphic-tools` does —
             * but the catch is that `webpack-isomorphic-tools` is only able to do
             * this for files that Webpack sees (e.g. anything on the client side).
             *
             * So, `main.less` is also require()d on the client-side, which is how
             * `webpack-isomorphic-tools` is able to resolve the call here.
             */

            Object.keys(assets.styles).length === 0 ? <style data="thisworked" dangerouslySetInnerHTML={{__html: require('../less/main.less')}}/> : null
          }

        </head>

        <body>

          {/* Add our rendered component output */}
          <div id="content" dangerouslySetInnerHTML={{__html: content}}/>

          {/* Set Async Props for client rehydration */}
          <script dangerouslySetInnerHTML={{
            __html: `__ASYNC_PROPS__ = ${JSON.stringify(asyncProps.propsArray, null, 2)};`
          }}/>

          {/* Main JS file */}
          <script src={ assets.javascript.main } charSet="UTF-8"/>

        </body>
      </html>
    );
  }
}

App.propTypes = {
  assets: PropTypes.object,
  head: PropTypes.object,
  content: PropTypes.node,
  asyncProps: PropTypes.object
}
