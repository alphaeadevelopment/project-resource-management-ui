const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const extractScss = new ExtractTextPlugin({ filename: "style.css", allChunks: true })

var config = {
  entry: path.join(__dirname, '../src/client', 'index.jsx'),
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].[chunkhash].js',
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
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
      }
    ]
  },
  resolve: {
    alias: {
      'branding': path.join(__dirname, '../styles/branding'),
      'mixins': path.join(__dirname, '../styles/mixins')
    },
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new CleanWebpackPlugin([path.join(__dirname, '../dist')], { root: process.cwd() }),
    extractScss,
    new HtmlWebpackPlugin({
      template: 'src/client/index.html',
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    new webpack.ProvidePlugin({
      '_': 'lodash',
    }),
  ]
}
module.exports = config
