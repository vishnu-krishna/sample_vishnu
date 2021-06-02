import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IConcessionStateService } from '../services/concessionState.service';
import { Observable } from 'rxjs/Observable';
import { AccountViewModel, IAccountServiceMA } from '../../../../services/account.service';
import { ConcessionContract, Concession } from '../concession';
import { SplitAddress } from '../selectAccount/concessionAccountSelection.component';
import { size, at } from 'lodash';

interface ConcessionContractSelection {
    address: SplitAddress;
    accountNumber: string;
    isGas: boolean;
    isElec: boolean;
    fuelType: string;
    regionId: string;
}

@Component({
    selector: 'agl-concession-contract-selection',
    templateUrl: 'concessionContractSelection.component.html',
    styleUrls: ['concessionContractSelection.component.scss'],
})

export class ConcessionContractSelectionComponent implements OnInit {
    public isLoading: boolean = true;
    public accountHolderName: string;
    public contractAccount: ConcessionContractSelection[];
    public sameFuelError: boolean = false;
    public selectedContracts: ConcessionContract[] = [];
    private concession: Concession;

    constructor(private router: Router,
                private accountService: IAccountServiceMA,
                private concessionStateService: IConcessionStateService,
                private route: ActivatedRoute) {
    }

    public ngOnInit(): void {
        this.concession = this.concessionStateService.getCurrentConcession();
        this.accountHolderName = this.concession.accountHolderName;

        let contractAccountId = this.route.snapshot.paramMap.get('contractAccountId');
        this.getContractAccount(contractAccountId)
            .finally(() => this.isLoading = false)
            .subscribe((result: AccountViewModel) => {
                this.contractAccount = result.contracts
                                             .map((contract) => ({
                                                 address: this.breakLongAddress(result.groupedAddress || contract.address),
                                                 accountNumber: result.accountNumber,
                                                 isGas: contract.isGas,
                                                 isElec: contract.isElectricity,
                                                 fuelType: contract.fuelType,
                                                 regionId: contract.regionId
                                             }));
            });
    }

    public checkBoxSelected(selectedContractIndex: number[]): void {
        this.sameFuelError = false;
        this.selectedContracts = [];
        let electricityContracts: ConcessionContractSelection[] = at(this.contractAccount, selectedContractIndex)
            .filter((contract) => contract.isElec);
        let gasContracts: ConcessionContractSelection[] = at(this.contractAccount, selectedContractIndex)
            .filter((contract) => contract.isGas);

        // determine the duplicate fuel
        if (electricityContracts.length > 1 || gasContracts.length > 1) {
            this.sameFuelError = true;
        }
        let allContracts = [...electricityContracts, ...gasContracts];
        if (size(allContracts)) {
            this.selectedContracts = allContracts.map((contract) => {
                let address = contract.address.addressPart1 + contract.address.addressPart2;
                return (
                    {
                        contractNumber: contract.accountNumber,
                        address: address,
                        regionId: contract.regionId,
                        fuelType: contract.fuelType
                    }
                );
            });
        }
    }

    public get continueButtonEnabled(): boolean {
        return !this.sameFuelError && this.selectedContracts.length > 0;
    }

    public continue(): void {
        this.concession.setSelectedContracts(this.selectedContracts);
        this.router.navigate(['/settings/concession/confirmdetails']);
    }

    private breakLongAddress(address: string): SplitAddress {
        let result = address.split(/([a-z]{2,3}\s+\d{4})$/i);
        if (result.length >= 2) {
            return {
                addressPart1: result[0],
                addressPart2: result[1]
            };
        }
        return { addressPart1: result[0] };
    }

    private getContractAccount(contractAccountNumber: string): Observable<AccountViewModel> {
        return this.accountService.getAccounts()
                   .map((accounts) => {
                       return accounts.find((account) => {
                           return account.accountNumber === contractAccountNumber;
                       });
                   });
    }
}
