const fs = require('fs')
const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
// const WebpackErrorNotification = require('webpack-error-notification');
// var OmitTildeWebpackPlugin = require('omit-tilde-webpack-plugin');

const babelConfig = eval(fs.readFileSync('./.babelrc'))

console.log('babelConfig', babelConfig)

// const webpackErrorNotificationPlugin = process.env.NODE_ENV === 'development' ?
//   new WebpackErrorNotification() :
//   new webpack.DefinePlugin({})
// ;

const processDotEnvPlugin = new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  'process.env.PORT':     JSON.stringify(process.env.PORT),
})

module.exports = {
  // context: appPath('browser'),
  entry: [
    __dirname+'/browser'
  //   modulePath('config/polyfills.js'),
  //   appPath('browser/index.js')
  ],
  output: {
    path: __dirname+'/server/public',
    pathinfo: true,
    filename: "browser.js",
    publicPath: '/'
  },
  // resolve: {
  //   alias: {
  //     lib: appPath('lib'),
  //     // react: path.dirname(require.resolve('react')),
  //   },
  //   modules: [
  //     appPath('server'),
  //     appPath('lib')
  //   ]
  // },
  devtool: 'sourcemap',
  // postcss: function() {
  //   return [
  //     autoprefixer({
  //       browsers: [
  //         '>1%',
  //         'last 4 versions',
  //         'Firefox ESR',
  //         'not ie < 9', // React doesn't support IE8 anyway
  //       ]
  //     }),
  //   ];
  // },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        // include: [
        //   appPath('browser'),
        //   appPath('lib')
        // ],
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                'es2015',
                'es2016',
                'react'
              ],
              plugins: [
                'transform-class-properties',
                'transform-object-rest-spread',
                ['transform-regenerator', {async: false}],
                ['transform-runtime', {
                  helpers: false,
                  polyfill: false,
                  regenerator: true,
                }]
              ]
            }
          }
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.json$/,
        use: [
          'json-loader',
        ],
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        exclude: /\/favicon.ico$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
            }
          }
        ],
      },
      // A special case for favicon.ico to place it into build root directory.
      {
        test: /\/favicon.ico$/,
        // include: [appPath('browser')],
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'favicon.ico?'
            }
          }
        ],
      },
      // "url" loader works just like "file" loader but it also embeds
      // assets smaller than specified size as data URLs to avoid requests.
      {
        test: /\.(mp4|webm|wav|mp3|m4a|aac|oga)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'static/[name].[ext]'
            }
          }
        ],
      },
      {
        test: /\.sass$/,
        // use: ExtractTextPlugin.extract("style-loader", "css!sass?sourceMap")
        use:  ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              options: {
                sourceMap: true,
                modules: true,
                importLoaders: true,
                localIdentName: "[name]__[local]___[hash:base64:5]"
              }
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true
              }
            }
          ]
        })
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              attrs: ['link:href'],
            }
          }
        ],
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: __dirname+'/browser/index.html',
      // favicon: __dirname+'/src/favicon.ico',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    processDotEnvPlugin,
    // // This helps ensure the builds are consistent if source hasn't changed:
    // new webpack.optimize.OccurrenceOrderPlugin(),
    // // Try to dedupe duplicated modules, if any:
    // new webpack.optimize.DedupePlugin(),
    new ExtractTextPlugin({
      filename: "browser.css",
      disable: false,
      allChunks: true
    })
  ]
};

































