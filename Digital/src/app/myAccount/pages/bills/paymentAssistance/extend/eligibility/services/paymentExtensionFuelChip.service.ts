import { Injectable } from '@angular/core';

import { Subscriber, Observable } from 'rxjs';

import { FuelChipContract, FuelChipContractAccountDetails, MauiFuelChipFuelContext, MauiFuelChipFuelType } from '../../../../../../maui/fuelChip/index';
import { AccountViewModel, ContractViewModel, IAccountServiceMA } from '../../../../../../services/account.service';
import { IPaymentExtensionEligibility, PaymentExtensionContractEligibility } from '../../../../../../services/paymentScheme/paymentExtensionEligibility.service';
import { FuelChipData } from '../fuelChipData';
import { ClassifiedFuelChips, IFuelChipClassificationService } from './fuelChipClassification.service';

export abstract class IPaymentExtensionFuelChipService {
    public abstract get classifiedFuelChips(): ClassifiedFuelChips;
    public abstract init(accountNumber?: string, contractNumber?: string): Observable<ClassifiedFuelChips>;
}

@Injectable()
export class PaymentExtensionFuelChipService implements IPaymentExtensionFuelChipService {
    private fuelChipDetails: FuelChipData[] = [];
    private classificationResults: ClassifiedFuelChips;

    public get classifiedFuelChips(): ClassifiedFuelChips {
        return this.classificationResults;
    }

    constructor(private accountService: IAccountServiceMA,
                private paymentExtensionEligibilityService: IPaymentExtensionEligibility,
                private fuelChipClassificationService: IFuelChipClassificationService) {
    }

    // TODO:
    // Adding "accountNumber" and "contractNumber" to init() is not ideal, the init function was initially designed to run once per page load.
    // It works in overview page even it is called multiple times, because all subscribe functions from init() are run after its resetting the fuelChipDetails array, no fuelChipDetail data will be deleted from reset.
    // However the version of init() with parameter can potentially be misused. So we need to think about the design again, whether we should prohibit init() be called multiple time on one page load or redefine the init().
    // It's a bit work, after having discussed it with Rob, we decide to engage it in future refactor work.
    public init(accountNumber?: string, contractNumber?: string): Observable<ClassifiedFuelChips> {
        this.fuelChipDetails = [];
        return new Observable((observer: Subscriber<ClassifiedFuelChips>) => {
            this.accountService.getAccounts().subscribe((contractAccounts: AccountViewModel[]) => {
                let fuelChipAccountDetails = this.buildFuelChipAccountDetails(contractAccounts);

                let filteredAccounts: AccountViewModel[]
                    = accountNumber ?
                        contractAccounts.filter((account) => account.accountNumber === accountNumber) :
                        contractAccounts;

                let eligibilityRequests = filteredAccounts.map((contractAccount: AccountViewModel) => {
                    return this.paymentExtensionEligibilityService.getContractAccountEligibility(contractAccount.accountNumber);
                }).map((obs) => obs.catch(() => Observable.empty()));

                // subscribe to the eligibility per contract account and classify all of them together in the finally method.
                Observable.merge(...eligibilityRequests)
                    .finally(() => {
                        this.fuelChipClassificationService.classify(this.fuelChipDetails)
                            .subscribe((result) => {
                                this.classificationResults = result;
                                observer.next(this.classificationResults);
                                observer.complete();
                            });
                    })
                    .subscribe((eligibilityResult: PaymentExtensionContractEligibility) => {
                        if (!contractNumber || (contractNumber === eligibilityResult.contractNumber)) {
                            const contract = this.getContract(eligibilityResult.contractNumber, filteredAccounts);

                            // ignore the contract that is restricted or doesnt exist in accountList api
                            if (contract) {
                                const eligibilityResultAccountNumber = fuelChipAccountDetails.filter((account) => account.contracts.find((c) => c.contractNumber === eligibilityResult.contractNumber))[0].accountNumber;

                                let fuelChipData = new FuelChipData(
                                    eligibilityResultAccountNumber,
                                    eligibilityResult.contractNumber,
                                    MauiFuelChipFuelType[contract.fuelType],
                                    fuelChipAccountDetails,
                                    eligibilityResult,
                                    MauiFuelChipFuelContext.Bill
                                );

                                this.fuelChipDetails.push(fuelChipData);
                            }
                        }
                    });
            });
        });
    }

    private buildFuelChipAccountDetails(contractAccounts: AccountViewModel[]): FuelChipContractAccountDetails[] {
        return contractAccounts.map((contractAccount: AccountViewModel) =>
            new FuelChipContractAccountDetails(contractAccount.accountNumber,
                contractAccount.contracts.map((contract: ContractViewModel) => new FuelChipContract(contract.contractNumber,
                    contractAccount.groupedAddress || contract.address,
                    MauiFuelChipFuelType[contract.fuelType],
                    contract.regionId))));
    }

    private getContract(contractNumber: string, contractAccounts: AccountViewModel[]): ContractViewModel {
        const contractAccount = contractAccounts.find((ca) => !ca.allContractsAreRestricted
            && ca.contracts.some((contract) => !contract.isRestricted && contract.contractNumber === contractNumber));
        return contractAccount ? contractAccount.contracts.find((contract) => contract.contractNumber === contractNumber) : null;
    }
}
