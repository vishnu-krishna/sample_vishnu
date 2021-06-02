import { BillingFrequency } from '../../../myAccount/services/settings/model/billingFrequency';
import { BillingFrequencyType } from '../../../myAccount/services/settings/model/billingFrequencyType';

export class MonthlyBillingGetBillingFrequenciesTestData {

    public static ClintEastwood: BillingFrequency[] = [
        {
            contractNumber: 9101004976,
            frequency: BillingFrequencyType.Quarterly,
            preferredDayOfMonth: null
        },
        {
            contractNumber: 9101163496,
            frequency: BillingFrequencyType.Quarterly,
            preferredDayOfMonth: null
        }
    ];

    public static RodBinnington: BillingFrequency[] = [
        {
            contractNumber: 9133061126,
            frequency: BillingFrequencyType.Quarterly,
            preferredDayOfMonth: null
        },
        {
            contractNumber: 9133061138,
            frequency: BillingFrequencyType.Quarterly,
            preferredDayOfMonth: null
        }
    ];

    public static ZoeHannah: BillingFrequency[] = [
        {
            contractNumber: 9403881265,
            frequency: BillingFrequencyType.Quarterly,
            preferredDayOfMonth: null
        }
    ];

}
