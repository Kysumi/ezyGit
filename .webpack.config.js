const path = require('path');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = [
  {
    target: 'web',
    entry: './src/js/index.js',
    output: {
      filename: 'script.js',
      path: path.resolve(__dirname, 'app/js'),
    },
    plugins: [
      new CircularDependencyPlugin(),
      new webpack.ExternalsPlugin('commonjs', ['electron']),
    ],
  },
  {
    target: 'electron-main',
    entry: './electron/main.js',
    output: {
      filename: 'index.js',
      path: path.resolve(__dirname, 'app'),
    },
    plugins: [new CircularDependencyPlugin()],
    externals: [nodeExternals()],
  },
];

// https://github.com/electron/electron/issues/21457
