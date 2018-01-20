import express from 'express';
import path from 'path';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import { loadConfig } from '@alphaeadev/config-client';
import bodyParser from 'body-parser';

loadConfig('http://config-server-test.alphaea.uk', 'project-resource-management-ui', process.env.ENV)
  .then((config) => {
    const port = Number(config.port || 3001);

    const app = express();
    app.use(bodyParser.json());

    if (process.env.NODE_ENV !== 'production') {
      const configuredWebpack = webpack(require('../../config/webpack.dev')); // eslint-disable-line global-require
      app.use(webpackDevMiddleware(configuredWebpack));
    }

    // serve static files from webpack dist dir
    const publicPath = path.join(__dirname, '..', '..', 'dist');
    app.use(express.static(publicPath));

    // ping for load balancer checking health
    app.get('/ping', (req, res) => res.status(200).send());

    app.listen(port, () => {
      console.log('Listening on %s', port); // eslint-disable-line no-console
    });
  });

