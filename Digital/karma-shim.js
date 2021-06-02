Error.stackTraceLimit = Infinity;

require('core-js/client/shim');
require('reflect-metadata');

require('zone.js/dist/zone');
require('zone.js/dist/long-stack-trace-zone');
require('zone.js/dist/proxy');
require('zone.js/dist/sync-test');
require('zone.js/dist/jasmine-patch');
require('zone.js/dist/async-test');
require('zone.js/dist/fake-async-test');

/*
 Ok, this is kinda crazy. We can use the the context method on
 require that webpack created in order to tell webpack
 what files we actually want to require or import.
 Below, context will be a function/object with file names as keys.
 using that regex we are saying look in client/app and find
 any file that ends with '.spec.ts' and get its path. By passing in true
 we say do this recursively
 */

// This currently is only running for myaccount.
var appContext = require.context('./src/app/myAccount', true, /\.spec\.ts/);
// var ommApp = require.context('./src/app/oneMinMove', true, /\.spec\.ts/);
var validators = require.context('./src/app/shared/validators', true, /\.spec\.ts/);
var directives = require.context('./src/app/shared/directives', true, /\.spec\.ts/);
var sharedServices = require.context('./src/app/shared/service', true, /\.spec\.ts/);
var sharedTests = require.context('./src/app/test', true, /\.spec\.ts/);
var payment = require.context('./src/app/shared/component/payment', true, /\.spec\.ts/);
var utils = require.context('./src/app/shared/utils', true, /\.spec\.ts/);
var sharedComponents = require.context('./src/app/shared/component', true, /\.spec\.ts/);

// get all the files, for each file, call the context function
// that will require the file and load it up here. Context will
// loop and require those spec files here
appContext.keys().forEach(appContext);
validators.keys().forEach(validators);
directives.keys().forEach(directives);
sharedTests.keys().forEach(sharedTests);
// ommApp.keys().forEach(ommApp);
payment.keys().forEach(payment);
utils.keys().forEach(utils);
sharedComponents.keys().forEach(sharedComponents);
sharedServices.keys().forEach(sharedServices);

// Select BrowserDomAdapter.
// see https://github.com/AngularClass/angular2-webpack-starter/issues/124
// Somewhere in the test setup
var testing = require('@angular/core/testing');
var browser = require('@angular/platform-browser-dynamic/testing');

testing.TestBed.initTestEnvironment(browser.BrowserDynamicTestingModule, browser.platformBrowserDynamicTesting());
