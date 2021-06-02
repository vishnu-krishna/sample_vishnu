import { Injectable } from '@angular/core';

declare var lpTag: any;

// TODO: use omm ref after merge
export class CustomerInfo {
    public customerId: string = '';
    public userName: string = '';
}

export class CustomerData {
    public type: string = 'ctmrinfo';
    public info: CustomerInfo;
    constructor() {
        this.info = new CustomerInfo();
    }
}

@Injectable()
export class TrackerChatService {
    private customerData: CustomerData;

    constructor() {
        this.customerData = new CustomerData();
    }

    /**
     * Push customer info to Live person
     */
    public pushCustomerInfo(accountNumber: string)  {
            this.customerData.info.customerId = accountNumber;
            this.customerData.info.userName = '';
            lpTag.sdes.push(this.customerData);
    }
}
