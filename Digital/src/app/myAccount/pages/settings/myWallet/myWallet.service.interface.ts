import { Observable }      from 'rxjs/Observable';
import { MyWalletViewModel } from './myWallet.service';

export abstract class IMyWalletService {
    public abstract getStoredPaymentMethods(): Observable<MyWalletViewModel[]>;
    public abstract getValidPaymentMethods(paymentMethods: MyWalletViewModel[], paymentMethodSelected?: MyWalletViewModel): MyWalletViewModel[];
    public abstract checkPendingPayments(): Observable<boolean>;
}
