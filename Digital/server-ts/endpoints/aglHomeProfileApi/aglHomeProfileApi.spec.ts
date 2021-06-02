import { MockServer } from '../../mockServer';
import * as request from 'request';
import { TESTING_BASE_ADDRESS, TESTING_PORT } from '../../tests/runMockserverTests';
import { IdentityEmulator } from '../../../common/identityEmulator';
import { serverContainer } from '../../ioc/inversify.config';
import { MockServerModule } from '../../ioc/mockServerModule';
import { Guid } from '../../../src/app/shared/utils/guid';

let tokenMattYoung = IdentityEmulator.generateTokenForCustomer('AGL_E395B7CDAFFF04F18C2A33333331');

describe(`Home Profile API`, () => {

    let mockServer: MockServer;
    const API_BASE_URL: string = `${TESTING_BASE_ADDRESS}aglHomeProfileApi`;

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

    describe(`Test the endpoint '/v1/contracts/:contractNumber/homeProfile'`, () => {

        it(`Should respond with a 200 OK`, (done: DoneFn) => {
            //
            let requestOptions: request.Options = {
                url: `${API_BASE_URL}/v1/contracts/123456111/homeProfile`,
                method: 'post',
                json: true,
                body: {},
                headers: {
                    'Authorization': `Bearer ${tokenMattYoung}`,
                    'x-correlation-id': Guid.newGuid()
                }
            };
            request(requestOptions, (error: any, response: request.RequestResponse, body: any) => {
                if (error) {
                    fail();
                } else {
                    expect(response.statusCode).toBe(200);
                }
                done();
            });
        });
    });
});
