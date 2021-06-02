import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { ISolarCheckService } from '../../myAccount/services/contract/isolarCheck.service';
import { SolarCheckEligibilityContract, SolarCheckEligiblity } from '../../shared/model/solar/solarCheckEligibility.model';
import { SolarCheckRegistrationStatusType } from '../../shared/model/solar/solarCheckRegistrationStatus.model';
import { ISolarCheckOfferService } from './contract/isolarCheckOffer.service';

import { AccountViewModel, IAccountServiceMA } from '../services/account.service';
import { FeatureFlagService, FeatureFlagTypes } from '../services/featureFlag.service';

@Injectable()
export class SolarCheckOfferService implements ISolarCheckOfferService {

    private _isEligibleSubject = new BehaviorSubject<boolean>(false);

    constructor(
        private _solarCheckService: ISolarCheckService,
        private _accountsService: IAccountServiceMA,
        private _featureService: FeatureFlagService
    ) {
        this._featureService.featureFlagged(FeatureFlagTypes.solarCheckEnabled).subscribe(
             (featureIsEnabled: boolean) => {
                if (featureIsEnabled) {
                    this._accountsService.getAccounts().switchMap((accounts) => {
                        if (this.checkAccountHasSolar(accounts)) {
                            return this._solarCheckService.isEligible().map((data: SolarCheckEligiblity) => {
                                if (this.isEligibleForOffer(data)) {
                                    return true;
                                }
                                return false;
                            });
                        }
                        return Observable.of(false);
                    })
                    .subscribe((isEligible) => {
                        this._isEligibleSubject.next(isEligible);
                        });
                }
            }
        );
    }

    public isEligible(): Observable<boolean> {
        return this._isEligibleSubject.asObservable();
    }

    public isRegistered(): Observable<boolean> {
        return this._solarCheckService.isEligible().map((data: SolarCheckEligiblity) => {
            return this.registeredForAny(data) && !this.deregisteringForAny(data);
        });
    }

    public isDeregistrationPending(): Observable<boolean> {
        return this._solarCheckService.isEligible().map((data: SolarCheckEligiblity) => {
            return this.deregisteringForAny(data);
        });
    }

    public getEligibleContract(): Observable<SolarCheckEligibilityContract> {
        return this._solarCheckService.isEligible().map((data: SolarCheckEligiblity) => {
            return data.contracts.find((x) => x.eligible === true);
        });
    }

   public checkAccountHasSolar(accounts: AccountViewModel[]): boolean {
        return accounts
            .reduce((contracts, account) => {
                return [].concat(contracts, account.contracts);
            }, [])
            .some((contract) => {
                return contract.hasSolar;
            });
    }

    private isEligibleForOffer(data: SolarCheckEligiblity): boolean {
        return (data.eligible
                && this.eligibleForAny(data) === true
                && this.registeredForAny(data) !== true);
    }

    private eligibleForAny(solarCheckEligiblity: SolarCheckEligiblity): boolean {
        return solarCheckEligiblity
            && solarCheckEligiblity.contracts
            && solarCheckEligiblity.contracts.some((contract) => contract.eligible === true);
    }

    private registeredForAny(solarCheckEligiblity: SolarCheckEligiblity): boolean {
        return solarCheckEligiblity
            && solarCheckEligiblity.contracts
            && solarCheckEligiblity.contracts.some((contract) => this.isRegisteredContract(contract) === true);
    }

    private deregisteringForAny(solarCheckEligiblity: SolarCheckEligiblity): boolean {
        return solarCheckEligiblity.contracts &&
            solarCheckEligiblity.contracts.some((x) => x.registrationStatus &&
                x.registrationStatus === SolarCheckRegistrationStatusType.DeregistrationPending);
    }

    private isRegisteredContract(contract: SolarCheckEligibilityContract): boolean {
        return contract && contract.registrationStatus && (contract.registrationStatus === SolarCheckRegistrationStatusType.Registered || contract.registrationStatus === SolarCheckRegistrationStatusType.RegistrationPending);
    }
}
