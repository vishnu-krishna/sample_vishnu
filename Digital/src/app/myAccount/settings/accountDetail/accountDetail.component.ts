import { Component, Input, OnInit } from '@angular/core';
import { AccountViewModel, ContractViewModel } from '../../services/account.service';

@Component({
    selector: 'agl-settings-account-detail',
    templateUrl: './accountDetail.component.html',
    styleUrls: ['./accountDetail.component.scss'],
})
export class AccountDetailComponent implements OnInit {
    @Input() public model: AccountDetailComponentModel;
    public elecIcons: number[];
    public gasIcons: number[];

    public ngOnInit() {
        this.elecIcons = new Array<number>(this.model.numberOfElectricityIcons).fill(1);
        this.gasIcons = new Array<number>(this.model.numberOfGasIcons).fill(1);
    }
}

export class AccountDetailComponentModel {
    public contractAccountNumber: string;
    public numberOfElectricityIcons: number;
    public numberOfGasIcons: number;
    public supplyAddresses = new Array<string>();
    public hasSingleContract: boolean;
    public regionId: string;
    public doesAccountHaveBasicMeter: boolean;
    public contracts: ContractViewModel[];
    public isDirectDebit?: boolean;

    public constructor(account?: AccountViewModel) {
        if (account) {
            this.contracts = account.contracts;
            this.contractAccountNumber = account.accountNumber;
            this.supplyAddresses = account.contracts
                .reduce((acc, contract) => {
                    const contractAddress = contract.addressRaw;
                    if (acc.indexOf(contractAddress) < 0 && !contract.isRestricted) {
                        acc.push(contractAddress);
                    }
                    return acc;
                }, []);

            this.numberOfGasIcons = account.contracts.filter((contract) => {
                if (!contract.isRestricted) { return contract.isGas; }
            }).length;
            this.numberOfElectricityIcons = account.contracts.filter((contract) => {
                if (!contract.isRestricted) { return contract.isElectricity; }
            }).length;
        }
    }
}
