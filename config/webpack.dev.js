/* eslint-disable */
const fs = require('fs');
const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const moduleConfig = require(fs.existsSync(path.join(__dirname, '../module-config.js')) ? '../module-config' : '../default-module-config.js');

const extractScss = new ExtractTextPlugin({ filename: "style.css", allChunks: true })
const extractCss = new ExtractTextPlugin({ filename: "main.css", allChunks: true })

const VENDOR_LIBS = [
  'classnames',
  'fetch-everywhere',
  'immutability-helper',
  'jsonwebtoken',
  'lodash',
  'material-ui-icons',
  'material-ui',
  'material-ui-schema-form',
  'moment',
  'node-rsa',
  'react-dom',
  'react-redux',
  'react-router-dom',
  'react',
  'redux-actions',
  'redux-logger',
  'redux-thunk',
  'redux',
  'reselect',
  'rx',
  'sha.js',
  'typeface-roboto',
  'uuid',
];

console.log(path.join(__dirname, '../src/client/styles/branding'));
const alias = {
  'branding': path.join(__dirname, '../src/client/styles/branding'),
  'images': path.join(__dirname, '../assets/images'),
  'mixins': path.join(__dirname, '../src/client/styles/mixins'),
  'styles': path.join(__dirname, '../src/client/styles'),
  'publickey.pem': path.join(__dirname, '../keys', 'publickey.pem'),
  'api-stubs': path.join(__dirname, '../src/stubs/empty-stubs.js'),
}
if (process.env.NODE_ENV !== 'production' && process.env.NO_STUBS === undefined) {
  alias['api-stubs'] = path.join(__dirname, '../src/stubs/api-stubs.js');
}
if (process.env.NODE_ENV !== 'production') {
  Object.assign(alias, moduleConfig.aliases);
}
console.log(alias);

const babelExclude = /node_modules[\\/](?!@alphaeadev\/(config-client|common-ui-components|js-services))/

var config = {
  entry: {
    main: [path.join(__dirname, '../src/client', 'index.jsx')],
    vendor: VENDOR_LIBS,
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].js',
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.jsx?$/,
            use: ['babel-loader'],
            exclude: babelExclude,
          },
          {
            test: /\.scss$/,
            use: extractScss.extract({
              use: [{
                loader: 'css-loader',
                options: {
                  localIdentName: '[path]__[name]__[local]__[hash:base64:5]',
                  modules: true,
                  camelCase: true,
                }
              }, {
                loader: 'sass-loader',
              }]
            }),
          },
          {
            test: /\.css$/,
            use: extractCss.extract({
              use: [{
                loader: 'css-loader',
                options: {
                  localIdentName: '[path]__[name]__[local]__[hash:base64:5]',
                  modules: true,
                  camelCase: true,
                }
              }]
            }),
          },
          {
            test: /\.(gif|png|jpe?g|svg)$/i,
            loaders: [
              {
                loader: 'url-loader',
                options: {
                  limit: 50000,
                },
              }, {
                loader: 'image-webpack-loader',
              }
            ]
          },
          {
            test: /\.(pem|txt)$/,
            use: 'raw-loader',
          },
          {
            exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
            loader: 'file-loader',
            options: {
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
        ]
      }
    ]
  },
  resolve: {
    alias,
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    extractScss,
    extractCss,
    new HtmlWebpackPlugin({
      template: 'src/client/index.html',
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor', 'manifest'],
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.ENV': JSON.stringify(process.env.ENV),
      'process.env.PROXY_SERVER': JSON.stringify(process.env.PROXY_SERVER),
    }),
    new webpack.ProvidePlugin({
      '_': 'lodash',
      'material-ui': 'material-ui',
    }),
  ],
  target: 'web'
}

// PROD ONLY
if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin(),
  );
}
// NON-PROD ONLY
else {
  config.plugins.push(
    new CleanWebpackPlugin([path.join(__dirname, '../dist')], { root: process.cwd() }),
    new webpack.HotModuleReplacementPlugin(),
    // new webpack.LoaderOptionsPlugin({
    //   options: {
    //     eslint: {
    //       configFile: path.join(__dirname, '../.eslintrc.js'),
    //       failOnWarning: false,
    //       failOnError: true,
    //       ignorePatten: ["node_modules", "dist", "**/config-client/**"]
    //     },
    //   },
    // })
  );
  config.entry.main.splice(0, 0, 'webpack-hot-middleware/client');
  // config.module.rules.push(
  //   { enforce: 'pre', test: /\.jsx?$/, loader: 'eslint-loader', exclude: babelExclude },
  // );
}
// console.log(JSON.stringify(config, undefined, 2));
module.exports = config
