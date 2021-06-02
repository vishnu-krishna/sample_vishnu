import { PaymentAssistancePlanOptionsStateModel } from './models/paymentAssistancePlanOptionsStateModel';
import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import * as moment from 'moment';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { PaymentAssistancePlanOptionsTotalModel } from '../optionsTotal';
import { MauiFuelChipFuelType, MauiFuelChipState, MauiFuelChipFuelContext } from '../../../../../maui/fuelChip';
import { InstalmentOption, IInstalmentPlanOptionsService, FrequencyOption, DateOption } from '../../../../../services/paymentScheme/instalmentPlanOptions.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FuelChipService } from '../../services';
import { FuelChipDataModel } from '../../models';
import { IAccountServiceMA, AccountViewModel } from '../../../../../services/account.service';
import { PaymentAssistancePlanOptionsRouteParamsModel } from './models';
import { PaymentAssistancePlanOptionsFrequencyModel, DateRangeGenerator } from '../optionsFrequency';
import {
    InstalmentPlanFrequency,
    GetPaymentArrangementInstalmentPlanOptionsParams,
    InstalmentPlanParameters } from '../../../../../services/paymentScheme/paymentSchemeApi.service';
import { Now } from '../../../../../../shared/service/now.service';
import cloneDeep from 'lodash-es/cloneDeep';
import { DateHelper } from '../../../../../../shared/utils/dateHelper';
import { PaymentAssistancePlanOptionsSuggestionsModel } from './suggestions/models';
import { FlashMessageType } from '../../../../../maui/flashMessage';
import { GenericStateService } from '../../../../../services/generics/genericState.service';
import { IInstalmentPlanSummaryService } from '../../../../../services/paymentScheme/instalmentPlanSummary.service';
import { PaymentAssistancePlanOptionsHelperService } from './services';
import { DataLayerService } from '../../../../../../shared/service/dataLayer.service';

@Component({
    selector: 'agl-payment-assistance-plan-options',
    templateUrl: './paymentAssistancePlanOptions.component.html',
    styleUrls: ['./paymentAssistancePlanOptions.component.scss']
})
export class PaymentAssistancePlanOptionsComponent implements OnInit, OnDestroy {

    public optionsTotalModel: PaymentAssistancePlanOptionsTotalModel;
    public optionsFrequencyModel: PaymentAssistancePlanOptionsFrequencyModel;
    public suggestionsModel: PaymentAssistancePlanOptionsSuggestionsModel;
    public routeParamsModel: PaymentAssistancePlanOptionsRouteParamsModel;
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
    public isSuggestionsLoading = false;

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

