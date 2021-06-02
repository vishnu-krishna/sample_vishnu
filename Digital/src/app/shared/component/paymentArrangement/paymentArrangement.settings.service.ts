import { switchMap } from 'rxjs/operator/switchMap';
import * as moment from 'moment';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Injectable } from '@angular/core';

import { AccountViewModel, IAccountServiceMA, ContractViewModel, BillViewModel } from '../../../myAccount/services/account.service';
import { PaymentMethod } from '../../../myAccount/services/settings/model/paymentMethod';
import { IPaymentMethodsService } from '../../../myAccount/services/settings/paymentMethods.service.interface';
import { AccountDetailComponentModel } from '../../../myAccount/settings/accountDetail/accountDetail.component';
import { PaymentArrangementContractDetails, PaymentArrangementPaymentMethodModel, SettingUpcomingPaymentDisplayModes } from '../../model/domain/paymentArrangement/paymentArrangementData.model';
import { IPaymentArrangementSettingsService } from './paymentArrangement.settings.service.interface';
import { PaymentArrangementType } from '../../../myAccount/common/enums';
import { PaymentArrangementInstalmentPlans } from '../../../myAccount/services/paymentScheme/paymentSchemeApi.service';
import { InstalmentPlanService, UpcomingInstalment, ContractUpcomingInstalment } from '../../../myAccount/services/paymentScheme/instalmentPlan.service';
import { FeatureFlagTypes } from '../../../myAccount/services/featureFlag.service';
import { IFeatureFlagService } from '../../../myAccount/services/contract/ifeatureflag.service';

@Injectable()
export class PaymentArrangementSettingsService implements IPaymentArrangementSettingsService {
    private isPaymentExtensionActivated;
    private isPaymentAssistanceActivated;
    private featureFlagSubscription: Subscription;

    constructor(
        private paymentMethodsService: IPaymentMethodsService,
        private accountService: IAccountServiceMA,
        private instalmentPlanService: InstalmentPlanService,
        private featureService: IFeatureFlagService
    ) {
        this.updateFeatureFlagActivation();
    }

    public getPaymentArrangementViewModel(paymentArrangementType: PaymentArrangementType): Observable<PaymentArrangementSettingsViewModel[]> {
        return Observable.forkJoin(
            this.withUpcomingInstalments(this.accountService.getAccounts().first()),
            this.paymentMethodsService.getPaymentMethods()
        ).map(
            ([accountsWithUpcomingInstalments, paymentMethods]) => {
                const combinedModel = this.combineModels(accountsWithUpcomingInstalments, paymentMethods, paymentArrangementType);
                return combinedModel;
            },
            (err) => {
                console.warn('PaymentArrangementSettingsViewModelFactory subscribe error', err);
                // TODO: Send messagebus alert message;
            }
            );
    }

    // the function adds upcoming instalments to account stream
    public withUpcomingInstalments(accountsStream: Observable<AccountViewModel[]>): Observable<AccountWithUpcomingInstalments[]> {
        return accountsStream.switchMap((accounts: AccountViewModel[]): Observable<AccountWithUpcomingInstalments[]> => {
            return Observable.forkJoin(
                accounts.map((account: AccountViewModel) => this.addInstalmentsToAccount(account))
            );
        });
    }

    private addInstalmentsToAccount(account: AccountViewModel): Observable<AccountWithUpcomingInstalments> {
        if (this.isPaymentAssistanceActivated) {
            return this.instalmentPlanService.getUpcomingInstalments(account.accountNumber)
            .map((upcomingInstalments: ContractUpcomingInstalment[]) => new AccountWithUpcomingInstalments(account, upcomingInstalments));
        } else {
            return Observable.of(new AccountWithUpcomingInstalments(account, []));
        }
    }

    private updateFeatureFlagActivation() {
        this. featureFlagSubscription = Observable.forkJoin(
            [
                this.featureService.featureFlagged(FeatureFlagTypes.paymentExtensionEnabled),
                this.featureService.featureFlagged(FeatureFlagTypes.paymentAssistanceEnabled)
            ]
        ).subscribe(([paymentExtensionEnabled, paymentAssistanceEnabled]) => {
            this.isPaymentExtensionActivated = paymentExtensionEnabled;
            this.isPaymentAssistanceActivated = paymentAssistanceEnabled;

            if (paymentExtensionEnabled && paymentAssistanceEnabled) {
                this.isPaymentExtensionActivated = false;
                this.isPaymentAssistanceActivated = true;
            }
        });
    }

