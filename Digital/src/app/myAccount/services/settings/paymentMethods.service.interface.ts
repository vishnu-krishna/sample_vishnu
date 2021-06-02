import { Observable }      from 'rxjs/Observable';

import { PaymentArrangementType } from '../../common/enums';
import { CreatePaymentMethodRequest } from '../settings/model/createPaymentMethodRequest';
import { PaymentMethod }   from './model/paymentMethod';

export abstract class IPaymentMethodsService {
    public abstract getPaymentMethods(): Observable<PaymentMethod[]>;
    public abstract createPaymentMethod(paymentMethod: CreatePaymentMethodRequest): Observable<{}>;
    public abstract deletePaymentMethod(paymentMethodId: string): Observable<{}>;
    public abstract attachPaymentArrangementToPaymentMethod(paymentMethodId: string, contractAccountNumber: number, paymentArrangementType: PaymentArrangementType): Observable<{}>;
    public abstract getPaypalToken(data: any): Observable<string>;
    public abstract getBillingAgreementId(token: string, data: any): Observable<string>;
    public abstract removePaymentArrangementFromPaymentMethod(paymentMethodId: string, contractAccountNumber: number, paymentArrangementType: PaymentArrangementType): Observable<{}>;
}
