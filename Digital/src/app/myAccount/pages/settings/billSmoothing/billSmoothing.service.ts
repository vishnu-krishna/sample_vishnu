import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';
import { ApiService } from '../../../../shared/service/api.service';
import { AccountViewModel, ContractViewModel, IAccountServiceMA } from '../../..//services/account.service';

import uniq from 'lodash-es/uniq';
import { AccountDetailComponentModel } from '../../../../myAccount/settings/accountDetail/accountDetail.component';
import { AlertType } from '../../../../shared/globals/alertType';
import { State } from '../../../../shared/globals/oneMinuteMove/state';
import { ConfigService } from '../../../../shared/service/config.service';
import { SettingsAggregateModel } from '../../../services/settings/model/settingsAggregateModel';
import { ISettingsService } from '../../../services/settings/settings.service.interface';
import {
    AlertDisplayModel,
    BillSmoothingAccountModel,
    BillSmoothingAccountsViewModel,
    BillSmoothingEstimatesViewModel,
    BillSmoothingFrequency,
    BillSmoothingFuelDisplayModel,
    BillSmoothingInternalErrorTypes,
    LivePersonEngagementTypes,
    SapBillSmoothingErrorTypes
} from './billSmoothing.model';

declare let leanengage: any;

@Injectable()
export class BillSmoothingService {
    /**
     * Generates a formatted date like:
     * (Thursday 10 Nov 2016)
     * @param {any} date
     * @returns string
     * @memberof BillSmoothingAccountsService
     */
    public static generateLongDate(date) {
        return moment(date).format('dddd DD MMM YYYY');
    }

    /**
     * Generates a formatted date like:
     * (10 Nov 2016)
     * @param {any} date
     * @returns string
     * @memberof BillSmoothingAccountsService
     */
    public static generateShortDate(date) {
        return moment(date).format('DD MMM Y');
    }

    /**
     * Generates a day from a supplied date like:
     * (Thursday)
     *
     * @param {any} date
     * @returns string
     * @memberof BillSmoothingAccountsService
     */
    public static generateDayFromDate(date) {
        return moment(date).format('dddd');
    }

    /**
     * Generates a formatted date like:
     * (10th)
     * @param {any} date
     * @returns string
     * @memberof BillSmoothingAccountsService
     */
    public static generateOrdinalDate(date) {
        return moment(date).format('Do');
    }

