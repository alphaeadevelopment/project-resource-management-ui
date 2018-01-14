import express from 'express'
import path from 'path'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'

import webpackConfig from '../../config/webpack.dev.js'

const app = express()
if (process.env.NODE_ENV !== 'production') {
  app.use(webpackDevMiddleware(webpack(webpackConfig)))
}

const publicPath = path.join(__dirname, '..', '..', 'dist')
app.use(express.static(publicPath))
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Static webserver listening on ${port}`)
})

