const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const nodeEnv = process.env.NODE_ENV || 'development';
const isProduction = nodeEnv === 'production';

const demoPath = path.join(__dirname, './demo');
const buildPath = path.join(__dirname, './build');
const srcPath = path.join(__dirname, './src');

// Common plugins
const plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(nodeEnv),
    },
  }),
  new webpack.NamedModulesPlugin(),
  new HtmlWebpackPlugin({
    template: path.join(demoPath, 'index.html'),
    path: buildPath,
    filename: 'index.html',
  }),
  new webpack.LoaderOptionsPlugin({
    options: {
      postcss: [
        autoprefixer({
          browsers: [
            'last 3 version',
            'ie >= 10',
          ],
        }),
      ],
      context: srcPath,
    },
  }),
];

// Common rules
const rules = [
  {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: [
      'babel-loader',
    ],
  },
  {
    test: /\.svg$/,
    use: [
      {
        loader: 'babel-loader'
      },
      {
        loader: 'react-svg-loader',
        options: {
          svgo: {
            plugins: [{removeTitle: false}],
            floatPrecision: 2
          }
        }
      }
    ]
  }
];

if (isProduction) {
  // Production plugins
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
      },
      output: {
        comments: false,
      },
    }),
    new ExtractTextPlugin('style-[hash].css')
  );

  // Production rules
  rules.push(
    {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader!postcss-loader!sass-loader',
      }),
    }
  );
} else {
  // Development plugins
  plugins.push(
    new webpack.HotModuleReplacementPlugin()
  );

  // Development rules
  rules.push(
    {
      test: /\.scss$/,
      exclude: /node_modules/,
      use: [
        'style-loader',
        // Using src maps breaks urls in the CSS loader
        // https://github.com/webpack/css-loader/issues/232
        // This comment solves it, but breaks testing from a local network
        // https://github.com/webpack/css-loader/issues/232#issuecomment-240449998
        // 'css-loader?sourceMap',
        'css-loader',
        'postcss-loader',
        'sass-loader?sourceMap',
      ],
    }
  );
}

module.exports = {
  devtool: isProduction ? false : 'source-map',
  context: demoPath,
  entry: {
    index: './index.js',
  },
  output: {
    path: buildPath,
    publicPath: '/',
    filename: 'app-[hash].js',
  },
  module: {
    rules,
  },
  resolve: {
    extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx'],
    modules: [
      path.resolve(__dirname, 'node_modules'),
      srcPath,
    ],
  },
  plugins,
  devServer: {
    contentBase: isProduction ? buildPath : demoPath,
    historyApiFallback: true,
    port: 3000,
    compress: isProduction,
    inline: !isProduction,
    hot: !isProduction,
    host: '0.0.0.0',
    disableHostCheck: true,
    stats: {
      assets: true,
      children: false,
      chunks: false,
      hash: false,
      modules: false,
      publicPath: false,
      timings: true,
      version: false,
      warnings: true,
      colors: {
        green: '\u001b[32m',
      },
    },
  },
};