        if (this.suggestionsModel.selectedNumberOfInstalments === this.customInstalmentPlanValue) {

            const instalmentMinAmount = this.helper.getSelectedInstalmentOption(this.instalmentOptions, this.optionsFrequencyModel.selectedFrequencyOption).instalmentMinAmount;
            this.paymentAssistancePlanOptionsStateService.setState({
                accountNumber: accountNumber,
                contractNumber: contractNumber,
                frequency: frequency,
                startDate: startDate,
                instalmentMinAmount: instalmentMinAmount
            });

            this.navigateToCustomScreen(accountNumber, contractNumber);

        } else {
            this.continueButtonLoading = true;
            const instalmentAmount = this.helper.getSelectedSuggestionInstalmentAmount(this.suggestionsModel);
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
        this.isSuggestionsLoading = true;
        this.continueButtonEnabled = false;
        this.subscriptions.push(
            this.reloadInstalmentOptions(dateAsString, this.optionsFrequencyModel.selectedFrequencyOption, contractNumber)
                .finally(() => this.isSuggestionsLoading = false)
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

    public onSelectedNumberOfInstalmentsChanged = (selectedNumberOfInstalments: number): void => {
        this.suggestionsModel.selectedNumberOfInstalments = selectedNumberOfInstalments;
        this.continueButtonEnabled = true;
    }

    public backClicked = () => window.history.back();

    private createModels = (accounts: AccountViewModel[], instalmentOptions: InstalmentOption[], optionsState: PaymentAssistancePlanOptionsStateModel): void => {
        this.instalmentOptions = instalmentOptions;
        this.initialInstalmentOptions = instalmentOptions;
        this.fuelChip = this.fuelChipService.getFuelChip(this.routeParamsModel.accountNumber, this.routeParamsModel.contractNumber);
        this.subheading = this.helper.getSubheading(instalmentOptions);

        const contract = this.helper.getContract(accounts, this.fuelChip.accountNumber, this.fuelChip.contractNumber);

        this.optionsTotalModel = this.helper.createOptionsTotalModel(this.fuelChip, contract);
        this.optionsFrequencyModel = this.helper.createOptionsFrequencyModel(this.dateRangeGenerator, instalmentOptions, optionsState);
        this.updatePreviousOptionsFrequencyModel();
        this.suggestionsModel = this.createSuggestionsModel(instalmentOptions, this.optionsFrequencyModel.selectedFrequencyOption);
    }

    private createSuggestionsModel = (instalmentOptions: InstalmentOption[], frequencyOption: FrequencyOption): PaymentAssistancePlanOptionsSuggestionsModel => {
        const instalmentOption = instalmentOptions.find((option) => option.frequency.toString() === frequencyOption.value );
        const instalmentSuggestions = this.helper.sortInstalmentSuggestionsByNumberOfInstalments(instalmentOption);
        return {
            selectedNumberOfInstalments: null,
            instalmentSuggestions: instalmentSuggestions,
            frequencyOption: frequencyOption,
            maxSuggestionsToShow: this.maxSuggestionsToShow
        };
    }

    private navigateToConfirmScreen = (startDate: Date, accountNumber: string, contractNumber: string, frequency: string, instalmentAmount: number): void => {
        const formattedSelectedDate: string = DateHelper.toIsoDateString(moment(startDate));
        this.router.navigate([`/bills/paymentassistance/plan/confirm/options/${accountNumber}/${contractNumber}/${frequency.toLowerCase()}/${formattedSelectedDate}/${instalmentAmount}/${this.suggestionsModel.selectedNumberOfInstalments}`], { queryParamsHandling: 'preserve' });
     }

    private navigateToCustomScreen = (accountNumber: string, contractNumber: string): void => {
        this.router.navigate([`/bills/paymentassistance/plan/custom/${accountNumber}/${contractNumber}`], { queryParamsHandling: 'preserve' });
    }

    private updateModels = (instalmentOptions: InstalmentOption[], frequencyOption: FrequencyOption, startDateAsString: string): void => {
        this.instalmentOptions = instalmentOptions;
        this.updateOptionsFrequencyModel(frequencyOption, instalmentOptions, startDateAsString);
        this.updateSuggestionsModel(instalmentOptions, frequencyOption);
    }

    private updateSuggestionsModel = (instalmentOptions: InstalmentOption[], frequencyOption: FrequencyOption): void => {
        const selectedInstalmentOption = this.helper.getSelectedInstalmentOption(instalmentOptions, frequencyOption);
        const instalmentSuggestions = this.helper.sortInstalmentSuggestionsByNumberOfInstalments(selectedInstalmentOption);
        this.suggestionsModel = {
            ...this.suggestionsModel,
            frequencyOption: frequencyOption,
            selectedNumberOfInstalments: null,
            instalmentSuggestions: instalmentSuggestions
        };
    }

    private updateOptionsFrequencyModel = (frequencyOption: FrequencyOption, instalmentOptions: InstalmentOption[], startDateAsString: string): PaymentAssistancePlanOptionsFrequencyModel => {
        const dateOptions =  this.helper.getDateOptions(this.dateRangeGenerator, instalmentOptions, frequencyOption);

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
