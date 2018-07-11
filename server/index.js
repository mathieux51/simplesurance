import 'babel-polyfill'
import express from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackHotServerMiddleware from 'webpack-hot-server-middleware'
import morgan from 'morgan'
import bunyan from 'bunyan'
import bunyanFormat from 'bunyan-format'

import clientConfig from '../webpack/client.dev'
import serverConfig from '../webpack/server.dev'

const DEV = process.env.NODE_ENV === 'development'
const { publicPath } = clientConfig.output
const outputPath = clientConfig.output.path
const log = bunyan.createLogger({
  name: '⚡️ simplesurance',
  stream: bunyanFormat({ outputMode: 'short' })
})
const host = 'localhost'
const port = 3000

const app = express()

app.use(morgan(!DEV ? 'tiny' : 'dev'))

log.info(`Compiling ${!DEV ? ' production' : 'development'}, ⏳ please wait...`)
if (DEV) {
  const multiCompiler = webpack([clientConfig, serverConfig])
  const clientCompiler = multiCompiler.compilers[0]

  const webpackDevMiddlewareOptions = {
    publicPath,
    stats: { colors: true },
    serverSideRender: true,
    logLevel: 'debug'
  }

  app.use(webpackDevMiddleware(multiCompiler, webpackDevMiddlewareOptions))
  app.use(webpackHotMiddleware(clientCompiler))
  app.use(webpackHotServerMiddleware(multiCompiler, {
    serverRendererOptions: { outputPath }
  }))
}
else {
  const clientStats = require('../buildClient/stats.json') // eslint-disable-line
  const serverRender = require('../buildServer/main.js').default // eslint-disable-line

  app.use(publicPath, express.static(outputPath))
  app.use(serverRender({ clientStats, outputPath }))
}

app.listen(port, err => {
  if (err) log.error(err)
  log.info(`Starting at ${host}:${port}`)
})
