const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const express = require('express');

const name = process.env.NAME;

module.exports = {
  entry: `./src/${name}/index.ts`,
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          allowTsInNodeModules: true,
        },
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  optimization: {
    minimize: false,
  },
  output: {
    publicPath: `/${name}/`,
    filename: 'index.js?v=[contenthash]',
    path: path.resolve(__dirname, `dist/${name}`),
  },
  plugins: [new HtmlWebpackPlugin()],
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    contentBase: `./dist/${name}`,
    historyApiFallback: {
      index: `/${name}/`,
    },
    before: function(app) {
      if (name === 'host') {
        app.use('/app/', express.static('./dist/app'));
      }
    },
  },
  devtool: 'source-map',
};
