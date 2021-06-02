import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ApiService } from '../../shared/service/api.service';
import { Now } from './../../shared/service/now.service';
import { AccountViewModel, IAccountServiceMA } from './account.service';
import { IDecisioningService } from './contract/idecisioning.service';
import { LocalAlertDismissablesModel, LocalStorageService } from './localStorage.service';
import { PaymentMethod } from './settings/model';

import { empty, get, set } from '@typed/hashmap';
import { FeatureFlagTypes } from './featureFlag.constants';
import { FeatureFlagService } from './featureFlag.service';
import { IPaymentMethodsService } from './settings/paymentMethods.service.interface';

import * as moment from 'moment';

@Injectable()
export class DecisioningService implements IDecisioningService {

    public smsPayAccountNumberList: number[];
    public accountList: AccountViewModel[];
    public indexForLocalStorage: number = 0;

    constructor(
        public apiService: ApiService,
        public accountService: IAccountServiceMA,
        public paymentMethodsService: IPaymentMethodsService,
        public localStorageService: LocalStorageService,
        public featureService: FeatureFlagService,
        public nowService: Now
        ) { }
    public checkSmsPayBannerVisibility(isMethodCalledfromOverviewBanner: boolean): Observable<boolean> {
           return Observable.forkJoin(
                this.apiService.getContactDetail(),
                this.accountService.getAccounts(),
                this.paymentMethodsService.getPaymentMethods()
            ).map(
                ([contactDetails, accountsList, paymentMethods]) => {
                    if (contactDetails && contactDetails.hasMultipleBusinessPartners) {
                        return false; // Returning false as the account is a Multi BP one
                    } else {
                        let isBannerClosedByUser: boolean = false;
                        this.accountList = accountsList;
                        if (isMethodCalledfromOverviewBanner) {
                            isBannerClosedByUser = this.checkSmsPayBannerClosedByUser();
                        }
                        if (!isBannerClosedByUser) {
                            this.getSmsPayAccountNumberList(paymentMethods);
                            return this.validateBannerVisibility();
                        } else {
                            return false; // Returning false as banner was closed by user
                        }
                    }
                },
                (err) => {
                    console.error('checkSmsPayBannerVisibility subscribe error', err);
                    return false;
                }
            );
    }

    public checkSmsPayBannerClosedByUser(): boolean {
        let storedSmsPayKey = this.localStorageService.getKeys();
        if (storedSmsPayKey
            && storedSmsPayKey.localAlertDismissables
            && storedSmsPayKey.localAlertDismissables.isSmsPayBannerClose) {
            let bannerClosed = get(this.accountList[this.indexForLocalStorage].accountNumber, storedSmsPayKey.localAlertDismissables.isSmsPayBannerClose);
            return !!bannerClosed;
        } else {
            return false;
        }
    }

    public getSmsPayAccountNumberList(paymentMethods: PaymentMethod[]) {
        if (paymentMethods) {
            this.smsPayAccountNumberList = [];
            for (let paymentMethod of paymentMethods) {
                if (paymentMethod &&
                    paymentMethod.oneTouchPayContractAccounts &&
                    paymentMethod.oneTouchPayContractAccounts.length > 0) {
                    this.smsPayAccountNumberList = this.smsPayAccountNumberList.concat(paymentMethod.oneTouchPayContractAccounts);
                }
            }
        }
    }

    public validateBannerVisibility(): boolean {
        if (this.accountList && this.smsPayAccountNumberList) {
            let isNotSetSmsPay: boolean = false;
            for ( let account of this.accountList) {
                if ( !isNotSetSmsPay) {
                    isNotSetSmsPay = this.smsPayAccountNumberList.indexOf(+account.accountNumber) === -1;
                }
            }
            return isNotSetSmsPay;
        } else {
            return true;
        }
    }

    public closeSmsPayPanel() {
        if (this.accountList) {
            let accountNo = this.accountList[this.indexForLocalStorage].accountNumber;
            let closedSmsPayBannerKey = new LocalAlertDismissablesModel();
            closedSmsPayBannerKey.isSmsPayBannerClose = empty<string, Boolean>();
            closedSmsPayBannerKey.isSmsPayBannerClose = set(accountNo, true, closedSmsPayBannerKey.isSmsPayBannerClose);
            this.localStorageService.addKey(closedSmsPayBannerKey);
        }
    }

    public isSmsPayEntryPointAvailableForCustomer(): Observable<boolean> {
        return Observable.forkJoin(
            this.featureService.featureFlagged(FeatureFlagTypes.smsPayEnabled),
            this.accountService.getAccounts(),
        ).map(([smsPayEnabled, accountViewModels]) => {
            if (smsPayEnabled && accountViewModels && accountViewModels.length > 0) {

                let accountNumber: string = accountViewModels[0].accountNumber;
                let accountPercentile: number;
                let now = this.nowService.date();

                try {
                    let lastNumber: string = accountNumber.substring(accountNumber.length - 1);
                    accountPercentile = parseInt(lastNumber, 10);
                    if (isNaN(accountPercentile)) {
                        return false;
                    }
                } catch (err) {
                    return false;
                }

                // The milestone dates at which we will activate a higher percentage of customers
                let milestoneTenPercent = moment('2017-11-21T00:00:00');
                let milestoneFiftyPercent = moment('2017-12-05T00:00:00');
                let milestoneOneHundredPercent = moment('2018-01-09T00:00:00');

                if (now > milestoneTenPercent) {
                    if (now > milestoneFiftyPercent) {
                        if (now > milestoneOneHundredPercent) {
                            return true;
                        } else {
                            return (accountPercentile < 5);
                        }
                    } else {
                        return (accountPercentile === 0);
                    }
                }

            }
            return false;
        });
    }

}
