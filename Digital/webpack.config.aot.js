const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

// Webpack Plugins
const AngularCompilerPlugin = require('@ngtools/webpack').AngularCompilerPlugin;
const NamedLazyChunksWebpackPlugin = require('@angular/cli/plugins/webpack').NamedLazyChunksWebpackPlugin;
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const WebpackStrip = require('strip-loader');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');

// resolve node paths
const nodeModules = path.join(process.cwd(), 'node_modules');
const realNodeModules = fs.realpathSync(nodeModules);
const genDirNodeModules = path.join(process.cwd(), 'src', '$$_gendir', 'node_modules');

module.exports = {

  /**
   * Devtool
   * Reference: http://webpack.github.io/docs/configuration.html#devtool
   * Type of sourcemap to use per build type
   */
  devtool: '',

  /**
   * Entry
   * Reference: http://webpack.github.io/docs/configuration.html#entry
   */
  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts',
    'app': './src/main-aot.ts' // our angular app
  },

  /**
   * Output
   * Reference: http://webpack.github.io/docs/configuration.html#output
   */
  output: {
    path: root('./dist/aot'),
    filename: 'js/[name].[hash].js',
    chunkFilename: 'js/[name].[hash].js'
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
      // Support for .ts files. Only 1 ts loader can be used with this one: https://github.com/angular/angular-cli/blob/master/packages/%40ngtools/webpack/README.md
      {
        test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
        loader: '@ngtools/webpack',
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
      },
      {
        test: [/\.js$/, /\.ts$/],
        exclude: /node_modules/,
        // TODO: remove this logic from webpack
        loader: WebpackStrip.loader('removeNonProdConfig')
      }
    ]
  },

  /**
   * Plugins
   * Reference: http://webpack.github.io/docs/configuration.html#plugins
   * List: http://webpack.github.io/docs/list-of-plugins.html
   */
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),

    new CopyWebpackPlugin(
        [
          {
            from: root('./src/public')
          }
        ],
        {
          ignore: [
            '*.ejs',
            'pci-frame.html',
            'bills/**',
            'e2e-mock.html'
          ]
        }
    ),

    //For developers working on OSX, enforces the entire path of all required modules match the exact case of the actual path on disk.
    new CaseSensitivePathsPlugin(),

    new CircularDependencyPlugin({
      "exclude": /(\\|\/)node_modules(\\|\/)/,
      "failOnError": true,
      "onDetected": false,
      "cwd": process.cwd()
    }),

    // convert chunk names to be human readable: for example js/[4].f589ea0644ee79220dfb.js to js/usage.module.f589ea0644ee79220dfb.js
    new NamedLazyChunksWebpackPlugin(),

    new HtmlWebpackPlugin({
      template: './src/public/index.ejs',
      chunksSortMode: 'dependency',
      baseUrl: '/',
      abTest: true,
      serviceWorker: false,
      // TODO: review if webChat parameter is needed here (or is it injected via Tealium)
      webChat: {
        'siteId': '28418749'
      },
      newRelic: true
    }),

    // Generate common chunks if necessary
    // Reference: https://webpack.github.io/docs/code-splitting.html
    // Reference: https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
    new CommonsChunkPlugin({
      name: 'polyfills',
      chunks: ['polyfills']
    }),

    // starting at the entry point of our app (named 'app' above), scan through each import and move any from node_modules into the vendor.js bundle.
    new CommonsChunkPlugin({
      name: 'vendor',
      chunks: ['app'],
      minChunks: (module) => {
        // only include files from node_modules
        return module.resource
            && (module.resource.startsWith(nodeModules)
                || module.resource.startsWith(genDirNodeModules)
                || module.resource.startsWith(realNodeModules));
      }
    }),


    // Define env variables to help with builds
    // Reference: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
    new webpack.DefinePlugin({
      // Environment helpers
      'process.env': {
        ENV: JSON.stringify(process.env.npm_lifecycle_event)
      }
    }),


    // Tslint configuration for webpack 2
    new webpack.LoaderOptionsPlugin({
      minimize: true,
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

    /**
     * Plugin: UglifyJsPlugin
     * Description: Minimize all JavaScript output of chunks.
     * Loaders are switched into minimizing mode.
     *
     * See: https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
     *
     * NOTE: To debug prod builds uncomment //debug lines and comment //prod lines
     */
    new webpack.optimize.UglifyJsPlugin({
      mangle: {
          screw_ie8: true,
          keep_fnames: true
      },
      beautify: false,
      pure_funcs: [
        'console.trace',
        'console.log',
        'console.info'
      ],
      compress: {
          warnings: false,
          screw_ie8: true,
          dead_code: true
      },
      comments: false,
      ecma: 6
    }),

    new AngularCompilerPlugin({
      tsConfigPath: './tsconfig-aot.json',
      mainPath: './src/main-aot.ts',
      sourceMap: false,
      skipCodeGeneration: false // AOT:false, JIT:true (note tsConfigPath/mainPath need to ne changed for JIT too)
    }),

    // Un-comment the line below if you need to analyse the build to examine the contents of the lazy loaded js files.
    // new BundleAnalyzerPlugin({ openAnalyzer: true })
  ],
  "node": {
  //     "fs": "empty",
  //     "global": true,
         "crypto": "empty", // ensure crypto node module is not included.
  //     "tls": "empty",
  //     "net": "empty",
  //     "process": true,
  //     "module": false,
  //     "clearImmediate": false,
  //     "setImmediate": false
  }
};

// Helper functions
function root(args) {
  args = Array.prototype.slice.call(arguments, 0)
  return path.join.apply(path, [__dirname].concat(args))
}
