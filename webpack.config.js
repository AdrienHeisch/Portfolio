const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin');

const devServerPort = 8080;

module.exports = {
    mode: process.env.NODE_ENV || 'development',
    devServer: {
        contentBase: './dist',
        host: '0.0.0.0',
        port: devServerPort,
        public: 'http://localhost:' + devServerPort
    },
    entry: './src/Main.ts',
    output: {
        path: path.resolve('./dist/'),
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
                loader: 'file-loader',
                options: {
                    name: 'assets/[hash].[ext]'
                }
            },
            {
                test: /\.md$/,
                include: /assets/,
                loader: 'raw-loader',
                options: {
                    name: 'assets/[hash].[ext]'
                }
            }
        ]
    },
    plugins: [
        new WebpackShellPlugin({onBuildStart:['npm run type-css']}),
        new CopyWebpackPlugin([
            { from: './src/index.html', to: './' }
        ]),
        new ForkTsCheckerWebpackPlugin(),
        // new BundleAnalyzerPlugin()
    ]
}