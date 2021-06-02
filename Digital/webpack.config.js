// Helper: root() is defined at the bottom
var path = require('path');
var webpack = require('webpack');

// Webpack Plugins
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
var sassLintPlugin = require('sasslint-webpack-plugin');
var HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

module.exports = {

  /**
   * Devtool
   * Reference: http://webpack.github.io/docs/configuration.html#devtool
   * Type of sourcemap to use per build type
   */
  devtool: 'cheap-module-eval-source-map',

  /**
   * Entry
   * Reference: http://webpack.github.io/docs/configuration.html#entry
   */
  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts',
    'app': './src/main.ts' // our angular app
  },

  /**
   * Output
   * Reference: http://webpack.github.io/docs/configuration.html#output
   */
  output: {
    path: root('..', '..', 'dist'),
    filename: 'js/[name].js',
    chunkFilename: 'js/[id].chunk.js'
  },

  /**
   * Performance
   * Reference: https://webpack.js.org/configuration/performance/#performance
   * (Note currently hints=false but docs say "warning"/"error" also allowed.
   * Maybe good for version 2.2 but not for 2.1 beta).
   */
  performance: {
    hints: false
  },

  /**
   * Resolve
   * Reference: http://webpack.github.io/docs/configuration.html#resolve
   */
  resolve: {
    // only discover files that have those extensions
    extensions: ['.ts', '.js', '.css', '.scss', '.html'],
  },

  /**
   * Loaders
   * Reference: http://webpack.github.io/docs/configuration.html#module-loaders
   * List: http://webpack.github.io/docs/list-of-loaders.html
   * This handles most of the magic responsible for converting modules
   */
  module: {
    rules: [
      // Support for .ts files.
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
        },
        exclude: [
          /\.(spec|e2e|e2e-spec)\.ts$/,
          /node_modules\/(?!(ng2-.+))/
        ]
      },
      {
        test: /\.(ts|js)$/,
        loader: 'angular-router-loader',
        exclude: [
          /\.(spec|e2e|e2e-spec)\.ts$/,
          /node_modules\/(?!(ng2-.+))/
        ]
      },
      {
        test: /\.ts$/,
        loader: 'angular2-template-loader',
        exclude: [
          /\.(spec|e2e|e2e-spec)\.ts$/,
          /node_modules\/(?!(ng2-.+))/
        ]
      },

      // copy those assets to output
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader?name=fonts/[name].[hash].[ext]?'
      },

      // Support for CSS as raw text
      // use 'null' loader in test mode (https://github.com/webpack/null-loader)
      // all css in src/style will be bundled in an external css file
      {
        test: /\.css$/,
        exclude: root('src', 'app'),
        loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader', 'postcss-loader']})
      },
      // all css required in src/app files will be merged in js files
      {
        test: /\.css$/,
        include: root('src', 'app'),
        loader: 'raw-loader!postcss-loader'
      },

      // support for .scss files
      // use 'null' loader in test mode (https://github.com/webpack/null-loader)
      // all css in src/style will be bundled in an external css file
      {
        test: /\.(scss|sass)$/,
        exclude: root('src', 'app'),
        loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader?-minimize', 'postcss-loader', 'sass-loader']})
      },
      // all css required in src/app files will be merged in js files
      {
        test: /\.(scss|sass)$/,
        exclude: root('src', 'style'),
        loader: 'raw-loader!postcss-loader!sass-loader'
      },

      // support for .html as raw text
      // todo: change the loader to something that adds a hash to images
      {
        test: /\.html$/,
        loader: 'raw-loader',
        exclude: root('src', 'public')
      },
      {
        test: /\.ts$/,
        enforce: 'pre',
        loader: 'tslint-loader'
      },
      {
        test: /\.ejs$/,
        loader: 'ejs-compiled-loader'
      }
    ]
  },

  /**
   * Plugins
   * Reference: http://webpack.github.io/docs/configuration.html#plugins
   * List: http://webpack.github.io/docs/list-of-plugins.html
   */
  plugins: [
    // Cache compilation of components to node_modules/.cache
    // Speeds restart time for yarn start
    new HardSourceWebpackPlugin(),
    new sassLintPlugin(
      {
        glob: ['./src/app/myAccount/**/*.s+(a|c)ss' ],
        ignoreFiles: ['src/app/myAccount/DLS/dls.component.scss'],
      }
    ),

    // Generate common chunks if necessary
    // Reference: https://webpack.github.io/docs/code-splitting.html
    // Reference: https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
    new CommonsChunkPlugin({
      name: 'polyfills',
      chunks: ['polyfills']
    }),

    new CommonsChunkPlugin({
      name: 'vendor',
      chunks: ['vendor'],
      minChunks: module => /node_modules\//.test(module.resource)
    }),

    new CommonsChunkPlugin({
      name: ['polyfills', 'vendor'].reverse()
    }),

    // Define env variables to help with builds
    // Reference: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
    new webpack.DefinePlugin({
      // Environment helpers
      'process.env': {
        ENV: JSON.stringify(process.env.npm_lifecycle_event)
      }
    }),

    new OpenBrowserPlugin({
      url: 'https://localhost:8080/mockidentity'
    }),

    // Workaround for https://github.com/angular/angular/issues/11580
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)(@angular|esm5)/,
      root('./src') // location of your src
    ),

    // Extract text plugin
    new ExtractTextPlugin({
      filename: 'css/[name].[hash].css',
      disable: false
    }),

    // Tslint configuration for webpack 2
    new webpack.LoaderOptionsPlugin({
      minimize: false,
      options: {
        /**
         * Apply the tslint loader as pre/postLoader
         * Reference: https://github.com/wbuchwalter/tslint-loader
         */
        tslint: {
          emitErrors: true,
          failOnHint: true
        },
        /**
         * Sass
         * Reference: https://github.com/jtangelder/sass-loader
         * Transforms .scss files to .css
         */
        sassLoader: {
          // includePaths: [path.resolve(__dirname, "node_modules/foundation-sites/scss")]
        },
        /**
         * PostCSS
         * Reference: https://github.com/postcss/autoprefixer-core
         * Add vendor prefixes to your css
         */
        postcss: [
          autoprefixer({
            browsers: ['last 2 version']
          })
        ]
      }
    }),

    new webpack.ContextReplacementPlugin(/moment[\\/]locale$/, /en/),

    new webpack.NamedModulesPlugin(),

    new HtmlWebpackPlugin({
      template: './src/public/index.ejs',
      chunksSortMode: 'dependency',
      baseUrl: '/',
      deepLinkDirect: true,
      // TODO: review if webChat parameter is needed here (or is it injected via Tealium)
      webChat: {
        'siteId': '66277986'
      }
    }),

    new CaseSensitivePathsPlugin()
  ],

  /**
   * Dev server configuration
   * Reference: http://webpack.github.io/docs/configuration.html#devserver
   * Reference: http://webpack.github.io/docs/webpack-dev-server.html
   */

    devServer: {
      disableHostCheck: true,
      contentBase: './src/public',
      historyApiFallback: {
          disableDotRule: true // this is here to cater for '.' in the url (ie decimals (amount=44.50) are passed as url params in payment assistance) which is ok on live but breaks in the webpack devserver build
      },
      stats: { colors: true },
      https: true,
      port: 8080,
      host: '0.0.0.0',
      proxy: {
        '/sitecore/*': {
          target: 'https://cmsagl.digital.agl.com.au',
          secure: false,
          changeOrigin: true
        },
        '/aeo/*': {
          target: 'https://cmsagl.digital.agl.com.au',
          secure: false,
          changeOrigin: true
        },
        '/sts/*': {
          target: 'https://cmsagl.digital.agl.com.au',
          secure: false,
          changeOrigin: true
        },
        '/-/media/Self-Service/*': {
          host: 'https://localhost:8080',
          target: 'https://localhost:8080/_mockData/sitecore/media/',
          rewrite: function (req) {
            req.url = req.url.replace('/-/media/Self-Service/', '');
          },
          secure: false,
          changeOrigin: true
        },
        // Uncomment to allow dev against hosted environment
        // '/*': {
        //     changeOrigin: true,
        // }
      },
      watchOptions: {
        aggregateTimeout: 500,
        poll: 1000,
        ignored: "node_modules|server-ts|**/*.e2e*.ts|**/*.spec.ts"
      }
    }
};

// Helper functions
function root (args) {
  args = Array.prototype.slice.call(arguments, 0)
  return path.join.apply(path, [__dirname].concat(args))
}
