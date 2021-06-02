import { InstalmentPlanData } from './../../../../../services/paymentScheme/instalmentPlan.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CurrencyPipe } from '@angular/common';
import { Now } from '../../../../../../shared/service/now.service';

import { MauiFuelChipState, FuelChipMessage, MauiSecondaryMessageStatusType } from '../../../../../maui/fuelChip';
import { IAccountServiceMA, AccountViewModel, ContractViewModel } from '../../../../../services/account.service';
import { PaymentExtensionIneligibilityReasons } from '../../../../../services/paymentScheme/paymentExtensionEligibility.service';
import { FuelChipDataModel } from '../../models';
import { FuelChipFilterService } from './fuelChipFilter.service';
import { AglCurrencyPipe } from '../../../../../pipes/aglCurrency.pipe';

@Injectable()
export class AlreadyExtendedFuelChipFilterService extends FuelChipFilterService {
    constructor(private accountService: IAccountServiceMA, now: Now, private currencyPipe: AglCurrencyPipe) {
        super(now);
    }
    public filter(fuelChipDetails: FuelChipDataModel[]): Observable<FuelChipDataModel[]> {

        return new Observable((observer) => {
            this.accountService.getAccounts().subscribe((accounts: AccountViewModel[]) => {

                const alreadyExtendedFuelChipData: FuelChipDataModel[] = fuelChipDetails.reduce((results: FuelChipDataModel[], fuelChipDetail: FuelChipDataModel) => {

                    const account: AccountViewModel = this.getAccount(accounts, fuelChipDetail);
                    const contract: ContractViewModel = this.getContract(account, fuelChipDetail);

                    if (this.canProcessAlreadyExtended(fuelChipDetail, contract)) {
                        this.UpdateFuelChipDetail(contract, fuelChipDetail);
                        return results.concat(fuelChipDetail);
                    } else {
                        return results;
                    }

                }, []);

                observer.next(this.sort(alreadyExtendedFuelChipData));
                observer.complete();

            });
        });
    }

    private getContract(account: AccountViewModel, fuelChipDetail: FuelChipDataModel): ContractViewModel {
        return account.contracts.find((con) => con.contractNumber === fuelChipDetail.contractNumber);
    }

    private getAccount(accounts: AccountViewModel[], fuelChipDetail: FuelChipDataModel): AccountViewModel {
        return accounts.find((acc) => acc.contracts.some((con) => con.contractNumber === fuelChipDetail.contractNumber));
    }

    private UpdateFuelChipDetail(contract: ContractViewModel, fuelChipDetail: FuelChipDataModel) {
        const currentBalance = contract.currentBalance || 0;
        const paymentOverdue = contract.paymentOverdue || 0;
        const totalToPay = currentBalance + paymentOverdue;
        const extendedDueDate = contract.extendedDueDate;
        const primaryMessage = this.formatPrimaryMessage(totalToPay);
        const secondaryMessage = this.formatSecondaryMessage(extendedDueDate, contract.instalmentPlan);
        const secondaryStatus = MauiSecondaryMessageStatusType.Success;
        fuelChipDetail.setClassification(MauiFuelChipState.PostSetupComplete, new FuelChipMessage(primaryMessage, undefined, secondaryMessage, secondaryStatus));
    }

    private formatPrimaryMessage(totalToPay: number) {
        return `Total to pay: ${this.currencyPipe.transform(totalToPay)}`;
    }

    private formatSecondaryMessage(extendedDueDate: Date, instalmentPlan: InstalmentPlanData = null) {

        return (extendedDueDate && !instalmentPlan) ?
            `Extended to ${this.formatDate(extendedDueDate)}` :
            `You've already set up payment assistance for this bill`;
    }

    private canProcessAlreadyExtended(fuelChipDetail: FuelChipDataModel, contract: ContractViewModel): boolean {
        return this.isAlreadyExtended(fuelChipDetail, contract);
    }
}
