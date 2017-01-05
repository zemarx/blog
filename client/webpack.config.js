var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: 'app/main.ts',
    output: {
        path: '',
        filename: 'app.js'
    },
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loaders: 'ts'
            },
            {
                test: /\.css$/,
                loaders: 'style!css'
            }
        ]

    }
};