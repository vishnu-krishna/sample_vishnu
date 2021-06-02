import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';

import { PaymentAssistancePlanOptionsTotalModel } from '../optionsTotal';
import { MauiFuelChipState, MauiFuelChipFuelContext } from '../../../../../maui/fuelChip';
import { InstalmentOption, IInstalmentPlanOptionsService, FrequencyOption, DateOption } from '../../../../../services/paymentScheme/instalmentPlanOptions.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FuelChipService } from '../../services';
import { FuelChipDataModel } from '../../models';
import { IAccountServiceMA, AccountViewModel } from '../../../../../services/account.service';
import { PaymentAssistancePlanOptionsFrequencyModel, DateRangeGenerator } from '../optionsFrequency';
import {
    InstalmentPlanFrequency,
    GetPaymentArrangementInstalmentPlanOptionsParams,
    InstalmentPlanParameters
} from '../../../../../services/paymentScheme/paymentSchemeApi.service';
import { Now } from '../../../../../../shared/service/now.service';
import cloneDeep from 'lodash-es/cloneDeep';
import { DateHelper } from '../../../../../../shared/utils/dateHelper';
import { FlashMessageType } from '../../../../../maui/flashMessage';
import { GenericStateService } from '../../../../../services/generics/genericState.service';
import { IInstalmentPlanSummaryService } from '../../../../../services/paymentScheme/instalmentPlanSummary.service';
import { PaymentAssistancePlanOptionsStateModel, PaymentAssistancePlanOptionsRouteParamsModel } from '../options/models';
import { PaymentAssistancePlanCustomAmountModel } from './customAmount';
import { PaymentAssistancePlanOptionsHelperService } from '../options/services';
import { DataLayerService } from '../../../../../../shared/service/dataLayer.service';

@Component({
    selector: 'agl-payment-assistance-plan-suggestions',
    templateUrl: './paymentAssistancePlanCustom.component.html',
    styleUrls: ['./paymentAssistancePlanCustom.component.scss']
})
export class PaymentAssistancePlanCustomComponent implements OnInit, OnDestroy {

    public optionsTotalModel: PaymentAssistancePlanOptionsTotalModel;
    public optionsFrequencyModel: PaymentAssistancePlanOptionsFrequencyModel;
    public routeParamsModel: PaymentAssistancePlanOptionsRouteParamsModel;
    public customAmountModel: PaymentAssistancePlanCustomAmountModel;
    public initialInstalmentOptions: InstalmentOption[];

    public subheading: string;
    public fuelChip: FuelChipDataModel;

    public mauiFuelChipState = MauiFuelChipState;
    public mauiFuelChipFuelContext = MauiFuelChipFuelContext;
    public flashMessageType = FlashMessageType;

    public showLoader = true;
    public showInstalmentsError = false;
    public continueButtonLoading = false;
    public continueButtonEnabled = false;

    private dateRangeGenerator: DateRangeGenerator;
    private customInstalmentPlanValue = 99999;
    private maxSuggestionsToShow = 3;

    private subscriptions: Subscription[] = [];
    private previousOptionsFrequencyModel: PaymentAssistancePlanOptionsFrequencyModel;
    private instalmentOptions: InstalmentOption[];

    constructor(
        private now: Now,
        private router: Router,
        private route: ActivatedRoute,
        private accountService: IAccountServiceMA,
        private fuelChipService: FuelChipService,
        private instalmentPlanOptionsService: IInstalmentPlanOptionsService,
        private instalmentPlanSummaryService: IInstalmentPlanSummaryService,
        @Inject('paymentAssistancePlanOptionsStateService') private paymentAssistancePlanOptionsStateService: GenericStateService<PaymentAssistancePlanOptionsStateModel>,
        private helper: PaymentAssistancePlanOptionsHelperService,
        private dataLayerService: DataLayerService
    ) {
        this.dateRangeGenerator = new DateRangeGenerator(now);
    }

