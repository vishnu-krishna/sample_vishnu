import { promise }from 'protractor';
import { Account } from '../../models/account';

export interface DataServiceInterface {
    getAccountsWithActiveContracts(): promise.Promise<Account[]>;
}
