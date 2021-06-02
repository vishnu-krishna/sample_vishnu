import { ContractModel } from './contract.model';

export interface AddressModel {
    fullAddress: string;
    contracts: ContractModel[];
}
