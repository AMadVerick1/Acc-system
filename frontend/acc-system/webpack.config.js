var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader'
            }
        ]
    },
    devServer: {
        historyApiFallback: true
    },
    externals: {
        // global app config object
        config: JSON.stringify({
            // apiUrl: 'http://localhost:5000'
            apiUrl: '/api'
        })
    }
}