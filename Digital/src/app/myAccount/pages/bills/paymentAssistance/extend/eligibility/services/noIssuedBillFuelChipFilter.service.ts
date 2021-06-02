import { Injectable } from '@angular/core';

import { Observable, Subscriber } from 'rxjs';
import * as moment from 'moment';

import { Now } from '../../../../../../../shared/service/now.service';
import { FuelChipMessage, MauiFuelChipState } from '../../../../../../maui/fuelChip/index';
import { AccountViewModel, ContractViewModel, IAccountServiceMA } from '../../../../../../services/account.service';
import { PaymentExtensionIneligibilityReasons } from '../../../../../../services/paymentScheme/paymentExtensionEligibility.service';
import { FuelChipData } from '../fuelChipData';
import { FuelChipFilterService } from './fuelChipFilter.service';
import { AglCurrencyPipe } from '../../../../../../pipes/aglCurrency.pipe';
import { BillDescriptionService } from '../../../../../../services/billDescription.service';

@Injectable()
export class NoIssuedBillFuelChipFilterService extends FuelChipFilterService {
    constructor(
        private accountService: IAccountServiceMA,
        now: Now,
        private currencyPipe: AglCurrencyPipe,
        private billDescriptionService: BillDescriptionService) {
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
                        if (fuelChipDetail.eligibility.reasonForIneligibility === PaymentExtensionIneligibilityReasons.UnableToExtendOnlineOrNoIssuedBill && contract.currentBalance < 0 ||
                            fuelChipDetail.eligibility.reasonForIneligibility === PaymentExtensionIneligibilityReasons.Unknown && contract.paymentTotal < 0) {
                            results.push(this.classifyContractWithCredit(fuelChipDetail, contract));
                        } else if (fuelChipDetail.eligibility.reasonForIneligibility === PaymentExtensionIneligibilityReasons.BrokenAccount) {
                            results.push(this.classifyBrokenAccount(fuelChipDetail));
                        } else {
                            results.push(this.classifyContractWithNoCredit(fuelChipDetail, contract));
                        }
                    }
                });
                observer.next(this.sort(results));
                observer.complete();

            });
        });
    }

    private canProcess(fuelChipDetail: FuelChipData, contract: ContractViewModel): boolean {
        return this.hasNoIssuedBill(fuelChipDetail, contract) || this.isBrokenAccountWithNoBill(fuelChipDetail, contract);
    }

    private classifyBrokenAccount(fuelChipData: FuelChipData): FuelChipData {
        const primaryMessage = '';
        const tertiaryMessage = `Your bill can't be extended because it has not been issued yet.`;

        fuelChipData.setClassification(MauiFuelChipState.Ineligible,
            new FuelChipMessage(primaryMessage), tertiaryMessage);

        return fuelChipData;
    }

    private classifyContractWithCredit(fuelChipData: FuelChipData, contract: ContractViewModel): FuelChipData {
        const currentBalance = contract.currentBalance;
        const primaryMessage = `Account balance: ${this.currencyPipe.transform(Math.abs(currentBalance))} CR`;

        const secondaryMessage = this.nextBillIssuedIn(contract.currentBillEndDate);

        const tertiaryMessage = `Your bill can't be extended because your account balance is in credit.`;

        fuelChipData.setClassification(MauiFuelChipState.Ineligible,
            new FuelChipMessage(primaryMessage, undefined,
                secondaryMessage, undefined), tertiaryMessage);

        return fuelChipData;
    }

    private classifyContractWithNoCredit(fuelChipData: FuelChipData, contract: ContractViewModel): FuelChipData {
        const isSmartMeter = contract.isSmartMeter;
        const currentBalance = contract.currentBalance;
        const projectedBill = contract.projectedBill || 0;

        const primaryMessage = isSmartMeter
            ? `Projection: ${this.currencyPipe.transform(projectedBill)}`
            : `Account balance: ${this.currencyPipe.transform(currentBalance)}`;

        const secondaryMessage = this.nextBillIssuedIn(contract.currentBillEndDate);

        const tertiaryMessage = `Your bill can't be extended because it has not been issued yet.`;

        fuelChipData.setClassification(MauiFuelChipState.Ineligible,
            new FuelChipMessage(primaryMessage, undefined,
                secondaryMessage, undefined), tertiaryMessage);

        return fuelChipData;
    }

    private nextBillIssuedIn = (currentBillEndDate: Date) =>
        this.billDescriptionService.nextBillIssuedIn(
            currentBillEndDate,
            'Your next bill will be issued soon',
            'Your next bill is on the way',
            'Next bill issued in'
        )
}
