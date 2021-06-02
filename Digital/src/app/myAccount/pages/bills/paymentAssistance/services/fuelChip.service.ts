import { Injectable } from '@angular/core';

import { Observable, Subscriber, Observer } from 'rxjs';

import { FuelChipDataModel } from '../models';
import { MauiFuelChipFuelType, FuelChipContractAccountDetails, FuelChipContract, MauiFuelChipFuelContext } from '../../../../maui/fuelChip';
import { IAccountServiceMA, AccountViewModel, ContractViewModel } from '../../../../services/account.service';
import { IPaymentExtensionEligibility, PaymentExtensionContractEligibility } from '../../../../services/paymentScheme/paymentExtensionEligibility.service';
import { IFuelChipClassificationService, ClassifiedFuelChips } from './fuelChipClassification.service';

export abstract class IFuelChipService {
    public abstract get classifiedFuelChips(): ClassifiedFuelChips;
    public abstract init(accountNumber?: string, contractNumber?: string): Observable<ClassifiedFuelChips>;
    public abstract getFuelChip(accountNumber: string, contractNumber: string): FuelChipDataModel;
}

@Injectable()
export class FuelChipService implements IFuelChipService {
    private fuelChipDetails: FuelChipDataModel[] = [];
    private classificationResults: ClassifiedFuelChips;

    public get classifiedFuelChips(): ClassifiedFuelChips {
        return this.classificationResults;
    }

    constructor(private accountService: IAccountServiceMA,
                private paymentExtensionEligibilityService: IPaymentExtensionEligibility,
                private fuelChipClassificationService: IFuelChipClassificationService) {
    }

    // Note accountNumber/contractNumber is not currently in use. This is for potential future support
    public init(accountNumber?: string, contractNumber?: string): Observable<ClassifiedFuelChips> {
        this.fuelChipDetails = [];
        return new Observable((observer: Subscriber<ClassifiedFuelChips>) => {
            this.accountService.getAccounts()
                .subscribe((contractAccounts: AccountViewModel[]) => {
                    let fuelChipAccountDetails = this.buildFuelChipAccountDetails(contractAccounts);

                    let filteredAccounts: AccountViewModel[]
                    = accountNumber ?
                        contractAccounts.filter((account) => account.accountNumber === accountNumber) :
                        contractAccounts;

                    let eligibilityRequestsObservable = this.getEligibilityRequests(filteredAccounts);
                    this.processEligiblityRequests(eligibilityRequestsObservable, observer, contractNumber, filteredAccounts, fuelChipAccountDetails);
                });
        });
    }

    public getFuelChip(accountNumber: string, contractNumber: string): FuelChipDataModel {
        const fuelChips = this.fuelChipDetails.filter((fuelChipDetail) =>
            (fuelChipDetail.accountNumber === accountNumber && fuelChipDetail.contractNumber === contractNumber)
        );

        if (fuelChips.length < 1) {
            console.warn(`Not able to get fuel chip with account number: '${accountNumber}', contractNumber: '${contractNumber}'`);
        }

        return (fuelChips.length > 0) ? fuelChips[0] : null;
    }

    private processEligiblityRequests(eligibilityRequestsObservable, observer: Observer<ClassifiedFuelChips>, contractNumber: string, filteredAccounts: AccountViewModel[], fuelChipAccountDetails: FuelChipContractAccountDetails[]) {

        // subscribe to the eligibility per contract account and classify all of them together in the finally method.
        Observable.merge(...eligibilityRequestsObservable)
            .finally(() => {
                this.fuelChipClassificationService.classify(this.fuelChipDetails)
                    .subscribe((result) => {
                        this.classificationResults = result;
                        observer.next(this.classificationResults);
                        observer.complete();
                    });
            })
            .subscribe((eligibilityResult: PaymentExtensionContractEligibility) => {
                this.processEligibilityResults(contractNumber, eligibilityResult, filteredAccounts, fuelChipAccountDetails);
            });
    }

    private getEligibilityRequests(filteredAccounts: AccountViewModel[]): Array<Observable<{} | PaymentExtensionContractEligibility>> {
        return filteredAccounts.map((contractAccount: AccountViewModel) => {
            return this.paymentExtensionEligibilityService.getContractAccountEligibility(contractAccount.accountNumber);
        })
        .map((obs) => obs.catch(() => Observable.empty()));
    }

    private getFilteredAccounts(accountNumber: string, contractAccounts: AccountViewModel[]): AccountViewModel[] {
        return accountNumber ?
            contractAccounts.filter((account) => account.accountNumber === accountNumber) :
            contractAccounts;
    }

    private processEligibilityResults(contractNumber: string, eligibilityResult: PaymentExtensionContractEligibility, filteredAccounts: AccountViewModel[], fuelChipAccountDetails: FuelChipContractAccountDetails[]) {
        if (!contractNumber || (contractNumber === eligibilityResult.contractNumber)) {
            const contract = this.getContract(eligibilityResult.contractNumber, filteredAccounts);
            // ignore the contract that is restricted or doesnt exist in accountList api
            if (contract) {
                const eligibilityResultAccountNumber = fuelChipAccountDetails.filter((account) => account.contracts.find((c) => c.contractNumber === eligibilityResult.contractNumber))[0].accountNumber;
                let fuelChipData = new FuelChipDataModel(eligibilityResultAccountNumber, eligibilityResult.contractNumber, MauiFuelChipFuelType[contract.fuelType], fuelChipAccountDetails, eligibilityResult, MauiFuelChipFuelContext.Bill);
                this.fuelChipDetails.push(fuelChipData);
            }
        }
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
