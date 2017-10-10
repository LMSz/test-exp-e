let nodeExternals = require('webpack-node-externals');
module.exports = {
    entry: './src/server/index.js',
    output: {
        path: __dirname + '/dist',
        filename: "server.js"
    },
    node: {
        fs: "empty",
        net: "empty"
    },
    externals: [nodeExternals()], 
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
        ]
    }
}

