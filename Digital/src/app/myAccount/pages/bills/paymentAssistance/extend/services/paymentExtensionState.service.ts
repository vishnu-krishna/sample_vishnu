import { Injectable } from '@angular/core';

import * as jwt_decode from 'jwt-decode';
import cloneDeep from 'lodash-es/cloneDeep';
import { Observer } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { ConfigService } from '../../../../../../shared/service/config.service';
import { IAccountServiceMA } from '../../../../../services/account.service';
import { FuelChipData } from '../eligibility/fuelChipData';

declare let leanengage: any;

export abstract class IPaymentExtensionStateService {
    public abstract extensionCompleted(extendedDueDate: Date): Observable<boolean>;
    public abstract initNewSession(selectedContractNumber: string, eligibleFuelChips: FuelChipData[]);
    public abstract getSelectedFuelChip(): FuelChipData;
    public abstract clearSelectedFuelChip(): void;
    public abstract getEligibleFuelChips(): FuelChipData[];
    public abstract getExtendedFuelChip(): FuelChipData;
    public abstract selectChip(selectedContractNumber: string);
    public abstract showLeanEngageSurveyOnSuccessfulSetup(): void;
    public abstract shouldLeanEngageSurveyBeShown(): boolean;
    public abstract setLeanEngageSurveyShown(leanSurveyShown: boolean): void;
}

// This service is still under development, will revisit later after the other payment extension pages are ready.
@Injectable()
export class PaymentExtensionStateService implements IPaymentExtensionStateService {
    private selectedChip: FuelChipData;
    private eligibleChips: FuelChipData[];
    private extendedChip: FuelChipData;
    private leanSurveryShown = false;

    constructor(
        private accountService: IAccountServiceMA,
        public configService: ConfigService,
    ) { }

    public getSelectedFuelChip(): FuelChipData {
        return this.selectedChip;
    }

    public clearSelectedFuelChip(): void {
        this.selectedChip = undefined;
    }

    public getEligibleFuelChips(): FuelChipData[] {
        return this.eligibleChips;
    }

    public getExtendedFuelChip(): FuelChipData {
        return this.extendedChip;
    }

    public extensionCompleted(extendedDueDate: Date): Observable<boolean> {
        return new Observable((observer: Observer<boolean>) => {
            this.accountService.refreshAccounts().subscribe(
                () => {
                    this.eligibleChips = this.eligibleChips.filter((fcd) => fcd.contractNumber !== this.selectedChip.contractNumber);
                    this.extendedChip = cloneDeep(this.selectedChip);
                    this.extendedChip.eligibility.dueDate = extendedDueDate;
                    this.extendedChip.eligibility.isEligible = false;
                    this.extendedChip.eligibility.availableExtensionDates = null;
                    this.selectedChip = null;
                    observer.next(true);
                },
                (error) => {
                    observer.next(false);
                },
                () => {
                    observer.complete();
                }
            );
        });
    }

    public selectChip(selectedContractNumber: string) {
        let selectedFuelChip = this.getEligibleFuelChips().find((fc) => fc.contractNumber === selectedContractNumber);
        if (selectedFuelChip) {
            this.selectedChip = cloneDeep(selectedFuelChip);
            this.selectedChip.hasBeenSelected();
        }
    }

    public initNewSession(selectedContractNumber: string, eligibleFuelChips: FuelChipData[]): FuelChipData {
        this.eligibleChips = eligibleFuelChips;
        this.selectChip(selectedContractNumber);
        this.leanSurveryShown = false;
        return this.selectedChip;
    }

    /***
     * Displays the 'payment-extensions-success' lean engage survey as a modal dialog
     */
    public showLeanEngageSurveyOnSuccessfulSetup(): void {
        let nameId: string;
        let leanAppId = this.configService.current.leanEngageAppId;
        let bearerToken = sessionStorage.getItem('Bearer');
        if (bearerToken) {
            nameId = jwt_decode(bearerToken)['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
        }

        leanengage('start', { user_id: nameId, name: nameId, app_id: leanAppId });
        // The leanenage library is current defaulting the appId. Calling the 'create' method allows us to reset it
        // leanengage('create', leanAppId);

        leanengage('triggerSurvey', 'payment-extensions-success');

    }

    /**
     * Determine if the lean engage survey should be shown
     * Only show if there is not another fuel type eligible for payment extension and that the
     * survey has not previously been shown to the user
     */
    public shouldLeanEngageSurveyBeShown(): boolean {
        return !this.leanSurveryShown && (this.eligibleChips.length === 0);
    }

    /**
     * Set the lean survey shown flag. This is used by the shouldLeanEngageSurveyBeShown() logic
     * @param leanSurveyShown Flag indicating if the lean engage survey has been show to the user
     */
    public setLeanEngageSurveyShown(leanSurveyShown: boolean): void {
        this.leanSurveryShown = leanSurveyShown;
    }
}
