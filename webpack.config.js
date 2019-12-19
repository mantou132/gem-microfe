const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const express = require('express');

const name = process.env.NAME;

module.exports = {
  entry: `./${name}/index.ts`,
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
    publicPath: `/gem-microfe/dist/${name}/`,
    filename: 'index.js',
    path: path.resolve(__dirname, `dist/${name}`),
  },
  plugins: [new HtmlWebpackPlugin()],
  devServer: {
    contentBase: `./dist/${name}`,
    historyApiFallback: true,
    before: function(app) {
      app.use('/gem-microfe/dist/app/', express.static('./dist/app'));
    },
  },
  devtool: 'source-map',
};
