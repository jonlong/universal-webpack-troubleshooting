# universal-webpack-troubleshooting

- `npm install`
- `npm run dev`
- Go to `localhost:3000`

## Issues

- `http://localhost:3000/dist/main-[hash].js` returns a 500 error (which in turn causes [AsyncProps](https://github.com/rackt/async-props) to throw a `TypeError: Cannot read property 'components' of undefined`).
- LESS files aren't compiling (`main.less` is `require()`d [here](https://github.com/jonlong/universal-webpack-troubleshooting/blob/master/src/components/Html.jsx#L53)). 
- I think b/c of the previous issue, [webpack-isomorphic-tools](https://github.com/halt-hammerzeit/webpack-isomorphic-tools) is unable to find the asset when the page first loads, and raises this error: `[webpack-isomorphic-tools] [error] asset not found: ./src/less/main.less`
