import { TestBed } from '@angular/core/testing';
import { BaseRequestOptions, Http, RequestMethod, Response, ResponseOptions, ResponseType } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { AglAuthTokenProvider } from '../../../shared/repository/aglAuthTokenProvider';
import { ConfigService } from '../../../shared/service/config.service';
import { HttpHeaderAssertions } from '../../../test/httpHeaderAssertions';
import { AglAuthTokenProviderStub } from '../../../test/stubs/aglAuthTokenProvider.stub';
import { ConfigStubService } from '../../../test/stubs/config.stub.service';
import { IConcessionApi, ConcessionApiService, SaveConcessionRequest } from './concessionApi.service';
import { ErrorApiModel } from './../../../shared/service/api.service';

describe('Concession api', () => {
    let sut: IConcessionApi = null;
    let backend: MockBackend = null;
    let configService: ConfigStubService = null;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                MockBackend,
                BaseRequestOptions,
                {
                    provide: Http,
                    useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
                        return new Http(backendInstance, defaultOptions);
                    },
                    deps: [MockBackend, BaseRequestOptions]
                },
                { provide: ConfigService, useClass: ConfigStubService },
                { provide: AglAuthTokenProvider, useClass: AglAuthTokenProviderStub },
                { provide: IConcessionApi, useClass: ConcessionApiService }, // the sut
            ]
        });

        sut = TestBed.get(IConcessionApi);
        backend = TestBed.get(MockBackend);
        configService = TestBed.get(ConfigService);
    });

    describe('getEligibleConcessionCards', () => {
        it(`should use expected headers, http method and url`, (done) => {
            const regionId: string = 'NSW';

            backend.connections.subscribe(
                (connection: MockConnection) => {
                    let headerAssertions = new HttpHeaderAssertions();
                    headerAssertions.assertSecureCORS(connection, false);
                    headerAssertions.assertAuthHeader(connection, true);
                    headerAssertions.assertCorrelationId(connection, true);

                    expect(connection.request.url).toBe(`${configService.current.aglConcessionApiBaseUrl}/v1/concession/${regionId.toLowerCase()}/issuers?fuelTypes=A&fuelTypes=B`,
                        `The submit concession get URL is incorrect`);
                    expect(connection.request.method).toBe(RequestMethod.Get, `Expected a GET request`);

                    let options = new ResponseOptions({
                        body: {}
                    });
                    connection.mockRespond(new Response(options));
                }
            );

            sut.getEligibleConcessionCards(regionId, ['A', 'B'])
                .subscribe((result) => {
                    done();
                });
        });
    });

    describe('saveConcession', () => {
        it(`should use expected headers, http method and url`, (done) => {
            const businessPartnerNumber: string = 'BP123';

            backend.connections.subscribe(
                (connection: MockConnection) => {
                    let headerAssertions = new HttpHeaderAssertions();
                    headerAssertions.assertSecureCORS(connection, false);
                    headerAssertions.assertAuthHeader(connection, true);
                    headerAssertions.assertCorrelationId(connection, true);

                    expect(connection.request.url).toBe(`${configService.current.aglConcessionApiBaseUrl}/v1/businessPartners/${businessPartnerNumber}/concession`,
                        `The submit concession post URL is incorrect`);
                    expect(connection.request.method).toBe(RequestMethod.Post, `Expected a POST request`);

                    let options = new ResponseOptions({
                        body: {}
                    });
                    connection.mockRespond(new Response(options));
                }
            );

            sut.saveConcession(businessPartnerNumber, null)
                .subscribe((result) => {
                    done();
                });
        });

        it(`should pass correct data to post and return 0 when server returns 200 response`, (done) => {
            const businessPartnerNumber: string = 'BP123';
            const expectedRequest = new SaveConcessionRequest('CN1', 'I1', 'CC1', ['111', '222']);

            backend.connections.subscribe(
                (connection: MockConnection) => {
                    let body = JSON.parse(connection.request.getBody());
                    expect(body).toEqual({ ...expectedRequest }); // clone the expectedRequest to convert it to type any

                    let options = new ResponseOptions({
                        status: 200,
                        body: {}
                    });
                    connection.mockRespond(new Response(options));
                }
            );

            sut.saveConcession(businessPartnerNumber, expectedRequest)
                .subscribe((result) => {
                    expect(result).toBe(0);
                    done();
                });
        });

        it(`should return internal error number when server returns 400 response`, (done) => {
            const businessPartnerNumber: string = 'BP123';
            const expectedErrorNumber = 22;

            backend.connections.subscribe(
                (connection: MockConnection) => {
                    let body = <ErrorApiModel> {
                        message: 'Ineligible',
                        internalError: {
                            errorNumber: '0' + expectedErrorNumber.toString(),
                        }
                    };

                    let options = new ResponseOptions({
                        type: ResponseType.Error,
                        status: 400,
                        body: body
                    });
                    connection.mockError(new MockError(options));
                }
            );

            sut.saveConcession(businessPartnerNumber, null)
                .subscribe((result) => {
                    expect(result).toBe(expectedErrorNumber);
                    done();
                });
        });

        it(`should error when server doesn't return 200 or known 400 response`, (done) => {
            const businessPartnerNumber: string = 'BP123';
            const errorCode = 400;
            const expectedErrorBody = { message: 'Internal sever error' };

            backend.connections.subscribe(
                (connection: MockConnection) => {
                    let options = new ResponseOptions({
                        type: ResponseType.Error,
                        status: errorCode,
                        body: expectedErrorBody
                    });
                    connection.mockError(new MockError(options));
                }
            );

            sut.saveConcession(businessPartnerNumber, null)
                .subscribe(
                (result) => {
                    fail('expect error');
                },
                (error) => {
                    expect(error).toBe(expectedErrorBody);
                    done();
                });
        });
    });
});

class MockError extends Response implements Error {
    name: any;
    message: any;
}
