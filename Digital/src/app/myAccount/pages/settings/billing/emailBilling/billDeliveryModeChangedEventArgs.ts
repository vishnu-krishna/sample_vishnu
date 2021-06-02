import { BillDeliveryMethodType } from '../../../../../myAccount/services/settings/model';

/**
 * @deprecated: the new EBilling component should be used moving forward
 * The new IA has the Notifications page which has the eBilling component using the Maui-Toggle
 */
export class BillDeliveryModeChangedEventArgs {
    constructor(public contractAccountNumber: string, public billingPreference: BillDeliveryMethodType) {}
}
