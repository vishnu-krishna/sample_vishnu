import { BillDeliveryMethodType } from './billDeliveryMethodType';

export class BillDelivery {
    constructor(
        public contractAccountNumbers: number[],
        public billDeliveryMode: BillDeliveryMethodType) {}
}
