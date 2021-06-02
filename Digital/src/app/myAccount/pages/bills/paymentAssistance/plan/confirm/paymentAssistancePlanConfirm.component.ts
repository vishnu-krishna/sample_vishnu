import * as moment from 'moment';
import { Subscription, Observable } from 'rxjs';
import capitalize from 'lodash-es/capitalize';

import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { LinkSize } from '../../../../../../shared/component/link';
import { DataLayerService } from '../../../../../../shared/service/dataLayer.service';
import { IInstalmentPlanSummaryService, InstalmentPlanSummaryResults, PaymentArrangementInstalmentSummary } from '../../../../../services/paymentScheme/instalmentPlanSummary.service';
import { InstalmentPlanFrequency, PaymentArrangementInstalmentSummaryItem, IPaymentSchemeApi, InstalmentPlanParameters } from '../../../../../services/paymentScheme/paymentSchemeApi.service';
import { IPaymentExtensionStateService } from '../../extend/services/paymentExtensionState.service';
import { FuelChipData } from '../../extend/eligibility/fuelChipData';
import { PaymentAssistanceTermsAndConditionsComponent } from './termsAndConditions/paymentAssistanceTermsAndConditions.component';
import { PaymentAssistancePlanInstalmentsProgressItem, InstalmentStatus } from '../instalments';
import { FormatDatePipe } from '../../../../../../shared/pipes/formatDate/formatDate.pipe';
import { PaymentAssistancePlanConfirmRouteParamsModel, PaymentAssistancePlanConfirmStateModel } from './models';
import { Now } from '../../../../../../shared/service/now.service';
import { FlashMessageType } from '../../../../../maui/flashMessage';
import { MauiFuelChipFuelContext, MauiFuelChipState } from '../../../../../maui/fuelChip';
import { AccountViewModel, ContractViewModel, IAccountServiceMA } from '../../../../../services/account.service';
import { GenericStateService } from '../../../../../services/generics/genericState.service';
import { FuelChipService } from '../../services';

@Component({
    selector: 'agl-payment-assistance-plan-confirm',
    templateUrl: './paymentAssistancePlanConfirm.component.html',
    styleUrls: ['./paymentAssistancePlanConfirm.component.scss']
})

export class PaymentAssistancePlanConfirmComponent implements OnInit, OnDestroy {
    public MauiFuelChipFuelContext = MauiFuelChipFuelContext;
    @ViewChild('termsAndConditons') public termsAndConditions: PaymentAssistanceTermsAndConditionsComponent;
    public MauiFuelChipState = MauiFuelChipState;
    public showLoader: boolean = true;
    public isLoading: boolean = true;
    public isConfirmButtonLoading: boolean = false;

    public currentBillEndDate: Date;
    public instalments: PaymentArrangementInstalmentSummaryItem[];
    public accounts: AccountViewModel = null;

    public fuelChip: FuelChipData;
    public instalmentsModel: InstalmentsModel;
    public cancelDestinationUrl: string;
    public flashMessageType = FlashMessageType;
    public showInstalmentsError: boolean = false;
    public linkSize: LinkSize;
    public isTermConditionChecked: boolean;

    public routeParams: PaymentAssistancePlanConfirmRouteParamsModel;
    private subscriptions: Subscription[] = [];

    constructor(
        private now: Now,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: IAccountServiceMA,
        private paymentExtensionStateService: IPaymentExtensionStateService,
        private instalmentPlanSummaryService: IInstalmentPlanSummaryService,
        private fuelChipService: FuelChipService,
        private paymentSchemeApi: IPaymentSchemeApi,
        private dataLayerService: DataLayerService,
        @Inject('paymentAssistancePlanConfirmStateService') private paymentAssistancePlanConfirmStateService: GenericStateService<PaymentAssistancePlanConfirmStateModel>) {
    }

    public setCancelLink(url: string) {
        this.cancelDestinationUrl = url || '/bills';
    }

    public ngOnInit() {

        let self = this;

        this.subscriptions.push(
            this.route.params.subscribe((routeParams) => {

                // Extract route parameters for POST call
                this.routeParams = this.getRouteParams(routeParams);

                const instalmentPlanParameters = this.getInstalmentPlanParameters(this.routeParams);
                if (this.route && this.route.snapshot) {
                    this.setCancelLink(this.route.snapshot.queryParams['cancelDestinationUrl']);
                }
                this.subscriptions.push(
                    this.accountService.getAccounts().subscribe((accounts) => {
                        this.currentBillEndDate = this.getCurrentBillEndDate(accounts, instalmentPlanParameters);

                        if (this.paymentExtensionStateService.getSelectedFuelChip()) {
                            const instalmentPlanSummaryResults = this.instalmentPlanSummaryService.getInstalmentSummary();
                            self.instalmentsModel = this.populateInstalmentsModel(instalmentPlanSummaryResults, instalmentPlanParameters);
                            this.showLoader = false;
                        } else {
                            this.subscriptions.push(
                                this.instalmentPlanSummaryService.initInstalmentPlanSummary(instalmentPlanParameters)
                                    .finally(() => this.showLoader = false)
                                    .subscribe((instalmentPlanSummaryResults: InstalmentPlanSummaryResults) => {
                                        this.instalmentsModel = this.populateInstalmentsModel(instalmentPlanSummaryResults, instalmentPlanParameters);
                                    })
                            );
                        }

                    })
                );
            })
        );
    }

