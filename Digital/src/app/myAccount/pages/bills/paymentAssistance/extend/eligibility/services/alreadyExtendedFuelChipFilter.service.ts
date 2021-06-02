import { Injectable } from '@angular/core';

import { Observable, Subscriber } from 'rxjs';

import { Now } from '../../../../../../../shared/service/now.service';

import { FuelChipMessage, MauiFuelChipState, MauiSecondaryMessageStatusType } from '../../../../../../maui/fuelChip/index';
import { AccountViewModel, ContractViewModel, IAccountServiceMA } from '../../../../../../services/account.service';
import { FuelChipData } from '../fuelChipData';
import { FuelChipFilterService } from './fuelChipFilter.service';
import { AglCurrencyPipe } from '../../../../../../pipes/aglCurrency.pipe';

@Injectable()
export class AlreadyExtendedFuelChipFilterService extends FuelChipFilterService {
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

                        const currentBalance = contract.currentBalance || 0;
                        const paymentOverdue = contract.paymentOverdue || 0;
                        const totalToPay = currentBalance + paymentOverdue;
                        const extendedDueDate = contract.extendedDueDate;
                        const primaryMessage = `Total to pay: ${this.currencyPipe.transform(totalToPay)}`;
                        const secondaryMessage = `Extended to ${this.formatDate(extendedDueDate)}`;
                        const secondaryStatus = MauiSecondaryMessageStatusType.Success;

                        fuelChipDetail.setClassification(MauiFuelChipState.PostSetupComplete,
                            new FuelChipMessage(primaryMessage, undefined,
                                secondaryMessage, secondaryStatus));

                        results.push(fuelChipDetail);
                    }
                });
                observer.next(this.sort(results));
                observer.complete();

            });
        });
    }

    private canProcess(fuelChipDetail: FuelChipData, contract: ContractViewModel): boolean {
        return this.isAlreadyExtended(fuelChipDetail, contract);
    }
}
