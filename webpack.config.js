const webpack = require('webpack'),
    path = require('path'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {

    entry : {
        "js/jtSelect": './src/js/jtSelect.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
		library: "jtSelect",
		libraryTarget: "umd"
    },
    devServer: {
        contentBase: './dist',
        hot: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin("css/_jtSelect.css"),
    ],
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.js$/,
                include: path.join(__dirname, 'src/js'),
                loader: 'babel-loader',
                query: {
                    presets: ["es2015", "stage-0"],
                }
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ['css-loader', 'sass-loader']
                })
            }
        ],
    },
    resolve: {
        modules: [
            path.resolve('./src/js'),
            'node_modules'
        ]
    },
}