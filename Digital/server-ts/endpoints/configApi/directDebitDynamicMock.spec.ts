import { IdentityEmulator } from './../../../common/identityEmulator';
import * as request from 'request';

import { AccountApiModel } from './../../../src/app/shared/service/api.service';
import { MockServer } from './../../mockServer';
import { serverContainer } from '../../ioc/inversify.config';
import { TESTING_PORT, TESTING_BASE_ADDRESS } from '../../tests/runMockserverTests';
import { MockServerModule } from '../../ioc/mockServerModule';
import { DynamicMockDesiredState, DynamicMockKey, DynamicMock } from '../../../src/app/myAccount/mockManager/models/dynamicMock';
import { PaymentMethod } from '../../../src/app/myAccount/services/settings/model';

describe('Direct debit dynamic mock', () => {
    const userWithDDAlreadyOn = 'AGL_0000C99D7ADE1EE595CD264FA9DDED30';
    const userWithDDAlreadyOff = 'AGL_0000C99D7ADE1EE492A42E1ADEF8A5A8';
    const API_BASE_URL: string = `${TESTING_BASE_ADDRESS}`;
    let mockServer: MockServer;
    let token: string;

    beforeEach((done: DoneFn) => {
        mockServer = serverContainer.get<MockServer>(MockServerModule.MockServer);
        mockServer.start(TESTING_PORT, (result: boolean, port: number) => {
            expect(result).toBe(true, `The mock server could not be started.`);
            expect(port).toBe(TESTING_PORT);
            expect(mockServer.server()).toBeDefined();
            expect(mockServer.server().listening).toBe(true);
            done();
        });
    });

    afterEach((done: DoneFn) => {
        // Close the port
        mockServer.server().close(done);
        mockServer = undefined;
    });

    function assertDirectDebitState(expectedAccountsOnDirectDebitCount: number, expectedPaymentMethodCount: number, done: DoneFn) {
        let requestOptions: request.Options = {
            url: `${API_BASE_URL}aglSettingsApi/v2/paymentmethods`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        request(requestOptions, (error: any, response: request.RequestResponse, body: any) => {
            if (error) {
                fail();
            } else {
                expect(response.statusCode).toBe(200);
                let paymentMethods: PaymentMethod[] = JSON.parse(response.body);

                expect(paymentMethods).not.toBeNull();
                expect(paymentMethods.length).toBe(expectedPaymentMethodCount);

                if (expectedAccountsOnDirectDebitCount > 0) {
                    let accountsOnDirectDebit = 0;
                    for (let paymentMethod of paymentMethods) {
                        expect(paymentMethod.bank || paymentMethod.creditCard || paymentMethod.payPal).not.toBeNull();
                        accountsOnDirectDebit += paymentMethod.directDebitContractAccounts.length;
                    }
                    expect(accountsOnDirectDebit).toBe(expectedAccountsOnDirectDebitCount);
                } else {
                    for (let paymentMethod of paymentMethods) {
                        expect(paymentMethod.directDebitContractAccounts.length).toBe(expectedAccountsOnDirectDebitCount);
                    }
                }
            }
            done();
        });
    }

    describe('turned on', () => {
        beforeEach((done: DoneFn) => {
            let additionalClaims: string[] = [ DynamicMock.generateKey(DynamicMockKey.potdProducts, DynamicMockDesiredState.enabled) ];
            token = IdentityEmulator.generateTokenForCustomer(userWithDDAlreadyOff, '', additionalClaims);
            assertDirectDebitState(0, 0, done); // Check that the user has DD turned off to begin with
        });

        it(`should setup all contract accounts to be on direct debit`, (done: DoneFn) => {
            let requestOptions: request.Options = {
                method: 'POST',
                url: `${API_BASE_URL}config/directDebit/on`,
                headers: {
                    authorization: `Bearer ${token}`
                }
            };

            request(requestOptions, (error: any, response: request.RequestResponse, body: any) => {
                if (error) {
                    fail(error);
                } else {
                    expect(response.statusCode).toBe(200);
                    assertDirectDebitState(3, 3, done);
                }
            });
        });
    });

    describe('turned off', () => {
        beforeEach((done: DoneFn) => {
            let additionalClaims: string[] = [ DynamicMock.generateKey(DynamicMockKey.potdProducts, DynamicMockDesiredState.disabled) ];
            token = IdentityEmulator.generateTokenForCustomer(userWithDDAlreadyOn, '', additionalClaims);
            assertDirectDebitState(3, 4, done); // Check that the user has DD turned on to begin with
        });

        it(`should remove direct debit setup from all contract accounts`, (done: DoneFn) => {
            let requestOptions: request.Options = {
                method: 'POST',
                url: `${API_BASE_URL}config/directDebit/off`,
                headers: {
                    authorization: `Bearer ${token}`
                }
            };

            request(requestOptions, (error: any, response: request.RequestResponse, body: any) => {
                if (error) {
                    fail(error);
                } else {
                    expect(response.statusCode).toBe(200);
                    assertDirectDebitState(0, 4, done);
                }
            });
        });
    });
});
