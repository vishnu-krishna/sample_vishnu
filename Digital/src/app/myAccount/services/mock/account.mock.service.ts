import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { AccountOwnerModel, AccountViewModel, IAccountServiceMA } from '../account.service';

@Injectable()
export class AccountMockService implements IAccountServiceMA {
    public getAllActiveContracts(): Observable<string[]> {
        throw new Error('Method not implemented.');
    }
    public formatAddress(address: string): string {
        throw new Error('Method not implemented.');
    }
    public areAllAccountContractsRestricted(): Observable<boolean> {
        throw new Error('Method not implemented.');
    }
    public getAccounts(): Observable<AccountViewModel[]> {
        throw new Error('Method not implemented.');
    }
    public getName(): Observable<AccountOwnerModel> {
        throw new Error('Method not implemented.');
    }
    public refreshAccounts(): Observable<AccountViewModel[]> {
        throw new Error('Method not implemented.');
    }
    public isExcludedFromBillSmoothing(accountViewModels: AccountViewModel[]): boolean {
        return false;
    }
    public hasAnyContractInRegionId(regionId: string): Observable<boolean> {
        throw new Error('Method not implemented.');
    }
    public hasContractPayOnTimeDiscount(accounts: AccountViewModel[]): boolean {
        throw new Error('Method not implemented.');
    }
}
