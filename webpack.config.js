const webpack = require('webpack')
const getEnvironmentConstants = require('./getEnvironmentConstants')

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    entry: ['@babel/polyfill', './src/index.js'],
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
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },

            // SCSS
            {
                test: /\.(scss|css)$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 2,
                            localIdentName: '[local]',
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

            // images
            {
                test: /\.(png|jp(e*)g|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8000, // Convert images < 8kb to base64 strings
                            name: 'images/[hash]-[name].[ext]',
                        },
                    },
                ],
            },

            //file-loader(for fonts)
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ['file-loader'],
            },
        ],
    },
    devServer: {
        historyApiFallback: true,
        // hot: true,
        port: 8080,
        open: true,
        proxy: {
            '/auth': {
                target: 'http://localhost:3001',
                changeOrigin: true,
            },

            '/posts': {
                target: 'http://localhost:3001',
                // changeOrigin: true,
            },
        },
    },
}
