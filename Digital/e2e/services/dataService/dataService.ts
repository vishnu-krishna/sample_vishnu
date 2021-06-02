import { Account } from './../../models/account';
import { Contract } from './../../models/contract';
import { browser, promise } from 'protractor';
import { DataProvider } from '../../enums/enums';
import * as protractor from 'protractor';
import { DataServiceInterface } from './dataServiceInterface';
import * as httpClient from '../../utilities/httpClient';
import * as fs from 'fs';
import { sessionStorage } from '../../utilities/storage';

export class DataService implements DataServiceInterface {

    public static getNameIds<T>(): promise.Promise<T> {
        console.log('Fetching name id\'s from the environments file');

        return new protractor.promise.Promise((resolve, reject) => {

            let data = fs.readFileSync(DataService.filePath, 'utf8');
            let parsed: T = JSON.parse(data);

            if (!parsed) {
                throw new Error(`Was unable to parse mock data for type of ${typeof parsed} data.`);
            }

            console.log('Successfully fetched name id\'s');
            return resolve(parsed);
        });
    }

    private static filePath: string = 'e2e/environments.json';

    constructor(private uri: string) {

    }

    public getAccountsWithActiveContracts(): promise.Promise<Account[]> {
        let customerAccounts: Account[];

        return this.getData<Account[]>().then((data) => {
            if (!data) {
                throw new Error ('No data was returned from the data service.');
            }

            customerAccounts = data.filter((account: Account) => {
                let contracts = account.contracts.filter((contract: Contract) => contract.isRestricted === false);
                return contracts.length > 0;
            });

            return new promise.Promise((resolve, reject) => {
                return resolve(customerAccounts);
            });
        });
    }

    private getData<T>(): promise.Promise<T> {
        return new protractor.promise.Promise((resolve, reject) => {
            let data: T;

            let cb = (err, res) => {
                if (err) {
                    throw new Error();
                }

                data = <T> JSON.parse(res);

                if (!data) {
                    throw new Error(`Was unable to prase mock data for type of ${typeof data} data.`);
                }
            };

            // *** Ignore the Self Signed Certificate error ***
            process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
            // ************************************************

            let options = {
                method: 'GET',
                url: this.uri,
                headers: { 'content-type': 'application/json' }
            };

            return sessionStorage.getStorageItem('Bearer')
                            .then((bearerToken: string) => {
                                return httpClient.get(options, bearerToken, cb).then(() => {
                                    return resolve(data);
                                });
                            });
        });
    }
}
