import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ISettingsApi } from '../settings/settingsApi.service.interface';
import { IPaymentMethodsService } from './paymentMethods.service.interface';

import { ResultModel } from '../../../shared/model/domain/result.model';
import { ApiPodModel } from '../../../shared/model/domain/resultWrapper/apiPod.model';
import { PaymentArrangementType } from '../../common/enums';
import * as apiModel from '../settings/model';
import * as serviceModel from './model';

@Injectable()
export class PaymentMethodsService implements IPaymentMethodsService {

    constructor(private api: ISettingsApi) { }

    /**
     * Gets stored payment methods
     *
     * @memberOf PaymentMethodsService
     */
    public getPaymentMethods(): Observable<serviceModel.PaymentMethod[]> {
        return this.api
            .get<apiModel.PaymentMethod[]>('/v2/paymentmethods?expand=DirectDebit,OneTouchPay')
            .map((data) => {
                return this.transformApiPaymentMethods(data);
            });
    }

    /**
     * Creates a new payment Method
     *
     * @param {(serviceModel.Bank | serviceModel.CreditCard | serviceModel.PayPalAgreement)} typeOfPaymentMethod
     * @returns {Observable<{}>}
     *
     * @memberOf PaymentMethodsService
     */
    public createPaymentMethod(paymentMethod: apiModel.CreatePaymentMethodRequest): Observable<{}> {
        let request = new apiModel.CreatePaymentMethodRequest();
        request = <apiModel.CreatePaymentMethodRequest> paymentMethod;
        return this.api.post('/v2/paymentmethods', request);
    }

    /**
     * Deletes an existing payment Method by Id
     *
     * @returns {Observable<{}>}
     *
     * @memberOf PaymentMethodsService
     */
    public deletePaymentMethod(paymentMethodId: string): Observable<{}> {
        return this.api.delete(`/v2/paymentmethods/${paymentMethodId}`);
    }

    public attachPaymentArrangementToPaymentMethod(paymentMethodId: string, contractAccountNumber: number, paymentArrangementType: PaymentArrangementType): Observable<{}> {
        let request = new apiModel.ContractAccountNumber();
        request.contractAccountNumber = contractAccountNumber;
        if (paymentArrangementType === PaymentArrangementType.DirectDebit) {
             return this.api.post(`/v2/paymentmethods/${paymentMethodId}/directDebitContractAccounts`, request);
        } else if (paymentArrangementType === PaymentArrangementType.SmsPay) {
             return this.api.post(`/v2/paymentmethods/${paymentMethodId}/oneTouchPayContractAccounts`, request);
        }
    }

    public getPaypalToken(data: any): Observable<string> {
        // TODO: This needs to be fixed to use 'return new Observable((observer) => {' as the return type is unknown :()
        return Observable.create((observer) => {
            this.api.post<ApiPodModel<ResultModel>>('/v1/Account/Billing/DirectDebit/SetUpPaypal', data)
                .subscribe(
                (result) => {
                    if (!result.payload.isError) {
                        observer.next(result.payload);
                        observer.complete();
                    } else {
                        observer.error(result.message);
                    }
                });
        });
    }

    public getBillingAgreementId(token: string, payPalData: any): Observable<string> {
        return new Observable((observer) => {
            this.api.post<ApiPodModel<ResultModel>>(`/v1/Account/Billing/PayPal/BillingAgreement/${token}`, payPalData)
                .subscribe(
                (data) => {
                    if (!data.payload.isError) {
                        observer.next(data.payload.message);
                        observer.complete();
                    } else {
                        observer.error(data.message);
                    }
                });
        });
    }

    public removePaymentArrangementFromPaymentMethod(paymentMethodId: string, contractAccountNumber: number, paymentArrangementType: PaymentArrangementType): Observable<{}> {
        if (paymentArrangementType === PaymentArrangementType.DirectDebit) {
            return this.api.delete(`/v2/paymentmethods/${paymentMethodId}/directDebitContractAccounts/${contractAccountNumber}`);
        } else if (paymentArrangementType === PaymentArrangementType.SmsPay) {
            return this.api.delete(`/v2/paymentmethods/${paymentMethodId}/oneTouchPayContractAccounts/${contractAccountNumber}`);
        }
    }

    private transformApiPaymentMethods(inputList: apiModel.PaymentMethod[]): serviceModel.PaymentMethod[] {
        let outputList: serviceModel.PaymentMethod[] =
            inputList.map((inputItem) => {
                let outputItem = new serviceModel.PaymentMethod();
                outputItem.id = inputItem.id;
                outputItem.bank = inputItem.bank;
                outputItem.creditCard = inputItem.creditCard;
                outputItem.payPal = inputItem.payPal;
                outputItem.directDebitContractAccounts = !!inputItem.directDebitContractAccounts ? inputItem.directDebitContractAccounts : [];
                outputItem.oneTouchPayContractAccounts = !!inputItem.oneTouchPayContractAccounts ? inputItem.oneTouchPayContractAccounts : [];
                return outputItem;
            });
        return outputList;
    }
}
