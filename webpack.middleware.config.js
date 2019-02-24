const webpack = require('webpack')
import getEnvironmentConstants from './getEnvironmentConstants'

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    entry: [
        '@babel/polyfill',
        'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
        './src/index.js',
    ],
    output: {
        filename: '[name]-bundle.js',
        publicPath: '/dist',
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({ 'process.env': getEnvironmentConstants() }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            // SCSS
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 2,
                            localIdentName: '[folder]-[local]',
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [require('autoprefixer')()],
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            outputStyle: 'expanded',
                            sourceMap: false,
                        },
                    },
                ],
            },
        ],
    },
}
