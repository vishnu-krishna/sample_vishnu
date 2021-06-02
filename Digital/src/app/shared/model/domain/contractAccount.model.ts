import { AddressModel } from './address.model';
import { ContractModel } from './contract.model';

export interface ContractAccountModel {
    id: string;
    customerType: string;
    isGasAddable: boolean;
    isElecAddable: boolean;
    address: string;
    contracts: ContractModel[];
    addresses: AddressModel[];
    state: string;
    addablePlans?: any;
    siteSearchModel?: any;
    contractSolarSite?: any;
}
