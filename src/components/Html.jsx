import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom/server';

/**
 * Stateless wrapper component containing boilerplate data.
 * Used in server-side code only to wrap the string output of the
 * rendered route component.
 *
 * The only thing this component doesn't (and can't) include is the
 * HTML doctype declaration, which is added to the rendered output
 * by the server.js file.
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
             * Smooths page load in development mode by inlining styles in a <style /> tag
             */

            Object.keys(assets.styles).length === 0 ? <style dangerouslySetInnerHTML={{__html: require('../less/main.less')}}/> : null
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
