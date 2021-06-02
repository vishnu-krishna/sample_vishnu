import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { InstalmentPlanFrequency, IPaymentSchemeApi, PaymentArrangementExtensionOptions, PaymentArrangementInstalmentPlanOption, PaymentArrangementInstalmentSummary, InstalmentPlanParameters, GetPaymentArrangementInstalmentPlanOptionsParams, PaymentArrangementInstalmentPlans, InstalmentPlanStatus } from '../../myAccount/services/paymentScheme/paymentSchemeApi.service';

@Injectable()
export class PaymentSchemeApiStubService implements IPaymentSchemeApi {
    public getBillSmoothingContracts(contractAccountNumber: string): Observable<any> {
        throw new Error('Method not implemented.');
    }
    public getBillSmoothingEstimates(contractAccountNumber: string): Observable<any> {
        throw new Error('Method not implemented.');
    }
    public postBillSmoothingScheme(contractAccountNumber: string, body: any): Observable<any> {
        throw new Error('Method not implemented.');
    }
    public getPaymentArrangementExtensionOptions(contractAccountNumber: string): Observable<PaymentArrangementExtensionOptions> {
        throw new Error('Method not implemented.');
    }
    public submitPaymentArrangementExtension(contractNumber: string, extendedDueDate: Date): Observable<void> {
        throw new Error('Method not implemented.');
    }
    public getPaymentArrangementInstalmentPlanOptions(contractNumber: string, params: GetPaymentArrangementInstalmentPlanOptionsParams): Observable<PaymentArrangementInstalmentPlanOption[]> {
        throw new Error('Method not implemented.');
    }
    public getPaymentArrangementInstalmentSummary(instalmentPlanParameters: InstalmentPlanParameters): Observable<PaymentArrangementInstalmentSummary> {
        throw new Error('Method not implemented.');
    }
    public submitPaymentArrangementInstalmentPlan(instalmentPlanParameters: InstalmentPlanParameters): Observable<PaymentArrangementInstalmentSummary> {
        throw new Error('Method not implemented.');
    }
    public getPaymentArrangementInstalmentPlans(contractAccountNumber: string, status?: InstalmentPlanStatus): Observable<PaymentArrangementInstalmentPlans[]> {
        throw new Error('Method not implemented.');
    }
}
