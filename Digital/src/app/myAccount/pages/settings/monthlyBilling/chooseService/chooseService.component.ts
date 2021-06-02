import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import sortBy from 'lodash-es/sortBy';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';

import { MonthlyBillingRoutes, MonthlyBillingEntryPointRoutes } from '../monthlyBillingRoutes.const';
import { CancelMonthlyBillingResponse } from '../../../../services/settings/model/cancelMonthlyBillingResponse';
import { ApiService, BillHistoryApiModel, ContactDetailModel } from '../../../../../shared/service/api.service';
import { BillDateOption } from '../../../../services/settings/model/billDateOption';
import { AglValidators } from '../../../../../shared/validators/aglValidators';
import { FlashMessageType } from '../../../../maui/flashMessage/index';
import { MauiFuelChipFuelContext, MauiFuelChipFuelType, MauiFuelChipState } from '../../../../maui/fuelChip/fuelChip.component.enum';
import { FuelChipContract, FuelChipContractAccountDetails, PrimaryMessageLink } from '../../../../maui/fuelChip/index';
import { ContractViewModel } from '../../../../services/account.service';
import { MonthlyBillingSapCode, MonthlyBillingService } from '../../../../services/monthlyBilling.service';
import { BillingFrequencyType } from '../../../../services/settings/model/billingFrequencyType';
import { ContractMonthlyBillingModel } from '../../../../services/settings/model/contractMonthlyBillingModel';
import { BillApiModel } from './../../../../../shared/service/api.service';
import { DataLayerService } from '../../../../../shared/service/dataLayer.service';

/* tslint:disable:no-access-missing-member */
declare let leanengage: any;
declare let lpTag;

@Component({
    selector: 'agl-monthly-billing-choose-service',
    templateUrl: './chooseService.component.html',
    styleUrls: [ './chooseService.component.scss' ]
})
export class MonthlyBillingChooseServiceComponent implements OnInit, OnDestroy {
    public MauiFuelChipState = MauiFuelChipState;
    public MauiFuelChipFuelType = MauiFuelChipFuelType;
    public MauiFuelChipFuelContext = MauiFuelChipFuelContext;
    public isLoading: boolean = false;
    public loadingFailed: boolean = false;
    public nonMonthlyBillingContractList: ContractMonthlyBillingModel[] = [];
    public monthlyBillingContractList: ContractMonthlyBillingModel[] = [];
    public contractListSetupIneligible: ContractMonthlyBillingModel[] = [];
    public isInMonthlyBilling: boolean = false;
    public changeButton: PrimaryMessageLink = new PrimaryMessageLink('key', 'Change');
    public monthlyBillingDatePicker: string = '/settings/monthlybilling/date';
    /** @description Has a contract which is setup for monthly billing.
     */
    public hasMonthlyBillingContract: boolean = false;
    /** @description Has a contract which is eligible to bet setup for monthly billing, but has not yet been setup for monthly billing.
     */
    public hasNonMonthlyBillingContract: boolean = false;
    /** @description Has a contract which is ineligible to be setup for monthly billing.
     */
    public hasSetupIneligibleContract: boolean = false;
    public FlashMessageType: typeof FlashMessageType = FlashMessageType; // This is to make enum visible in the html
    public cancelFlashMessage: string;
    public billsResult: BillHistoryApiModel[] = [];
    public billsApiBeingCalled: boolean = false;
    public tertiaryMessage: string = '';
    public apiError: boolean = false;
    public contractNumberClicked: string = '';
    public hasCalledBillsApi: boolean;

    constructor(
        private apiService: ApiService,
        public router: Router,
        public monthlyBillingService: MonthlyBillingService,
        private dataLayerService: DataLayerService,
    ) {
    }

    public ngOnInit() {
        this.splitContractList(this.monthlyBillingService.selectedMonthlyBillingAccount.contractMonthlyBillingModels);
    }

    public ngOnDestroy() {
         // Clearing the values which are relevant for this screen only when navigating away
        this.monthlyBillingService.dateModifiedContractNumber = '';
        this.monthlyBillingService.cancelledContractNumber = '';
    }

    public getMauiFuelChipFuelType(contract: ContractViewModel): MauiFuelChipFuelType  {
        if (contract.isElectricity)   {
            return MauiFuelChipFuelType.Electricity;
        } else if (contract.isGas) {
            return MauiFuelChipFuelType.Gas;
        }
    }

    public getMauiFuelChipFuelChipState(monthlyBillingContractDetails: ContractMonthlyBillingModel): MauiFuelChipState  {
        if (monthlyBillingContractDetails.setup && monthlyBillingContractDetails.setup.isEligible === true)   {
            return MauiFuelChipState.PreSetup;
        } else {
            return MauiFuelChipState.Ineligible;
        }
    }

