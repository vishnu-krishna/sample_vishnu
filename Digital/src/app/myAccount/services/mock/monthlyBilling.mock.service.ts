import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AccountViewModel } from '../account.service';
import { AccountMonthlyBillingModel } from '../settings/model/accountMonthlyBillingModel';
import { BillDateOption } from '../settings/model/billDateOption';
import { BillingFrequency } from '../settings/model/billingFrequency';
import { CancelMonthlyBillingResponse } from '../settings/model/cancelMonthlyBillingResponse';
import { MonthlyBillingEligibility } from '../settings/model/monthlyBillingEligibility';

@Injectable()
export class MonthlyBillingMockService {

    public checkAccountEligibilities(): Observable<MonthlyBillingEligibility[]> {
        throw new Error('Method not implemented.');
    }
    public getMonthlyBillingInfoForAccount(account: AccountViewModel): Observable<AccountMonthlyBillingModel> {
        throw new Error('Method not implemented.');
    }
    public checkEligibility(contractAccountNumber: string): Observable<MonthlyBillingEligibility[]> {
        throw new Error('Method not implemented.');
    }
    public getBillingFrequencies(contractAccountNumber: string): Observable<BillingFrequency[]> {
        throw new Error('Method not implemented.');
    }
    public getBillDateOptions(contractNumber: string): Observable<BillDateOption[]> {
        throw new Error('Method not implemented.');
    }
    public getOrdinal(num: number): string {
        throw new Error('Method not implemented.');
    }
    public setupMonthlyBilling(contractNumber: string, preferredDayOfMonth: number): Observable<any> {
        throw new Error('Method not implemented.');
    }
    public cancelMonthlyBilling(contractNumber: string): Observable<CancelMonthlyBillingResponse> {
        throw new Error('Method not implemented.');
    }
    public createMessage(accountMonthlyBillingModel: AccountMonthlyBillingModel): string {
        throw new Error('Method not implemented.');
    }
}
