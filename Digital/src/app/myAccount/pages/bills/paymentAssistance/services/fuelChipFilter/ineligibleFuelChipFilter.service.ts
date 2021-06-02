import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { MauiFuelChipState, FuelChipMessage, MauiSecondaryMessageStatusType } from '../../../../../maui/fuelChip';
import { FuelChipDataModel } from '../../models';
import { FuelChipFilterService } from './fuelChipFilter.service';
import { Now } from '../../../../../../shared/service/now.service';
import { IAccountServiceMA, AccountViewModel, ContractViewModel, BillViewModel } from '../../../../../services/account.service';
import { PaymentExtensionIneligibilityReasons } from '../../../../../services/paymentScheme/paymentExtensionEligibility.service';
import { AglCurrencyPipe } from '../../../../../pipes/aglCurrency.pipe';
import { BillDescriptionService } from '../../../../../services/billDescription.service';

@Injectable()
export class IneligibleFuelChipFilterService extends FuelChipFilterService {

    private yourNextBillIsOnTheWayThresholdDays = -2;

    constructor(
        private accountService: IAccountServiceMA,
        now: Now,
        private currencyPipe: AglCurrencyPipe,
        private billDescriptionService: BillDescriptionService) {
        super(now);
    }

    public filter(fuelChipDetails: FuelChipDataModel[]): Observable<FuelChipDataModel[]> {

        return new Observable((observer) => {

            this.accountService.getAccounts().subscribe((accounts: AccountViewModel[]) => {

                const categorisedFuelChipData: FuelChipDataModel[] = fuelChipDetails.reduce((results: FuelChipDataModel[], fuelChipDetail: FuelChipDataModel) => {

                    const account: AccountViewModel = accounts.find((acc) => acc.contracts.some((con) => con.contractNumber === fuelChipDetail.contractNumber));
                    const contract: ContractViewModel = account.contracts.find((con) => con.contractNumber === fuelChipDetail.contractNumber);

                    const result: FuelChipDataModel = this.categoriseFuelChipDetail(fuelChipDetail, contract);

                    return result ? results.concat(result) : results;

                }, []);

                observer.next(this.sort(categorisedFuelChipData));
                observer.complete();
            });
        });
    }

    private categoriseFuelChipDetail(fuelChipDetail: FuelChipDataModel, contract: ContractViewModel): FuelChipDataModel {

        // Ineligible
        if (this.canProcessIneligible(fuelChipDetail, contract)) {

            const classifyIneligibleFuelChips = {
                [PaymentExtensionIneligibilityReasons.Payg]: () =>  this.classifyPayg(fuelChipDetail),
                [PaymentExtensionIneligibilityReasons.ExistingPaymentArrangement]: () =>  this.classifyExistingPaymentArrangement(fuelChipDetail),
                [PaymentExtensionIneligibilityReasons.TechnicalError]: () => this.classifyTechnicalError(fuelChipDetail),
                [PaymentExtensionIneligibilityReasons.BrokenAccount]: () => this.classifyBrokenAccount(fuelChipDetail, contract),
                [PaymentExtensionIneligibilityReasons.UnableToExtendOnline]: () => this.processUnableToExtendOnlineReasons(fuelChipDetail, contract),
                [PaymentExtensionIneligibilityReasons.UnableToExtendOnlineOrNoIssuedBill]: () => this.processUnableToExtendOnlineReasons(fuelChipDetail, contract)
            };

            if (classifyIneligibleFuelChips[fuelChipDetail.eligibility.reasonForIneligibility]) {
                return classifyIneligibleFuelChips[fuelChipDetail.eligibility.reasonForIneligibility]();
            } else {
                return this.classifyGenericIneligible(fuelChipDetail, contract);
            }
        }
        return null;

    }

    private processUnableToExtendOnlineReasons(fuelChipDetail: FuelChipDataModel, contract: ContractViewModel): FuelChipDataModel {
        if (contract.currentBalance < 0) {
            return this.classifyContractWithCredit(fuelChipDetail, contract);
        } else if (contract.currentBalance === 0) {
            return this.classifyContractWithNoCredit(fuelChipDetail, contract);
        }
        return this.classifyGenericNoOpenBill(fuelChipDetail, contract);
    }

    private canProcessIneligible(fuelChipDetail: FuelChipDataModel, contract: ContractViewModel): boolean {
        return !fuelChipDetail.eligibility.isEligible
            && !this.isAlreadyExtended(fuelChipDetail, contract)
            && !this.isBrokenAccountWithNoBill(fuelChipDetail, contract);
    }

    private canProcessNoOpenBill(fuelChipDetail: FuelChipDataModel, contract: ContractViewModel): boolean {
        return this.hasNoIssuedBill(fuelChipDetail, contract) || this.isBrokenAccountWithNoBill(fuelChipDetail, contract);
    }

