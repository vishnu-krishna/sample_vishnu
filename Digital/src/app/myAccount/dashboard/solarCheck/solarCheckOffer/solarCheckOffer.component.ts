import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from '../../../modal/modal.service';

import { SolarCheckEligiblity } from '../../../../shared/model/solar/solarCheckEligibility.model';
import { ISolarCheckService } from '../../../services/contract/isolarCheck.service';

import { AccountViewModel } from '../../../services/account.service';
import { SolarCheckRegisterProcessComponent } from '../solarCheckRegisterProcess/solarCheckRegisterProcess.component';
import { SolarCheckStatusViewModel } from '../solarCheckStatus/solarCheckStatusView.model';

import { empty, get, set } from '@typed/hashmap';
import { SolarCheckRegistrationStatusType } from '../../../../shared/model/solar/solarCheckRegistrationStatus.model';
import { DataLayerService } from '../../../../shared/service/dataLayer.service';
import { LocalAlertDismissablesModel, LocalStorageService } from '../../../services/localStorage.service';

@Component({
    selector: 'agl-solar-check-offer',
    templateUrl: './solarCheckOffer.component.html',
    styleUrls: ['./solarCheckOffer.component.scss']
})
export class SolarCheckOfferComponent implements OnInit {

    @Input() public accounts: AccountViewModel[];
    @Input() public statusModel: SolarCheckStatusViewModel;
    public solarCheckEligiblity: SolarCheckEligiblity = null;
    public displaySolarCheckOffer: boolean;
    public showSolarOffer: boolean = false;

    constructor(
        public solarCheckService: ISolarCheckService,
        public modalService: ModalService,
        public localStorageService: LocalStorageService,
        private dataLayer: DataLayerService
    ) { }

    public ngOnInit() {
        if (this.checkAccountHasSolar()) {
            this.solarCheckService.isEligible().subscribe(
                (x) => {
                    this.solarCheckEligiblity = x;

                    this.showSolarOffer = this.solarCheckEligiblity
                        && this.hasLocalStorageBeenCreated() === false
                        && this.solarCheckEligiblity.eligible
                        && this.eligibleForAny() === true
                        && this.registeredForAny() !== true
                        && this.isDeregistrationPending() === false
                        && this.isDeregistered() === false;

                    if (this.showSolarOffer) {
                        this.dataLayer.pushSccBannerOfferDisplayed();
                    }
                }
            );
        }
    }

    public registeredForAny(): Boolean {
        return this.solarCheckEligiblity
            && this.solarCheckEligiblity.contracts
            && this.solarCheckEligiblity.contracts.some((contract) => this.isRegisteredContract(contract) === true);
    }

    public isRegisteredContract(contract: any): boolean {
        return contract
            && contract.registrationStatus
            && (contract.registrationStatus === SolarCheckRegistrationStatusType.Registered
                || contract.registrationStatus === SolarCheckRegistrationStatusType.RegistrationPending);
    }

    public eligibleForAny(): Boolean {
        return this.solarCheckEligiblity.contracts &&
            this.solarCheckEligiblity.contracts.some((x) => x.eligible === true);
    }

    public isDeregistrationPending(): Boolean {
        return this.solarCheckEligiblity.contracts &&
            this.solarCheckEligiblity.contracts.some((x) => x.registrationStatus &&
                x.registrationStatus === SolarCheckRegistrationStatusType.DeregistrationPending);
    }

    public isDeregistered(): Boolean {
        return this.solarCheckEligiblity.contracts &&
            this.solarCheckEligiblity.contracts.some((x) => x.registrationStatus &&
                x.registrationStatus === SolarCheckRegistrationStatusType.Deregistered);
    }

    public get isEligible(): Boolean {
        return this.showSolarOffer;
    }

    public learnMore() {
        let eligibileContract;
        if (this.solarCheckEligiblity && this.solarCheckEligiblity.contracts) {
            eligibileContract = this.solarCheckEligiblity.contracts.find((x) => x.eligible === true);
        }

        this.modalService.activate({
            title: '',
            cancelText: '',
            okText: '',
            modalType: 'emptyComponent',
            component: SolarCheckRegisterProcessComponent,
            fullScreen: false,
            componentData: { contract: eligibileContract }
        });
    }

    public closeOffer() {
        this.hideSolarCheckOfferViaLocalStorage();
        this.dataLayer.pushSccBannerOfferDismissed();
        this.showSolarOffer = false;
    }

    public hideSolarCheckOfferViaLocalStorage() {
        let accountNo = this.accounts[0].accountNumber;
        let closedOfferKey = new LocalAlertDismissablesModel();
        closedOfferKey.displaySolarCheckOffer = empty<string, Boolean>();
        closedOfferKey.displaySolarCheckOffer = set(accountNo, true, closedOfferKey.displaySolarCheckOffer);
        this.localStorageService.addKey(closedOfferKey);
    }

    /**
     * Check if an account has a solar contract
     */
    public checkAccountHasSolar() {
        return this.accounts
            .reduce((contracts, account) => {
                return contracts.concat(account.contracts);
            }, [])
            .some((contract) => {
                return contract.hasSolar;
            });
    }

    public hasLocalStorageBeenCreated() {
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
