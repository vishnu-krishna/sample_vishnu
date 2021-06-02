import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BonusEligible } from '../../model/payment/bonusEligible.model';
import { PrePaymentBalance } from '../../model/product/prePaymentBalance.model';
import { UsageDataModel } from '../../model/usage/usageData.model';
import { UsageGranularity } from '../../model/usage/usageGranularity.model';
import { AccountApiModel, BillHistoryApiModel, BusinessPartnerModel,
    ContactDetailModel, ContractDetailApiModel, PaymentApiModel, PendingPaymentApiModel,
    SelfServiceEligibilityResponseApiModel, SelfServiceMeterReading, SelfServiceReadingResponse } from '../api.service';

export abstract class IApiService {

    public abstract get errors(): Subject<any>;

    public abstract getDashboard(): Observable<ContractDetailApiModel[]>;

    public abstract getUsage(granularity: UsageGranularity, startDate: Date, endDate: Date): Observable<UsageDataModel[]>;

    public abstract getAccounts(): Observable<AccountApiModel[]>;

    public abstract getBills(): Observable<BillHistoryApiModel[]>;

    public abstract getContactDetail(): Observable<ContactDetailModel>;

    public abstract updateContactDetail(currentDetails: BusinessPartnerModel, updatedDetails: BusinessPartnerModel): Observable<boolean>;

    public abstract getPayments(): Observable<PaymentApiModel[]>;

    public abstract getPendingPayments(): Observable<PendingPaymentApiModel[]>;

    public abstract getPrePaymentBalance(contractNumber: string): Observable<PrePaymentBalance>;

    public abstract getBonusEligible(contractNumber: string, paymentAmount: number): Observable<BonusEligible>;

    public abstract getMetersForContract(contractNumber: string): Observable<SelfServiceEligibilityResponseApiModel>;

    public abstract postMetersForContract(contractNumber: string, data: SelfServiceMeterReading[]): Observable<SelfServiceReadingResponse>;

    public abstract startSync();

    public abstract startTimeout();

    public abstract checkTimeout();

    public abstract getProfile();

}
