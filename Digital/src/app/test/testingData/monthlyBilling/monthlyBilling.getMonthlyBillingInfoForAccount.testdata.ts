import { AccountMonthlyBillingModel } from '../../../myAccount/services/settings/model/accountMonthlyBillingModel';
import { BillingFrequencyType } from '../../../myAccount/services/settings/model/billingFrequencyType';
import { AccountsTestData } from '../accounts.testdata';

export class MonthlyBillingGetMonthlyBillingInfoForAccountTestData {

    public static ClintEastwood: AccountMonthlyBillingModel = {
        accountNumber: '90428798',
        anyContractsPredictedAsEligibleForSetup: true,
        hasValidMobileNumber: true,
        hasNonMonthlyBillingContract: true,
        billingFrequencyFailed: false,
        hasMonthlyBilling: false,
        areAllContractsInflight: false,
        contractMonthlyBillingModels: [
            {
                accountNumber: '90428798',
                contract: AccountsTestData.ClintEastwood[0].contracts[0],
                frequency: BillingFrequencyType.Quarterly,
                preferredDayOfMonth: null,
                setupPredicted: true,
                cancelPredicted: false,
                cancellation: {
                    isEligible: true
                },
                setup: {
                    isEligible: true
                }
            },
            {
                accountNumber: '90428798',
                contract: AccountsTestData.ClintEastwood[0].contracts[1],
                frequency: BillingFrequencyType.BiMonthly,
                preferredDayOfMonth: null,
                setupPredicted: true,
                cancelPredicted: false,
                cancellation: {
                    isEligible: true
                },
                setup: {
                    isEligible: true
                }
            }
        ]
    };

    public static clintEastwood2Contracts1HasFlexibleMonthly: AccountMonthlyBillingModel = {
        accountNumber: '90428798',
        anyContractsPredictedAsEligibleForSetup: true,
        hasValidMobileNumber: true,
        hasNonMonthlyBillingContract: true,
        billingFrequencyFailed: false,
        hasMonthlyBilling: false,
        areAllContractsInflight: false,
        contractMonthlyBillingModels: [
            {
                accountNumber: '90428798',
                contract: AccountsTestData.ClintEastwood[0].contracts[0],
                frequency: BillingFrequencyType.Quarterly,
                preferredDayOfMonth: null,
                setupPredicted: true,
                cancelPredicted: true,
                cancellation: {
                    isEligible: true
                },
                setup: {
                    isEligible: true
                }
            },
            {
                accountNumber: '90428798',
                contract: AccountsTestData.ClintEastwood[0].contracts[1],
                frequency: BillingFrequencyType.FlexibleMonthly,
                preferredDayOfMonth: 5,
                setupPredicted: true,
                cancelPredicted: true,
                cancellation: {
                    isEligible: true
                },
                setup: {
                    isEligible: true
                }
            }
        ]
    };

    public static clintEastwood2Contracts2HaveFlexibleMonthly: AccountMonthlyBillingModel = {
        accountNumber: '90428798',
        anyContractsPredictedAsEligibleForSetup: true,
        hasValidMobileNumber: true,
        hasNonMonthlyBillingContract: false,
        billingFrequencyFailed: false,
        hasMonthlyBilling: false,
        areAllContractsInflight: false,
        contractMonthlyBillingModels: [
            {
                accountNumber: '90428798',
                contract: AccountsTestData.ClintEastwood[0].contracts[0],
                frequency: BillingFrequencyType.FlexibleMonthly,
                preferredDayOfMonth: null,
                setupPredicted: true,
                cancelPredicted: true,
                cancellation: {
                    isEligible: true
                },
                setup: {
                    isEligible: true
                }
            },
            {
                accountNumber: '90428798',
                contract: AccountsTestData.ClintEastwood[0].contracts[1],
                frequency: BillingFrequencyType.FlexibleMonthly,
                preferredDayOfMonth: 5,
                setupPredicted: true,
                cancelPredicted: true,
                cancellation: {
                    isEligible: true
                },
                setup: {
                    isEligible: true
                }
            }
        ]
    };