    ngOnInit(): void {
        const optionsState = this.paymentAssistancePlanOptionsStateService.getState();
        this.subscriptions.push(this.route.params.subscribe((routeParams) => {

            // Extract route parameters
            this.routeParamsModel = this.helper.createRouteParamsModel(this.route, routeParams);

            this.subscriptions.push(
                Observable
                    .forkJoin(
                        this.fuelChipService.init(),
                        this.accountService.getAccounts(),
                        this.instalmentPlanOptionsService.getInstalmentOptions(this.routeParamsModel.contractNumber, {
                            suggestInstalments: true
                        })
                    )
                    .finally(() => (this.showLoader = false))
                    .subscribe(([classifiedFuelChips, accounts, instalmentOptions]) => {
                        this.createModels(accounts, instalmentOptions, optionsState);
                    },
                        (error) => {
                            this.showInstalmentsError = true;
                            this.dataLayerService.pushPaymentAssistanceErrorEvent('instalmentPlanOptionsService.getInstalmentOptions', location.pathname, location.href);
                        }

                    )
            );

        }));
    }

    public ngOnDestroy() {
        this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    }

    public onContinueButtonClicked = (): void => {
        const accountNumber = this.routeParamsModel.accountNumber;
        const contractNumber = this.routeParamsModel.contractNumber;
        const frequency = this.optionsFrequencyModel.selectedFrequencyOption.value;
        const startDate = this.helper.getSelectedDateOptionDate(this.optionsFrequencyModel.dateOptions);

        this.showInstalmentsError = false;

        this.continueButtonLoading = true;
        const instalmentAmount = this.customAmountModel.amount;
        const instalmentPlanParameters: InstalmentPlanParameters = this.helper.createInstalmentPlanParameters(
            this.routeParamsModel, frequency, instalmentAmount, startDate);

        this.instalmentPlanSummaryService.initInstalmentPlanSummary(instalmentPlanParameters)
            .finally(() => this.continueButtonLoading = false)
            .subscribe((res) => {
                this.navigateToConfirmScreen(startDate, accountNumber, contractNumber, frequency, instalmentAmount);
            },
                (error) => {
                    this.showInstalmentsError = true;
                    this.dataLayerService.pushPaymentAssistanceErrorEvent('instalmentPlanSummaryService.initInstalmentPlanSummary', location.pathname, location.href);
                }
            );
    }

    public onCancelClicked = (): void => {
        const cancelDestinationUrl = this.helper.getCancelDestinationUrl(this.routeParamsModel.cancelDestinationUrl);
        this.router.navigate([cancelDestinationUrl]);
    }

    public onFrequencyOptionChanged = (frequencyOption: FrequencyOption, contractNumber: string): void => {
        this.continueButtonEnabled = false;
        this.updateModels(this.initialInstalmentOptions, frequencyOption, null);
    }

    public onDateOptionChanged = (dateAsString: string, contractNumber: string): void => {
        this.customAmountModel.disabled = true;
        this.continueButtonEnabled = false;
        this.subscriptions.push(
            this.reloadInstalmentOptions(dateAsString, this.optionsFrequencyModel.selectedFrequencyOption, contractNumber)
                .finally(() => this.customAmountModel.disabled = false)
                .subscribe((instalmentOptions) => {
                    this.updateModels(instalmentOptions, this.optionsFrequencyModel.selectedFrequencyOption, dateAsString);
                    this.updatePreviousOptionsFrequencyModel();
                },
                    (error) => {
                        this.resetOptionsFrequencyModelToPreviousVersion();
                        this.optionsFrequencyModel.dateOptionsHasError = true;
                        this.dataLayerService.pushPaymentAssistanceErrorEvent('reloadInstalmentOptions', location.pathname, location.href);
                    }
                )
        );
    }

    public backClicked = () => window.history.back();

    public onCustomAmountFormValid = ({ isFormValid, amount }): void => {
        this.continueButtonEnabled = isFormValid;
        this.customAmountModel.amount = amount;
    }

    public onCustomAmountKeyUpEnter = (): void => {
        this.onContinueButtonClicked();
    }

