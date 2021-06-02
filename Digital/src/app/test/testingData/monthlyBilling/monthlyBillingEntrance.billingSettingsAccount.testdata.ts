import { BillingSettingsViewModelItem } from '../../../myAccount/pages/settings/billing/billingSettingsViewModelItem';
import { EmailBillingComponentModel } from '../../../myAccount/pages/settings/billing/emailBilling/emailBillingComponentModel';
import { AccountViewModel } from '../../../myAccount/services/account.service';
import { AccountDetailComponentModel } from '../../../myAccount/settings/accountDetail/accountDetail.component';
import { AccountsTestData } from '../accounts.testdata';

export class MonthlyBillingEntranceBillingSettingsAccountViewModelTestData {
    public static clintEastwood1Account1Contract: BillingSettingsViewModelItem = {
        accountDetailModel: new AccountDetailComponentModel(new AccountViewModel('90428798', [
            AccountsTestData.ClintEastwood[0].contracts[0],
            AccountsTestData.ClintEastwood[0].contracts[1],
        ])),
        account: new AccountViewModel('90428798', [
                AccountsTestData.ClintEastwood[0].contracts[0]
            ]),
        showAccountDetailComponent: true,
        emailBillingModel: new EmailBillingComponentModel('90428798', 'brian.ardito@gmail.com', false, 1),
        showMonthlyBilling: true
    };

    public static clintEastwood1Account2Contracts: BillingSettingsViewModelItem = {
        accountDetailModel: new AccountDetailComponentModel(new AccountViewModel('90428798', [
            AccountsTestData.ClintEastwood[0].contracts[0],
            AccountsTestData.ClintEastwood[0].contracts[1],
        ])),
        account: new AccountViewModel('90428798', [
                AccountsTestData.ClintEastwood[0].contracts[0],
                AccountsTestData.ClintEastwood[0].contracts[1],
            ]),
        showAccountDetailComponent: true,
        emailBillingModel: new EmailBillingComponentModel('90428798', 'brian.ardito@gmail.com', false, 1),
        showMonthlyBilling: true
    };

    public static PeterPeluso: BillingSettingsViewModelItem = {
        accountDetailModel: new AccountDetailComponentModel(new AccountViewModel('7025466058', [
            AccountsTestData.PeterPeluso[0].contracts[0],
            AccountsTestData.PeterPeluso[0].contracts[1],
            AccountsTestData.PeterPeluso[0].contracts[2],
        ])),
        account: new AccountViewModel('7025466058', [
                AccountsTestData.PeterPeluso[0].contracts[0],
                AccountsTestData.PeterPeluso[0].contracts[1],
                AccountsTestData.PeterPeluso[0].contracts[2],
            ]),
        showAccountDetailComponent: true,
        emailBillingModel: new EmailBillingComponentModel('7025466058', 'peter.peluso@gmail.com', false, 1),
        showMonthlyBilling: true
    };

}
