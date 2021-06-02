import { browser, promise } from 'protractor';
import { EnvironmentsList, EnvironmentsEntity } from '../models/environments';
import { DataService } from '../services/dataService/dataService';

export type Environment = 'local' | 'obsidian' | 'diamond' | 'uat' | 'bau' | 'monthly_uat' | 'staging' | 'production';
const port: string = browser.params.localPort || 8080;

let currentEnvironment: Environment;
let environmentData: EnvironmentsEntity;

export function setEnvironment(environment: Environment): promise.Promise<Environment> {
    if (!environment) {
        console.error('Error: No environment specified!  Exiting.');
        process.exit(1);
    }

    if (!currentEnvironment) {
        currentEnvironment = environment;
        console.log(`\nEnvironment set to: ${currentEnvironment}\n`);
    }

    return promise.fulfilled(currentEnvironment);
}

export function getCurrentEnvironment(): promise.Promise<string> {
    if (!currentEnvironment) {
        console.error('Error: No environment set!  Exiting.');
        process.exit(1);
    }

    return promise.fulfilled(currentEnvironment);
}

export function getTestDataForCurrentEnvironment(): promise.Promise<EnvironmentsEntity> {
    if (environmentData) {
        return promise.fulfilled(environmentData);
    }

    return DataService.getNameIds<EnvironmentsList>().then((data) => {
        return getCurrentEnvironment().then((environment) => {
            environmentData = data.environments.find((env) => env.envName === environment);
            if (environment === 'local') {
                environmentData.baseURI += `:${port}`;
            }

            return promise.fulfilled(environmentData);
        });
    });
}

let baseApiUrls = {
    'local': () => 'https://localhost:3456/aglWebApi',
    'monthly-uat': () => 'https://apiaglmntuat.api.agl.com.au',
    'diamond': () => 'https://web-qtrtest.api.agl.com.au',
    'obsidian': () => 'https://web-qtrtest.api.agl.com.au',
    'production': () => 'https://api.agl.com.au',
    'staging': () => 'https://api.agl.com.au'
};

export function getEnvironmentApiEndpoints(): promise.Promise<any> {
    return getCurrentEnvironment().then((environment) => {
        let baseApiUrl = baseApiUrls[environment]();

        let apiEndpoints = {
            contactDetail: `${baseApiUrl}/v2/contactdetail`,

            inflightAccountsList: `${baseApiUrl}/api/accounts/list?includeInFlight=true`,

            bills: `${baseApiUrl}/api/v1/bills`,

            pendingPayments: `${baseApiUrl}/api/v1/pendingpayments`,

            payments: `${baseApiUrl}/api/v1/payments`,

            dashboard: `${baseApiUrl}/api/v1/dashboard`,

            prepaymentBalance: `${baseApiUrl}/v2/contracts` // append <contractNumber>/prepaymentbalance in the test when fetching data
        };

        return promise.fulfilled(apiEndpoints);
    });
}
