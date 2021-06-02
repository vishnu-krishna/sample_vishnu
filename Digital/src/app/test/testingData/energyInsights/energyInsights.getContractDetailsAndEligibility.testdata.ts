import { ContractEnergyInsightsModel } from '../../../myAccount/services/settings/model/contractEnergyInsightsModel';
import { AccountsTestData } from '../accounts.testdata';
import { EnergyInsightsEligibilityContract } from '../../../myAccount/services/settings/model/energyInsightsEligibilityContract';

export class EnergyInsightsGetContractDetailsAndEligibilityTestData {
    public static ClintEastwood: ContractEnergyInsightsModel[] = [
        {
            accountNumber: '90428798',
            contract: AccountsTestData.ClintEastwood[0].contracts[0],
            email: 'clinteastwood@yahoo.com',
            address: '74 Progress Road|Eltham North VIC 3095',
            energyInsightsEligibility: {
                ...new EnergyInsightsEligibilityContract(),
                contractNumber: 9101004976,
                isEligible: true,
                subscribedToEndBillEnergyBreakdown: false,
                subscribedToMidBillEnergyBreakdown: false,

                }
        },
        {
            accountNumber: '90428798',
            contract: AccountsTestData.ClintEastwood[0].contracts[1],
            email: 'clinteastwood@yahoo.com',
            address: '74 Progress Road|Eltham North VIC 3095',
            energyInsightsEligibility: {
                ...new EnergyInsightsEligibilityContract(),
                contractNumber: 9101163496,
                isEligible: false,
                subscribedToEndBillEnergyBreakdown: false,
                subscribedToMidBillEnergyBreakdown: false,

                }
        }
    ];

    public static ClintEastwoodWithMidSubscription: ContractEnergyInsightsModel[] = [
        {
            accountNumber: '90428798',
            contract: AccountsTestData.ClintEastwood[0].contracts[0],
            email: 'clinteastwood@yahoo.com',
            address: '74 Progress Road|Eltham North VIC 3095',
            energyInsightsEligibility: {
                ...new EnergyInsightsEligibilityContract(),
                contractNumber: 9101004976,
                isEligible: true,
                subscribedToEndBillEnergyBreakdown: false,
                subscribedToMidBillEnergyBreakdown: true,

                }
        },
        {
            accountNumber: '90428798',
            contract: AccountsTestData.ClintEastwood[0].contracts[1],
            email: 'clinteastwood@yahoo.com',
            address: '74 Progress Road|Eltham North VIC 3095',
            energyInsightsEligibility: {
                ...new EnergyInsightsEligibilityContract(),
                contractNumber: 9101163496,
                isEligible: false,
                subscribedToEndBillEnergyBreakdown: false,
                subscribedToMidBillEnergyBreakdown: false,
            }
        }
    ];

    public static ClintEastwoodWithEndSubscription: ContractEnergyInsightsModel[] = [
        {
            accountNumber: '90428798',
            contract: AccountsTestData.ClintEastwood[0].contracts[0],
            email: 'clinteastwood@yahoo.com',
            address: '74 Progress Road|Eltham North VIC 3095',
            energyInsightsEligibility: {
                ...new EnergyInsightsEligibilityContract(),
                contractNumber: 9101004976,
                isEligible: true,
                subscribedToEndBillEnergyBreakdown: true,
                subscribedToMidBillEnergyBreakdown: false,
            }
        },
        {
            accountNumber: '90428798',
            contract: AccountsTestData.ClintEastwood[0].contracts[1],
            email: 'clinteastwood@yahoo.com',
            address: '74 Progress Road|Eltham North VIC 3095',
            energyInsightsEligibility: {
                ...new EnergyInsightsEligibilityContract(),
                contractNumber: 9101163496,
                isEligible: false,
                subscribedToEndBillEnergyBreakdown: false,
                subscribedToMidBillEnergyBreakdown: false,
            }
        }
    ];

    public static ClintEastwoodWithBothSubscription: ContractEnergyInsightsModel[] = [
        {
            accountNumber: '90428798',
            contract: AccountsTestData.ClintEastwood[0].contracts[0],
            email: 'clinteastwood@yahoo.com',
            address: '74 Progress Road|Eltham North VIC 3095',
            energyInsightsEligibility: {
                ...new EnergyInsightsEligibilityContract(),
                contractNumber: 9101004976,
                isEligible: true,
                subscribedToEndBillEnergyBreakdown: true,
                subscribedToMidBillEnergyBreakdown: true,
            }
        },
        {
            accountNumber: '90428798',
            contract: AccountsTestData.ClintEastwood[0].contracts[1],
            email: 'clinteastwood@yahoo.com',
            address: '74 Progress Road|Eltham North VIC 3095',
            energyInsightsEligibility: {
                ...new EnergyInsightsEligibilityContract(),
                contractNumber: 9101163496,
                isEligible: false,
                subscribedToEndBillEnergyBreakdown: false,
                subscribedToMidBillEnergyBreakdown: false,
            }
        }
    ];

