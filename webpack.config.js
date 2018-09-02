const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ForkTsCheckerPlugin = require('fork-ts-checker-webpack-plugin');
const HTMLPlugin = require('html-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');

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
        filename: '[hash].js'
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
                test: /\.(png)$/,
                include: /assets/,
                loader: 'file-loader',
                options: {
                    name: 'assets/[hash].[ext]'
                }
            },
            {
                test: /\.(pdf)$/,
                include: /assets/,
                loader: 'file-loader',
                options: {
                    name: 'assets/[name].[ext]'
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
        new HTMLPlugin({
            filename: 'index.html',
            template: './src/index.html'
        }),
        new CopyPlugin([
            { from: './assets/local-projects/', to: './projects/' }
        ]),
        new CleanPlugin([ 'dist' ], {
            exclude: [ 'projects' ]
        }),
        new ForkTsCheckerPlugin(),
        // new BundleAnalyzerPlugin()
    ]
}