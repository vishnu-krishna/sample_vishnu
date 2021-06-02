import { MonthlyBillingEligibility } from '../../../myAccount/services/settings/model/monthlyBillingEligibility';

export class MonthlyBillingGetElegibilityTestData {

    public static ClintEastwood: MonthlyBillingEligibility[] = [
        {
            contractNumber: 9101004976,
            setup: {
                isEligible: true
            },
            cancellation: {
                isEligible: true
            }
        },
        {
            contractNumber: 9101163496,
            setup: {
                isEligible: true
            },
            cancellation: {
                isEligible: true
            }
        }
    ];

    public static RodBinnington: MonthlyBillingEligibility[] = [
        {
            contractNumber: 9133061126,
            setup: {
                isEligible: true
            },
            cancellation: {
                isEligible: true
            }
        },
        {
            contractNumber: 9133061138,
            setup: {
                isEligible: false
            },
            cancellation: {
                isEligible: false
            }
        }
    ];

    public static ZoeHannah: MonthlyBillingEligibility[] = [
        {
            contractNumber: 9403881265,
            setup: {
                isEligible: false
            },
            cancellation: {
                isEligible: false
            }
        }
    ];

    public static clintEastwood1Contract: MonthlyBillingEligibility[] = [
        {
            contractNumber: 9101004976,
            setup: {
                isEligible: true
            },
            cancellation: {
                isEligible: true
            }
        }
    ];
}
