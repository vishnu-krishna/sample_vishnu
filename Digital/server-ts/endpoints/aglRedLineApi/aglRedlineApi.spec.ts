import * as request from 'request';

import { MockServer } from '../../mockServer';
import { IdentityEmulator } from '../../../common/identityEmulator';
import { TESTING_BASE_ADDRESS, TESTING_PORT } from '../../tests/runMockserverTests';
import { serverContainer } from '../../ioc/inversify.config';
import { MockServerModule } from '../../ioc/mockServerModule';
import { Guid } from '../../../src/app/shared/utils/guid';
import { PrintDocMappings } from '../../../src/app/shared/service/redLineApi.service';

let tokenClintEastwood = IdentityEmulator.generateTokenForCustomer('AGL_DC2BDC7176F11ED6B1F9D696B98BD84D');

describe('Test the mocked endpoints of the Redline API', () => {

    let mockServer: MockServer;
    const API_BASE_URL: string = `${TESTING_BASE_ADDRESS}aglRedlineApi`;

    describe(`For the user Clint Eastwood`, () => {

        beforeAll((done: DoneFn) => {
            mockServer = serverContainer.get<MockServer>(MockServerModule.MockServer);
            mockServer.start(TESTING_PORT, (result: boolean, port: number) => {
                expect(result).toBe(true, `The mock server could not be started.`);
                expect(port).toBe(TESTING_PORT);
                expect(mockServer.server()).toBeDefined();
                expect(mockServer.server().listening).toBe(true);
                done();
            });
        });

        afterAll((done: DoneFn) => {
            // Close the port
            mockServer.server().close(done);
            mockServer = undefined;
        });

        it(`for contract 9101004976, the redline data should contain 16 items`, (done: DoneFn) => {
            let requestOptions: request.Options = {
                url: `${API_BASE_URL}/v1/bills/contract/9101004976`,
                headers: {
                    Authorization: `Bearer ${tokenClintEastwood}`
                }
            };
            request(requestOptions, (error: any, response: request.RequestResponse, body: any) => {
                if (error) {
                    fail();
                } else {
                    expect(response.statusCode).toBe(200);
                    let responseModel: PrintDocMappings[] = JSON.parse(response.body);

                    expect(responseModel).toBeDefined();
                    expect(responseModel.length).toBe(16);
                    expect(responseModel[0].SapPrintDoc).toBe(`3109355040`);
                    expect(responseModel[0].FxPrintDoc).toBe(`13109355040`);
                }
                done();
            });
        });

        it(`for contract 9101163496, the redline data should contain 16 items`, (done: DoneFn) => {
            let requestOptions: request.Options = {
                url: `${API_BASE_URL}/v1/bills/contract/9101163496`,
                headers: {
                    Authorization: `Bearer ${tokenClintEastwood}`
                }
            };
            request(requestOptions, (error: any, response: request.RequestResponse, body: any) => {
                if (error) {
                    fail();
                } else {
                    expect(response.statusCode).toBe(200);
                    let responseModel: PrintDocMappings[] = JSON.parse(response.body);

                    expect(responseModel).toBeDefined();
                    expect(responseModel.length).toBe(21);
                    expect(responseModel[0].SapPrintDoc).toBe(`3340049945`);
                    expect(responseModel[0].FxPrintDoc).toBe(`13340049945`);
                }
                done();
            });
        });

    });

});
