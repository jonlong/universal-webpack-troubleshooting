import React, { Component } from 'react';
import Helmet from 'react-helmet';

export default class App extends Component {
  render() {
    return (

      <div>

        <Helmet
          title="Goodfoot"

          meta={[
            {
              name: 'http-equiv',
              content: 'text/html; charset=UTF-8'
            },
            {
              name: 'viewport',
              content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
            },
            {
              name: 'robots',
              content: 'noindex'
            },
            {
              name: 'description',
              content: ''
            }
          ]}

          link={[

            // Icons
            {
              rel: 'shortcut icon',
              href: '/images/icons/shortcuts/favicon.ico'
            },
            {
              rel: 'apple-touch-icon',
              href: '/images/icons/shortcuts/60.png'
            },
            {
              rel: 'apple-touch-icon',
              size: '76x76',
              href: '/images/icons/shortcuts/76.png'
            },
            {
              rel: 'apple-touch-icon',
              size: '120x120',
              href: '/images/icons/shortcuts/120.png'
            },
            {
              rel: 'apple-touch-icon',
              size: '152x152',
              href: '/images/icons/shortcuts/152.png'
            }
          ]}
        />

        {this.props.children}

      </div>
    );
  }
};
