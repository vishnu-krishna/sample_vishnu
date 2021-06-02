import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { BonusEligible } from '../../shared/model/payment/bonusEligible.model';
import { PrePaymentBalance } from '../../shared/model/product/prePaymentBalance.model';
import { UsageDataModel } from '../../shared/model/usage/usageData.model';
import { UsageGranularity } from '../../shared/model/usage/usageGranularity.model';
import { AccountApiModel, BillHistoryApiModel,
    BusinessPartnerModel, ContactDetailModel, ContractDetailApiModel, PaymentApiModel,
    PendingPaymentApiModel,
    SelfServiceEligibilityResponseApiModel, SelfServiceMeterReading, SelfServiceReadingResponse } from '../../shared/service/api.service';
import { EmailReceiptRequestModel } from '../../shared/service/api.service';
import { IApiService } from '../../shared/service/contract/iapi.service';
import { InstalmentPlanStatus } from '../../myAccount/services/paymentScheme/paymentSchemeApi.service';

@Injectable()
export class ApiStubService implements IApiService {

    public errors: Subject<any>;
    public accountLoadedStatus: ReplaySubject<string> = new ReplaySubject<string>(1);
    public allContentLoaded: ReplaySubject<boolean> = new ReplaySubject(1);
    public contactLoadedStatus: ReplaySubject<string> = new ReplaySubject<string>(1);

    public getContactDetail(): Observable<ContactDetailModel> {
        throw new Error('Method not implemented.');
    }
    public updateContactDetail(currentDetails: BusinessPartnerModel, updatedDetails: BusinessPartnerModel): Observable<boolean> {
        throw new Error('Method not implemented.');
    }
    public getDashboard(): Observable<ContractDetailApiModel[]> {
        throw new Error('Method not implemented.');
    }
    public getUsage(granularity: UsageGranularity, startDate: Date, endDate: Date): Observable<UsageDataModel[]> {
        throw new Error('Method not implemented.');
    }
    public getAccounts(): Observable<AccountApiModel[]> {
        throw new Error('Method not implemented.');
    }
    public getBills(): Observable<BillHistoryApiModel[]> {
        throw new Error('Method not implemented.');
    }
    public getPayments(): Observable<PaymentApiModel[]> {
        throw new Error('Method not implemented.');
    }
    public getPendingPayments(): Observable<PendingPaymentApiModel[]> {
        throw new Error('Method not implemented.');
    }
    public getPrePaymentBalance(contractNumber: string): Observable<PrePaymentBalance> {
        throw new Error('Method not implemented.');
    }
    public getBonusEligible(contractNumber: string, paymentAmount: number): Observable<BonusEligible> {
        throw new Error('Method not implemented.');
    }
    public getMetersForContract(contractNumber: string): Observable<SelfServiceEligibilityResponseApiModel> {
        throw new Error('Method not implemented.');
    }
    public getBillSmoothingContracts(contractNumber: string): Observable<any> {
        throw new Error('Method not implemented.');
    }
    public getInstalmentPlans(contractNumber: string, status: InstalmentPlanStatus): Observable<any> {
        throw new Error('Method not implemented.');
    }
    public postMetersForContract(contractNumber: string, data: SelfServiceMeterReading[]): Observable<SelfServiceReadingResponse> {
        throw new Error('Method not implemented.');
    }
    public postBillSmoothingScheme(contractNumber: string, data: any): Observable<any> {
        throw new Error('Method not implemented.');
    }
    public postPendingPayments(data): Observable<PendingPaymentApiModel[]> {
        throw new Error('Method not implemented.');
    }
    public sendPaymentEmail(data: EmailReceiptRequestModel): Observable<boolean> {
        throw new Error('Method not implemented.');
    }
    public startSync() {
        throw new Error('Method not implemented.');
    }
    public startTimeout() {
        throw new Error('Method not implemented.');
    }
    public checkTimeout() {
        throw new Error('Method not implemented.');
    }
    public getProfile() {
        throw new Error('Method not implemented.');
    }

}
