import { concat } from 'rxjs/operator/concat';
import { Auth0KeysModel, Auth0GlobalKeys } from './../impersonationService/auth0KeysModel';
import { AuthenticationContext, TokenResponse } from 'adal-node';
import { browser, promise } from 'protractor';
import { KeyVaultClient as KeyVault } from 'azure-keyvault';
import { KeyVaultCredentials } from 'ms-rest-azure';
import * as fs from 'fs';
import { ImpersonationService } from '../impersonationService/impersonationService';
import { getAzureKeysAndVersionsForEnvironment } from './azureKeysAndVersions';
import { getCurrentEnvironment } from '../../utilities/environment';

// Azure Key Vault Client Id
const clientId = 'f7265759-6c6b-403c-b2f2-f0d3908faf7f';
// Azure Key Vault Base Url
const baseUrl = 'https://myacc-test-automation.vault.azure.net';

export class AzureVaultService {

    impersonationGlobals: Auth0GlobalKeys;
    impersonationAttrs: Auth0KeysModel;

    constructor() {
        this.impersonationGlobals = new Auth0GlobalKeys();
        this.impersonationAttrs = new Auth0KeysModel();
    }

    public getKeysFromAzure(): promise.Promise<Auth0KeysModel> {
        return getCurrentEnvironment().then((environment) => {
        // Get environment specific Azure key names and versions object from azureKeysAndVersions.ts
            let azureKeyNamesAndVersionsForEnvirnoment = getAzureKeysAndVersionsForEnvironment(environment);

            // Set values, that aren't stored in the Azure Key Vault, for Auth0 impersonation
            this.impersonationGlobals.domain = azureKeyNamesAndVersionsForEnvirnoment.domain;
            this.impersonationAttrs.globals = this.impersonationGlobals,
            this.impersonationAttrs.callbackUrl = azureKeyNamesAndVersionsForEnvirnoment.callbackUrl;

            let propertyNames = Object.keys(azureKeyNamesAndVersionsForEnvirnoment);

            let promises = [];
            propertyNames.forEach((propertyName) => {

                let property = azureKeyNamesAndVersionsForEnvirnoment[propertyName];

                // Make the Azure request only if the property is an array
                // i.e. contains a key name and version number
                if (property instanceof Array) {
                    // As we're making azure requests one key at a time,
                    // we're creating a promises array. this.makeAzureRequest returns a promise
                    promises.push(this.makeAzureRequest(propertyName, property[0], property[1]));
                }
            });

            // We only return once all promises in the promises array are resolved
            return promise.fullyResolved(promises).then(() => this.impersonationAttrs);
        });
    }

    private makeAzureRequest(key: string, secretName: string, secretVersion: string): promise.Promise<any> {

        return new promise.Promise((resolve, reject) => {
            this.client.getSecret(baseUrl, secretName, secretVersion, null, (err, result) => {

                if (err) {
                    throw err;
                }

                const keyMapper = {
                    globalClientSecret: () => this.impersonationAttrs.globals.globalClientSecret = result.value,
                    globalClientId: () => this.impersonationAttrs.globals.globalClientId = result.value,
                    clientSecret: () => this.impersonationAttrs.clientSecret = result.value,
                    clientId: () => this.impersonationAttrs.clientId = result.value,
                    testAutomationclientid: () => this.impersonationAttrs.testAutomationclientid = result.value,
                    testAutomationclientsecret: () => this.impersonationAttrs.testAutomationclientsecret = result.value,
                };

                // execute the function in keyMapper based on the passed in key
                keyMapper[key]();

                return resolve(result.value);
            });
        });
    }

    // Azure authorization based on a Self Signed Certificate
    certificateAuthenticator = (challenge, callback): promise.Promise<any> => {
        return new promise.Promise((resolve, reject) => {
            let context = new AuthenticationContext(challenge.authorization);
            let thumbprint = '0FC925EAFCA26280D17C43A0577A76C8CCBCE61E';

            return this.getPrivateKey('e2e/ssl/key.pem').then((pem) => {
                return context.acquireTokenWithClientCertificate(
                    challenge.resource,
                    clientId,
                    pem,
                    thumbprint,
                    (err: Error, tokenResponse: TokenResponse) => {

                        if (err) {
                            throw err;
                        }

                        let authorizationValue = tokenResponse.tokenType + ' ' + tokenResponse.accessToken;
                        return resolve(callback(null, authorizationValue));
                    }
                );
            });
        });
    }

    credentials = new KeyVaultCredentials(this.certificateAuthenticator, {});
    client = new KeyVault(this.credentials);

    private getPrivateKey(filename: string): promise.Promise <any> {
        return new promise.Promise((resolve, reject) => {
            let privatePem = fs.readFileSync(filename, { encoding: 'utf8' });
            return resolve(privatePem);
        });
    }
}
