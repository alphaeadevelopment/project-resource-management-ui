/* eslint-disable global-require */
const express = require('express');
const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());

if (process.env.NODE_ENV !== 'production') {
  const webpackConfig = require('../../config/webpack.dev');
  const configuredWebpack = webpack(webpackConfig);
  const webpackDevOptions = {
    noInfo: true, publicPath: webpackConfig.output.publicPath,
  };
  app.use(webpackDevMiddleware(configuredWebpack, webpackDevOptions));
  app.use(webpackHotMiddleware(configuredWebpack));
}

// serve static files from webpack dist dir
const publicPath = path.join(__dirname, '..', '..', 'dist');
app.use(express.static(publicPath));

// ping for load balancer checking health
app.get('/ping', (req, res) => res.status(200).send());

app.listen(port, () => {
  console.log('Listening on %s', port); // eslint-disable-line no-console
});
