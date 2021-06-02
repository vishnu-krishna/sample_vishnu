import { BillDeliveryMethod, BillDeliveryMethodType, PaymentMethod, SettingsAggregateModel } from '../../../../../services/settings/model';

export class EBillingBuilder {
    private constructor(private readonly billDeliveryMethodList: BillDeliveryMethod) {}

    public static create(): EBillingBuilder {
        let billDeliveryMethodList = new BillDeliveryMethod('1200000000',  BillDeliveryMethodType.Postal);
        return new EBillingBuilder(billDeliveryMethodList);
    }

    public whenOnEBilling(): EBillingBuilder {
        this.billDeliveryMethodList.billDeliveryMethod = BillDeliveryMethodType.Email;
        return this;
    }

    public whenNOtOnEBilling(): EBillingBuilder {
        this.billDeliveryMethodList.billDeliveryMethod = BillDeliveryMethodType.Postal;
        return this;
    }

    public builder(): SettingsAggregateModel {
        let settingsAggregateModel = new SettingsAggregateModel();
        settingsAggregateModel.billDeliveryMethodList = [this.billDeliveryMethodList];
        return  settingsAggregateModel;
    }
}

export class PaymentMethodBuilder {
    private constructor(private readonly paymentMethod: PaymentMethod) {}

    public static create(): PaymentMethodBuilder {
        let paymentMethod = new PaymentMethod();
        return new PaymentMethodBuilder(paymentMethod);
    }

    public whenOnSmsPay(): PaymentMethodBuilder {
        this.paymentMethod.oneTouchPayContractAccounts = [1200000000];
        return this;
    }

    public whenNotOnSmsPay(): PaymentMethodBuilder {
        this.paymentMethod.oneTouchPayContractAccounts = [];
        return this;
    }

    public builder(): PaymentMethod[] {
        return  [this.paymentMethod];
    }
}
