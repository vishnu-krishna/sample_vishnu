// This file will have all the enums which are common to all the application.

export enum PaymentArrangementType {
    DirectDebit = <any> 'DirectDebit',
    SmsPay = <any> 'SmsPay'
}

export enum NumberOfPaymentMethodsExists {
    NoOtherValidPaymentMethodExists = <any> 'No other valid Payment Method exists',
    OneOtherValidPaymentMethodExists = <any> 'One other valid Payment Method exists',
    MultipleValidPaymentMethodExists = <any> 'Multiple valid Payment Method exits',
}
