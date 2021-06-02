const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

var config = require('./webpack.config.aot.js');
config.plugins.push(new BundleAnalyzerPlugin({ openAnalyzer: true }));

module.exports = config;
