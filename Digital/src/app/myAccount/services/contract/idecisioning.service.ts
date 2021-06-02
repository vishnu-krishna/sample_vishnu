import { Observable } from 'rxjs/Observable';
import { PaymentMethod } from '../settings/model';

import { AccountViewModel } from '../account.service';

export abstract class IDecisioningService {
    public smsPayAccountNumberList: number[];
    public accountList: AccountViewModel[];

    public abstract getSmsPayAccountNumberList(paymentMethods: PaymentMethod[]);
    public abstract validateBannerVisibility();
    public abstract closeSmsPayPanel();
    public abstract checkSmsPayBannerVisibility(isMethodCalledfromOverviewBanner: boolean);
    public abstract checkSmsPayBannerClosedByUser(): boolean;
    public abstract isSmsPayEntryPointAvailableForCustomer(): Observable<boolean>;
}
