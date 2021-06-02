require('ts-node/register');
var browserLogs = require('protractor-browser-logs');

exports.config = {
  baseUrl: 'https://localhost:8080/',                       // deprecated (use Context object instead)
  AzureloginURL: 'https://agldsttest.digital.agl.com.au',   // deprecated (use Context object instead)
  TestloginURL: 'https://cmsagldsttst.digital.agl.com.au',  // deprecated (use Context object instead)

  specs: [
    '**/*.e2e-spec.ts',
  ],
  exclude: [],

  framework: 'jasmine',
  allScriptsTimeout: 110000,

  jasmineNodeOpts: {
    // Disable dot reporter
    print: function() { },
    showTiming: true,
    showColors: true,
    isVerbose: true,
    includeStackTrace: true,
    defaultTimeoutInterval: 600000
  },

    directConnect: true,

  // Please consult before changing this
  // a change broke all e2e tests in the CI system.
  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      // Added in chromeoptions because IE does not work with DC - true
      // 'headless' takes 2s longer on ci, so not used
      // ci also uses xvfb-run for a virtual display port
      args: [
      "allow-insecure-localhost",
      "disable-gpu",
      "no-sandbox",
      "disable-web-security",
      "verbose",
      "log-path=chromedriver.log",
    ]},
    loggingPrefs: { driver: 'ALL', server: 'ALL', browser: 'ALL' },
    shardTestFiles: true,
    maxInstances: 1
  },

  suites: {
    myAccount: 'src/app/myAccount/**/*.e2e-spec.ts',
    backToTop: 'src/app/myAccount/backToTop/backToTop.component.e2e-spec.ts',
    billHistory: 'src/app/myAccount/billhistory/billHistory.component.e2e-spec.ts',
    settings: 'src/app/myAccount/pages/settings/settings.component.e2e-spec.ts',
    noDataChart: 'src/app/myAccount/charts/noDataChart.component.e2e-spec.ts',
    ssmrPanel: 'src/app/myAccount/dashboard/selfServiceMeterReadPanel/selfServiceMeterReadPanel.component.e2e-spec.ts',
    billing: 'src/app/myAccount/pages/settings/billing/billing.component.e2e-spec.ts',
    directDebit: 'src/app/myAccount/pages/settings/directdebit/directdebit.component.e2e-spec.ts',
    billSmoothing: 'src/app/myAccount/pages/settings/billSmoothing/billSmoothing.component.e2e-spec.ts',
    payg: 'e2e/myAccount/**/payg*.e2e-spec.ts',
    payg_overview: 'e2e/myAccount/dashboard/payg-overview-prepaid-balance.e2e-spec.ts',
    payg_product_flag: 'e2e/myAccount/dashboard/payg-overview-page-different-flags.e2e-spec.ts',
    payg_billing: 'e2e/myAccount/bills/payg-billing-page.e2e-spec.ts',
    payg_no_bonus:'e2e/myAccount/payments/payg-payment-no-bonus-available.e2e-spec.ts',
    no_payg_payment:'e2e/myAccount/payments/Non-payg-payment-scenario.e2e-spec.ts',
    payg_payment_debit:'e2e/myAccount/payments/payg-payment-scenario-debit.e2e-spec.ts',
    payg_payment_low:'e2e/myAccount/payments/payg-payment-scenario-low.e2e-spec.ts',
    payg_payment_high:'e2e/myAccount/payments/payg-payment-scenario-high.e2e-spec.ts',
    payg_payment:'e2e/myAccount/payments/**/*.e2e-spec.ts',
    payg_settings:'e2e/myAccount/settings/payg-setting-page.e2e-spec.ts',
    usageAll: 'e2e/myAccount/usage//**/*.e2e-spec.ts',
    usageToolbar: 'e2e/myAccount/usage/usageToolbar.e2e-spec.ts',
    usage: 'e2e/myAccount/usage/usage.component.e2e-spec.ts',
    usageGraph: 'e2e/myAccount/usage/usageGraph.component.e2e-spec.ts',
  },

  onPrepare: function () {

    // Code for Reporter Configuration
    var reporter = require('./e2e/utilities/reporter');
    reporter.configureSpecReporter();
    reporter.configureJUnitXmlReporter();
    reporter.configureJasmine2HtmlReporter();

    let browser = require('protractor').browser;

    if (global.logs) {
      throw new Error('Oops, name is already reserved!');
    }

    browser.getSession().then((session) => {
      console.log(`ChromeDriver version: ${session.getCapabilities().get('chrome')['chromedriverVersion']}`);
      console.log(`Chrome version: ${session.getCapabilities().get('version')}`);
    })

    var logs = browserLogs(browser);
    global.logs = logs;

    beforeEach(function () {
      logs.reset();
      logs.ignore(logs.or(logs.INFO, logs.DEBUG));
      logs.ignore(logs.or(logs.WARNING, logs.ERROR, logs.SEVERE)); // billing and overview
    });

    afterEach(function () {
      // expect no warnings or errors from the console log
      return logs.verify();
    });
  },

  /**
   * Angular 2 configuration
   *
   * useAllAngular2AppRoots: tells Protractor to wait for any angular2 apps on the page instead of just the one matching
   * `rootEl`
   */
  useAllAngular2AppRoots: true
};
