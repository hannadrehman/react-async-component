/* global module, __dirname */

const webpack = require('webpack');
const SystemBellPlugin = require('system-bell-webpack-plugin');
const path = require('path');
const UglifyJsWebpackPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const distPath = path.resolve(__dirname, './', './dist');
const examplePath = path.resolve(__dirname, './', './example');

module.exports = (env) => {
  const isProd = env.NODE_ENV === 'production';
  const entry = [];
  if (isProd) {
    entry.push('./src/index.jsx');
  } else {
    entry.push('./example/index.jsx');
  }
  const config = {
    entry,
    devtool: 'source-maps',
    output: {
      path: distPath,
      filename: isProd
        ? 'react-async.component.min.js'
        : '[name].js',
      library: 'ReactAsyncComponent',
      libraryTarget: 'umd',
    },

    resolve: {
      extensions: ['*', '.js', '.jsx', '.json'],
    },
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.(jsx)$/,
          exclude: /node_modules/,
          loader: 'eslint-loader',
        },
        {
          test: /\.(jsx)$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      ],
    },
    target: 'web',
    plugins: [
      new webpack.ProgressPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new SystemBellPlugin(),
      new webpack.LoaderOptionsPlugin({
        minimize: false,
        debug: true,
        noInfo: false,
        options: {
          context: './',
        },
      }),
    ],
  };
  if (!isProd) {
    config.plugins = config.plugins.concat([
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('development'),
        },
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new HtmlWebpackPlugin({
        title: 'react-async-component',
        filename: 'index.html',
        template: './example/index.ejs',
        inject: true,
      }),
    ]);
    config.devServer = {
      host: '0.0.0.0',
      contentBase: examplePath,
      publicPath: '/',
      historyApiFallback: true,
    };
  } else {
    config.plugins = config.plugins.concat([
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
      }),
      new webpack.optimize.ModuleConcatenationPlugin(),
    ]);
    config.optimization = {
      minimizer: [
        new UglifyJsWebpackPlugin({
          cache: true,
          parallel: true,
          sourceMap: true,
        }),
      ],
    };
    config.externals = {
      react: 'react',
      reactDom: 'react-dom',
      propTypes: 'prop-types',
    };
  }
  return config;
};