    public termsAndConditionChecked(checked: boolean): void {
        this.isTermConditionChecked = checked;
    }

    public onClickTermsAndConditions(): void {
        this.termsAndConditions.showTermsAndConditions();
    }

    public confirmClicked() {
        this.showInstalmentsError = false;
        this.isConfirmButtonLoading = true;
        const totalAmountDue = this.instalmentsModel.fuelChip.eligibility.totalAmountDue;

        const instalmentPlanParameters: InstalmentPlanParameters = {
            accountNumber: this.routeParams.contractAccountNumber,
            contractNumber: this.routeParams.contractNumber,
            frequency: this.routeParams.frequency,
            instalmentAmount: this.routeParams.instalmentAmount,
            startDate: this.routeParams.startDate,
            firstInstalmentDue: null, // Not used
            selectedNumberOfInstalments: this.routeParams.selectedNumberOfInstalments
        };

        this.paymentSchemeApi.submitPaymentArrangementInstalmentPlan(instalmentPlanParameters)
            .subscribe((paymentArrangementInstalmentSummary) => {
                this.dataLayerService.pushPaymentAssistancePlanSetupEvent(instalmentPlanParameters, location.href, location.pathname);
                this.setStateAndNavigateToSuccessPage(paymentArrangementInstalmentSummary, this.routeParams, totalAmountDue);
            },
            (error) => {
                this.showInstalmentsError = true;
                this.isConfirmButtonLoading = false;
                this.dataLayerService.pushPaymentAssistanceErrorEvent('paymentSchemeApi.submitPaymentArrangementInstalmentPlan', location.pathname, location.href);
            });
    }

    public backClicked = () => window.history.back();

    public cancelClicked() {
        this.router.navigate([this.cancelDestinationUrl]);
    }

    public ngOnDestroy() {
        // Clean up subscriptions - we don't want these to persist after the page is destroyed
        for (const subscription of this.subscriptions) {
            subscription.unsubscribe();
        }
    }
    public getInstalmentPlanParameters(routeParams: PaymentAssistancePlanConfirmRouteParamsModel): InstalmentPlanParameters {
        let instalmentPlanRouteParameters: InstalmentPlanParameters = new InstalmentPlanParameters();
        instalmentPlanRouteParameters.accountNumber = routeParams.contractAccountNumber;
        instalmentPlanRouteParameters.contractNumber = routeParams.contractNumber;
        instalmentPlanRouteParameters.frequency = routeParams.frequency;
        instalmentPlanRouteParameters.instalmentAmount = Number(routeParams.instalmentAmount);
        instalmentPlanRouteParameters.startDate = new Date(routeParams.startDate);
        instalmentPlanRouteParameters.firstInstalmentDue = moment(routeParams.startDate).format('DD MMM YYYY');
        return instalmentPlanRouteParameters;
    }

    public populateInstalmentsModel(instalmentPlanSummaryResults: InstalmentPlanSummaryResults, instalmentPlanParameters: InstalmentPlanParameters): InstalmentsModel {
        const instalmentsModel: InstalmentsModel = new InstalmentsModel();
        let progressItems: PaymentAssistancePlanInstalmentsProgressItem[];
        let index = 0;
        instalmentsModel.progressItems = instalmentPlanSummaryResults.instalmentPlans.instalments.map(
            (instalment) =>
            new PaymentAssistancePlanInstalmentsProgressItem(instalment.instalmentAmount, new Date(instalment.instalmentDate), (index++ === 0 ? InstalmentStatus.Due : InstalmentStatus.Upcoming))
        );

        instalmentsModel.fuelChip = instalmentPlanSummaryResults.fuelChipData;
        instalmentsModel.totalDue = String(instalmentsModel.fuelChip.eligibility.totalAmountDue);
        instalmentsModel.startDate = new Date(instalmentPlanParameters.startDate);
        instalmentsModel.frequency = instalmentPlanParameters.frequency;
        instalmentsModel.firstStartDate = new Date(instalmentPlanSummaryResults.instalmentPlans.instalments[0].instalmentDate);
        instalmentsModel.instalmentsDueCopy = instalmentsModel.startDate ? this.formatInstalmentsDue(instalmentsModel.frequency, instalmentsModel.startDate) : '';
        instalmentsModel.currentBillEndDateFormatted = this.formatCurrentBillEndDate(this.currentBillEndDate);
        instalmentsModel.isFirstStartDateToday = this.isDateToday(instalmentsModel.firstStartDate);
        return instalmentsModel;
    }

