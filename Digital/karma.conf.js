var path = require('path');
var webpackConfig = require('./webpack.config.test');

module.exports = function(config) {
    var _config = {
        basePath: '',
        frameworks: ['jasmine'],
        proxies: {
            '/_mockData/': '/base/server-ts/_mockData/',
            '/svg/' : '/base/src/public/svg/',
            '/fonts/' : '/base/src/public/fonts/',
            '/img/' : '/base/src/public/img/'
        },
        files: [
            {
                pattern: './karma-shim.js',
                watched: false
            },
            {
                pattern: './tests/test-config.js',
                included: true
            },
            {
                pattern: './server-ts/_mockData/**/*.json',
                included: false
            },
            {
                pattern: './src/public/svg/**/*.svg',
                included: false
            },
            {
                pattern: './src/public/fonts/**/*',
                included: false
            },
            {
                pattern: './src/public/img/**/*',
                included: false
            }
        ],
        exclude: [],
        preprocessors: {
            './karma-shim.js': ['webpack', 'sourcemap']
        },
        webpack: webpackConfig,
        webpackMiddleware: {
            stats: 'errors-only'
        },
        webpackServer: {
            noInfo: true
        },
        reporters: [
            'mocha', 'junit', 'coverage', 'remap-coverage'
        ],
        mochaReporter: {
            ignoreSkipped:  true
        },
        junitReporter: {
            outputDir: 'test-reports',
            outputFile: 'test-results.xml',
            useBrowserName: false
        },
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers: ['ChromeHeadless'],
        singleRun: true,

        customLaunchers: {
            ChromeHeadless: {
                base: 'Chrome',
                flags: [
                    '--headless',
                    '--disable-gpu',
                    '--no-sandbox',
                    // Without a remote debugging port, Google Chrome exits immediately.
                    '--remote-debugging-port=9222',
                    '--disable-web-security',
                ],
            }
        },

        coverageReporter: {
            type: 'in-memory',
            check: { // TODO: create PR to add threshold check feature to karma-remap-coverage
                global: {
                    statements: 65,
                    branches: 50,
                    functions: 60,
                    lines: 70
                }
            }
        },

        remapCoverageReporter: {
            'text-summary': null, /* will output show on command line if null */
            json: './reports/coverage/coverage.json',
            html: './reports/coverage/html',
            cobertura: './reports/coverage/cobertura.xml',
            clover: './reports/coverage/clover.xml'

        },

        // taken from https://support.saucelabs.com/hc/en-us/articles/225104707-Karma-Tests-Disconnect-Particularly-When-Running-Tests-on-Safari
        browserDisconnectTimeout : 2000, // default 2000
        browserDisconnectTolerance : 2, // default 0
        browserNoActivityTimeout : 10000 //default 10000
    };

    config.set(_config);
};
