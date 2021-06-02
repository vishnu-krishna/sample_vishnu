var config = require('./protractor.conf.js').config;

delete config.specs;

config.capabilities.shardTestFiles = true;
config.capabilities.maxInstances = 1;

config.suites = {
    overview: 'e2e/myAccount/regression/overview.e2e-spec.ts',
    billing: 'e2e/myAccount/regression/billing.e2e-spec.ts',
    payg: 'e2e/myAccount/regression/payg.e2e-spec.ts',
    payg_payment: 'e2e/myAccount/regression/paygPayment.e2e-spec.ts',
    monthlyBilling: 'e2e/myAccount/regression/settings/billing/monthlyBilling/*.e2e-spec.ts',
    energyInsights: 'e2e/myAccount/regression/settings/notifications/energyInsights/energyInsights.e2e-spec.ts',
    myWallet: 'e2e/myAccount/regression/settings/myWallet/myWallet.e2e-spec.ts',
    // smsPayFunctional: 'e2e/myAccount/smspay/smspay.functional.e2e-spec.ts',
    billSmoothingFunctional: 'e2e/myAccount/regression/billsmoothing.functional.e2e-spec.ts',
    monthlyBillingFeatureFlag: 'e2e/myAccount/regression/monthlyBilling.e2e-spec.ts',
    contactDetailsFeatureFlag: 'e2e/myAccount/regression/contactDetails.e2e-spec.ts',
    concessionFeatureFlag: 'e2e/myAccount/regression/concession.e2e-spec.ts',
    homeProfile: 'e2e/myAccount/regression/settings/homeProfile/*.e2e.spec.ts',
    smsPay: 'e2e/myAccount/regression/settings/smsPay/*.e2e-spec.ts',
    ssmr: 'e2e/myAccount/regression/ssmr.e2e-spec.ts',
    essential: [
                  'e2e/myAccount/regression/settings/notifications/essentialProduct/mandatoryEbilling.e2e-spec.ts' ,
                  'e2e/myAccount/regression/settings/directDebit/essentialProduct/mandatoryDirectDebit.e2e.spec.ts',
                  'e2e/myAccount/regression/settings/billing/monthlyBilling/mandatoryMonthlyBilling.e2e.spec.ts'
               ]
};

exports.config = config;
