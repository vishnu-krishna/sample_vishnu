import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessageType } from '../../../../maui/flashMessage/index';
import { MonthlyBillingService } from '../../../../services/monthlyBilling.service';
import { BillDateOption } from '../../../../services/settings/model/billDateOption';
import { BillingFrequencyType } from '../../../../services/settings/model/billingFrequencyType';
import { ContractMonthlyBillingModel } from '../../../../services/settings/model/contractMonthlyBillingModel';
import { SetupMonthlyBillingRequest } from '../../../../services/settings/model/setupMonthlyBillingRequest';
import { MonthlyBillingRoutes } from '../monthlyBillingRoutes.const';
import { TermsAndConditionsMonthlyBillingComponent } from './monthlyBillingTermsAndConditions/monthlyBillingTermsAndConditions.component';
import { ContractViewModel } from '../../../../services/account.service';
import { DataLayerService } from '../../../../../shared/service/dataLayer.service';

/* tslint:disable:no-access-missing-member */
declare let leanengage: any;
declare let lpTag;

@Component({
    selector: 'agl-monthly-billing-choose-date',
    templateUrl: './chooseDate.component.html',
    styleUrls: [ './chooseDate.component.scss' ]
})
export class MonthlyBillingChooseDateComponent implements OnInit {
    @ViewChild('termsAndConditons') public termsAndConditions: TermsAndConditionsMonthlyBillingComponent;

    public isLoading: boolean;
    public loadingFailed: boolean = false;
    public isOnMonthlyBilling: boolean = false;
    public heading: string;
    public subHeading: string;
    public selectedMonthlyBillingContract: ContractMonthlyBillingModel;
    public FlashMessageType: typeof FlashMessageType = FlashMessageType; // This is to make enum visible in the html
    public selectedDate: number;
    public isSubmitButtonEnabled: boolean;
    public submitButtonText: string;
    public showSubmitButtonLoader: boolean = false;
    public billDateOptionList: BillDateOption[] = [];
    public selectedBillDate: BillDateOption;
    public apiError: boolean = false;
    public warningMessageForBasicMeter: string;

    private buttonChangeDayText: string = `Change`;
    private buttonSwitchToMonthlyBillingText: string = `Switch to Monthly Billing`;

    constructor(
        public router: Router,
        public monthlyBillingService: MonthlyBillingService,
        private dataLayerService: DataLayerService,
    ) {}

    public ngOnInit() {
        this.selectedMonthlyBillingContract = this.monthlyBillingService.selectedMonthlyBillingContract;
        this.isOnMonthlyBilling = this.selectedMonthlyBillingContract.frequency === BillingFrequencyType.FlexibleMonthly;
        let fuelTypeString: string = this.selectedMonthlyBillingContract.contract.isElectricity ? 'electricity' : this.selectedMonthlyBillingContract.contract.isGas ? 'gas' : '';
        if (this.selectedMonthlyBillingContract
            && this.selectedMonthlyBillingContract.contract
            && !this.selectedMonthlyBillingContract.contract.isSmartMeter) {
            this.createWarningMessageForBasicMeter(this.selectedMonthlyBillingContract.contract);
        }
        if (this.isOnMonthlyBilling) {
            this.selectedDate = this.selectedMonthlyBillingContract.preferredDayOfMonth;
            this.heading = `Change your preferred bill issue date`;
            this.subHeading = `Your ${fuelTypeString} bills are issued on the ${this.monthlyBillingService.getOrdinal(this.selectedDate)} of every month`;
            this.submitButtonText = this.buttonChangeDayText;
        } else {
            this.heading = `Choose your preferred bill issue date`;
            this.subHeading = `When would you like us to issue your ${fuelTypeString} bill?`;
            this.submitButtonText = this.buttonSwitchToMonthlyBillingText;
            let today = new Date();
            this.selectedDate = today.getDate();
        }
        this.billDateOptionList = this.monthlyBillingService.billDateOptionList;
        this.getBillDateOptionsForSelectedDate(this.selectedDate);
    }

    public getBillDateOptionsForSelectedDate(selectedDate: number): void {
        if (!selectedDate) {
            return;
        }
        if (isNaN(Number(selectedDate))) {
            return;
        }
        this.selectedBillDate = this.billDateOptionList.find((billDateOption) => billDateOption.dayOfMonth === selectedDate);
    }