    public static showLeanEngageSurveyOnSuccessfulSetup() {
        let nameId: string;
        let leanAppId = new ConfigService().current.leanEngageAppId;
        let bearerToken = sessionStorage.getItem('Bearer');
        if (bearerToken) {
            nameId = jwt_decode(bearerToken)['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
        }

        leanengage('start', { user_id: nameId, name: nameId, app_id: leanAppId });

        leanengage('triggerSurvey', 'bill-smoothing-set-up-success-clone');
    }

    public turnOnChangesToReduceWorkloadOfCallCentre: boolean;

    private accounts: AccountViewModel[];
    private settings: SettingsAggregateModel;

    constructor(
        public accountService: IAccountServiceMA,
        public iSettingsService: ISettingsService,
        public apiService: ApiService
    ) {
        this.turnOnChangesToReduceWorkloadOfCallCentre = false;
    }

    public generateBillSmoothingViewModel(): Observable<BillSmoothingAccountModel[]> {
        return Observable.forkJoin(
            this.accountService.getAccounts(),
            this.iSettingsService.getSettings()
        )
            .flatMap(
                (results) => {
                    this.accounts = results[0];
                    let activeAccounts = this.accounts.filter((account) => !account.allContractsAreRestricted).map((activeAccount) => Object.assign({}, activeAccount));
                    activeAccounts.forEach((account) => {
                        account.contracts = account.contracts.filter((contract) => !contract.isRestricted);
                    });
                    this.settings = results[1];

                    const estimates: Array<Observable<BillSmoothingAccountsViewModel>> = activeAccounts.map((account: AccountViewModel) => {
                        if (account.contracts.every((c) => c.isBillSmoothingV2)) {
                            return Observable.of<BillSmoothingAccountsViewModel>({
                                contractAccountNumber: Number(account.accountNumber),
                                estimates: null,
                                error: null
                            });
                        } else {
                            return this.apiService.getBillSmoothingEstimates(account.accountNumber);
                        }
                    });
                    return Observable.forkJoin(estimates)
                        .map(
                            (accountViewModels: BillSmoothingAccountsViewModel[]) => {
                                let accountModels: BillSmoothingAccountModel[] = activeAccounts.map((account) => {
                                    const accountViewModel = accountViewModels.find((acc) => acc.contractAccountNumber === Number(account.accountNumber));

                                    const accountModel = new BillSmoothingAccountModel();

                                    // update various properties for account model
                                    accountModel.accountDetailModel = new AccountDetailComponentModel(account);
                                    accountModel.accountDetailModel.isDirectDebit = account.contracts[0].isDirectDebit;
                                    accountModel.allContractsHaveDirectDebit = account.contracts.every((contract: ContractViewModel) => contract.isDirectDebit);
                                    accountModel.hasEstimatesApiError = accountViewModel.hasEstimatesApiError;
                                    accountModel.hasDuplicateFuels = this.hasDuplicateFuels(account);

                                    // create fuel models
                                    accountModel.billSmoothingFuelModel = account.contracts.map((contract) =>
                                        this.createBillSmoothingFuelDisplayModel(contract, accountViewModel, accountModel.hasDuplicateFuels)
                                    );

                                    // update consolidated item properties for account model
                                    const hasMultipleChatButtons = accountModel.billSmoothingFuelModel.filter((fuel: BillSmoothingFuelDisplayModel) => fuel.hasChatButton).length > 1;
                                    accountModel.hasConsolidatedChatButton = accountModel.hasDuplicateFuels || accountModel.hasEstimatesApiError || hasMultipleChatButtons;

                                    const numberOfMessages = accountModel.billSmoothingFuelModel.filter((fuel: BillSmoothingFuelDisplayModel) => fuel.hasMessage).length;
                                    const hasMultipleMessages = numberOfMessages > 1;
                                    const hasSingleMessage = numberOfMessages === 1;
                                    accountModel.hasConsolidatedMessages = (!accountModel.hasDuplicateFuels && !accountModel.hasEstimatesApiError && hasMultipleChatButtons && hasSingleMessage) || hasMultipleMessages;

                                    const hasMultipleSetupButtons = accountModel.billSmoothingFuelModel.filter((fuel: BillSmoothingFuelDisplayModel) => fuel.hasSetupButton).length > 1;
                                    accountModel.hasConsolidatedSetUpButton = hasMultipleSetupButtons;

                                    // update consolidated item properties for fuel models
                                    accountModel.billSmoothingFuelModel.forEach((fuelModel: BillSmoothingFuelDisplayModel) => {
                                        fuelModel.hasChatButton = fuelModel.hasChatButton && !accountModel.hasConsolidatedChatButton;
                                        fuelModel.hasSetupButton = fuelModel.hasSetupButton && !accountModel.hasConsolidatedSetUpButton;
                                        fuelModel.hasMessage = fuelModel.hasMessage && !accountModel.hasConsolidatedMessages;
                                    });

                                    this.updateButtonLine(accountModel);

                                    return accountModel;
                                });

                                this.updateLivePersonEngagementType(accountModels);

                                return accountModels;
                            }
                        );
                }
            );
    }

    // Update account models to hide chat buttons and alter alert messages. This is a temporary solution to reduce workload of call centre.
    // Writing it into a separate function makes it easier to throw away in the future.
    // It can be removed or modified when call centre has changed its capability
    public updateChatButtonsToReduceWorkloadOfCallCentre(accountModels: BillSmoothingAccountModel[]) {
        if (!this.turnOnChangesToReduceWorkloadOfCallCentre) {
            return;
        }

        accountModels.forEach((accountModel: BillSmoothingAccountModel) => {
            // update message
            accountModel.billSmoothingFuelModel.forEach((fuelModel: BillSmoothingFuelDisplayModel) => {
                if (!fuelModel.hasBillSmoothing) {
                    if (accountModel.hasDuplicateFuels) {
                        const alert = new AlertDisplayModel(BillSmoothingInternalErrorTypes.DuplicatedFuels, AlertType.error, 'This service is not eligible for Bill Smoothing.', 'Get in touch with us <a href="https://www.agl.com.au/residential/contact-us" class="link" target="_blank">here</a> to find out how you can make the switch to Bill Smoothing.');
                        this.updateAlertByBillSmoothingInternalErrorType(BillSmoothingInternalErrorTypes.DuplicatedFuels, fuelModel.alerts, alert);
                    } else if (fuelModel.hasEstimatesApiError) {
                        const alert = new AlertDisplayModel(BillSmoothingInternalErrorTypes.EstimateError, AlertType.error, 'Bill Smoothing is currently unavailable.', `Sorry, we're just ironing out the kinks. Please try again later, or get in touch with us <a href="https://www.agl.com.au/residential/contact-us" class="link" target="_blank">here</a>.`);
                        this.updateAlertByBillSmoothingInternalErrorType(BillSmoothingInternalErrorTypes.EstimateError, fuelModel.alerts, alert);
                    } else if (!fuelModel.isEligibleForBillSmoothing) {
                        this.updateAlertForIneligibility(fuelModel.alerts, fuelModel.fuel, fuelModel.paymentOverdue);
                    }
                }
            });

            // remove consolidated chat button
            if (accountModel.hasConsolidatedMessages || accountModel.hasConsolidatedChatButton) {
                const numberOfOverdues = !accountModel.hasDuplicateFuels && accountModel.billSmoothingFuelModel.filter((fuelModel: BillSmoothingFuelDisplayModel) => {
                    if (!fuelModel.hasBillSmoothing && !fuelModel.hasEstimatesApiError && !fuelModel.isEligibleForBillSmoothing) {
                        if (fuelModel.alerts.some((a) => a.IsOverdueAlert)) {
                            return true;
                        }
                    }
                    return false;
                }).length;
                const numberOfBillSmoothings = accountModel.billSmoothingFuelModel.filter((fuelModel: BillSmoothingFuelDisplayModel) => fuelModel.hasBillSmoothing).length;
                const multipleBillSmoothing = numberOfBillSmoothings > 1;
                const oneOverdueAndOneBillSmoothing = (numberOfOverdues === 1) && (numberOfBillSmoothings === 1);

                if (!multipleBillSmoothing && !oneOverdueAndOneBillSmoothing) {
                    accountModel.hasConsolidatedMessages = false;
                }

                const multipleOverdue = numberOfOverdues > 1;
                const multipleOverdueAndNotDuplicated = multipleOverdue && !accountModel.hasDuplicateFuels;
                if ((!multipleBillSmoothing && !multipleOverdueAndNotDuplicated && !oneOverdueAndOneBillSmoothing) || accountModel.hasEstimatesApiError) {
                    accountModel.hasConsolidatedChatButton = false;
                }
            }

            // add back individual buttons for the removed consolidated button
            accountModel.billSmoothingFuelModel.forEach((fuelModel: BillSmoothingFuelDisplayModel) => {
                if (!fuelModel.hasEstimatesApiError) {
                    if (fuelModel.hasBillSmoothing) {
                        fuelModel.hasChatButton = !accountModel.hasConsolidatedChatButton;
                        fuelModel.hasMessage = !accountModel.hasConsolidatedMessages && !fuelModel.hasDirectDebit;
                    } else if (!accountModel.hasDuplicateFuels && !fuelModel.isEligibleForBillSmoothing) {
                        if (fuelModel.alerts.some((a) => a.IsOverdueAlert)) {
                            fuelModel.hasChatButton = !accountModel.hasConsolidatedChatButton;
                        } else {
                            fuelModel.hasChatButton = false;
                        }
                    }
                }
            });

            this.updateButtonLine(accountModel);
        });
    }

    public getStartInformationSubtext(frequency: BillSmoothingFrequency, isDirectDebit: boolean, selectedDay: string, selectedDateOrdinal: string): string {
        const frequencyWithDirectDebitToPaymentMessageMap = {
            [BillSmoothingFrequency.Weekly]: `We will debit your nominated account every ${selectedDay}.`,
            [BillSmoothingFrequency.Fortnightly]: `We will debit your nominated account every second ${selectedDay}.`,
            [BillSmoothingFrequency.Monthly]: `We will debit your nominated account on the ${selectedDateOrdinal} of every month from your start date.`
        };

        const frequencyWithoutDirectDebitToPaymentMessageMap = {
            [BillSmoothingFrequency.Weekly]: `Payments will be due every ${selectedDay} from your start date.`,
            [BillSmoothingFrequency.Fortnightly]: `Payments will be due every second ${selectedDay} from your start date.`,
            [BillSmoothingFrequency.Monthly]: `Payments will be due on the ${selectedDateOrdinal} of every month from your start date.`
        };

        const frequencyToPaymentMessageMap = isDirectDebit ? frequencyWithDirectDebitToPaymentMessageMap : frequencyWithoutDirectDebitToPaymentMessageMap;

        let result = frequencyToPaymentMessageMap[frequency] || '';

        return result;
    }

    public generateBillCycleChangeMessage(billSmoothingFuels: BillSmoothingFuelDisplayModel[]): string {
        if (billSmoothingFuels.some((billSmoothingFuel) => this.isGasBasicMeterInVic(billSmoothingFuel))) {
            if (billSmoothingFuels.some((billSmoothingFuel) => this.isElectricityBasicMeterInVic(billSmoothingFuel))) {
                return `If you are on monthly billing with a basic meter, once you switch to Bill Smoothing, your bill cycle will change and we'll bill you every quarter for Electricity, and every two months for Gas.`;
            } else {
                return `If you are on monthly billing with a basic meter, once you switch to Bill Smoothing, your bill cycle will change and we'll bill you every two months.`;
            }
        } else if (billSmoothingFuels.some((billSmoothingFuel) => !billSmoothingFuel.isSmartMeter)) {
            return `If you are on monthly billing with a basic meter, once you switch to Bill Smoothing, your bill cycle will change and we'll bill you every quarter.`;
        }
        return '';
    }

    public removeButtonLinesForLivePersonIntegration(accountModels: BillSmoothingAccountModel[]) {
        let alreadyHasModifyLivePersonButton = false;
        let alreadyHasOverdueLivePersonButton = false;
        let alreadyHasModifyAndOverdueLivePersonButton = false;
        accountModels.forEach((accountModel: BillSmoothingAccountModel) => {
            if ((alreadyHasModifyLivePersonButton && (accountModel.livePersonEngagementType === LivePersonEngagementTypes.LPBillSmoothingModify)) ||
                (alreadyHasOverdueLivePersonButton && (accountModel.livePersonEngagementType === LivePersonEngagementTypes.LPBillSmoothingOverdue)) ||
                (alreadyHasModifyAndOverdueLivePersonButton && (accountModel.livePersonEngagementType === LivePersonEngagementTypes.LPBillSmoothingOverdueAndModify))) {
                accountModel.hasButtonLineAboveMessage = false;
                accountModel.hasButtonLineBelowMessage = false;
            }
            if (accountModel.livePersonEngagementType) {
                switch (accountModel.livePersonEngagementType) {
                    case LivePersonEngagementTypes.LPBillSmoothingModify:
                        alreadyHasModifyLivePersonButton = true;
                        break;
                    case LivePersonEngagementTypes.LPBillSmoothingOverdue:
                        alreadyHasOverdueLivePersonButton = true;
                        break;
                    case LivePersonEngagementTypes.LPBillSmoothingOverdueAndModify:
                        alreadyHasModifyAndOverdueLivePersonButton = true;
                        break;
                }
            }
            accountModel.billSmoothingFuelModel.forEach((fuel: BillSmoothingFuelDisplayModel) => {
                if (fuel.livePersonEngagementType) {
                    switch (fuel.livePersonEngagementType) {
                        case LivePersonEngagementTypes.LPBillSmoothingModify:
                            alreadyHasModifyLivePersonButton = true;
                            break;
                        case LivePersonEngagementTypes.LPBillSmoothingOverdue:
                            alreadyHasOverdueLivePersonButton = true;
                            break;
                        case LivePersonEngagementTypes.LPBillSmoothingOverdueAndModify:
                            alreadyHasModifyAndOverdueLivePersonButton = true;
                            break;
                    }
                }
            });
        });
    }

    private updateButtonLine(accountModel: BillSmoothingAccountModel) {
        const numberOfOnBillSmoothing = accountModel.billSmoothingFuelModel.filter((fuel) => fuel.hasBillSmoothing).length;
        accountModel.hasButtonLineAboveMessage = accountModel.hasConsolidatedButton && (numberOfOnBillSmoothing > 1);
        accountModel.hasButtonLineBelowMessage = accountModel.hasConsolidatedButton && (numberOfOnBillSmoothing <= 1);
    }

    public updateLivePersonEngagementType(accountModels: BillSmoothingAccountModel[]) {
        accountModels.forEach((accountModel: BillSmoothingAccountModel) => {
            if (accountModel.billSmoothingFuelModel.some((fuel) => fuel.hasBillSmoothing) &&
                accountModel.billSmoothingFuelModel.some((fuel) => fuel.alerts.some((a) => a.IsOverdueAlert))) {
                accountModel.livePersonEngagementType = LivePersonEngagementTypes.LPBillSmoothingOverdueAndModify;
            } else if (accountModel.billSmoothingFuelModel.filter((fuel) => fuel.hasBillSmoothing).length > 1) {
                accountModel.livePersonEngagementType = LivePersonEngagementTypes.LPBillSmoothingModify;
            } else if (accountModel.billSmoothingFuelModel.filter((fuel) => fuel.alerts.some((a) => a.IsOverdueAlert)).length > 1) {
                accountModel.livePersonEngagementType = LivePersonEngagementTypes.LPBillSmoothingOverdue;
            } else {
                accountModel.billSmoothingFuelModel.forEach((fuel) => {
                    if (fuel.hasBillSmoothing) {
                        fuel.livePersonEngagementType = LivePersonEngagementTypes.LPBillSmoothingModify;
                    } else if (fuel.alerts.some((a) => a.IsOverdueAlert)) {
                        fuel.livePersonEngagementType = LivePersonEngagementTypes.LPBillSmoothingOverdue;
                    }
                });
            }
        });
    }

    private isGasBasicMeterInVic(billSmoothingFuel: BillSmoothingFuelDisplayModel): boolean {
        return billSmoothingFuel.regionId === State.VIC.toString() && !billSmoothingFuel.isSmartMeter && billSmoothingFuel.isGas;
    }

    private isElectricityBasicMeterInVic(billSmoothingFuel: BillSmoothingFuelDisplayModel): boolean {
        return billSmoothingFuel.regionId === State.VIC.toString() && !billSmoothingFuel.isSmartMeter && billSmoothingFuel.isElectricity;
    }

    private createBillSmoothingFuelDisplayModel(contract: ContractViewModel, accountViewModel: BillSmoothingAccountsViewModel, accountHasDuplicateFuels: boolean): BillSmoothingFuelDisplayModel {
        const bsFuelModel = new BillSmoothingFuelDisplayModel();
        bsFuelModel.paymentContractInfo = contract;
        bsFuelModel.contractAccountNumber = Number(contract.accountNumber);
        bsFuelModel.contractNumber = Number(contract.contractNumber);
        bsFuelModel.fuel = contract.fuelType;
        bsFuelModel.hasBillSmoothing = contract.isBillSmoothingV2;
        bsFuelModel.hasDirectDebit = contract.isDirectDebit;
        bsFuelModel.paymentOverdue = contract.paymentOverdue;
        bsFuelModel.hasChatButton = false;
        bsFuelModel.hasSetupButton = false;
        bsFuelModel.hasMessage = false;
        bsFuelModel.isSmartMeter = contract.isSmartMeter;
        bsFuelModel.regionId = contract.regionId;
        bsFuelModel.isElectricity = contract.isElectricity;
        bsFuelModel.isGas = contract.isGas;

        if (bsFuelModel.hasBillSmoothing) {
            bsFuelModel.paymentScheme = contract.paymentScheme;
            // chat button if contract is on bill smoothing
            bsFuelModel.hasChatButton = true;
            if (!accountHasDuplicateFuels && !accountViewModel.hasEstimatesApiError) {
                bsFuelModel.hasMessage = !bsFuelModel.hasDirectDebit;
            }
        } else {
            if (accountHasDuplicateFuels) {
                // add this alert if contract is not on bill smoothing and account has duplicated fuel contracts
                const heading = 'This service is not eligible for Bill Smoothing.';
                const body = 'Chat with us now to find out how you can make the switch to Bill Smoothing.';
                bsFuelModel.alerts.push(new AlertDisplayModel(BillSmoothingInternalErrorTypes.DuplicatedFuels, AlertType.error, heading, body));
            } else if (accountViewModel.hasEstimatesApiError) {
                bsFuelModel.hasEstimatesApiError = true;
                // add this alert if contract is not on bill smoothing and estimate api returns error
                const heading = 'Bill Smoothing is currently unavailable.';
                const body = `Sorry, we're just ironing out the kinks. Please try again later, or chat online now.`;
                bsFuelModel.alerts.push(new AlertDisplayModel(BillSmoothingInternalErrorTypes.EstimateError, AlertType.error, heading, body));
            } else {
                let estimatesViewModel: BillSmoothingEstimatesViewModel;
                let errorNumber: string;
                if (accountViewModel.estimates) {
                    estimatesViewModel = accountViewModel.estimates.find((c) => c.contractNumber === Number(contract.contractNumber));
                    bsFuelModel.isEligibleForBillSmoothing = !!estimatesViewModel.paymentOptions;

                    if (bsFuelModel.isEligibleForBillSmoothing) {
                        bsFuelModel.paymentOptions = estimatesViewModel.paymentOptions;
                        bsFuelModel.billDeliveryMethod = this.settings.billDeliveryMethodList.find((b) => b.contractAccountNumber === contract.accountNumber).billDeliveryMethod;
                        // setup button if contract is not on bill smoothing, is eligible for bill smoothing and account doesn't have duplicated fuel contracts
                        bsFuelModel.hasSetupButton = true;
                    } else {
                        // chat button if contract is not on bill smoothing and is not eligible for bill smoothing
                        bsFuelModel.hasChatButton = true;
                        // add this alert if contract is not eligible for bill smoothing and account doesn't have duplicated fuel contracts
                        errorNumber = estimatesViewModel.error.internalError.errorNumber;
                    }
                } else {
                    bsFuelModel.isEligibleForBillSmoothing = false;
                    if (accountViewModel.error) {
                        errorNumber = accountViewModel.error.internalError.errorNumber;
                    }
                }
                if (errorNumber) {
                    const fuel = bsFuelModel.fuel;
                    const paymentOverdue = bsFuelModel.paymentOverdue;
                    bsFuelModel.alerts.push(this.getAlertForIneligibility(errorNumber, fuel, paymentOverdue, contract));
                }
            }
        }

        return bsFuelModel;
    }

    private getAlertForIneligibility(errorNumber: string, fuel: string, paymentOverdue: number, contract: ContractViewModel): AlertDisplayModel {
        // we translate SAP error number to BillSmoothingInternalErrorType here, and only refer to BillSmoothingInternalErrorType in subsequent code flow
        const billSmoothingInternalErrorType = this.getBillSmoothingInternalErrorTypeBySapErrorNumber(errorNumber, contract);

        let alert;
        if (billSmoothingInternalErrorType === BillSmoothingInternalErrorTypes.Overdue) {
            alert = new AlertDisplayModel(BillSmoothingInternalErrorTypes.Overdue, AlertType.error, `Your ${fuel} account is overdue: $${paymentOverdue.toFixed(2)}`, null);
        } else if (billSmoothingInternalErrorType === BillSmoothingInternalErrorTypes.Payg) {
            alert = new AlertDisplayModel(BillSmoothingInternalErrorTypes.Payg, AlertType.error, `You're already set up on AGL Prepaid`, `If you'd like to switch to Bill Smoothing, chat to us now.`);
        }

        if (this.turnOnChangesToReduceWorkloadOfCallCentre) {
            if (billSmoothingInternalErrorType === BillSmoothingInternalErrorTypes.BillSmoothingV1) {
                // this internal error type is added temporarily to reduce call center pressure, its alert heading and body are populated in subsequent call to "updateAlertForIneligibility"
                alert = new AlertDisplayModel(BillSmoothingInternalErrorTypes.BillSmoothingV1, AlertType.inform, null, null);
            } else if (billSmoothingInternalErrorType === BillSmoothingInternalErrorTypes.GeneralIneligibility) {
                // this internal error type is added temporarily to reduce call center pressure, its alert heading and body are populated in subsequent call to "updateAlertForIneligibility"
                alert = new AlertDisplayModel(BillSmoothingInternalErrorTypes.GeneralIneligibility, AlertType.error, null, null);
            }
        }

        return alert;
    }

    // API returns errorNumber in string data type, e.g. 4 can be presented as 04.
    // we resolve error type from errorNumber in this function
    public getBillSmoothingInternalErrorTypeBySapErrorNumber(errorNumber: string, contract: ContractViewModel): BillSmoothingInternalErrorTypes {
        const errorNumberAsNumber = Number(errorNumber).toString();

        if (errorNumberAsNumber === <any> SapBillSmoothingErrorTypes.IneligibleOverdue) {
            if (contract.instalmentPlan || contract.extendedDueDate) {
                return BillSmoothingInternalErrorTypes.GeneralIneligibility;
            } else {
                return BillSmoothingInternalErrorTypes.Overdue;
            }
        } else if (errorNumberAsNumber === <any> SapBillSmoothingErrorTypes.IneligibleOnAGLPrepaid) {
            return BillSmoothingInternalErrorTypes.Payg;
        } else if (errorNumberAsNumber === <any> SapBillSmoothingErrorTypes.IneligibleOnBillSoomthingV1) {
            return BillSmoothingInternalErrorTypes.BillSmoothingV1;
        } else {// this will cover the known error codes of 10, 12, 16, 24, 3, 23, 21, 34 plus any other unexpected ones
            return BillSmoothingInternalErrorTypes.GeneralIneligibility;
        }
    }

    private hasDuplicateFuels(account: AccountViewModel): boolean {
        const fuelArr = account.contracts.map((contract) => contract.fuelType);
        if (fuelArr.length > 0) {
            const uniqueFuelArr = uniq(fuelArr);
            return fuelArr.length !== uniqueFuelArr.length;
        } else {
            return false;
        }
    }

    private updateAlertForIneligibility(alerts: AlertDisplayModel[], fuel: string, paymentOverdue: number) {
        alerts.forEach((alert: AlertDisplayModel) => {
            if (alert.billSmoothingInternalErrorType === BillSmoothingInternalErrorTypes.BillSmoothingV1) {
                alert.type = AlertType.inform;
                alert.heading = 'You are already on Bill Smoothing.';
                alert.body = 'Your instalment details will be available in here soon. In the meantime <a href="https://www.agl.com.au/residential/contact-us" class="link" target="_blank">contact us</a> if you have any questions.';
            } else if (alert.billSmoothingInternalErrorType === BillSmoothingInternalErrorTypes.Payg) {
                alert.type = AlertType.inform;
                alert.body = `If you'd like to switch to Bill Smoothing, get in touch with us <a href="https://www.agl.com.au/residential/contact-us" class="link" target="_blank">here</a>.`;
            } else if (alert.billSmoothingInternalErrorType === BillSmoothingInternalErrorTypes.GeneralIneligibility) {
                alert.heading = 'This service is not eligible for Bill Smoothing.';
                alert.body = 'Get in touch with us <a href="https://www.agl.com.au/residential/contact-us" class="link" target="_blank">here</a> to find out how you can make the switch to Bill Smoothing.';
            }
        });
    }

    private updateAlertByBillSmoothingInternalErrorType(billSmoothingInternalErrorType: BillSmoothingInternalErrorTypes, alerts: AlertDisplayModel[], updatingAlert: AlertDisplayModel) {
        const alertToUpdate = alerts.find((a) => a.billSmoothingInternalErrorType === billSmoothingInternalErrorType);
        if (alertToUpdate) {
            alertToUpdate.body = updatingAlert.body;
            alertToUpdate.heading = updatingAlert.heading;
            alertToUpdate.type = updatingAlert.type;
        }
    }
}
