const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
    entry: './src/Main.ts',
    output: {
        path: path.resolve('./docs/'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js', '.css' ]
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: /src/,
                loader: 'babel-loader'
            },
            {
                test: /\.tsx?$/,
                include: /src/,
                loader: 'ts-loader',
                options: {
                    transpileOnly: true
                }
            },
            {
                test: /\.css$/,
                include: /src/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: true,
                            namedExport: true
                        }
                    }
                ]
            },
            {
                test: /\.png$/,
                include: /assets/,
                loader: 'file-loader'
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: './src/index.html', to: './' }
        ]),
        new ForkTsCheckerWebpackPlugin(),
        // new BundleAnalyzerPlugin()
    ]
}