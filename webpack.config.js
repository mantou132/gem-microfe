const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const express = require('express');

const name = process.env.NAME;

module.exports = {
  entry: `./src/${name}/`,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          allowTsInNodeModules: true,
        },
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
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
  plugins: [new HtmlWebpackPlugin(), new VueLoaderPlugin()],
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
        app.use('/react/', express.static('./dist/react'));
        app.use('/vue/', express.static('./dist/vue'));
      }
    },
  },
  devtool: 'source-map',
};
