import { PaymentMethod }      from '../../settings/model';
import { ApiError }           from '../../settings/model/apiError';
import { BillDeliveryMethod } from './billDeliveryMethod';

export class SettingsAggregateModel {
    public billDeliveryApiLoadError: ApiError;
    public billDeliveryMethodList = new Array<BillDeliveryMethod>();
    public paymentMethodApiLoadError: ApiError;
    public paymentMethodList = new Array<PaymentMethod>();
}