    public static IainSandersWithoutSubscription: ContractEnergyInsightsModel[] = [
        {
            accountNumber: '7018263504',
            contract: AccountsTestData.IainSanders[0].contracts[0],
            email: 'iainsanders@yahoo.com',
            address: '10 CREST DRIVE|ROSEBUD VIC 3939',
            energyInsightsEligibility: {
                ...new EnergyInsightsEligibilityContract(),
                contractNumber: 9400902585,
                isEligible: true,
                subscribedToEndBillEnergyBreakdown: false,
                subscribedToMidBillEnergyBreakdown: false,
            }
        },
        {
            accountNumber: '7018263504',
            contract: AccountsTestData.ClintEastwood[0].contracts[1],
            email: 'iainsanders@yahoo.com',
            address: '10 CREST DRIVE|ROSEBUD VIC 3939',
            energyInsightsEligibility: {
                ...new EnergyInsightsEligibilityContract(),
                contractNumber: 9400921596,
                isEligible: false,
                subscribedToEndBillEnergyBreakdown: false,
                subscribedToMidBillEnergyBreakdown: false,
            }
        },
        {
            accountNumber: '7014235472',
            contract: AccountsTestData.ClintEastwood[0].contracts[1],
            email: 'iainsanders@yahoo.com',
            address: '6 HOTHAM STREET|MOONEE PONDS VIC 3039',
            energyInsightsEligibility: {
                ...new EnergyInsightsEligibilityContract(),
                contractNumber: 9401005102,
                isEligible: true,
                subscribedToEndBillEnergyBreakdown: false,
                subscribedToMidBillEnergyBreakdown: false,
            }
        },
        {
            accountNumber: '7014235472',
            contract: AccountsTestData.ClintEastwood[0].contracts[1],
            email: 'iainsanders@yahoo.com',
            address: '6 HOTHAM STREET|MOONEE PONDS VIC 3039',
            energyInsightsEligibility: {
                ...new EnergyInsightsEligibilityContract(),
                contractNumber: 9401005103,
                isEligible: false,
                subscribedToEndBillEnergyBreakdown: false,
                subscribedToMidBillEnergyBreakdown: false,
            }
        },
        {
            accountNumber: '7035252860',
            contract: AccountsTestData.ClintEastwood[0].contracts[1],
            email: 'iainsanders@yahoo.com',
            address: 'U15/117 ALBION STREET|BRUNSWICK VIC 3056',
            energyInsightsEligibility: {
                ...new EnergyInsightsEligibilityContract(),
                contractNumber: 9402766055,
                isEligible: true,
                subscribedToEndBillEnergyBreakdown: false,
                subscribedToMidBillEnergyBreakdown: false,
            }
        },
        {
            accountNumber: '7035252860',
            contract: AccountsTestData.ClintEastwood[0].contracts[1],
            email: 'iainsanders@yahoo.com',
            address: 'U15/117 ALBION STREET|BRUNSWICK VIC 3056',
            energyInsightsEligibility: {
                ...new EnergyInsightsEligibilityContract(),
                contractNumber: 9402766056,
                isEligible: false,
                subscribedToEndBillEnergyBreakdown: false,
                subscribedToMidBillEnergyBreakdown: false,
            }
        }
    ];

    public static IainSandersWithSubscription: ContractEnergyInsightsModel[] = [
        {
            accountNumber: '7018263504',
            contract: AccountsTestData.IainSanders[0].contracts[0],
            email: 'iainsanders@yahoo.com',
            address: '10 CREST DRIVE|ROSEBUD VIC 3939',
            energyInsightsEligibility: {
                ...new EnergyInsightsEligibilityContract(),
                contractNumber: 9400902585,
                isEligible: true,
                subscribedToEndBillEnergyBreakdown: true,
                subscribedToMidBillEnergyBreakdown: true,

            }
        },
        {
            accountNumber: '7018263504',
            contract: AccountsTestData.ClintEastwood[0].contracts[1],
            email: 'iainsanders@yahoo.com',
            address: '10 CREST DRIVE|ROSEBUD VIC 3939',
            energyInsightsEligibility: {
                ...new EnergyInsightsEligibilityContract(),
                contractNumber: 9400921596,
                isEligible: false,
                subscribedToEndBillEnergyBreakdown: false,
                subscribedToMidBillEnergyBreakdown: false,
            }
        },
        {
            accountNumber: '7014235472',
            contract: AccountsTestData.ClintEastwood[0].contracts[1],
            email: 'iainsanders@yahoo.com',
            address: '6 HOTHAM STREET|MOONEE PONDS VIC 3039',
            energyInsightsEligibility: {
                ...new EnergyInsightsEligibilityContract(),
                contractNumber: 9401005102,
                isEligible: true,
                subscribedToEndBillEnergyBreakdown: true,
                subscribedToMidBillEnergyBreakdown: true,
            }
        },
        {
            accountNumber: '7014235472',
            contract: AccountsTestData.ClintEastwood[0].contracts[1],
            email: 'iainsanders@yahoo.com',
            address: '6 HOTHAM STREET|MOONEE PONDS VIC 3039',
            energyInsightsEligibility: {
                ...new EnergyInsightsEligibilityContract(),
                contractNumber: 9401005103,
                isEligible: false,
                subscribedToEndBillEnergyBreakdown: false,
                subscribedToMidBillEnergyBreakdown: false,
            }
        },
        {
            accountNumber: '7035252860',
            contract: AccountsTestData.ClintEastwood[0].contracts[1],
            email: 'iainsanders@yahoo.com',
            address: 'U15/117 ALBION STREET|BRUNSWICK VIC 3056',
            energyInsightsEligibility: {
                ...new EnergyInsightsEligibilityContract(),
                contractNumber: 9402766055,
                isEligible: true,
                subscribedToEndBillEnergyBreakdown: true,
                subscribedToMidBillEnergyBreakdown: true,
            }
        },
        {
            accountNumber: '7035252860',
            contract: AccountsTestData.ClintEastwood[0].contracts[1],
            email: 'iainsanders@yahoo.com',
            address: 'U15/117 ALBION STREET|BRUNSWICK VIC 3056',
            energyInsightsEligibility: {
                ...new EnergyInsightsEligibilityContract(),
                contractNumber: 9402766056,
                isEligible: false,
                subscribedToEndBillEnergyBreakdown: false,
                subscribedToMidBillEnergyBreakdown: false,
            }
        }
    ];
}
