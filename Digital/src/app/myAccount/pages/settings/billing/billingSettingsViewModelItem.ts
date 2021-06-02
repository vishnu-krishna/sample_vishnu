import { AccountDetailComponentModel } from '../../../../myAccount/settings/accountDetail/accountDetail.component';
import { AccountViewModel } from '../../../services/account.service';
import { EmailBillingComponentModel }  from './emailBilling/emailBillingComponentModel';

export class BillingSettingsViewModelItem {
    public account: AccountViewModel;
    public showAccountDetailComponent: boolean;
    public accountDetailModel: AccountDetailComponentModel;
    public emailBillingModel: EmailBillingComponentModel;
    public showMonthlyBilling: boolean;

    constructor() {
        this.accountDetailModel = new AccountDetailComponentModel();
    }
}