    public onSelectDay(selectedDay: number): void {
        this.selectedDate = selectedDay;
        this.getBillDateOptionsForSelectedDate(selectedDay);
        if (this.isOnMonthlyBilling ) {
            if ( this.selectedMonthlyBillingContract.preferredDayOfMonth !== selectedDay) {
                this.isSubmitButtonEnabled = true;
            } else {
                this.isSubmitButtonEnabled = false;
            }
        }
    }

    public termsAndConditionChecked(checked: boolean): void {
        this.isSubmitButtonEnabled = checked;
    }

    public showMonthlyBillingFlashMessage(): boolean {
        return !this.isOnMonthlyBilling || this.monthlyBillingService.selectedMonthlyBillingContract.preferredDayOfMonth !== this.selectedDate;
    }

    public submitMonthlyBilling(): void {

        if (this.submitButtonText === this.buttonChangeDayText) {
            this.dataLayerService.pushSingleEvents({
                monthly_billing_change: 'true',
            });
        }

        this.showSubmitButtonLoader = true;
        this.monthlyBillingService.setupMonthlyBilling(this.selectedMonthlyBillingContract.contract.contractNumber, this.selectedDate)
        .finally(() => {
            this.showSubmitButtonLoader = false;
        })
        .subscribe((submitResult: SetupMonthlyBillingRequest ) => {
            this.apiError = false;
            this.monthlyBillingService.selectedMonthlyBillingContract.preferredDayOfMonth = this.selectedDate;
            this.monthlyBillingService.selectedMonthlyBillingContract.selectedBillDate = this.selectedBillDate;
            this.monthlyBillingService.selectedMonthlyBillingContract.frequency = BillingFrequencyType.FlexibleMonthly;

            this.monthlyBillingService.selectedMonthlyBillingAccount.contractMonthlyBillingModels.map((contractMBM) => {
                if (contractMBM.contract.contractNumber === this.monthlyBillingService.selectedMonthlyBillingContract.contract.contractNumber) {
                    contractMBM.frequency = BillingFrequencyType.FlexibleMonthly;
                }
            });

            if (this.isOnMonthlyBilling) {
                this.monthlyBillingService.dateModifiedContractNumber = this.selectedMonthlyBillingContract.contract.contractNumber;
                this.router.navigate([MonthlyBillingRoutes.ChooseService]);
            } else {
                this.monthlyBillingService.dateModifiedContractNumber = '';
                this.router.navigate([MonthlyBillingRoutes.Confirmation]);
            }
        },
        (err) => {
            console.error('ERROR: monthlyBillingService.setupMonthlyBilling()', err);
            this.apiError = true;
        });
    }

    public onClickTermsAndConditions(): void {
        this.termsAndConditions.showTermsAndConditions();
    }

    public CancelMonthlyBilling(): void {
        // Go to choose service when cancel is clicked in any scenario.
        this.router.navigate([MonthlyBillingRoutes.ChooseService]);
    }

    public onDismissApiError(): void {
        this.apiError = false;
    }

    public createWarningMessageForBasicMeter(contract: ContractViewModel): void {
        if (contract.isElectricity) {
                this.warningMessageForBasicMeter = `Your energy distributor reads your electricity meter every 3 months, so changing to monthly billing means some of your bills may be estimated. You can ensure a more accurate bill by submitting your own meter read each month.`;
                if (!this.isOnMonthlyBilling) {
                    if (this.monthlyBillingService.selectedMonthlyBillingAccount.hasValidMobileNumber) {
                        this.warningMessageForBasicMeter += ` We'll send you an SMS 2 days before your bill is issued to remind you to take a read`;
                    } else {
                        this.warningMessageForBasicMeter += ` Update your contact details to receive an SMS 2 days before your bill is issued to remind you to take a read.`;
                    }
                }
        } else if (contract.isGas) {
                this.warningMessageForBasicMeter = `Your energy distributor reads your gas meter every 2 months, so changing to monthly billing means some of your bills may be estimated. You can ensure a more accurate bill by submitting your own meter read each month.`;
                if (!this.isOnMonthlyBilling) {
                    if (this.monthlyBillingService.selectedMonthlyBillingAccount.hasValidMobileNumber) {
                        this.warningMessageForBasicMeter += ` We'll send you an SMS 2 days before your bill is issued to remind you to take a read.`;
                    } else {
                        this.warningMessageForBasicMeter += ` Update your contact details to receive an SMS 2 days before your bill is issued to remind you to take a read.`;
                    }
                }
            }
    }
}
