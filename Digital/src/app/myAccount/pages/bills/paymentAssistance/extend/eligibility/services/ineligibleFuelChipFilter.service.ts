import { Injectable } from '@angular/core';

import { Observable, Subscriber } from 'rxjs';

import { Now } from '../../../../../../../shared/service/now.service';
import { FuelChipMessage, MauiFuelChipState } from '../../../../../../maui/fuelChip/index';
import { AccountViewModel, ContractViewModel, IAccountServiceMA } from '../../../../../../services/account.service';
import { PaymentExtensionIneligibilityReasons } from '../../../../../../services/paymentScheme/paymentExtensionEligibility.service';
import { FuelChipData } from '../fuelChipData';
import { FuelChipFilterService } from './fuelChipFilter.service';
import { AglCurrencyPipe } from '../../../../../../pipes/aglCurrency.pipe';

@Injectable()
export class IneligibleFuelChipFilterService extends FuelChipFilterService {
    constructor(private accountService: IAccountServiceMA, now: Now, private currencyPipe: AglCurrencyPipe) {
        super(now);
    }
    public filter(fuelChipDetails: FuelChipData[]): Observable<FuelChipData[]> {
        let results: FuelChipData[] = [];

        return new Observable((observer: Subscriber<FuelChipData[]>) => {
            this.accountService.getAccounts().subscribe((accounts: AccountViewModel[]) => {

                fuelChipDetails.forEach((fuelChipDetail) => {
                    let account: AccountViewModel = accounts.find((acc) => acc.contracts.some((con) => con.contractNumber === fuelChipDetail.contractNumber));
                    let contract: ContractViewModel = account.contracts.find((con) => con.contractNumber === fuelChipDetail.contractNumber);

                    if (this.canProcess(fuelChipDetail, contract)) {
                        if (fuelChipDetail.eligibility.reasonForIneligibility === PaymentExtensionIneligibilityReasons.Payg) {
                            results.push(this.classifyPayg(fuelChipDetail));
                        } else if (fuelChipDetail.eligibility.reasonForIneligibility === PaymentExtensionIneligibilityReasons.ExistingPaymentArrangement) {
                            results.push(this.classifyExistingPaymentArrangement(fuelChipDetail));
                        } else if (fuelChipDetail.eligibility.reasonForIneligibility === PaymentExtensionIneligibilityReasons.TechnicalError) {
                            results.push(this.classifyTechnicalError(fuelChipDetail));
                        } else if (fuelChipDetail.eligibility.reasonForIneligibility === PaymentExtensionIneligibilityReasons.BrokenAccount) {
                            results.push(this.classifyBrokenAccount(fuelChipDetail, contract));
                        } else {
                            results.push(this.classifyGenericIneligible(fuelChipDetail, contract));
                        }
                    }
                });
                observer.next(this.sort(results));
                observer.complete();

            });
        });
    }

    private canProcess(fuelChipDetail: FuelChipData, contract: ContractViewModel): boolean {
        return !fuelChipDetail.eligibility.isEligible
            && !this.isAlreadyExtended(fuelChipDetail, contract)
            && !this.hasNoIssuedBill(fuelChipDetail, contract)
            && !this.isBrokenAccountWithNoBill(fuelChipDetail, contract);
    }

    private classifyTechnicalError(fuelChipData: FuelChipData): FuelChipData {
        const primaryMessage = '';
        const tertiaryMessage = `You can't set up a payment extension at this time. Please call us to discuss your account.`;

        fuelChipData.setClassification(MauiFuelChipState.Ineligible,
            new FuelChipMessage(primaryMessage), tertiaryMessage);

        return fuelChipData;
    }

    private classifyBrokenAccount(fuelChipData: FuelChipData, contract: ContractViewModel) {
        const newestBill = contract.getNewestBill();
        const daysOverdue = newestBill ? this.daysBeforeNow(newestBill.dueDate) : 0;

        const currentBalance = contract.currentBalance || 0;
        const paymentOverdue = contract.paymentOverdue || 0;
        const totalToPay = currentBalance + paymentOverdue;
        const extendedDueDate = contract.extendedDueDate;
        const primaryMessage = `Total to pay: ${this.currencyPipe.transform(totalToPay)}`;
        let secondaryMessage = '';
        if (daysOverdue > 0) {
            secondaryMessage = `Overdue by ${daysOverdue} day` + (daysOverdue === 1 ? '' : 's');
        } else {
            secondaryMessage = newestBill ? `Due ${this.formatDate(newestBill.dueDate)}` : '';
        }
        const tertiaryMessage = `You can't set up a payment extension at this time. Please call us to discuss your account.`;

        fuelChipData.setClassification(MauiFuelChipState.Ineligible,
            new FuelChipMessage(primaryMessage, undefined,
                secondaryMessage, undefined), tertiaryMessage);

        return fuelChipData;
    }

    private classifyPayg(fuelChipData: FuelChipData): FuelChipData {
        const primaryMessage = '';
        const tertiaryMessage = `You can't set up a payment extension because you're on AGL Prepaid.`;

        fuelChipData.setClassification(MauiFuelChipState.Ineligible,
            new FuelChipMessage(primaryMessage), tertiaryMessage);

        return fuelChipData;
    }

    private classifyExistingPaymentArrangement(fuelChipData: FuelChipData): FuelChipData {
        const primaryMessage = '';
        const tertiaryMessage = `You've got an existing payment arrangement set up. Please call us to discuss your options.`;

        fuelChipData.setClassification(MauiFuelChipState.Ineligible,
            new FuelChipMessage(primaryMessage), tertiaryMessage);

        return fuelChipData;
    }

    private classifyGenericIneligible(fuelChipData: FuelChipData, contract: ContractViewModel): FuelChipData {
        const newestBill = contract.getNewestBill();
        const daysOverdue: number = newestBill ? this.daysBeforeNow(newestBill.dueDate) : 0;

        const currentBalance = contract.currentBalance || 0;
        const paymentOverdue = contract.paymentOverdue || 0;
        const totalToPay = currentBalance + paymentOverdue;
        const extendedDueDate = contract.extendedDueDate;
        const primaryMessage = `Total to pay: ${this.currencyPipe.transform(totalToPay)}`;
        let secondaryMessage = '';
        if (daysOverdue > 0) {
            secondaryMessage = `Overdue by ${daysOverdue} day` + (daysOverdue === 1 ? '' : 's');
        } else {
            secondaryMessage = newestBill ? `Due ${this.formatDate(newestBill.dueDate)}` : '';
        }
        const tertiaryMessage = `You can't set up a payment extension at this time. Please call us to discuss your account.`;

        fuelChipData.setClassification(MauiFuelChipState.Ineligible,
            new FuelChipMessage(primaryMessage, undefined,
                secondaryMessage, undefined), tertiaryMessage);

        return fuelChipData;
    }
}
