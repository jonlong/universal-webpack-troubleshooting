# universal-webpack-troubleshooting

- `npm install`
- `npm run dev`
- Go to `localhost:3000`

## Issues

- `http://localhost:3000/dist/main-[hash].js` returns a 500 error (which in turn causes [AsyncProps](https://github.com/rackt/async-props) to throw a `TypeError: Cannot read property 'components' of undefined`).
