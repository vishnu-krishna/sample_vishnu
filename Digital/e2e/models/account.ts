import { Contract } from './contract';

export interface Account {
    contracts: Contract[];
    firstName: string;
    lastName: string;
    number: string;
    pushEnabled: boolean;
}
