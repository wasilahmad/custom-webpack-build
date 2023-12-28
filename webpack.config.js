const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const webpackUtil = require('./webpack.util');

module.exports = {
  mode: 'development',
  // entry: {
  //   app: './src/script/app.js',
  //   other: './src/script/other.js',
  //   styles: ['./src/scss/global.scss', './src/scss/page1.scss', './src/scss/page2.scss']
  // },
  entry: {
    ...webpackUtil.scssEntryPoints,
    ...webpackUtil.jsEntryPoints,
  },  
  output: {
    filename: 'js/[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      // Add loaders for different file types if needed (e.g. for styles, images, etc.)
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //   title: 'Output Management',
    // }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].bundle.css',
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'index.html', to: 'index.html' }, // Adjust the source and destination paths as needed
      ],
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'), // Specify the static directory
    },
    port: 8080,
    open: true,
    hot: false,
  },
  // watch: true, // Enable watch mode
};
