var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');
var ProgressBarPlugin = require('progress-bar-webpack-plugin');

var vendors = [
  'immutable',
  'react',
  'react-dom',
  'react-redux',
  'redux',
  'redux-thunk',
];

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: {
    app: [path.join(__dirname, '/app/index.jsx')],
    vendor: vendors
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: '[name].[hash].js',
    chunkFilename: '[id].[hash].chunk.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor']
    }),
    new ExtractTextPlugin('[name].[hash].css', { allChunks: true, disabled: false }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'app/index.html'),
      inject: 'body',
      filename: 'index.html'
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new ProgressBarPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ],
  module: {
    preLoaders: [
      {test: /\.(js|jsx)$/, loader: 'eslint-loader', exclude: ['node_modules', 'server']}
    ],
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }, {
      test: /\.s?css$/,
      loader:  ExtractTextPlugin.extract('style-loader', 'css!postcss!sass', {
          publicPath: '/',
      })
    }, {
      test: /\.(png|jpg|gif)$/,
      loader: 'file-loader?name=img/img-[hash:6].[ext]'
    }]
  },
  postcss: function () {
    return [autoprefixer];
  }
};