    public getCurrentBillEndDate(accounts: AccountViewModel[], instalmentPlanParameters: InstalmentPlanParameters): Date {
        const contract = this.getContract(accounts, instalmentPlanParameters.accountNumber, instalmentPlanParameters.contractNumber);
        return contract ? contract.currentBillEndDate : null;
    }

    public getRouteParams = (routeParams: Params) => {
        return {
            contractAccountNumber: routeParams.contractAccountNumber,
            contractNumber: routeParams.contractNumber,
            frequency: routeParams.frequency,
            instalmentAmount: Number(routeParams.instalmentAmount),
            startDate: new Date(routeParams.startDate),
            selectedNumberOfInstalments: routeParams.selectedNumberOfInstalments
        };
    }

    private setStateAndNavigateToSuccessPage(
        paymentArrangementInstalmentSummary: PaymentArrangementInstalmentSummary,
        routeParams: PaymentAssistancePlanConfirmRouteParamsModel,
        totalAmountDue: number ) {

        const state: PaymentAssistancePlanConfirmStateModel = {
            accountNumber: routeParams.contractAccountNumber,
            contractNumber: routeParams.contractNumber,
            frequency: routeParams.frequency,
            totalDue: totalAmountDue,
            startDate: routeParams.startDate,
            paymentArrangementInstalmentSummary: paymentArrangementInstalmentSummary
        };
        this.paymentAssistancePlanConfirmStateService.setState(state);

        Observable.onErrorResumeNext(this.accountService.refreshAccounts())
            .finally(() => {
                this.isConfirmButtonLoading = false;
                const flowType = location.href.includes('/custom/') ? 'custom' : 'options';
                this.router.navigate(
                    [`/bills/paymentassistance/plan/confirm/success/${flowType}/${routeParams.contractAccountNumber}/${routeParams.contractNumber}`],
                    { queryParamsHandling: 'preserve' }
                );
            })
            .subscribe();
    }

    public onTermAccepted(): void {
        this.isTermConditionChecked = true;
    }

    public formatInstalmentsDue = (frequency: InstalmentPlanFrequency, startDate: Date): string => {

        if (frequency === InstalmentPlanFrequency.Monthly) {
            const day = moment(startDate).format('Do');
            return `Monthly on the ${day}`;
        } else {
            const sentenceCaseFrequency: string = capitalize(frequency.toString());
            const frequencyValue = InstalmentPlanFrequency[sentenceCaseFrequency];
            const dayOfWeek = moment(startDate).format('dddd');
            return `${frequencyValue} on ${dayOfWeek}s`;
        }
    }

    public formatCurrentBillEndDate = (date: Date): string => {
        const today = this.now.date();
        const yesterday = moment(today).add(-1, 'days');
        const todayPlus150Days = moment(today).add(150, 'days');

        const nextBillDate = moment(date).startOf('day');

        const isToday = nextBillDate.isSame(today);
        const isYesterday = nextBillDate.isSame(yesterday);
        const isBetweenTodayPlus1AndTodayPlus150Days = nextBillDate.isBetween(today, todayPlus150Days, 'days', '(]');
        const isBlank = nextBillDate === null;
        const isGreaterThanTodayPlus150Days = nextBillDate.isAfter(todayPlus150Days);

        let payContextText = '';

        if (isYesterday || isToday || isBetweenTodayPlus1AndTodayPlus150Days) {
            payContextText = ` before your next bill is issued on ${moment(nextBillDate).add(1, 'day').format('DD MMM YYYY')}`;
        }

        if (isGreaterThanTodayPlus150Days) {
            payContextText = ' before your next bill is issued';
        }

        return `Don't stress. If you aren't confident that you can pay${payContextText}, there are still other options available.`;
    }

    private getContract = (accounts: AccountViewModel[], accountNumber, contractNumber): ContractViewModel => {
        const account = accounts.find((a) => a.accountNumber === accountNumber);
        if (account) {
            return account.contracts.find((contract) => contract.contractNumber === contractNumber);
        }
        return null;
    }

    private isDateToday = (date: Date): boolean => {
        return date ? moment(date).isSame(this.now.date(), 'day') : true;
    }

}

export class InstalmentsModel {
    progressItems: PaymentAssistancePlanInstalmentsProgressItem[];
    fuelChip: FuelChipData;
    totalDue: string;
    frequency: InstalmentPlanFrequency;
    startDate: Date;
    firstStartDate: Date;
    instalmentsDueCopy: string;
    currentBillEndDateFormatted: string;
    isFirstStartDateToday: boolean;
}
