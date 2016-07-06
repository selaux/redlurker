/* eslint-disable */
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin').default;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const autoprefixer = require('autoprefixer');

const nodeEnv = process.env.NODE_ENV === 'production' ? 'production' : 'develop';
console.log();

module.exports = {
    devtool: 'cheap-source-map',
    entry: {
        'bundle.js': './app',
        'bundle.css': './assets/styles/app.scss'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    output: {
        path: path.join(__dirname, 'build'),
        filename: '[name]'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel',
                exclude: /node_modules/,
                include: __dirname
            },
            { test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css!postcss') },
            { test: /\.scss$/, loader: ExtractTextPlugin.extract('style', 'css!postcss!sass') },
            {
                test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url?limit=10000"
            },
            {
                test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
                loader: 'file'
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('bundle.css', { allChunks: true }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(nodeEnv)
            }
        }),
        new CopyWebpackPlugin([
            { from: 'assets/index.html' },
            { from: 'assets/manifest.json' }
        ]),
        new ServiceWorkerWebpackPlugin({
            entry: path.join(__dirname, 'app/sw.js'),
            relativePaths: false,
            publicPath: '/'
        })
    ]
};