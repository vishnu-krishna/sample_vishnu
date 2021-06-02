import * as httpClient from '../../utilities/httpClient';
import { promise, browser } from 'protractor';
import * as request from 'request';
import { localStorage } from '../../utilities/storage';
import { Auth0KeysModel } from './auth0KeysModel';
import { AzureVaultService } from '../azureServices/azureKeyVaultService';
import { goToPage } from '../../utilities/navigator';

export class ImpersonationService {

    constructor(private auth0Keys: Auth0KeysModel) {
    }

    public impersonate(nameId: string): promise.Promise<any> {

        // First, grab a bearer token from Auth0 for the Auth0 Management Api V2
        return this.getAuth0ManagementAPIBearerToken().then((token) => {

            // Use the token to find the User by Name Id in Auth0
            return this.getUser(token, nameId, (error: string, user: any): promise.Promise<any> => {

                if (error) {
                    throw new Error (error);
                }
                if (!user || user.length < 1) {
                    throw new Error( 'Profile with the specified znamed_id was not found');
                }

                // Create an options object which'll be used to get another token
                // so that we're able to make the actual impersonation call later on
                let optionsWithGlobalsAndNoAudience = {
                    method: 'POST',
                    url: `${this.auth0Keys.globals.domain}/oauth/token`,
                    headers: { 'content-type': 'application/json' },
                    body: {
                        // Here we use the Auth0 Environment Global Client Id and Client Secret
                        // And we do not have an audience property in the body
                        client_id: this.auth0Keys.globals.globalClientId,
                        client_secret: this.auth0Keys.globals.globalClientSecret,
                        grant_type: 'client_credentials'
                    },
                    json: true
                };

                // Navigate to the environment specific AGL site
                // so that we're able to save cookies
                return goToPage('/').then(() => {

                    // *****************************************************************
                    // CREATE AND SAVE COOKIES WITH SPECIFIC NAMES i.e. oidcn and oidcs
                    // *****************************************************************
                    let nonce = Math.random().toString(36);
                    (browser.manage() as any).addCookie({ name: 'oidcn', value: nonce });

                    let randomState = Math.random().toString(35);
                    (browser.manage() as any).addCookie({ name: 'oidcs', value: randomState });

                    let forImpersonateCall = {
                        XsrfNonce: randomState
                    };

                    let stringifiedJson = JSON.stringify(forImpersonateCall);
                    let encodedState = Buffer.from(stringifiedJson).toString('base64');

                    // Use the options created above, to fetch a token
                    // so that we can make the Impersonation call to Auth0
                    return this.getAuth0ManagementAPIBearerToken(optionsWithGlobalsAndNoAudience).then((authToken) => {

                        // Create the options object to be used for the impersonation call
                        let impersonationOptions = {
                            method: 'POST',
                            url: `${this.auth0Keys.globals.domain}/users/${user.user_id}/impersonate`,
                            headers: {
                                'authorization': `Bearer ${authToken}`,
                                'content-type': 'application/json'
                            },
                            body: {
                                protocol: 'oauth2',

                                // using impersonated user's id as the impersonator id
                                // we just care about getting in to MyAccount
                                // In case it stops working, use the following admin user id: 'auth0|58fd6520cd428935df3f3a5d'
                                impersonator_id: user.user_id,

                                // Here we use the actual MyAccount Client Id from Auth0
                                // Which is what we want to log into
                                client_id: this.auth0Keys.clientId,
                                additionalParameters: {
                                    response_type: 'code',
                                    nonce: nonce,
                                    state: encodedState,
                                    scope: 'openid',
                                    redirect_uri: this.auth0Keys.callbackUrl
                                }
                            },
                            json: true
                        };

                        // Make the Impersonation call
                        return httpClient.post(impersonationOptions, (e, r): promise.Promise<any> => {

                            if (e) {
                                throw new Error(`Impersonation request failed. Error message: ${e.message}`);
                            }

                            // return the authenticated URL to the non prod authencation provider
                            return promise.fulfilled(r.body);
                        });
                    });
                });
            });
        });
    }

    private getAuth0ManagementAPIBearerToken(options: any = null): promise.Promise<any> {

        // Use options if any were passed in as the first argument to the function
        // Otherwise, use the default options declard below
        let Auth0ManagementAPIv2Options = options || {
            method: 'POST',
            url: `${this.auth0Keys.globals.domain}/oauth/token`,
            headers: { 'content-type': 'application/json' },
            body: {
                // Auth0 has a Non Interactive Test Automation client (at the moment it's only for the Monthly-uat environment)
                // We use it's client id and client secret to get a token for the Auth0 Management Api V2
                client_id: this.auth0Keys.testAutomationclientid,
                client_secret: this.auth0Keys.testAutomationclientsecret,
                audience: `${this.auth0Keys.globals.domain}/api/v2/`,
                grant_type: 'client_credentials'
            },
            json: true
        };

        // Make the http call to Auth and pass the parseToken function as a callback
        return httpClient.post(Auth0ManagementAPIv2Options, this.parseToken);
    }

    private parseToken(err: Error, responseData?: any): promise.Promise<any> {

        if (err) {
            throw new Error (err.message);
        }

        if (responseData === undefined) {
            throw new Error ('Response token was empty');
        } else {
            console.log('Successfully fetched access token.');
            return promise.fulfilled(responseData.body.access_token);
        }
    }

    // The getUser function creates a search query with the User's SAP Name Id
    // and then calls the auth0UsersGet function, which makes the Auth0 call and returns the matched User
    private getUser(tokenV2, znamedId, callback): promise.Promise<any> {

        let queryString = 'app_metadata.client_info.AGL\\ MyAccount.znamed_id.raw:' + znamedId + '';

        return this.auth0UsersGet(tokenV2, queryString, (error: Error, body): promise.Promise<any> => {

            // if (error) { return callback(error.message); }
            if (!body || body.length < 1) {
                return callback({ message: 'Profile with the specified znamed_id was not found', code: 404 });
            }

            return callback (null, JSON.parse(body)[0]);
        });
    }

    private auth0UsersGet(tokenV2, query, callback): promise.Promise<any> {

        let userRequestOptions = {
            method: 'GET',
            url: `${this.auth0Keys.globals.domain}/api/v2/users`,
            headers: {
                Authorization: 'Bearer ' + tokenV2,
            },
            qs: {
                search_engine: 'v2',
                q: query
            }
        };

        return httpClient.get(userRequestOptions, null, (getUsersError, response): promise.Promise<any> => {

            if (getUsersError) {
                return callback({ message: getUsersError.toString(), code: 500 }, response);
            }

            if (![200, 201].includes(response.statusCode)) {
                return callback({ message: 'Bad request to endpoint: ' + userRequestOptions.url, code: 500 }, response);
            }

            return callback(null, response);
        });
    }
}
