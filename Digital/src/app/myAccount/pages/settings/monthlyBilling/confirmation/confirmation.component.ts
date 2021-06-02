/* tslint:disable:no-access-missing-member */
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { MauiFuelChipState, MauiFuelChipFuelType, MauiFuelChipFuelContext, MauiSecondaryMessageStatusType } from '../../../../maui/fuelChip/index';
import { MonthlyBillingService, MonthlyBillingReferrer } from '../../../../services/monthlyBilling.service';
import { ContractMonthlyBillingModel } from '../../../../services/settings/model/contractMonthlyBillingModel';
import { MonthlyBillingGetMonthlyBillingInfoForAccountTestData } from '../../../../../test/testingData/monthlyBilling/monthlyBilling.getMonthlyBillingInfoForAccount.testdata';
import { AccountsTestData } from '../../../../../test/testingData/accounts.testdata';
import { FuelType } from '../../../../services/ssmr.service';
import { AccountViewModel, ContractViewModel } from '../../../../services/account.service';
import { FuelChipContract, FuelChipContractAccountDetails } from '../../../../maui/fuelChip/fuelChip.component.model';
import { AccountMonthlyBillingModel } from '../../../../services/settings/model/accountMonthlyBillingModel';
import { BillingFrequencyType } from '../../../../services/settings/model/billingFrequencyType';
import { TermsAndConditionsMonthlyBillingComponent } from '../chooseDate/monthlyBillingTermsAndConditions/monthlyBillingTermsAndConditions.component';
import { MonthlyBillingRoutes } from '../monthlyBillingRoutes.const';
import { FeatureFlagService } from '../../../../services/featureFlag.service';
import { FeatureFlagTypes } from '../../../../services/featureFlag.constants';
import { ApiService } from '../../../../../shared/service/api.service';
import { AglValidators } from '../../../../../shared/validators/aglValidators';
import { ConfigService } from '../../../../../shared/service/config.service';
import { SurveyService, SurveyType } from '../../../../services/survey.service';

declare let lpTag;

@Component({
    selector: 'agl-monthly-billing-confirmation',
    templateUrl: './confirmation.component.html',
    styleUrls: [ './confirmation.component.scss' ]
})
export class MonthlyBillingConfirmationComponent implements OnInit {
    @ViewChild('termsAndConditons') public termsAndConditions: TermsAndConditionsMonthlyBillingComponent;

    public billDate: string;
    public buttonText: string = 'Close';
    public buttonType: string;
    public contractsNotOnFlexiMonthly: ContractMonthlyBillingModel[];
    public currentAccount: AccountViewModel;
    public fuelChipCurrentAccountDetails: FuelChipContractAccountDetails[];
    public fuelChipContracts: FuelChipContract[] = [];
    public MauiFuelChipState = MauiFuelChipState;
    public MauiFuelChipFuelType = MauiFuelChipFuelType;
    public MauiFuelChipFuelContext = MauiFuelChipFuelContext;
    public MauiSecondaryMessageStatusType = MauiSecondaryMessageStatusType;

    public selectedMonthlyBillingAccount: AccountMonthlyBillingModel;
    public selectedMonthlyBillingContract: ContractMonthlyBillingModel;
    public fuelTypeLowerCase: string;
    public fuelTypeUpperCase: string;
    public isSmartMeter: boolean;
    public basicMeterMessage: string;
    public isContactDetailsEnabled: boolean;
    public ssmrMessage: string;
    public aeoContactDetailsUrl: string;

    constructor(
        public monthlyBillingService: MonthlyBillingService,
        public apiService: ApiService,
        public featureFlagService: FeatureFlagService,
        public router: Router,
        public configService: ConfigService,
        public surveyService: SurveyService,
    ) { }

