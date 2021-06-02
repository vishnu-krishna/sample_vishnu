// Helper: root() is defined at the bottom
var path = require('path');
var webpack = require('webpack');

// Webpack Plugins
var autoprefixer = require('autoprefixer');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

module.exports = {

  devtool: 'inline-source-map',

  entry: {
    'app': './src/main'
  },

  output: {},

  resolve: {
    // only discover files that have those extensions
    extensions: ['.ts', '.js', '.json', '.css', '.scss', '.html'],
  },

  module: {
    rules: [
      // Support for .ts files.
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          // type checking is done in separate task 'lint:ts'
          transpileOnly: true
        },
        exclude: [
          /\.(e2e)\.ts$/,
          /node_modules\/(?!(ng2-.+))/
        ]
      },
      {
        test: /\.ts$/,
        loader: 'angular2-template-loader',
        exclude: [
          /\.(e2e)\.ts$/,
          /node_modules\/(?!(ng2-.+))/
        ]
      // }
    },

    // copy those assets to output
    {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      exclude: /node_modules/,
        loader: 'file-loader?name=fonts/[name].[hash].[ext]?'
    },

    // Support for *.json files.
    {
        test: /\.json$/,
      exclude: /node_modules/,
        loader: 'json-loader'
    },

    // Support for sass files.
    {
      test: /\.scss$/,
      exclude: /node_modules/,
      loader: 'raw-loader!sass-loader'
    },

    // support for .html as raw text
    // todo: change the loader to something that adds a hash to images
    {
        test: /\.html$/,
        loader: 'raw-loader',
        exclude: /node_modules/,
        exclude: root('src', 'public')
    },
    {
        test: /\.ejs$/,
        exclude: /node_modules/,
        loader: 'ejs-compiled-loader'
    },
    {
      enforce: 'post',
      test: /\.ts$/,
      loader: 'istanbul-instrumenter-loader',
      exclude: /(node_modules|e2e*spec.ts$|\.spec.ts$)/,
    }
    ]
  },

  stats: { colors: true, reasons: true },

  plugins: [
    // Cache compilation of components to node_modules/.cache
    // Speeds restart time for yarn test
    new HardSourceWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        ENV: JSON.stringify(process.env.npm_lifecycle_event)
      }
    }),

    new ExtractTextPlugin({
      filename: 'css/[name].[hash].css',
      disable: false
    }),

    // Workaround needed for angular 2 angular/angular#11580
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)@angular/,
      root('./src') // location of your src
    ),

    // Tslint configuration for webpack 2
    new webpack.LoaderOptionsPlugin({
      options: {
        tslint: {
          emitErrors: false,
          failOnHint: false
        },
        sassLoader: {
        },
        postcss: [
          autoprefixer({
            browsers: ['last 2 version']
          })
        ]
      }
    })
  ],
};

// Helper functions
function root (args) {
  args = Array.prototype.slice.call(arguments, 0)
  return path.join.apply(path, [__dirname].concat(args))
}