import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { SolarCheckEligiblity } from '../../../shared/model/solar/solarCheckEligibility.model';
import { SolarCheckRegistrationStatusType } from '../../../shared/model/solar/solarCheckRegistrationStatus.model';
import { AccountViewModel } from '../../services/account.service';
import { ISolarCheckService } from '../../services/contract/isolarCheck.service';
import { ISsmrService } from '../../services/contract/issmr.service';
import { LocalStorageService } from '../../services/localStorage.service';

import { get } from '@typed/hashmap';

@Component({
    selector: 'agl-ssmr-banner',
    templateUrl: './selfServiceMeterReadBanner.component.html',
    styleUrls: ['./selfServiceMeterReadBanner.component.scss']
})
export class SelfServiceMeterReadBannerComponent implements OnInit, OnChanges {
    @Input() public accounts: AccountViewModel[];

    public showSSMRPanel: boolean = false;
    public accountNoSSMRPanel: object;

    constructor(
        public solarCheckService: ISolarCheckService,
        public ssmr: ISsmrService,
        public localStorageService: LocalStorageService
    ) { }

    public ngOnInit() {
        this.setSSMRPanelMode();
        this.ssmr.checkForBasicMeterByFuelType();
    }

    public ngOnChanges() {
        if (this.accounts) {
            this.setSSMRPanelMode();
        }
    }

    public solarCheckRegistered() {
        for (let account of this.accounts) {
            for (let contract of account.contracts) {
                if (contract.hasSolar) {
                    if (contract.solarCheckRegistered) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    public setSSMRPanelMode() {
        this.accountNoSSMRPanel = JSON.parse(localStorage.getItem('accountWithNoSSMRPanel')) || {};
        if (this.accounts
            && this.accountNoSSMRPanel[this.accounts[0].accountNumber]) {
            this.showSSMRPanel = false;
        } else {
            this.hideBannerForSolar();
        }
    }

    public closeSSMRPanel() {
        this.accountNoSSMRPanel = JSON.parse(localStorage.getItem('accountWithNoSSMRPanel')) || {};
        let accountNo = this.accounts[0].accountNumber;
        this.accountNoSSMRPanel[accountNo] = true;
        localStorage.setItem('accountWithNoSSMRPanel', JSON.stringify(this.accountNoSSMRPanel));
        this.showSSMRPanel = false;
    }

    public accountHasSolar() {
        return this.accounts
            .reduce((contracts, account) => {
                return [].concat(contracts, account.contracts);
            }, [])
            .some((contract) => {
                return contract.hasSolar;
            });
    }

    /**
     * Solar Check Eligiblity
     * - Customer is not registered and eligible
     */
    public displaySolarOffer(solarCheckEligiblityResult: SolarCheckEligiblity): boolean {
        if (solarCheckEligiblityResult && solarCheckEligiblityResult.contracts) {
            return solarCheckEligiblityResult.contracts.some((x) => x.eligible === true)
                && solarCheckEligiblityResult.contracts.every((x) =>
                (x.registrationStatus &&
                 x.registrationStatus === SolarCheckRegistrationStatusType.NotRegistered
                ));
        }
        return false;
    }

    /**
     * SSMR banner is hidden for Solar Check Eligible customers
     * - Customer hasSolar and is eligible via SolarCheckService
     */
    public hideBannerForSolar() {
        if (!this.hasLocalStorageToHideSolarCheckOfferBeenCreated() && this.accountHasSolar()) {
            this.solarCheckService.isEligible()
                .subscribe(
                (result) => {
                    if (!this.displaySolarOffer(result)) {
                        this.showSSMRPanel = true;
                    }
                },
                    (error) => {
                        console.error('customer has solar but eligibility call has failed - show SSMR banner', error);
                        this.showSSMRPanel = true;
                    }
                );
        } else {
            this.showSSMRPanel = true;
        }
    }

    public hasLocalStorageToHideSolarCheckOfferBeenCreated() {
        let storedOfferKey = this.localStorageService.getKeys();
        if (storedOfferKey
            && storedOfferKey.localAlertDismissables
            && storedOfferKey.localAlertDismissables.displaySolarCheckOffer) {
            let hideOffer = get(this.accounts[0].accountNumber, storedOfferKey.localAlertDismissables.displaySolarCheckOffer);
            if (hideOffer) {
                return true;
            }
        }
        return false;
    }
}
