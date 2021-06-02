import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IAccountServiceMA, AccountViewModel } from '../../../../services/account.service';
import * as _ from 'lodash';

interface ConcessionContractAccount {
    accountNumber: string;
    uniqueFuelAndAddress: AddressFuel[];
}

export interface SplitAddress {
    addressPart1: string;
    addressPart2?: string;
}

interface AddressFuel {
    address: SplitAddress;
    hasGas: boolean;
    hasElec: boolean;
}

@Component({
    selector: 'agl-concession-acccount-selection',
    templateUrl: 'concessionAccountSelection.component.html',
    styleUrls: ['concessionAccountSelection.component.scss'],
})

export class ConcessionAccountSelectionComponent implements OnInit {
    public hoveredAccount: number = null;
    public accountsList: ConcessionContractAccount[];
    public isLoading: boolean = false;

    public anyAccountHasElec: boolean;
    public anyAccountHasGas: boolean;

    constructor(private router: Router,
                private accountService: IAccountServiceMA) {
    }

    public ngOnInit(): void {
        this.isLoading = true;
        this.accountService.getAccounts()
            .finally(() => this.isLoading = false)
            .subscribe((accounts: AccountViewModel[]) => {
                if (accounts.length > 1) {
                    this.anyAccountHasGas = accounts.some((singleAccount) =>
                        singleAccount.contracts.some((contract) => contract.isGas));
                    this.anyAccountHasElec = accounts.some((singleAccount) =>
                        singleAccount.contracts.some((contract) => contract.isElectricity));

                    this.accountsList = accounts.map((account) => {
                        return (
                            {
                                uniqueFuelAndAddress: this.getAddresses(account),
                                accountNumber: account.accountNumber
                            }
                        );
                    });
                } else {
                    console.error(`Invalid navigation: concessionAccountSelection does not support single accounts.`);
                    this.router.navigate(['/settings/personal']);
                }
            });
    }

    public onClickSelectedAccount(selectedAccount: ConcessionContractAccount): void {
        this.router.navigate(['/settings/concession/selectfuel', selectedAccount.accountNumber]);
    }

    public mouseEntered(index: number) {
        this.hoveredAccount = index;
    }

    public mouseLeave() {
        this.hoveredAccount = null;
    }

    private getFuelTypes(accountNumber: AccountViewModel): string[] {
        return this.uniqueArray(accountNumber.contracts.map((contract) => contract.fuelType));
    }

    private uniqueArray(array: any[]): any[] {
        return array.filter((value, index, self) => {
            return self.indexOf(value) === index;
        });
    }

    private getAddresses(account: AccountViewModel): AddressFuel[] {
        return _(account.contracts)
            .groupBy((x) => account.groupedAddress || x.address)
            .map((value, key) => ({
                address: this.breakLongAddress(key),
                hasGas: value.some((contract) => contract.isGas),
                hasElec: value.some((contract) => contract.isElectricity)
            }))
            .value();
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
}
