import { IdentityEmulator } from './../../../common/identityEmulator';
import * as request from 'request';

import { AccountApiModel } from './../../../src/app/shared/service/api.service';
import { MockServer } from './../../mockServer';
import { serverContainer } from '../../ioc/inversify.config';
import { TESTING_PORT, TESTING_BASE_ADDRESS } from '../../tests/runMockserverTests';
import { MockServerModule } from '../../ioc/mockServerModule';

let tokenPatriciaOwen = IdentityEmulator.generateTokenForCustomer('AGL_E395B919757991F1B3400000C99D6332');

describe('Test the mocked endpoints of the classic web API (https://api.agl.com.au)', () => {

    let mockServer: MockServer;
    const API_BASE_URL: string = `${TESTING_BASE_ADDRESS}aglWebApi`;

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

    describe('Accounts', () => {

        it(`should expect an auth token, and throw a 401 if not present`, (done: DoneFn) => {
            let requestOptions: request.Options = {
                url: `${API_BASE_URL}/api/accounts/list?includeInFlight=true`
              };

            request(requestOptions, (error: any, response: request.RequestResponse, body: any) => {
                if (error) {
                    fail();
                } else {
                    expect(response.statusCode).toBe(401);
                }
                done();
            });
        });

        it('returns the accounts list for the given customer', (done: DoneFn) => {

            let requestOptions: request.Options = {
                url: `${API_BASE_URL}/api/accounts/list?includeInFlight=true`,
                headers: {
                  Authorization: `Bearer ${tokenPatriciaOwen}`,
                }
              };

            request(requestOptions, (error: any, response: request.RequestResponse, body: any) => {
                if (error) {
                    fail();
                } else {
                    expect(response.statusCode).toBe(200);
                    let viewModel: AccountApiModel[];
                    viewModel = JSON.parse(response.body);
                    expect(viewModel).not.toBeNull();
                    expect(viewModel.length).toBe(1);
                }
                done();
            });

        });
    });

    describe(`Email Receipt`, () => {

        describe(`Should throw validation errors if the request model is invalid`, () => {

            it(`Invalid referenceNumber`, () => {
                // TODO:
            });

            it(`Invalid receiptNumber`, () => {
                // TODO:
            });

            it(`Invalid paymentAmount`, () => {
                // TODO:
            });

            it(`Invalid paymentDate`, () => {
                // TODO:
            });

        });

    });

    describe(`Business Partners`, () => {

        describe(``, () => {
            // TODO:
        });

    });

});
