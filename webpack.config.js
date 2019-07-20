const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const name = process.env.NAME;

module.exports = {
  entry: `./${name}/index.ts`,
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
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
    publicPath: '/',
    filename: 'index.js',
    path: path.resolve(__dirname, `dist/${name}`),
  },
  plugins: [new HtmlWebpackPlugin()],
  devServer: {
    contentBase: `./dist/${name}`,
    historyApiFallback: true,
  },
  devtool: 'source-map',
};
