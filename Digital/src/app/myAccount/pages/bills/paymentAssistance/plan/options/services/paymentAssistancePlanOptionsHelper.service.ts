import { Injectable } from '@angular/core';
import { InstalmentOption, FrequencyOption, DateOption } from '../../../../../../services/paymentScheme/instalmentPlanOptions.service';
import { ActivatedRoute, Params } from '@angular/router';
import { PaymentAssistancePlanOptionsRouteParamsModel, PaymentAssistancePlanOptionsStateModel } from '../models';
import { FuelChipDataModel } from '../../../models';
import { ContractViewModel, AccountViewModel } from '../../../../../../services/account.service';
import { PaymentAssistancePlanOptionsTotalModel } from '../../optionsTotal';
import { DateRangeGenerator, PaymentAssistancePlanOptionsFrequencyModel } from '../../optionsFrequency';
import { InstalmentPlanFrequency, PaymentArrangementInstalmentSuggestion, GetPaymentArrangementInstalmentPlanOptionsParams, InstalmentPlanParameters } from '../../../../../../services/paymentScheme/paymentSchemeApi.service';
import { PaymentAssistancePlanOptionsSuggestionsModel } from '../suggestions/models';
import sortBy from 'lodash-es/sortBy';
import cloneDeep from 'lodash-es/cloneDeep';
import { AglCurrencyPipe } from '../../../../../../pipes/aglCurrency.pipe';
import { DateHelper } from '../../../../../../../shared/utils/dateHelper';
import * as moment from 'moment';
import { PaymentAssistancePlanCustomAmountModel } from '../../custom';

@Injectable()
export class PaymentAssistancePlanOptionsHelperService {

    public getSubheading(instalmentOptions: InstalmentOption[]): string {
        return instalmentOptions.length === 1 ?
            'Let us know how much you are able to pay each week.' :
            'Let us know how often and how much you are able to pay.';
    }

    public getCancelDestinationUrl(cancelDestinationUrl: string): string {
        return cancelDestinationUrl || '/bills';
    }

    public createRouteParamsModel(route: ActivatedRoute, routeParams: Params): PaymentAssistancePlanOptionsRouteParamsModel {
        return {
            accountNumber: routeParams.contractAccountNumber,
            contractNumber: routeParams.contractNumber,
            cancelDestinationUrl: this.getSnapshotParam(route, 'cancelDestinationUrl')
        };
    }

    public createOptionsTotalModel(fuelChip: FuelChipDataModel, contract: ContractViewModel): PaymentAssistancePlanOptionsTotalModel {
        return {
            totalAmountDue: fuelChip.eligibility.totalAmountDue,
            fuelType: fuelChip.fuelType,
            currentBillEndDate: contract.currentBillEndDate
        };
    }

    public getContract(accounts: AccountViewModel[], accountNumber, contractNumber): ContractViewModel {
        return accounts
            .find((account) => account.accountNumber === accountNumber).contracts
            .find((contract) => contract.contractNumber === contractNumber);
    }

    public getSelectedInstalmentPlanFrequency(instalmentOptions: InstalmentOption[], optionsState: PaymentAssistancePlanOptionsStateModel = null): InstalmentPlanFrequency {
        if (optionsState) {
            return InstalmentPlanFrequency[optionsState.frequency];
        } else {
            return instalmentOptions.length > 1 ? InstalmentPlanFrequency.Fortnightly : InstalmentPlanFrequency.Weekly;
        }
    }

    public getFrequencyOptions(instalmentOptions: InstalmentOption[], instalmentPlanFrequency: InstalmentPlanFrequency): FrequencyOption[] {
        return instalmentOptions.map((option) => {
            const frequency = option.frequency.toString();
            const isSelected = option.frequency === instalmentPlanFrequency;
            return new FrequencyOption(frequency, frequency, isSelected);
        });
    }

    public getSelectedFrequencyOption(frequencyOptions: FrequencyOption[]): FrequencyOption {
        return frequencyOptions.find((frequencyOption) => frequencyOption.selected);
    }

    public sortInstalmentSuggestionsByNumberOfInstalments(instalmentOption: InstalmentOption): PaymentArrangementInstalmentSuggestion[] {
        return sortBy(instalmentOption.instalmentSuggestions, ((instalmentSuggestion) => instalmentSuggestion.numberOfInstalments));
    }

    public getSelectedInstalmentOption(instalmentOptions: InstalmentOption[], frequencyOption: FrequencyOption): InstalmentOption {
        return instalmentOptions.find((instalmentOption) => instalmentOption.frequency.toString() === frequencyOption.value);
    }

    public getSelectedSuggestionInstalmentAmount(suggestionsModel: PaymentAssistancePlanOptionsSuggestionsModel): number {
        const instalmentSuggestion = suggestionsModel.instalmentSuggestions.find((suggestion) => suggestion.numberOfInstalments === suggestionsModel.selectedNumberOfInstalments);
        return instalmentSuggestion ? instalmentSuggestion.instalmentAmount : undefined;
    }

