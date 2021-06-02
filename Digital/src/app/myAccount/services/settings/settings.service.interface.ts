import { Observable }             from 'rxjs/Observable';
import { BillDeliveryMethodType } from './model/billDeliveryMethodType';
import { SettingsAggregateModel } from './model/settingsAggregateModel';
import { BillDeliveryContactDetailModel } from './model/billDeliveryContactDetailModel';

export abstract class ISettingsService {
    public abstract getSettings(): Observable<SettingsAggregateModel>;
    public abstract updateBillDeliveryMethodPreference(contractAccountNumber: string, deliveryMethod: BillDeliveryMethodType): Observable<any>;
    public abstract getBillDeliveryMethodPreferences(): Observable<BillDeliveryContactDetailModel[]>;
}