    public getFuelChipMessage(monthlyBillingContractDetails: ContractMonthlyBillingModel ): string {
        let message: string = `Your account is billed `;
        if (monthlyBillingContractDetails.frequency === BillingFrequencyType.FlexibleMonthly) {
            if (!monthlyBillingContractDetails.preferredDayOfMonth) {
                return '';
            }
            if (isNaN(Number(monthlyBillingContractDetails.preferredDayOfMonth))) {
                return '';
            }
            let dayString = this.monthlyBillingService.getOrdinal(monthlyBillingContractDetails.preferredDayOfMonth);
            message = `Your bill is issued on the ${dayString} of every month`;
        } else {
            message = message + this.getNonMonthlyBillingText(monthlyBillingContractDetails.frequency);
        }
        return message;
    }

    public getNonMonthlyBillingText(billingFrequency: BillingFrequencyType ) {
        if (billingFrequency === BillingFrequencyType.Monthly) {
            return 'monthly';
        } else if (billingFrequency === BillingFrequencyType.BiMonthly) {
            return  'every two months';
        } else if (billingFrequency === BillingFrequencyType.Quarterly) {
            return  'quarterly';
        }
    }

    public contractClicked(contractDetails: ContractMonthlyBillingModel) {
        this.showShadow(true);
        this.apiError = false;
        this.contractNumberClicked = null;
        this.monthlyBillingService.selectedMonthlyBillingContract = contractDetails;
        Observable.forkJoin(
            this.monthlyBillingService.getBillDateOptions(contractDetails.contract.contractNumber),
            this.apiService.getContactDetail()
        ).finally(() => {
            this.showShadow(false);
        }).subscribe(([billDateOptionList, contactDetails]) => {
            this.monthlyBillingService.billDateOptionList = billDateOptionList;
            this.monthlyBillingService.hasValidMobileNumber(contactDetails);
            this.router.navigate([MonthlyBillingRoutes.DatePicker]);
        },
        (err) => {
            console.error('ERROR: monthlyBillingService.getBillDateOptions()', err);
            this.apiError = true;
            this.contractNumberClicked = contractDetails.contract.contractNumber;
        });

    }

    public cancelMonthlyBilling(contractDetails: ContractMonthlyBillingModel ) {

        this.dataLayerService.pushSingleEvents({
            monthly_billing_cancel: 'true',
        });

        if (!!contractDetails && !!contractDetails.contract && !!contractDetails.contract.contractNumber) {
            this.showShadow(true);
            this.monthlyBillingService.cancelledContractNumber = contractDetails.contract.contractNumber;
            this.monthlyBillingService.cancelMonthlyBilling(contractDetails.contract.contractNumber)
            .finally(() => {
                this.showShadow(false);
            })
            .subscribe((cancelResult: CancelMonthlyBillingResponse ) => {
                this.apiError = false;

                this.monthlyBillingService.selectedMonthlyBillingAccount.contractMonthlyBillingModels.map((contractItem) => {
                    if (contractItem.contract.contractNumber === this.monthlyBillingService.cancelledContractNumber) {
                        contractItem.frequency = cancelResult.frequency;
                    }
                });
                this.splitContractList(this.monthlyBillingService.selectedMonthlyBillingAccount.contractMonthlyBillingModels);
                this.cancelFlashMessage = `You might receive one more monthly bill before you’re switched to ${this.getNonMonthlyBillingText(cancelResult.frequency)} billing. It can also take up to 24 hours for this to reflect in My Account and the App.`;
            },
            (err) => {
                this.apiError = true;
                this.contractNumberClicked = contractDetails.contract.contractNumber;
                this.dataLayerService.pushSingleEvents({
                    monthly_billing_cancel: 'false',
                });
            });
        }
    }

    public CreateFuelChipContractAccountDetails(): FuelChipContractAccountDetails[] {
        let fuelChipContract: FuelChipContract;
        let fuelChipContractList: FuelChipContract[] = [];
        let fuelChipContractAccountDetails: FuelChipContractAccountDetails[] = [];
        this.monthlyBillingService.selectedMonthlyBillingAccount.contractMonthlyBillingModels.map((monthlyBillingContractDetails) => {
            fuelChipContract = new FuelChipContract(monthlyBillingContractDetails.contract.contractNumber, monthlyBillingContractDetails.contract.address, this.getMauiFuelChipFuelType(monthlyBillingContractDetails.contract),  '');
            fuelChipContractList.push(fuelChipContract);
        });
        fuelChipContractAccountDetails = [new FuelChipContractAccountDetails( this.monthlyBillingService.selectedMonthlyBillingAccount.accountNumber, fuelChipContractList)];

        return fuelChipContractAccountDetails;
    }

