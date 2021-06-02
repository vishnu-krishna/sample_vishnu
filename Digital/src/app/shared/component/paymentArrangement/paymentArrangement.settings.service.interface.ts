import { Observable } from 'rxjs/Observable';
import { PaymentArrangementType } from '../../../myAccount/common/enums';
import { PaymentArrangementSettingsViewModel } from './paymentArrangement.settings.service';

export abstract class IPaymentArrangementSettingsService {
    public abstract getPaymentArrangementViewModel(paymentArrangementType: PaymentArrangementType): Observable<PaymentArrangementSettingsViewModel[]>;
}
