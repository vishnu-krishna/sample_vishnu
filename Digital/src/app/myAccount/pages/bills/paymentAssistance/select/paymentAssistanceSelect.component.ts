import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { IBillStatusDisplayService } from './services';
import { IAccountServiceMA, AccountOwnerModel } from '../../../../services/account.service';
import { BillStatusDisplayEnum } from './enums';
import { IFuelChipService, ClassifiedFuelChips, IPaymentAssistanceNavigationPersistedStateService } from '../services';
import { DataLayerService } from '../../../../../shared/service/dataLayer.service';
import { MauiFuelChipFuelContext } from '../../../../maui/fuelChip';
import startCase from 'lodash-es/startCase';
import toLower from 'lodash-es/toLower';

@Component({
    selector: 'agl-payment-assistance-select',
    templateUrl: './paymentAssistanceSelect.component.html',
    styleUrls: ['./paymentAssistanceSelect.component.scss']
})
export class PaymentAssistanceSelectComponent implements OnInit, OnDestroy {

    public MauiFuelChipFuelContext = MauiFuelChipFuelContext;
    public showLoader = true;
    public showError = false;
    public classifiedFuelChips: ClassifiedFuelChips;
    public eligible;
    public alreadyOnP2P = false;
    public ineligible = false;

    public heading1ChooseYourBill = '';
    public heading2CannotOfferOPA = '';
    public subheading1SelectBillChooseYourBill = '';
    public subheading2AlreadySetupOPA = '';
    public subheading3aNoOPAOptionsAvailable = '';
    public subheading3bDontWorryOtherOptionsAvailable = '';

    public showHeading1ChooseYourBill = false;
    public showHeading2CannotOfferOPA = false;
    public showSubheading1SelectBillChooseYourBill = false;
    public showPayOnTimeDiscountMessage = false;
    public showSubheading2AlreadySetupOPA = false;
    public showSubheading3aNoOPAOptionsAvailable = false;
    public showSubheading3bDontWorryOtherOptionsAvailable = false;
    public showGoToOverviewButton = false;

    private subscriptions: Subscription[] = [];

    constructor(
        public billStatusDisplayService: IBillStatusDisplayService,
        private accountService: IAccountServiceMA,
        public fuelChipService: IFuelChipService,
        private dataLayerService: DataLayerService,
        private router: Router,
        private paymentAssistanceNavigationPersistedStateService: IPaymentAssistanceNavigationPersistedStateService
    ) {}

    public ngOnInit() {

        this.subscriptions.push(
            Observable.forkJoin(
                this.fuelChipService.init(),
                this.accountService.getName(),
                this.accountService.getAccounts()
            )
            .finally(() => this.showLoader = false)
            .subscribe(([classifiedFuelChips, accountOwner, accounts]) => {

                // Check groups of fuel chips to check which are populated
                this.eligible = classifiedFuelChips.eligibleFuelChips.length > 0;
                this.alreadyOnP2P = classifiedFuelChips.alreadyExtendedFuelChips.length > 0;
                this.ineligible = classifiedFuelChips.ineligibleFuelChips.length > 0;

                // Display the dog of doom page if there are no fuel chips to display
                if (!this.eligible && !this.alreadyOnP2P && !this.ineligible) {
                    this.dataLayerService.trackPaymentExtensionDogDoomError(`No fuels found for this user`);
                    this.showError = true;
                } else {
                    this.classifiedFuelChips = classifiedFuelChips;

                    // Configure copy on the page based on the availability of fuel chips
                    const billStatusDisplay: BillStatusDisplayEnum = this.billStatusDisplayService.determineBillStatusDisplay(
                        this.eligible,
                        this.alreadyOnP2P,
                        this.ineligible);

                    this.billStatusDisplayService.setDisplayMode(billStatusDisplay);

                    // Capitalise the first letter of each word in firstName and setup subheading1
                    const firstName = startCase(toLower(accountOwner.firstName));
                    this.billStatusDisplayService.setSubheading1SelectBill(firstName);

                    // Update heading and button visibility/copy
                    this.updateHeadingValues();

                    // Pay on time discount flag
                    const hasContractPayOnTimeDiscount = this.accountService.hasContractPayOnTimeDiscount(accounts);
                    this.updateHeadingAndButtonVisibility(hasContractPayOnTimeDiscount);
                }

            }));
    }

    public ngOnDestroy() {
        this.subscriptions.forEach((subscription) => {
            subscription.unsubscribe();
        });
    }

    public onFuelChipSelected(contractNumber: string) {
        this.paymentAssistanceNavigationPersistedStateService.setState({
            ...IPaymentAssistanceNavigationPersistedStateService.defaultState,
            chooseBackUrl: window.location.pathname
        });
        const selectedChip = this.classifiedFuelChips.eligibleFuelChips.find((chip) => chip.contractNumber === contractNumber);
        this.router.navigate([`/bills/paymentassistance/choose/${selectedChip.accountNumber}/${contractNumber}`], { queryParamsHandling: 'preserve' });
    }

    public goToOverview() {
        this.router.navigate(['/overview']);
    }

    private updateHeadingAndButtonVisibility(hasContractPayOnTimeDiscount: boolean): void {

        const display = this.billStatusDisplayService.display;

        this.showHeading1ChooseYourBill = display.heading1ChooseYourBill;
        this.showHeading2CannotOfferOPA = display.heading2CannotOfferOPA;
        this.showSubheading1SelectBillChooseYourBill = display.subheading1SelectBill;
        this.showSubheading2AlreadySetupOPA = display.subheading2AlreadySetupOPA;
        this.showSubheading3aNoOPAOptionsAvailable = display.subheading3aNoOPAOptionsAvailable;
        this.showSubheading3bDontWorryOtherOptionsAvailable = display.subheading3bDontWorryOtherOptionsAvailable;
        this.showPayOnTimeDiscountMessage = hasContractPayOnTimeDiscount && display.payOnTimeDiscountMessage;
        this.showGoToOverviewButton = display.goToOverviewButton;

    }

    private updateHeadingValues(): void {

        const heading = this.billStatusDisplayService.heading;

        this.heading1ChooseYourBill = heading.heading1ChooseYourBill;
        this.heading2CannotOfferOPA = heading.heading2CannotOfferOPA;
        this.subheading1SelectBillChooseYourBill = heading.subheading1SelectBill;
        this.subheading2AlreadySetupOPA = heading.subheading2AlreadySetupOPA;
        this.subheading3aNoOPAOptionsAvailable = heading.subheading3aNoOPAOptionsAvailable;
        this.subheading3bDontWorryOtherOptionsAvailable = heading.subheading3bDontWorryOtherOptionsAvailable;

    }
}