    public getIneligibleMessages(contractMBM: ContractMonthlyBillingModel) {
        if (contractMBM && contractMBM.setup && contractMBM.setup.reason && contractMBM.setup.reason.internal && contractMBM.setup.reason.internal.number && contractMBM.setup.reason.internal.number === String(MonthlyBillingSapCode.prepaidNotBeforeStartDate)) {
            if (contractMBM && contractMBM.contract && contractMBM.contract.contractNumber) {
                if (this.hasCalledBillsApi) { // Cached result to prevent calling Bills API more than once.
                    return this.createPrepaidSwapFuelchipMessages(contractMBM);
                } else { // Bills API has not been called yet.
                    if (!this.billsApiBeingCalled) {
                        this.billsApiBeingCalled = true;
                        this.apiService.getBills()
                        .finally(() => {
                            this.billsApiBeingCalled = false;
                            this.hasCalledBillsApi = true;
                        })
                        .subscribe((bills) => {
                            this.billsResult = bills;
                            return this.createPrepaidSwapFuelchipMessages(contractMBM);
                        });
                    }
                }
            }
        } else {
            let messageObj = {
                primary: this.getFuelChipMessage(contractMBM),
                tertiary: contractMBM.setup.reason.friendlyMessage
            };
            return messageObj;
        }
    }

    public createPrepaidSwapFuelchipMessages(contractMBM: ContractMonthlyBillingModel): any {
        let messageObj = {};
        let latestBill: BillApiModel;
        let tertiary: string;
        let bills = this.billsResult.find((billResult) => billResult.contract === contractMBM.contract.contractNumber);
        if (bills && bills.bills && bills.bills[0]) {
            latestBill = bills.bills[0];
            let billIssued: Date = latestBill.billIssued;
            let date = moment(billIssued);
            tertiary = `You’ve recently changed this energy plan. You’ll only be able to change your monthly billing date for this plan once you’ve received your final bill for your previous plan on ${date.format('D MMM YYYY')}.`;
        } else {
            tertiary = `You’ve recently changed this energy plan. You’ll only be able to change your monthly billing date for this plan once you’ve received your final bill for your previous plan.`;
        }
        messageObj = {
            primary: `Your account is billed monthly`,
            tertiary: tertiary
        };
        return messageObj;
    }

    public onDismissApiError(): void {
        this.apiError = false;
    }

    public showShadow(value): void {
        this.isLoading = value;
        if (this.isLoading === true) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'scroll';
        }
    }

    public get ineligibleSectionHeading() {
        return `Monthly billing is not available for ${( this.contractListSetupIneligible.length > 1 ? 'these accounts' : 'this account' )}`;
    }

    public get notSetupSectionHeader() {
        return `Would you like to switch your below account${(this.nonMonthlyBillingContractList.length > 1 ? 's' : '')} to monthly billing?`;
    }

    private splitContractList(contractMonthlyBillingModels: ContractMonthlyBillingModel[]): void {

        this.monthlyBillingContractList = this.sortContractList(contractMonthlyBillingModels.filter((contractMBM) => {
            return contractMBM.frequency === BillingFrequencyType.FlexibleMonthly && contractMBM.setup.isEligible;
        }));
        this.nonMonthlyBillingContractList = this.sortContractList(contractMonthlyBillingModels.filter((contractMBM) => {
            return contractMBM.frequency !== BillingFrequencyType.FlexibleMonthly && contractMBM.setup.isEligible;
        }));
        this.contractListSetupIneligible = this.sortContractList(contractMonthlyBillingModels.filter((contractMBM) => {
            return !contractMBM.setup.isEligible;
        }));

        this.hasMonthlyBillingContract = this.monthlyBillingContractList && this.monthlyBillingContractList.length > 0;
        this.hasNonMonthlyBillingContract = this.nonMonthlyBillingContractList && this.nonMonthlyBillingContractList.length > 0;
        this.hasSetupIneligibleContract = this.contractListSetupIneligible && this.contractListSetupIneligible.length > 0;
    }

    private sortContractList(contractMonthlyBillingModels: ContractMonthlyBillingModel[]): ContractMonthlyBillingModel[]  {
        // Sorting the contract list based on the fuel type and for the contracts with same fuel type it is sorted by contract number
        return sortBy(contractMonthlyBillingModels, (billingModel) => [billingModel.contract.fuelType, billingModel.contract.contractNumber]);
    }

}
