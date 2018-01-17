import express from 'express';
import path from 'path';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import bodyParser from 'body-parser';
import webpackConfig from '../../config/webpack.dev';
import { loginHandler, keepAliveHandler, validateHandler } from './authentication';

const configuredWebpack = webpack(webpackConfig);
const app = express();
if (process.env.NODE_ENV !== 'production') {
  app.use(webpackDevMiddleware(configuredWebpack));
}

const publicPath = path.join(__dirname, '..', '..', 'dist');
app.use(express.static(publicPath));
app.use(bodyParser.json());
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Static webserver listening on ${port}`); // eslint-disable-line no-console
});
app.post('/auth/login', loginHandler);
app.post('/auth/keep-alive', keepAliveHandler);
app.post('/auth/validate-session', validateHandler);
