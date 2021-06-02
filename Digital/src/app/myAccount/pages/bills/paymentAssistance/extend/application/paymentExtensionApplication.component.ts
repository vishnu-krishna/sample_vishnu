import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';

import { DataLayerService, PageRequireOptionalVariables } from '../../../../../../shared/service/dataLayer.service';
import { FlashMessageType } from '../../../../../maui/flashMessage/index';
import { MauiFuelChipState } from '../../../../../maui/fuelChip/index';
import { SegmentedButtonOptions } from '../../../../../maui/segmentedButtons/segmentedButton/segmentedButton.component';
import { IPaymentExtensionApplication } from '../../../../../services/paymentScheme/paymentExtensionApplication.service';
import { PaymentExtensionAvailableDate, PaymentExtensionContractEligibility } from '../../../../../services/paymentScheme/paymentExtensionEligibility.service';
import { FuelChipData } from '../eligibility/fuelChipData';
import { ClassifiedFuelChips } from '../eligibility/services/fuelChipClassification.service';
import { IPaymentExtensionFuelChipService } from '../eligibility/services/paymentExtensionFuelChip.service';
import { IPaymentExtensionStateService } from '../services/paymentExtensionState.service';
import { AccountViewModel, IAccountServiceMA } from '../../../../../services/account.service';
import { LinkSize } from '../../../../../../shared/component/link';
import { Subscription } from 'rxjs/Subscription';
import { PaymentAssistanceExtensionApplicationRouteParamsModel } from './models';
import { IPaymentAssistanceNavigationPersistedStateService } from '../../services';

@Component({
    selector: 'agl-payment-extension-application',
    templateUrl: './paymentExtensionApplication.component.html',
    styleUrls: ['./paymentExtensionApplication.component.scss']
})
export class PaymentExtensionApplicationComponent implements OnInit, OnDestroy {
    public fuelChipData: FuelChipData;
    public fuelChipState: MauiFuelChipState;
    public contractEligibility: PaymentExtensionContractEligibility;
    public extensionDates: SegmentedButtonOptions[] = [];
    public selectedValue: string;

    public showLoader: boolean = true;
    public showError: boolean = false;
    public isMaxExtensionDaysSelected: boolean;
    public headerText: string;
    public subHeaderText: string;
    public extendedDate: Date;

    public flashMessageType = FlashMessageType;
    public showPaymentExtensionError: boolean = false;
    public isConfirmExtensionLoading: boolean = false;

    public selectedOption: number;
    public showPayOnTimeDiscount = false;
    public linkSize: LinkSize;