    private combineModels(accountsWithUpcomingInstalments: AccountWithUpcomingInstalments[], paymentMethods: PaymentMethod[], paymentArrangementType: PaymentArrangementType): PaymentArrangementSettingsViewModel[] {
        const isSingleContractAccountWithSingleContract = accountsWithUpcomingInstalments.length === 1 && accountsWithUpcomingInstalments[0].account.contracts.length === 1;

        const viewModel = accountsWithUpcomingInstalments.map(
            (accountWithUpcomingInstalments: AccountWithUpcomingInstalments) => {
            const account = accountWithUpcomingInstalments.account;

            const model = new PaymentArrangementSettingsViewModel();
            model.showAccountDetailComponent = isSingleContractAccountWithSingleContract ? false : true;
            model.hasPaygContract = account.contracts.some((contract) => contract.isPayg);
            model.accountDetailModel = this.createAccountDetailModel(account);
            model.paymentArrangementPaymentMethodModel = this.createPaymentArrangementPaymentMethodModel(account, paymentMethods, paymentArrangementType);
            model.isMandatoryDirectDebit = account.contracts.some((contract) => contract.isMandatoryDirectDebit);
            // Determine if account has Direct Debit or if account has SMSPay
            paymentMethods.forEach((pm) => {

                pm.directDebitContractAccounts.forEach((directDebitAccount) => {
                    if (directDebitAccount === Number(account.accountNumber)) {
                        model.hasDirectDebitPaymentArrangement = true;
                    }
                });

                pm.oneTouchPayContractAccounts.forEach((smsPayAccount) => {
                    if (smsPayAccount === Number(account.accountNumber)) {
                        model.hasSmsPayPaymentArrangement = true;
                    }
                });

            });

            model.upcomingPaymentArrangementModel = this.createUpcomingPaymentArrangementModel(account, accountWithUpcomingInstalments.upcomingInstalments);
            model.hasUpcomingPayment = !!model.upcomingPaymentArrangementModel.length;
            return model;
        });
        return viewModel;
    }

    private createAccountDetailModel(account: AccountViewModel): AccountDetailComponentModel {
        let model = new AccountDetailComponentModel(account);
        return model;
    }

    private createPaymentArrangementPaymentMethodModel(account: AccountViewModel, paymentMethods: PaymentMethod[], paymentArrangementType: PaymentArrangementType): PaymentArrangementPaymentMethodModel {

        let hasDirectDebitArrangement: boolean = false;
        let hasSmsPayArrangement: boolean = false;
        let model = null;
        let filteredPaymentMethods: PaymentMethod[];

        if (paymentArrangementType === PaymentArrangementType.DirectDebit) {
            filteredPaymentMethods = paymentMethods.filter((pm) => {
                return pm.directDebitContractAccounts.some((accountNumber) => {
                    return accountNumber === Number(account.accountNumber);
                });
            });
        } else if (paymentArrangementType === PaymentArrangementType.SmsPay) {
            filteredPaymentMethods = paymentMethods.filter((pm) => {
                return pm.oneTouchPayContractAccounts.some((accountNumber) => {
                    return accountNumber === Number(account.accountNumber);
                });
            });
        }

        if (filteredPaymentMethods !== null && filteredPaymentMethods.length) {

            // can only be one or the other
            const paymentArrangement: PaymentMethod = filteredPaymentMethods[0];

            // TODO: dynamically decide which subclass to use
            model = new PaymentArrangementPaymentMethodModel(paymentArrangement, paymentArrangementType);
        }

        return model;
    }

    private createUpcomingPaymentArrangementModel(account: AccountViewModel, upcomingInstalments: ContractUpcomingInstalment[]): PaymentArrangementContractDetails[] {
        const contracts = account.contracts
        .map((contract: ContractViewModel) => {
            const contractUpcomingInstalment = upcomingInstalments
                .find((contractUpcomingInstalmentValue) =>
                    contractUpcomingInstalmentValue.contractAccountNumber === +contract.accountNumber &&
                    contractUpcomingInstalmentValue.contractNumber === +contract.contractNumber);

            const upcomingInstalment: UpcomingInstalment = contractUpcomingInstalment ? contractUpcomingInstalment.upcomingInstalment : undefined;
            return this.createDetailModelFromContract(contract, upcomingInstalment);
        })
        .filter((model: PaymentArrangementContractDetails) => {
            return model.upcomingPaymentDisplayMode !== null;
        });

        return contracts;
    }

