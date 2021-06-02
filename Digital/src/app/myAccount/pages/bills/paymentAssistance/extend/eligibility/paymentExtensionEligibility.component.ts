import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import capitalize from 'lodash-es/capitalize';

import { DataLayerService } from '../../../../../../shared/service/dataLayer.service';
import { IAccountServiceMA, AccountViewModel } from '../../../../../services/account.service';
import { IPaymentExtensionStateService } from '../services/paymentExtensionState.service';
import { ClassifiedFuelChips } from './services/fuelChipClassification.service';
import { IPaymentExtensionFuelChipService } from './services/paymentExtensionFuelChip.service';
import { IPaymentAssistanceNavigationPersistedStateService } from '../../services';

@Component({
    selector: 'agl-payment-extension-eligibility',
    templateUrl: './paymentExtensionEligibility.component.html',
    styleUrls: ['./paymentExtensionEligibility.component.scss']
})
export class PaymentExtensionEligibilityComponent implements OnInit {
    public showLoader = true;
    public heading: string;
    public displayEligibleFuelChips = false;
    public displayAlreadyExtendedFuelChips = false;
    public displayIneligibleFuelChips = false;
    public displayNoIssuedBillFuelChips = false;
    public firstName = '';
    public classifiedFuelChips: ClassifiedFuelChips;
    public showError = false;
    public showIneligibleFuelChipSubHeading = false;
    public showPayOnTimeDiscount = true;

    constructor(public fuelChipService: IPaymentExtensionFuelChipService,
                private paymentExtensionStateService: IPaymentExtensionStateService,
                private accountService: IAccountServiceMA,
                private router: Router,
                private dataLayerService: DataLayerService,
                private paymentAssistanceNavigationPersistedStateService: IPaymentAssistanceNavigationPersistedStateService) {
    }

    public ngOnInit(): void {

        this.accountService.getName()
            .subscribe((accountOwnerModel) => {
                this.firstName = capitalize(accountOwnerModel.firstName);
            });
        // this.showLoader = true;

        this.fuelChipService.init()
            .finally(() => this.showLoader = false)
            .subscribe((classifiedFuelChips: ClassifiedFuelChips) => {
                this.processFuelChipServiceInit(classifiedFuelChips);
            });

        // Pay on time discount flag
        this.accountService.getAccounts().subscribe((accounts) => {
            this.showPayOnTimeDiscount = this.accountService.hasContractPayOnTimeDiscount(accounts);
        });
    }

    public onFuelChipSelected(contractNumber: string) {
        this.setExtensionApplicationBackUrl();
        const selectedChip = this.classifiedFuelChips.eligibleFuelChips.find((chip) => chip.contractNumber === contractNumber);
        this.paymentExtensionStateService.initNewSession(contractNumber, this.classifiedFuelChips.eligibleFuelChips);
        this.router.navigate([`/bills/paymentassistance/extend/confirm/${selectedChip.accountNumber}/${contractNumber}`]);
    }

    public goToOverview() {
        this.router.navigate(['/overview']);
    }

    private processFuelChipServiceInit(classifiedFuelChips: ClassifiedFuelChips) {
        if (!classifiedFuelChips.eligibleFuelChips.length
            && !classifiedFuelChips.alreadyExtendedFuelChips.length
            && !classifiedFuelChips.ineligibleFuelChips.length
            && !classifiedFuelChips.noIssuedBillFuelChips.length) {
            this.dataLayerService.trackPaymentExtensionDogDoomError(`No fuels found for this user`);
            this.showError = true;
        } else {
            this.showError = false;
            if (classifiedFuelChips.eligibleFuelChips.length) {
                this.displayEligibleFuelChips = true;
                this.heading = 'Extend your bill due date.';
            } else {
                this.heading = `We can't currently extend the due date for these bills`;
            }
            this.displayAlreadyExtendedFuelChips = !!classifiedFuelChips.alreadyExtendedFuelChips.length;
            this.displayIneligibleFuelChips = !!classifiedFuelChips.ineligibleFuelChips.length;
            this.displayNoIssuedBillFuelChips = !!classifiedFuelChips.noIssuedBillFuelChips.length;
            this.classifiedFuelChips = classifiedFuelChips;
            if (classifiedFuelChips.ineligibleFuelChips.length &&
                (classifiedFuelChips.alreadyExtendedFuelChips.length ||
                    classifiedFuelChips.eligibleFuelChips.length ||
                    classifiedFuelChips.noIssuedBillFuelChips.length)) {
                this.showIneligibleFuelChipSubHeading = true;
            }
        }
    }
    private setExtensionApplicationBackUrl = (): void =>
        this.paymentAssistanceNavigationPersistedStateService.setState({
            ...this.paymentAssistanceNavigationPersistedStateService.getState(),
            extensionApplicationBackUrl: window.location.pathname
        })

}