    private classifyTechnicalError(fuelChipData: FuelChipDataModel): FuelChipDataModel {
        const primaryMessage = '';
        const tertiaryMessage = `You can't set up online payment assistance at this time.`;

        fuelChipData.setClassification(MauiFuelChipState.Ineligible,
            new FuelChipMessage(primaryMessage), tertiaryMessage);

        return fuelChipData;
    }

    private classifyBrokenAccount(fuelChipData: FuelChipDataModel, contract: ContractViewModel) {
        const newestBill = contract.getNewestBill();
        const daysOverdue = newestBill ? this.daysBeforeNow(newestBill.dueDate) : 0;
        const daysDue: number = newestBill ? this.daysAfterNow(newestBill.dueDate) : 0;

        const currentBalance = contract.currentBalance || 0;
        const paymentOverdue = contract.paymentOverdue || 0;
        const totalToPay = currentBalance + paymentOverdue;
        const extendedDueDate = contract.extendedDueDate;

        const primaryMessage = this.formatBrokenAccountPrimaryMessage(totalToPay);
        const secondaryMessage = this.formatBrokenAccountSecondaryMessage(daysOverdue, newestBill, daysDue);
        const tertiaryMessage = `You can't set up online payment assistance at this time.`;

        fuelChipData.setClassification(MauiFuelChipState.Ineligible,
            new FuelChipMessage(primaryMessage, undefined,
                secondaryMessage, undefined), tertiaryMessage);

        return fuelChipData;
    }

    private formatBrokenAccountPrimaryMessage(totalToPay: number) {
        return `Total to pay: ${this.currencyPipe.transform(totalToPay)}`;
    }

    private formatBrokenAccountSecondaryMessage(daysOverdue: number, newestBill: BillViewModel, daysDue: number) {
        let secondaryMessage = '';
        if (daysOverdue > 0) {
            secondaryMessage = `Overdue by ${daysOverdue} day` + (daysOverdue === 1 ? '' : 's');
        } else {
            secondaryMessage = newestBill ? `Due in ${daysDue} day` + (daysDue === 1 ? '' : 's') : '';
        }
        return secondaryMessage;
    }

    private classifyPayg(fuelChipData: FuelChipDataModel): FuelChipDataModel {
        const primaryMessage = '';
        const tertiaryMessage = `You can't set up payment assistance because you're on AGL Prepaid.`;

        fuelChipData.setClassification(MauiFuelChipState.Ineligible,
            new FuelChipMessage(primaryMessage), tertiaryMessage);

        return fuelChipData;
    }

    private classifyExistingPaymentArrangement(fuelChipData: FuelChipDataModel): FuelChipDataModel {
        const primaryMessage = '';
        const tertiaryMessage = `You can't set up payment assistance because you've got an existing payment arrangement set up.`;

        fuelChipData.setClassification(MauiFuelChipState.Ineligible,
            new FuelChipMessage(primaryMessage), tertiaryMessage);

        return fuelChipData;
    }

    private classifyGenericIneligible(fuelChipData: FuelChipDataModel, contract: ContractViewModel): FuelChipDataModel {
        const newestBill = contract.getNewestBill();
        const daysOverdue: number = newestBill ? this.daysBeforeNow(newestBill.dueDate) : 0;
        const daysDue: number = newestBill ? this.daysAfterNow(newestBill.dueDate) : 0;

        const currentBalance = contract.currentBalance || 0;
        const paymentOverdue = contract.paymentOverdue || 0;
        const totalToPay = currentBalance + paymentOverdue;
        const extendedDueDate = contract.extendedDueDate;

        const primaryMessage = this.formatGenericIneligiblePrimaryMessage(totalToPay);
        const secondaryStatus: MauiSecondaryMessageStatusType = (daysOverdue > 0) ? MauiSecondaryMessageStatusType.Warning : undefined;
        const secondaryMessage = this.formatGenericIneligibleSecondaryMessage(contract, newestBill, daysOverdue, daysDue);
        const tertiaryMessage = `You can't set up online payment assistance at this time.`;

        fuelChipData.setClassification(MauiFuelChipState.Ineligible,
            new FuelChipMessage(primaryMessage, undefined,
                secondaryMessage, secondaryStatus), tertiaryMessage);

        return fuelChipData;
    }

    private formatGenericIneligiblePrimaryMessage(totalToPay: number) {
        return `Total to pay: ${this.currencyPipe.transform(totalToPay)}`;
    }