    public routeParamsModel: PaymentAssistanceExtensionApplicationRouteParamsModel;
    private subscriptions: Subscription[] = [];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private paymentExtensionStateService: IPaymentExtensionStateService,
        private fuelChipService: IPaymentExtensionFuelChipService,
        private paymentExtensionApplicationService: IPaymentExtensionApplication,
        private dataLayerService: DataLayerService,
        private accountService: IAccountServiceMA,
        private paymentAssistanceNavigationPersistedStateService: IPaymentAssistanceNavigationPersistedStateService
    ) {}

    public ngOnInit() {
        this.subscriptions.push(this.route.params.subscribe((routeParams) => {

            // Extract route parameters
            this.routeParamsModel = this.createRouteParamsModel(this.route, routeParams);

            if (this.paymentExtensionStateService.getSelectedFuelChip()) {
                this.prepareEligibilityView(this.paymentExtensionStateService.getSelectedFuelChip());
            } else {
                this.callPaymentExtensionEligibilityApi();
            }

            // Pay on time discount flag
            this.accountService.getAccounts().subscribe((accounts) => {
                this.showPayOnTimeDiscount = this.accountService.hasContractPayOnTimeDiscount(accounts);
            });
        }));
    }
    public ngOnDestroy() {
        this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    }

    public updateExtensionOptions($event) {
        this.selectedValue = $event;
        this.selectedOption = Number($event);
        this.setExtendedDate(this.selectedOption);
        this.checkIfMaxDaysAreSelected(this.selectedOption);
    }

    public confirmExtension() {
        this.isConfirmExtensionLoading = true;
        this.showPaymentExtensionError = false;
        this.paymentExtensionApplicationService
            .submit(this.fuelChipData.contractNumber, this.extendedDate)
            .subscribe((submitResult: boolean) => {
                    if (submitResult) {
                        this.dataLayerService.addOptionalPageVariableForTracking(PageRequireOptionalVariables.PaymentExtensionSuccess, 'user_extensionPeriod', this.selectedOption.toString());
                        this.paymentExtensionStateService.extensionCompleted(this.extendedDate).subscribe((result: boolean) => {
                            if (result) {
                                this.isConfirmExtensionLoading = false;
                                this.router.navigate(['/bills/paymentassistance/extend/success']);
                            } else {
                                this.handleError('Failed to update account after extending due date.');
                            }
                        });
                    } else {
                        this.handleError('Failed to extend due date.');
                    }
                }
            );
    }

    public hasMultipleAvailableExtensionDates() {
        return this.contractEligibility.availableExtensionDates.length > 1;
    }

    public cancelClicked() {
        const cancelDestinationUrl = this.getCancelDestinationUrl(this.routeParamsModel.cancelDestinationUrl);
        this.router.navigate([cancelDestinationUrl]);
    }

    public backClicked() {
        const backUrl = this.paymentAssistanceNavigationPersistedStateService.getState().extensionApplicationBackUrl;
        this.router.navigate([backUrl]);
    }

    private callPaymentExtensionEligibilityApi() {
        this.subscriptions.push(
            this.fuelChipService.init()
                .finally(() => this.showLoader = false)
                .subscribe((fuelChips: ClassifiedFuelChips) => {
                    this.paymentExtensionStateService.initNewSession(this.routeParamsModel.contractNumber, fuelChips.eligibleFuelChips);
                    if (this.paymentExtensionStateService.getSelectedFuelChip()) {
                        this.prepareEligibilityView(this.paymentExtensionStateService.getSelectedFuelChip());
                    } else {
                        this.dataLayerService.trackPaymentExtensionDogDoomError(`Can't select fuel with contract number ${this.routeParamsModel.contractNumber}`);
                        this.showError = true;
                    }
            })
        );
    }

    private prepareEligibilityView(selectedFuelChip: FuelChipData) {
        this.fuelChipData = selectedFuelChip;
        this.contractEligibility = selectedFuelChip.eligibility;
        this.filterAvailableExtensionDates(this.contractEligibility);
        this.setHeaderText();
        this.setDefaultExtensionOption();
        this.setExtensionOptions(this.contractEligibility.availableExtensionDates);
        this.setExtendedDate();
        this.checkIfMaxDaysAreSelected();
        this.showLoader = false;
    }

    private filterAvailableExtensionDates(eligibilityResult: PaymentExtensionContractEligibility) {
        this.contractEligibility.availableExtensionDates = eligibilityResult.availableExtensionDates.filter((date) => date.dueDate);
    }

    private handleError(analyticsMessage: string) {
        this.showPaymentExtensionError = true;
        this.isConfirmExtensionLoading = false;
        this.dataLayerService.trackExtendingPaymentDueDateFailure(analyticsMessage);
    }

    private setHeaderText() {
        const fuelType = this.fuelChipData.fuelType.toString().toLowerCase();
        const numberOfDays = this.contractEligibility.availableExtensionDates[0].numberOfDays;
        this.headerText = this.contractEligibility.availableExtensionDates.length > 1 ?
                          'How much longer do you need?' : 'Extend your bill due date';
        this.subHeaderText = this.contractEligibility.availableExtensionDates.length > 1 ?
                             `Select how many more days you'll need to pay your ${fuelType} bill.` :
                             `Your ${fuelType} bill due date will be extended by ${numberOfDays} days.`;
    }

    private setDefaultExtensionOption() {
        this.selectedValue = this.contractEligibility.availableExtensionDates[0].numberOfDays.toString();
        this.selectedOption = Number(this.selectedValue);
    }

    private setExtensionOptions(availableExtensionDates: PaymentExtensionAvailableDate[]) {
        this.extensionDates = availableExtensionDates
            .filter((date: PaymentExtensionAvailableDate) => date.dueDate)
            .map((date: PaymentExtensionAvailableDate) => {
                const value = date.numberOfDays.toString();
                const text = `${value} Days`;
                const selected = value === this.selectedValue;
                return { value, text, selected };
            });
    }

    private setExtendedDate(selectedOption?: number) {
        this.extendedDate = selectedOption ?
                            this.contractEligibility.availableExtensionDates.find((date) => date.numberOfDays === selectedOption).dueDate :
                            this.contractEligibility.availableExtensionDates[0].dueDate;
    }

    private checkIfMaxDaysAreSelected(selectedOption?: number) {
        const maxExtensionDays = this.contractEligibility.availableExtensionDates.slice(-1)[0].numberOfDays;
        const minExtensionDays = this.contractEligibility.availableExtensionDates[0].numberOfDays;
        this.isMaxExtensionDaysSelected = maxExtensionDays === minExtensionDays ? true : selectedOption === maxExtensionDays;
    }

    private getSnapshotParam = (route: ActivatedRoute, param: string) =>
        route.snapshot ? route.snapshot.queryParams[param] : null

    private getCancelDestinationUrl = (cancelDestinationUrl: string): string => cancelDestinationUrl || '/bills';

    private createRouteParamsModel = (route: ActivatedRoute, routeParams: Params): PaymentAssistanceExtensionApplicationRouteParamsModel => ({
        accountNumber: routeParams.contractAccountNumber,
        contractNumber: routeParams.contractNumber,
        cancelDestinationUrl: this.getSnapshotParam(route, 'cancelDestinationUrl')
    })

}
