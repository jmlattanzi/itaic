import express from 'express'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpack from 'webpack'
import webpackConfig from './webpack.middleware.config.js'
import path from 'path'

const app = express()
const compiler = webpack(webpackConfig)
app.use(
    webpackDevMiddleware(compiler, {
        hot: true,
        publicPath: webpackConfig.output.publicPath,
    })
)
app.use(
    webpackHotMiddleware(compiler, {
        log: console.log,
        path: '/__webpack_hmr',
        heartbeat: 10 * 1000,
    })
)
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'))
})

const server = app.listen(8080, function() {
    const host = server.address().address
    const port = server.address().port
    console.log('App is listening at http://%s:%s', host, port)
})