    private formatGenericIneligibleSecondaryMessage(contract: ContractViewModel, newestBill: BillViewModel, daysOverdue: number, daysDue: number): string {
        if (daysOverdue > 0) {
            return `Overdue by ${daysOverdue} day` + (daysOverdue === 1 ? '' : 's');
        } else {
            return newestBill ?
                `Next bill issued in ${daysDue} day` + (daysDue === 1 ? '' : 's') :
                this.nextBillIssuedIn(contract.currentBillEndDate);
        }
    }

    private classifyContractWithCredit(fuelChipData: FuelChipDataModel, contract: ContractViewModel): FuelChipDataModel {
        const isSmartMeter = contract.isSmartMeter;
        const currentBalance = contract.currentBalance;
        const projectedBill = contract.projectedBill || 0;

        const primaryMessage = this.formatContractWithCreditPrimaryMessage(isSmartMeter, projectedBill, currentBalance);
        const secondaryMessage = this.nextBillIssuedIn(contract.currentBillEndDate);
        const tertiaryMessage = `You can't set up payment assistance because your account balance is in credit.`;

        fuelChipData.setClassification(MauiFuelChipState.Ineligible,
            new FuelChipMessage(primaryMessage, undefined,
                secondaryMessage, undefined), tertiaryMessage);

        return fuelChipData;
    }

    private formatContractWithCreditPrimaryMessage(isSmartMeter: boolean, projectedBill: number, currentBalance: number) {
        return isSmartMeter
        ? `Bill projection: ${this.currencyPipe.transform(projectedBill)}`
        : `Account balance: ${this.currencyPipe.transform(Math.abs(currentBalance))} CR`;
    }

    private classifyContractWithNoCredit(fuelChipData: FuelChipDataModel, contract: ContractViewModel): FuelChipDataModel {
        const isSmartMeter = contract.isSmartMeter;
        const currentBalance = contract.currentBalance;
        const projectedBill = contract.projectedBill || 0;

        const primaryMessage = this.formatContractWithNoCreditPrimaryMessage(isSmartMeter, projectedBill, currentBalance);
        const secondaryMessage = this.nextBillIssuedIn(contract.currentBillEndDate);
        const tertiaryMessage = `You can't set up payment assistance because your bill has not been issued yet.`;

        fuelChipData.setClassification(MauiFuelChipState.Ineligible,
            new FuelChipMessage(primaryMessage, undefined,
                secondaryMessage, undefined), tertiaryMessage);

        return fuelChipData;
    }

    private formatContractWithNoCreditPrimaryMessage(isSmartMeter: boolean, projectedBill: number, currentBalance: number) {
        return isSmartMeter
            ? `Bill projection: ${this.currencyPipe.transform(projectedBill)}`
            : `Account balance: ${this.currencyPipe.transform(currentBalance)}`;
    }

    private classifyGenericNoOpenBill(fuelChipData: FuelChipDataModel, contract: ContractViewModel): FuelChipDataModel {
        const newestBill = contract.getNewestBill();
        const daysOverdue: number = newestBill ? this.daysBeforeNow(newestBill.dueDate) : 0;
        const daysDue: number = newestBill ? this.daysAfterNow(newestBill.dueDate) : 0;

        const currentBalance = contract.currentBalance || 0;
        const paymentOverdue = contract.paymentOverdue || 0;
        const totalToPay = currentBalance + paymentOverdue;
        const extendedDueDate = contract.extendedDueDate;

        const primaryMessage = this.formatGenericIneligiblePrimaryMessage(totalToPay);
        const secondaryStatus: MauiSecondaryMessageStatusType = (daysOverdue > 0) ? MauiSecondaryMessageStatusType.Warning : undefined;
        const secondaryMessage = this.formatGenericNoOpenBillSecondaryMessage(contract, newestBill, daysOverdue, daysDue);
        const tertiaryMessage = `You can't set up online payment assistance at this time.`;

        fuelChipData.setClassification(MauiFuelChipState.Ineligible,
            new FuelChipMessage(primaryMessage, undefined,
                secondaryMessage, secondaryStatus), tertiaryMessage);

        return fuelChipData;
    }

    private formatGenericNoOpenBillSecondaryMessage(contract: ContractViewModel, newestBill: BillViewModel, daysOverdue: number, daysDue: number): string {
        if (daysOverdue > 0) {
            return `Overdue by ${daysOverdue} day` + (daysOverdue === 1 ? '' : 's');
        } else {
            return newestBill ?
                `Due ${daysDue} day` + (daysDue === 1 ? '' : 's') :
                this.nextBillIssuedIn(contract.currentBillEndDate);
        }
    }

    private nextBillIssuedIn = (currentBillEndDate: Date) =>
        this.billDescriptionService.nextBillIssuedIn(
            currentBillEndDate,
            'Your next bill will be issued soon',
            'Your next bill is on the way',
            'Next bill issued in'
        )
}
