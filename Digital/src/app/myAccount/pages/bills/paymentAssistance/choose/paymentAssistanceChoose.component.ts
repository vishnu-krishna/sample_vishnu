import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { DataLayerService } from '../../../../../shared/service/dataLayer.service';
import { Now } from '../../../../../shared/service/now.service';
import { FlashMessageType } from '../../../../maui/flashMessage';
import { AccountViewModel, ContractViewModel, IAccountServiceMA } from '../../../../services/account.service';
import { IInstalmentPlanOptionsService } from '../../../../services/paymentScheme/instalmentPlanOptions.service';
import { PaymentExtensionAvailableDate } from '../../../../services/paymentScheme/paymentExtensionEligibility.service';
import { FuelChipData } from '../extend/eligibility/fuelChipData';
import { ClassifiedFuelChips } from '../extend/eligibility/services/fuelChipClassification.service';
import { IPaymentExtensionFuelChipService } from '../extend/eligibility/services/paymentExtensionFuelChip.service';
import { IPaymentExtensionStateService } from '../extend/services/paymentExtensionState.service';
import { IPaymentAssistanceNavigationPersistedStateService } from '../services';

@Component({
    selector: 'agl-payment-assistance-choose',
    templateUrl: './paymentAssistanceChoose.component.html',
    styleUrls: ['./paymentAssistanceChoose.component.scss']
})

export class PaymentAssistanceChooseComponent implements OnInit {
    public amountToPayMessage: string;
    public daysToPayMessage: string;
    public dateToPayMessage: string;
    public showLoader: boolean;
    public showError: boolean = false;
    public paymentExtensionMessage: string;
    public instalmentPlanMessage: string;
    public tertiaryMessage: string;
    public selectedFuelChip: FuelChipData;
    public isLoadingInstalmentPlan: boolean;
    public selectedContract: ContractViewModel;
    public showSetUpInstalmentsError: boolean = false;
    public flashMessageType = FlashMessageType;

    constructor(
        private paymentExtensionStateService: IPaymentExtensionStateService,
        private fuelChipService: IPaymentExtensionFuelChipService,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: IAccountServiceMA,
        private instalmentPlanOptionsService: IInstalmentPlanOptionsService,
        public _now: Now,
        private dataLayerService: DataLayerService,
        private paymentAssistanceNavigationPersistedStateService: IPaymentAssistanceNavigationPersistedStateService
    ) {}

    public ngOnInit(): void {
        if (this.paymentExtensionStateService.getSelectedFuelChip()) {
            this.populatePageContent(this.paymentExtensionStateService.getSelectedFuelChip());
        } else {
            this.loadFuelChipData();
        }
    }

    public navigateExtendConfirm() {
        this.setExtensionApplicationBackUrl();
        this.showSetUpInstalmentsError = false;
        this.router.navigate([`/bills/paymentassistance/extend/confirm/${this.paymentExtensionStateService.getSelectedFuelChip().accountNumber}/${this.paymentExtensionStateService.getSelectedFuelChip().contractNumber}`], { queryParamsHandling: 'preserve' });
    }

    public navigatePlanOptions() {
        this.showSetUpInstalmentsError = false;
        this.isLoadingInstalmentPlan = true;
        this.instalmentPlanOptionsService.getInstalmentOptions(this.selectedFuelChip.contractNumber, { suggestInstalments: true })
            .finally(() => this.isLoadingInstalmentPlan = false)
            .subscribe((res) => {
                this.router.navigate([`/bills/paymentassistance/plan/options/${this.selectedFuelChip.accountNumber}/${this.selectedFuelChip.contractNumber}`], { queryParamsHandling: 'preserve' });
            },
            (error) => {
                this.showSetUpInstalmentsError = true;
                this.dataLayerService.pushPaymentAssistanceErrorEvent('instalmentPlanOptionsService.getInstalmentOptions', location.pathname, location.href);
            });
    }

    public populatePageContent(selectedFuelChip: FuelChipData) {
        this.selectedFuelChip = selectedFuelChip;
        const latestExtension = this.getLatestExtension(selectedFuelChip.eligibility.availableExtensionDates);
        this.amountToPayMessage = `$${selectedFuelChip.eligibility.totalAmountDue}`;
        this.dateToPayMessage = moment(latestExtension.dueDate).format('DD MMM YYYY');
        this.daysToPayMessage = `${latestExtension.numberOfDays} days`;

        this.paymentExtensionMessage = `Extend your bill due date for up to ${latestExtension.numberOfDays} business days.`;

        this.instalmentPlanMessage = 'Split up your bill into smaller instalments.';

        this.populateAccountMessages(selectedFuelChip);
    }

    public backClicked = () => {
        const backUrl = this.paymentAssistanceNavigationPersistedStateService.getState().chooseBackUrl;
        this.router.navigate([backUrl]);
    }

    private getLatestExtension(extensions: PaymentExtensionAvailableDate[]): PaymentExtensionAvailableDate {
        return extensions.slice().filter((e: PaymentExtensionAvailableDate) => {
            return !!e.dueDate;
        }).sort((a: PaymentExtensionAvailableDate, b: PaymentExtensionAvailableDate) => {
            return moment(b.dueDate).diff(moment(a.dueDate), 'days');
        })[0];
    }

    private loadFuelChipData() {
        this.route.params.subscribe((routeParams) => {
            this.showLoader = true;
            this.fuelChipService.init()
            .finally(() => this.showLoader = false)
            .subscribe((fuelChips: ClassifiedFuelChips) => {
                this.selectedFuelChip = this.paymentExtensionStateService.initNewSession(routeParams.contractNumber, fuelChips.eligibleFuelChips);
                if (this.selectedFuelChip) {
                    this.populatePageContent(this.selectedFuelChip);
                } else {
                    this.showError = true;
                }
            });
        });
    }

    private populateAccountMessages(selectedFuelChip: FuelChipData) {
        const latestExtension = this.getLatestExtension(selectedFuelChip.eligibility.availableExtensionDates);

        this.accountService.getAccounts().subscribe((accounts: AccountViewModel[]) => {
            let account: AccountViewModel = accounts.find((acc) => acc.contracts.some((con) => con.contractNumber === selectedFuelChip.contractNumber));

            this.selectedContract = account.contracts.find((con) => con.contractNumber === selectedFuelChip.contractNumber);

            let otherContracts: ContractViewModel[] = account.contracts.filter((con) => con.contractNumber !== selectedFuelChip.contractNumber);

            const otherContractsWithUpcomingBill = otherContracts.slice().filter((contract: ContractViewModel) => {
                const isCurrentBillEndDateInFuture = moment(contract.currentBillEndDate).isAfter(this._now.date());
                return isCurrentBillEndDateInFuture && moment(contract.currentBillEndDate).isSameOrBefore(moment(latestExtension.dueDate), 'day');
            });

            if (otherContractsWithUpcomingBill.length > 1) {
                this.tertiaryMessage = `It looks like you also have other bills issued within this period, so please keep these, and other finances you have to pay in mind.`;
            } else if (otherContractsWithUpcomingBill.length === 1) {
                this.tertiaryMessage = `It looks like you also have your ${otherContractsWithUpcomingBill[0].fuelType} bill issued within this period, so please keep this, and other finances you have to pay in mind.`;
            }
        });
    }

    private setExtensionApplicationBackUrl = (): void =>
        this.paymentAssistanceNavigationPersistedStateService.setState({
            ...this.paymentAssistanceNavigationPersistedStateService.getState(),
            extensionApplicationBackUrl: window.location.pathname
        })
}
