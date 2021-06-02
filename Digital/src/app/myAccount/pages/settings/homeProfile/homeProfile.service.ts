import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import sortBy from 'lodash-es/sortBy';
import { AccountViewModel, ContractViewModel } from './../../../services/account.service';
import { HomeProfileSummaryApiModel, IHomeProfileApi } from './../../../services/homeProfile/homeProfileApi.service';
import { IAccountServiceMA } from '../../../services/account.service';
import { HomeProfileStatus } from './homeProfileState.service';

@Injectable()
export class HomeProfileService {
    public addressesContracts: AddressContractViewModel[] = [];

    constructor(
        private accountService: IAccountServiceMA,
        private homeProfileApiService: IHomeProfileApi
    ) {
    }

    /**
     * Initiate address-contract relation array
     * Populates this.addressesContracts
     */
    public createAddressContractModel(): Observable<boolean> {
        return Observable.forkJoin(
            this.accountService.getAccounts(),
            this.homeProfileApiService.getProfiles()
        )
        .map(([accounts = [], profileSummaries = []]: [AccountViewModel[], HomeProfileSummaryApiModel[]]) => {
            let contractsHasProfile: string[] = profileSummaries.map((summary) => summary.contractNumber);
            let addressesContracts: AddressContractViewModel[] = [];

            accounts.map((account) => {
                account.contracts.map((contract) => {
                    addressesContracts.push({
                        address: contract.address || account.groupedAddress,
                        accountId: account.accountNumber,
                        contractId: contract.contractNumber,
                        fuelType: contract.fuelType,
                        status: contractsHasProfile.includes(contract.contractNumber) ? HomeProfileStatus.Incomplete : HomeProfileStatus.NotStarted
                    });
                });
            });
            this.addressesContracts = addressesContracts;
            return true;

        }).catch((error) => Observable.of(false));
    }

    /**
     * Get {AddressContractViewModel} contract based on address
     * Address with multiple contracts will return one with profile (if exist) or
     * the first contract from sorted list by fuelType and contractId (if has no profile)
     * @param address
     */
    public getContractForAddress(address: string): AddressContractViewModel {
        let sameAddressContracts: AddressContractViewModel[] = this.addressesContracts.filter((addressContract) => addressContract.address === address);
        let contract: AddressContractViewModel;

        if (sameAddressContracts.length > 1) {
            sameAddressContracts = sortBy(sameAddressContracts, ['fuelType', 'contractId']);
            let contractHasProfile = sameAddressContracts.filter((sac) => sac.status !== HomeProfileStatus.NotStarted);

            contract = contractHasProfile.length === 1 ? contractHasProfile[0] : sameAddressContracts[0];
        } else {
            contract = sameAddressContracts[0];
        }

        return contract;
    }

    public getContractForContractNumber(contractNumber: string): AddressContractViewModel {
        return this.addressesContracts.filter((addressContract) => addressContract.contractId === contractNumber)[0];
    }

    public getUniqueAddresses(): string[] {
        return Array.from(new Set(this.addressesContracts.map((addressContract) => addressContract.address)));
    }
}

export interface AddressContractViewModel {
    address: string;
    accountId: string;
    contractId: string;
    fuelType: string;
    status: HomeProfileStatus;
}