    private createDetailModelFromContract(contract: ContractViewModel, upcomingInstalment: UpcomingInstalment) {
        let model = new PaymentArrangementContractDetails();

        const latestBill = contract.getNewestBill();

        model.upcomingPaymentDisplayMode = this.getUpcomingPaymentDisplayModes(contract, upcomingInstalment, latestBill);
        model.contractNumber = contract.contractNumber;
        model.fuelType = contract.fuelType;
        model.isBillSmoothing = contract.isBillSmoothing;
        model.isBillSmoothingV2 = contract.isBillSmoothingV2;

        if (model.displayInBillSmoothingMode()) {
            if (contract.paymentScheme) { // For Bill Smoothing
                if (contract.paymentScheme.frequency) {
                    model.frequency = contract.paymentScheme.frequency;
                }
                if (contract.paymentScheme.nextPayment) {
                    model.billSmoothingPreviousAmountUsed = false;
                    model.billSmoothingAmount = contract.paymentScheme.nextPayment.amount;
                    model.billSmoothingDate = contract.paymentScheme.nextPayment.date;
                } else {
                    model.billSmoothingPreviousAmountUsed = true;
                    model.billSmoothingAmount = contract.paymentScheme.previousPayment.amount;
                    model.billSmoothingDate = contract.paymentScheme.previousPayment.date;
                }
            }
        } else if (model.displayInPaymentExtensionMode()) {
            model.extendedDueDate = contract.extendedDueDate;
            model.totalAmountOwing = contract.currentBalance + contract.paymentOverdue;
            model.dueDate = latestBill.dueDate;
        } else if (model.displayInInstalmentPlanMode()) {
            model.isOverdue = upcomingInstalment.overdueAmount > 0;
            model.overdueAmount = upcomingInstalment.overdueAmount;
            model.totalAmountOwing = upcomingInstalment.instalmentDueAmount;
            model.dueDate = upcomingInstalment.instalmentDueDate;
        } else if (model.displayInDefaultMode()) {
            model.isOverdue = contract.paymentOverdue > 0;
            model.overdueAmount = contract.paymentOverdue;
            model.isCurrentBalance = contract.currentBalance > 0;
            model.totalAmountOwing = contract.currentBalance;
            model.dueDate = latestBill.dueDate;
            if (moment(latestBill.dueDate) < moment() && model.isCurrentBalance) {
                model.isPending = true;
            }
        }

        return model;
    }

    private getUpcomingPaymentDisplayModes(contract: ContractViewModel, upcomingInstalment: UpcomingInstalment, latestBill: BillViewModel): SettingUpcomingPaymentDisplayModes | null {
        if (contract.isBillSmoothingV2) {
            return SettingUpcomingPaymentDisplayModes.BillSmoothing;
        } else if (upcomingInstalment && this.isPaymentAssistanceActivated) {
            return SettingUpcomingPaymentDisplayModes.InstalmentPlan;
        } else if (latestBill && contract.extendedDueDate && (this.isPaymentAssistanceActivated || this.isPaymentExtensionActivated)) {
            return SettingUpcomingPaymentDisplayModes.PaymentExtension;
        } else if (latestBill && (contract.currentBalance + contract.paymentOverdue > 0)) {
            return SettingUpcomingPaymentDisplayModes.Other;
        } else {
            return null;
        }
    }

    private isFuelElectricity(fuelType: string): boolean { return fuelType.toLowerCase() === 'electricity'; }
    private isFuelGas(fuelType: string): boolean { return fuelType.toLowerCase() === 'gas'; }
}

export class PaymentArrangementSettingsViewModel {
    public showAccountDetailComponent: boolean;
    public hasDirectDebitPaymentArrangement?: boolean;
    public hasSmsPayPaymentArrangement?: boolean;

    public hasPaygContract: boolean;
    public isMandatoryDirectDebit: boolean;

    public accountDetailModel: AccountDetailComponentModel;
    public paymentArrangementPaymentMethodModel: PaymentArrangementPaymentMethodModel;
    public upcomingPaymentArrangementModel: PaymentArrangementContractDetails[];
    public hasUpcomingPayment?: boolean;
}

export class AccountWithUpcomingInstalments {
    public constructor(public account: AccountViewModel, public upcomingInstalments: ContractUpcomingInstalment[]) {}
}
