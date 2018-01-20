import express from 'express';
import path from 'path';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import bodyParser from 'body-parser';
import webpackConfig from '../../config/webpack.dev';
import authRouter from './auth';

const configuredWebpack = webpack(webpackConfig);
const app = express();
if (process.env.NODE_ENV !== 'production') {
  app.use(webpackDevMiddleware(configuredWebpack));
}

const publicPath = path.join(__dirname, '..', '..', 'dist');
app.use(express.static(publicPath));
app.use('/auth', authRouter);
app.get('/ping', (req, res) => res.status(200).send());
app.use(bodyParser.json());
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Static webserver listening on ${port}`); // eslint-disable-line no-console
});