    public static PeterPeluso: AccountMonthlyBillingModel = {
        accountNumber: '7025466058',
        anyContractsPredictedAsEligibleForSetup: true,
        hasValidMobileNumber: true,
        hasNonMonthlyBillingContract: true,
        billingFrequencyFailed: false,
        hasMonthlyBilling: false,
        areAllContractsInflight: false,
        contractMonthlyBillingModels: [
            {
                accountNumber: '7025466058',
                contract: AccountsTestData.PeterPeluso[0].contracts[0],
                frequency: BillingFrequencyType.Quarterly,
                preferredDayOfMonth: null,
                setupPredicted: true,
                cancelPredicted: true,
                cancellation: {
                    isEligible: false
                },
                setup: {
                    isEligible: true
                }
            },
            {
                accountNumber: '7025466058',
                contract: AccountsTestData.PeterPeluso[0].contracts[1],
                frequency: BillingFrequencyType.BiMonthly,
                preferredDayOfMonth: null,
                setupPredicted: true,
                cancelPredicted: true,
                cancellation: {
                    isEligible: false
                },
                setup: {
                    isEligible: true
                }
            },
            {
                accountNumber: '7025466058',
                contract: AccountsTestData.PeterPeluso[0].contracts[2],
                frequency: BillingFrequencyType.BiMonthly,
                preferredDayOfMonth: null,
                setupPredicted: true,
                cancelPredicted: true,
                cancellation: {
                    isEligible: false
                },
                setup: {
                    isEligible: true
                }
            }
        ]
    };

    public static EmmaPaton: AccountMonthlyBillingModel = {
        accountNumber: '90428798',
        anyContractsPredictedAsEligibleForSetup: true,
        hasValidMobileNumber: true,
        hasNonMonthlyBillingContract: true,
        billingFrequencyFailed: false,
        hasMonthlyBilling: false,
        areAllContractsInflight: false,
        contractMonthlyBillingModels: [
            {
                accountNumber: '90428798',
                contract: AccountsTestData.PeterPeluso[0].contracts[0],
                frequency: BillingFrequencyType.Quarterly,
                preferredDayOfMonth: null,
                setupPredicted: true,
                cancelPredicted: false,
                cancellation: {
                    isEligible: false
                },
                setup: {
                    isEligible: true
                }
            },
            {
                accountNumber: '90428798',
                contract: AccountsTestData.PeterPeluso[0].contracts[1],
                frequency: BillingFrequencyType.BiMonthly,
                preferredDayOfMonth: null,
                setupPredicted: false,
                cancelPredicted: true,
                cancellation: {
                    isEligible: false
                },
                setup: {
                    isEligible: true
                }
            },
            {
                accountNumber: '90428798',
                contract: AccountsTestData.PeterPeluso[0].contracts[2],
                frequency: BillingFrequencyType.Monthly,
                preferredDayOfMonth: null,
                setupPredicted: false,
                cancelPredicted: true,
                cancellation: {
                    isEligible: false
                },
                setup: {
                    isEligible: true
                }
            }
        ]
    };

    public static clintEastwood4ContractsWith2FlexibleMonthlyBilling: AccountMonthlyBillingModel = {
        accountNumber: '90428798',
        anyContractsPredictedAsEligibleForSetup: true,
        hasValidMobileNumber: true,
        hasNonMonthlyBillingContract: true,
        billingFrequencyFailed: false,
        hasMonthlyBilling: false,
        areAllContractsInflight: false,
        contractMonthlyBillingModels: [
            {
                accountNumber: '90428798',
                contract: AccountsTestData.clintEastwood4Contracts[0].contracts[0],
                frequency: BillingFrequencyType.Quarterly,
                preferredDayOfMonth: null,
                setupPredicted: true,
                cancelPredicted: false,
                cancellation: {
                    isEligible: false
                },
                setup: {
                    isEligible: true
                }
            },
            {
                accountNumber: '90428798',
                contract: AccountsTestData.clintEastwood4Contracts[0].contracts[1],
                frequency: BillingFrequencyType.FlexibleMonthly,
                preferredDayOfMonth: 8,
                setupPredicted: true,
                cancelPredicted: false,
                cancellation: {
                    isEligible: false
                },
                setup: {
                    isEligible: true
                }
            },
            {
                accountNumber: '90428798',
                contract: AccountsTestData.clintEastwood4Contracts[0].contracts[2],
                frequency: BillingFrequencyType.Monthly,
                preferredDayOfMonth: null,
                setupPredicted: true,
                cancelPredicted: false,
                cancellation: {
                    isEligible: false
                },
                setup: {
                    isEligible: true
                }
            },
            {
                accountNumber: '90428798',
                contract: AccountsTestData.clintEastwood4Contracts[0].contracts[3],
                frequency: BillingFrequencyType.FlexibleMonthly,
                preferredDayOfMonth: 21,
                setupPredicted: true,
                cancelPredicted: false,
                cancellation: {
                    isEligible: false
                },
                setup: {
                    isEligible: true
                }
            }
        ]
    };