    public ngOnInit() {

        // Save Monthly Billing Service values to local variables for binding
        this.currentAccount = this.monthlyBillingService.currentAccount;
        this.selectedMonthlyBillingContract = this.monthlyBillingService.selectedMonthlyBillingContract;

        this.selectedMonthlyBillingAccount = this.monthlyBillingService.selectedMonthlyBillingAccount;

        this.fuelTypeUpperCase = this.selectedMonthlyBillingContract.contract.fuelType;
        this.fuelTypeLowerCase = this.selectedMonthlyBillingContract.contract.fuelType.toLowerCase();
        this.isSmartMeter = this.selectedMonthlyBillingContract.contract.isSmartMeter;

        this.billDate = this.monthlyBillingService.getOrdinal(this.selectedMonthlyBillingContract.preferredDayOfMonth);

        this.currentAccount.contracts.map((contract) => {
            let fuelChipContract: FuelChipContract = new FuelChipContract(contract.contractNumber, contract.address, MauiFuelChipFuelType[contract.fuelType], null);
            this.fuelChipContracts.push(fuelChipContract);
        });
        // Setup the fuelChipCurrentAccountDetails
        this.fuelChipCurrentAccountDetails = [
            new FuelChipContractAccountDetails(this.currentAccount.accountNumber, this.fuelChipContracts)
        ];
        this.contractsNotOnFlexiMonthly = this.getContractsNotOnFlexiMonthly();
        this.createButton();
        // AEO link for contact details
        this.aeoContactDetailsUrl = `${this.configService.current.aglSiteCoreWebsiteBaseUrl}/aeo/myaccount/update-details`;
        Observable.forkJoin(
            this.featureFlagService.featureFlagged(FeatureFlagTypes.contactDetailsEnabled),
            this.apiService.getContactDetail()
        ).subscribe(([contactEnabledFeatureFlagResult, contactDetails]) => {
            this.isContactDetailsEnabled = contactEnabledFeatureFlagResult;
            this.monthlyBillingService.hasValidMobileNumber(contactDetails);
        });
    }

    public contractClicked(contractDetails: ContractMonthlyBillingModel) {
        this.monthlyBillingService.selectedMonthlyBillingContract = contractDetails;
        this.router.navigate([MonthlyBillingRoutes.DatePicker]);
    }

    public createButton(): void {
        // one contract. normal flow
        if ((this.monthlyBillingService.monthlyBillingReferrer === MonthlyBillingReferrer.ManageAccount ||
            this.monthlyBillingService.monthlyBillingReferrer === MonthlyBillingReferrer.Billing)
            && !this.contractsNotOnFlexiMonthly.length
        ) {
            this.buttonText = `CLOSE`;
        // deep link
        } else if ( this.monthlyBillingService.monthlyBillingReferrer !== MonthlyBillingReferrer.ManageAccount
                &&  this.monthlyBillingService.monthlyBillingReferrer !== MonthlyBillingReferrer.Billing
        ) {
            this.buttonText = `GO TO OVERVIEW`;
            // multi contract
            if (this.monthlyBillingService.currentAccount.contracts.length > 1) {
                this.buttonType = `secondary`;
            }
        // default condition
        } else {
            this.buttonText = `NO THANKS, I'M DONE`;
        }
    }

    public getContractsNotOnFlexiMonthly(): ContractMonthlyBillingModel[] {
        return this.selectedMonthlyBillingAccount.contractMonthlyBillingModels.filter((contractMBM) => {
            return contractMBM.frequency !== BillingFrequencyType.FlexibleMonthly && contractMBM.setup.isEligible;
        });
    }

    public getFuelChipMessage(contractMonthlyBillingModel: ContractMonthlyBillingModel): string {
        switch (contractMonthlyBillingModel.frequency) {
            case BillingFrequencyType.BiMonthly:
                return 'Your account is billed every two months.';
            case BillingFrequencyType.Monthly:
                return 'Your account is billed monthly.';
            case BillingFrequencyType.Quarterly:
                return 'Your account is billed quarterly.';
            default:
                return '';
        }
    }

    public onClickClose(): void {
        this.showFeedbackSurvey();
        let entryPointUrl = this.monthlyBillingService.getEntryPointUrl();
        this.router.navigate([entryPointUrl]);
    }

    public onClickTermsAndConditions() {
        this.termsAndConditions.showTermsAndConditions();
    }

    public get contractsNotOnFlexiMonthlyMessage() {
        return `Would you like to switch your below account${(this.contractsNotOnFlexiMonthly.length > 1 ? 's' : '')} to monthly billing?`;
    }

    public showFeedbackSurvey() {
        this.surveyService.showFeedbackSurvey(SurveyType.MonthlyBilling);
    }
}
