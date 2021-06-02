import { BillDeliveryMethodType } from './billDeliveryMethodType';

export class BillDeliveryMethod {
    constructor(
        public contractAccountNumber: string,
        public billDeliveryMethod: BillDeliveryMethodType) {}
}