    public updateDateOptions(dateOptions: DateOption[], value: string): void {
        dateOptions.forEach((option) => option.selected = false);
        const dateOption = dateOptions.find((option) => option.value === value);
        if (dateOption) {
            dateOption.selected = true;
        }
    }

    public getInstalmentMinAmount(instalmentOptions: InstalmentOption[], frequencyOption: FrequencyOption): number {
        const instalmentOption = this.getSelectedInstalmentOption(instalmentOptions, frequencyOption);
        return instalmentOption ? instalmentOption.instalmentMinAmount : undefined;
    }

    public getInstalmentMaxAmount(instalmentOptions: InstalmentOption[], frequencyOption: FrequencyOption): number {
        const instalmentOption = this.getSelectedInstalmentOption(instalmentOptions, frequencyOption);
        return instalmentOption ? instalmentOption.instalmentMaxAmount : undefined;
    }

    public formatInstalmentAmountPlaceholder(amount: number): string {
        return `Min. ${new AglCurrencyPipe().transform(amount)}`;
    }

    public getSnapshotParam(route: ActivatedRoute, param: string): string {
        return route.snapshot ? route.snapshot.queryParams[param] : null;
    }

    public createInstalmentPlanOptionsParams(dateAsString: string, frequencyOption: FrequencyOption): GetPaymentArrangementInstalmentPlanOptionsParams {
        const startDate = DateHelper.parseIsoDate(dateAsString).toDate();
        const frequency = InstalmentPlanFrequency[frequencyOption.value];
        const params: GetPaymentArrangementInstalmentPlanOptionsParams = {
            suggestInstalments: true,
            startDate: startDate,
            frequency: frequency
        };
        return params;
    }

    public getSelectedDateOptionDate(dateOptions: DateOption[]): Date {
        const selectedDate = dateOptions.find((dateOption) => dateOption.selected);
        return selectedDate ? moment(selectedDate.value).toDate() : undefined;
    }

    public createCustomAmountModel(instalmentOptions: InstalmentOption[], optionsState: PaymentAssistancePlanOptionsStateModel, frequencyOption: FrequencyOption, currentBillEndDate: Date): PaymentAssistancePlanCustomAmountModel {
        const instalmentMinAmount = optionsState ? optionsState.instalmentMinAmount : this.getInstalmentMinAmount(instalmentOptions, frequencyOption);
        const instalmentMaxAmount = this.getInstalmentMaxAmount(instalmentOptions, frequencyOption);
        const placeholder = this.formatInstalmentAmountPlaceholder(instalmentMinAmount);
        return {
            frequency: frequencyOption.value,
            amount: 0,
            amountInput: '',
            placeholder: placeholder,
            instalmentMinAmount: instalmentMinAmount,
            instalmentMaxAmount: instalmentMaxAmount,
            disabled: false,
            currentBillEndDate: currentBillEndDate,
            toValidate: true
        };
    }

    public createOptionsFrequencyModel(dateRangeGenerator: DateRangeGenerator, instalmentOptions: InstalmentOption[], optionsState: PaymentAssistancePlanOptionsStateModel): PaymentAssistancePlanOptionsFrequencyModel {
        const selectedInstalmentPlanFrequency = this.getSelectedInstalmentPlanFrequency(instalmentOptions, optionsState);
        const frequencyOptions = this.getFrequencyOptions(instalmentOptions, selectedInstalmentPlanFrequency);
        const selectedFrequencyOption = this.getSelectedFrequencyOption(frequencyOptions);
        const dateOptions = this.getDateOptions(dateRangeGenerator, instalmentOptions, selectedFrequencyOption, optionsState);
        return {
            dateOptions: dateOptions,
            selectedFrequencyOption: selectedFrequencyOption,
            frequencyOptions: frequencyOptions,
            dateOptionsDisabled: false,
            dateOptionsHasError: false,
            showFrequencyOptions: frequencyOptions.length > 1
        };
    }

    public getDateOptions(
        dateRangeGenerator: DateRangeGenerator,
        instalmentOptions: InstalmentOption[],
        frequencyOption: FrequencyOption,
        optionsState: PaymentAssistancePlanOptionsStateModel = null): DateOption[] {

        const dateRange = dateRangeGenerator.generate(instalmentOptions);

        const frequency = dateRange.find((option) => option.frequency.toString() === frequencyOption.value);
        const frequencyDates = cloneDeep(frequency.dates);
        if (optionsState) {
            this.updateDateOptions(frequencyDates, DateHelper.toIsoDateString(moment(optionsState.startDate)));
        }
        return frequencyDates;
    }

    public createInstalmentPlanParameters(routeParamsModel: PaymentAssistancePlanOptionsRouteParamsModel, frequency: string, instalmentAmount: number, startDate: Date): InstalmentPlanParameters {
        let investmentPlanRouteParameters: InstalmentPlanParameters = new InstalmentPlanParameters();
        investmentPlanRouteParameters = {
            ...investmentPlanRouteParameters,
            contractNumber: routeParamsModel.contractNumber,
            frequency: InstalmentPlanFrequency[frequency],
            instalmentAmount: instalmentAmount,
            startDate: startDate
        };
        return investmentPlanRouteParameters;
    }

}
