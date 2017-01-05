let fs = require('fs');
let path = require('path');
let nodeModules = {};

fs.readdirSync(path.resolve(__dirname, 'node_modules'))
    .filter(function(x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function(mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });

module.exports = {
    entry: './src/server.js',
    target: 'node',
    // output: {
    //     path: __dirname + '/../blog_final',
    //     filename: 'server.js'
    // },
    output : {
           path: __dirname + '/dist',
           filename: 'server-bundle.js'
    },
    externals: nodeModules,
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
        ]
    }
};