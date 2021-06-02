import { ContactDetailModel } from './../../../../shared/service/api.service';
import { BillDeliveryMethodType } from './billDeliveryMethodType';

export class BillDeliveryContactDetailModel {
    public accountNumber: string;
    public billDeliveryPreference: BillDeliveryMethodType;
    public contactDetails: ContactDetailModel;
}
