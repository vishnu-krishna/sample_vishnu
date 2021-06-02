import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observer } from 'rxjs';

import { FeatureFlagService, FeatureFlagTypes } from '../../../services/featureFlag.service';
import { IConcessionStateService } from './services/concessionState.service';
import { IApiService } from '../../../../shared/service/contract/iapi.service';
import { ContactDetailModel, BusinessPartnerModel } from '../../../../shared/service/api.service';
import { IAccountServiceMA, AccountViewModel } from '../../../services/account.service';
import { IConcessionStatusService } from './services/concessionStatus.service';

interface SingleBpCustomer {
    bp: BusinessPartnerModel;
    accounts: AccountViewModel[];
}

@Injectable()
export class ApplyForConcessionEntryGuard implements CanActivate {
    private chooseAddressPage = '/settings/concession/selectaccount';
    private chooseServicePage = '/settings/concession/selectfuel';
    private accessDeniedPage = '/settings/personal';

    constructor(private router: Router,
                private featureFlagService: FeatureFlagService,
                private concessionStateService: IConcessionStateService,
                private concessionStatusService: IConcessionStatusService,
                private apiService: IApiService,
                private accountService: IAccountServiceMA) {
    }

    public canActivate(activatedRouteSnapshot: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return new Observable((observer: Observer<boolean>) => {
            this.featureFlagService.featureFlagged(FeatureFlagTypes.applyForConcessionEnabled)
                .takeWhile((isFeatureOn: boolean) => isFeatureOn)
                .flatMap(() => this.concessionStatusService.canApplyForConcession())
                .takeWhile((canApply: boolean) => canApply)
                .flatMap(() => this.resolveSingleBpCustomerDetails())
                .takeWhile((singleBpCustomer: SingleBpCustomer) => !!singleBpCustomer)
                .finally(() => {
                    if (!observer.closed) {
                        this.denyAccess(observer);
                    }
                }).subscribe((singleBpCustomer: SingleBpCustomer) => {
                    let route = this.resolveRouteToEntryPage(singleBpCustomer.accounts);

                    this.initSession(singleBpCustomer.bp);
                    this.allowAccess(observer, route);
                }, (err) => {
                    this.denyAccess(observer);
                });
            });
    }

    private resolveSingleBpCustomerDetails(): Observable<SingleBpCustomer> {
        return Observable.forkJoin(
            this.apiService.getContactDetail(),
            this.accountService.getAccounts(),
        ).map(([ contactDetails, accountDetails ]: [ContactDetailModel, AccountViewModel[]]) => {
            let res: SingleBpCustomer;
            if (!contactDetails.hasMultipleBusinessPartners && contactDetails.businessPartners.length === 1) {
                res = {
                    bp: contactDetails.businessPartners[0],
                    accounts: accountDetails
                };
            }
            return res;
        });
    }

    private initSession(bp: BusinessPartnerModel): void {
        let bpAccountHolderFullName = (bp.firstName || '').trim() + ' ' + (bp.lastName || '').trim();
        this.concessionStateService.initSession(bp.businessPartnerNumber, bpAccountHolderFullName);
    }

    private resolveRouteToEntryPage(accounts: AccountViewModel[]): string {
        return accounts.length > 1 ? this.chooseAddressPage : `${this.chooseServicePage}/${accounts[0].accountNumber}`;
    }

    private allowAccess(observer: Observer<boolean>, route: string) {
        this.router.navigate([route]);
        observer.next(true);
        observer.complete();
    }

    private denyAccess(observer: Observer<boolean>) {
        console.log('Access denied to concessions');
        this.router.navigate([this.accessDeniedPage]);
        observer.next(false);
        observer.complete();
    }
}
