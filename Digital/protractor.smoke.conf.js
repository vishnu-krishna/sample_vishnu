var config = require('./protractor.conf.js').config;

delete config.specs;

config.capabilities.shardTestFiles = true;
config.capabilities.maxInstances = 1;
//Saucelab work is in inprogress
// config.sauceUser = "agl-jagath";
// config.sauceKey = "15cd6933-bd5d-4ddf-9a48-e5fcabf6c9b2";


// config.multiCapabilities = [
//     // {
//   //Currently FF is flaky hence test does not pass consistently, hence commented
//     // browserName: 'firefox',
//     // name: 'FF-test',
//     // version: 'latest',
//     // acceptInsecureCerts: true,
//     // directConnect: false,
//     // seleniumAddress: 'http://localhost:4444/wd/hub',
//     // },
//     {
//         browserName: 'chrome',
//         name: 'chrome-test',
//         directConnect: true,
//         seleniumAddress: undefined,
//         maxInstances: 1,
//         chromeOnly: true
//     }
//     // {
//     //     browserName: 'internet explorer',
//     //     name: 'IE-test',
//     //     version: '11.0',
//     //     platform: 'Windows',
//     //     directConnect: false,
//     //     seleniumAddress: undefined,
//     //     nativeEvents: false,
//     //     ignoreZoomSetting: true,
//     //     cssSelectorsEnabled: true,
//     // }
// ];



config.suites = {
    overview: 'e2e/myAccount/smoke/**/smoke.overview.e2e.spec.ts',
    billing: 'e2e/myAccount/smoke/**/smoke.billing.e2e.spec.ts',
    usage: 'e2e/myAccount/smoke/**/smoke.usage.e2e.spec.ts',
    settings: 'e2e/myAccount/smoke/**/smoke.settings.e2e.spec.ts',
    // paygoverview: 'e2e/myAccount/smoke/**/smoke.payg.overview.e2e.spec.ts',  -- inprogress hence commented
    billsmoothing: 'e2e/myAccount/smoke/smoke.billsmoothing.e2e.spec.ts'
    // user-based smoke testing example for reference:
    // resi_dual_fuel_bill_issued: 'e2e/myAccount/smoke/**/smoke.resi_dual_fuel.e2e.spec.ts'
};

exports.config = config;