    public static clintEastwood3Contracts1HasFlexibleMonthly: AccountMonthlyBillingModel = {
        accountNumber: '90428798',
        anyContractsPredictedAsEligibleForSetup: true,
        hasValidMobileNumber: true,
        hasNonMonthlyBillingContract: true,
        billingFrequencyFailed: false,
        hasMonthlyBilling: false,
        areAllContractsInflight: false,
        contractMonthlyBillingModels: [
            {
                accountNumber: '90428798',
                contract: AccountsTestData.PeterPeluso[0].contracts[0],
                frequency: BillingFrequencyType.Quarterly,
                preferredDayOfMonth: null,
                setupPredicted: true,
                cancelPredicted: true,
                cancellation: {
                    isEligible: false
                },
                setup: {
                    isEligible: true
                }
            },
            {
                accountNumber: '90428798',
                contract: AccountsTestData.PeterPeluso[0].contracts[1],
                frequency: BillingFrequencyType.BiMonthly,
                preferredDayOfMonth: null,
                setupPredicted: true,
                cancelPredicted: true,
                cancellation: {
                    isEligible: false
                },
                setup: {
                    isEligible: true
                }
            },
            {
                accountNumber: '90428798',
                contract: AccountsTestData.PeterPeluso[0].contracts[2],
                frequency: BillingFrequencyType.FlexibleMonthly,
                preferredDayOfMonth: null,
                setupPredicted: true,
                cancelPredicted: true,
                cancellation: {
                    isEligible: false
                },
                setup: {
                    isEligible: true
                }
            }
        ]
    };

    public static clintEastwood1ContractQuarterly: AccountMonthlyBillingModel = {
        accountNumber: '90428798',
        anyContractsPredictedAsEligibleForSetup: true,
        hasValidMobileNumber: true,
        hasNonMonthlyBillingContract: true,
        billingFrequencyFailed: false,
        hasMonthlyBilling: false,
        areAllContractsInflight: false,
        contractMonthlyBillingModels: [
            {
                accountNumber: '90428798',
                contract: AccountsTestData.ClintEastwood[0].contracts[0],
                frequency: BillingFrequencyType.Quarterly,
                preferredDayOfMonth: null,
                setupPredicted: true,
                cancelPredicted: true,
                cancellation: {
                    isEligible: false
                },
                setup: {
                    isEligible: true
                }
            }
        ]
    };

    public static clintEastwood1ContractFlexibleMonthly: AccountMonthlyBillingModel = {
        accountNumber: '90428798',
        anyContractsPredictedAsEligibleForSetup: true,
        hasValidMobileNumber: true,
        hasNonMonthlyBillingContract: false,
        billingFrequencyFailed: false,
        hasMonthlyBilling: false,
        areAllContractsInflight: false,
        contractMonthlyBillingModels: [
            {
                accountNumber: '90428798',
                contract: AccountsTestData.ClintEastwood[0].contracts[0],
                frequency: BillingFrequencyType.FlexibleMonthly,
                preferredDayOfMonth: 3,
                setupPredicted: true,
                cancelPredicted: true,
                cancellation: {
                    isEligible: true
                },
                setup: {
                    isEligible: true
                }
            }
        ]
    };

    public static ReneDescartes: AccountMonthlyBillingModel = {
        accountNumber: '20845020',
        anyContractsPredictedAsEligibleForSetup: true,
        hasValidMobileNumber: true,
        hasNonMonthlyBillingContract: false,
        billingFrequencyFailed: false,
        hasMonthlyBilling: false,
        areAllContractsInflight: false,
        contractMonthlyBillingModels: [
            {
                accountNumber: '20845020',
                contract: AccountsTestData.ReneDescartes[0].contracts[0],
                frequency: BillingFrequencyType.Quarterly,
                preferredDayOfMonth: undefined,
                setupPredicted: true,
                cancelPredicted: true,
                cancellation: {
                    isEligible: true
                },
                setup: {
                    isEligible: true
                }
            },
            {
                accountNumber: '20845020',
                contract: AccountsTestData.ReneDescartes[0].contracts[1],
                frequency: BillingFrequencyType.Quarterly,
                preferredDayOfMonth: undefined,
                setupPredicted: true,
                cancelPredicted: true,
                cancellation: {
                    isEligible: true
                },
                setup: {
                    isEligible: true
                }
            }
        ]
    };
}