    private createModels = (accounts: AccountViewModel[], instalmentOptions: InstalmentOption[], optionsState: PaymentAssistancePlanOptionsStateModel): void => {
        this.instalmentOptions = instalmentOptions;
        this.initialInstalmentOptions = instalmentOptions;
        this.fuelChip = this.fuelChipService.getFuelChip(this.routeParamsModel.accountNumber, this.routeParamsModel.contractNumber);
        this.subheading = this.helper.getSubheading(instalmentOptions);

        const contract = this.helper.getContract(accounts, this.fuelChip.accountNumber, this.fuelChip.contractNumber);
        const currentBillEndDate = contract.currentBillEndDate;
        this.optionsTotalModel = this.helper.createOptionsTotalModel(this.fuelChip, contract);
        this.optionsFrequencyModel = this.helper.createOptionsFrequencyModel(this.dateRangeGenerator, instalmentOptions, optionsState);
        this.updatePreviousOptionsFrequencyModel();
        this.customAmountModel = this.helper.createCustomAmountModel(instalmentOptions, optionsState, this.optionsFrequencyModel.selectedFrequencyOption, currentBillEndDate);
    }

    private updateCustomAmountModel = (frequencyOption: FrequencyOption, instalmentOptions: InstalmentOption[]): void => {
        const instalmentMinAmount = this.helper.getInstalmentMinAmount(instalmentOptions, frequencyOption);
        const instalmentMaxAmount = this.helper.getInstalmentMaxAmount(instalmentOptions, frequencyOption);
        const placeholder = this.helper.formatInstalmentAmountPlaceholder(instalmentMinAmount);

        Object.assign(this.customAmountModel, {
            frequency: frequencyOption.value,
            amountInput: '',
            placeholder: placeholder,
            instalmentMinAmount: instalmentMinAmount,
            instalmentMaxAmount: instalmentMaxAmount,
            toValidate: true,
            disabled: false
        });
    }

    private navigateToConfirmScreen = (startDate: Date, accountNumber: string, contractNumber: string, frequency: string, instalmentAmount: number): void => {
        const formattedSelectedDate: string = DateHelper.toIsoDateString(moment(startDate));
        this.router.navigate([`/bills/paymentassistance/plan/confirm/custom/${accountNumber}/${contractNumber}/${frequency.toLowerCase()}/${formattedSelectedDate}/${instalmentAmount}`], { queryParamsHandling: 'preserve' });
    }

    private updateModels = (instalmentOptions: InstalmentOption[], frequencyOption: FrequencyOption, startDateAsString: string): void => {
        this.instalmentOptions = instalmentOptions;
        this.updateOptionsFrequencyModel(frequencyOption, instalmentOptions, startDateAsString);
        this.updateCustomAmountModel(frequencyOption, instalmentOptions);
    }

    private updateOptionsFrequencyModel = (frequencyOption: FrequencyOption, instalmentOptions: InstalmentOption[], startDateAsString: string): PaymentAssistancePlanOptionsFrequencyModel => {
        const dateOptions = this.helper.getDateOptions(this.dateRangeGenerator, instalmentOptions, frequencyOption);

        if (startDateAsString) {
            this.helper.updateDateOptions(dateOptions, startDateAsString);
        }

        return this.optionsFrequencyModel = {
            ...this.optionsFrequencyModel,
            selectedFrequencyOption: frequencyOption,
            dateOptions: dateOptions,
            dateOptionsHasError: false
        };
    }

    public reloadInstalmentOptions = (dateAsString: string, frequencyOption: FrequencyOption, contractNumber: string): Observable<InstalmentOption[]> =>
        Observable.create((observer) => {
            const params: GetPaymentArrangementInstalmentPlanOptionsParams = this.helper.createInstalmentPlanOptionsParams(dateAsString, frequencyOption);

            this.optionsFrequencyModel.dateOptionsDisabled = true;
            this.subscriptions.push(this.instalmentPlanOptionsService.getInstalmentOptions(contractNumber, params)
                .finally(() => {
                    this.optionsFrequencyModel.dateOptionsDisabled = false;
                    observer.complete();
                })
                .subscribe((instalmentOptions: InstalmentOption[]) => {
                    observer.next(instalmentOptions);
                },
                    (error) => {
                        observer.error(error);
                    }));
        })

    private resetOptionsFrequencyModelToPreviousVersion = () =>
        this.optionsFrequencyModel = cloneDeep(this.previousOptionsFrequencyModel)

    private updatePreviousOptionsFrequencyModel = () =>
        this.previousOptionsFrequencyModel = cloneDeep(this.optionsFrequencyModel)
}
