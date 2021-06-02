
import { TestBed } from '@angular/core/testing';
import { BaseRequestOptions, Http, RequestMethod, Response, ResponseOptions, URLSearchParams } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { inject } from '@angular/core/testing';
import * as moment from 'moment';
import { AglAuthTokenProvider } from '../../../shared/repository/aglAuthTokenProvider';
import { ConfigService } from '../../../shared/service/config.service';
import { HttpHeaderAssertions } from '../../../test/httpHeaderAssertions';
import { AglAuthTokenProviderStub } from '../../../test/stubs/aglAuthTokenProvider.stub';
import { ConfigStubService } from '../../../test/stubs/config.stub.service';
import { InstalmentPlanFrequency, IPaymentSchemeApi, PaymentArrangementExtensionOptions, PaymentArrangementInstalmentPlanOption, PaymentArrangementInstalmentSummary, PaymentSchemeApiService, InstalmentPlanParameters, GetPaymentArrangementInstalmentPlanOptionsParams, PaymentArrangementInstalmentPlans, InstalmentPlanStatus } from './paymentSchemeApi.service';
import { FrequencyOption } from './instalmentPlanOptions.service';

describe('Payment scheme api service', () => {
    let sut: IPaymentSchemeApi = null;
    let backend: MockBackend = null;
    let configService: ConfigStubService = null;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [],
            imports: [],
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
                { provide: IPaymentSchemeApi, useClass: PaymentSchemeApiService }, // the sut
            ]
        });

    });

    beforeEach(
        inject([IPaymentSchemeApi, MockBackend, ConfigService],
            (apiService: IPaymentSchemeApi, mockBackend: MockBackend, mockConfigService: ConfigService) => {
                sut = apiService;
                backend = mockBackend;
                configService = mockConfigService;
            }
        )
    );

    describe(`Get eligibility`, () => {
        it(`should use expected headers, http method and url`, (done) => {
            const contractAccountNumber: string = '987';

            backend.connections.subscribe(
                (connection: MockConnection) => {
                    let headerAssertions = new HttpHeaderAssertions();
                    headerAssertions.assertSecureCORS(connection, false);
                    headerAssertions.assertAuthHeader(connection, true);
                    headerAssertions.assertCorrelationId(connection, true);

                    expect(connection.request.url).toBe(`${configService.current.aglPaymentSchemeApi}/v1/contractAccounts/${contractAccountNumber}/paymentArrangement/extensionOptions`,
                        `The payment extension URL is incorrect`);
                    expect(connection.request.method).toBe(RequestMethod.Get, `Expected a GET request`);

                    let returnModel: PaymentArrangementExtensionOptions = {
                        contractAccountNumber: Number(contractAccountNumber),
                        extensionOptions: [
                            {
                                contractNumber: 222,
                                isEligible: false,
                                error: {
                                    message: 'Ineligible',
                                    internalError: {
                                        errorNumber: '123456789'
                                    }
                                }
                            }]
                    };

                    let options = new ResponseOptions({
                        body: returnModel
                    });
                    connection.mockRespond(new Response(options));
                }
            );

            sut.getPaymentArrangementExtensionOptions(contractAccountNumber)
                .subscribe((result) => {
                    expect(result).toBeTruthy();
                    done();
                });
        });

        it(`should map valid responses correctly`, (done) => {
            const contractAccountNumber: number = 999;
            const expectedDueDate = new Date('2017-05-01');
            const expectedExtensionDueDate1 = new Date('2017-05-10');
            const expectedExtensionDueDate2 = new Date('2017-06-18');

            backend.connections.subscribe(
                (connection: MockConnection) => {
                    let returnModel: PaymentArrangementExtensionOptions = {
                        contractAccountNumber: Number(contractAccountNumber),
                        extensionOptions: [{
                            contractNumber: 1111,
                            isEligible: true,
                            dueDate: expectedDueDate,
                            totalDueAmount: 123.45,
                            dueDateExtensions: [
                                {
                                    numberOfDays: 12,
                                    date: expectedExtensionDueDate1
                                },
                                {
                                    numberOfDays: 15,
                                    date: expectedExtensionDueDate2
                                }
                            ],
                            error: null
                        },
                        {
                            contractNumber: 2222,
                            isEligible: false,
                            error: {
                                message: 'Ineligible',
                                internalError: {
                                    errorNumber: '123456789'
                                }
                            }
                        }]
                    };

                    let options = new ResponseOptions({
                        body: returnModel
                    });
                    connection.mockRespond(new Response(options));
                }
            );

            let results = sut.getPaymentArrangementExtensionOptions(contractAccountNumber.toString());

            results.subscribe((options: PaymentArrangementExtensionOptions) => {
                expect(options.contractAccountNumber).toBe(contractAccountNumber);

                expect(options.extensionOptions.length).toBe(2);

                expect(options.extensionOptions[0].contractNumber).toBe(1111);
                expect(options.extensionOptions[0].isEligible).toBe(true);
                expect(options.extensionOptions[0].dueDate).toBe(expectedDueDate);
                expect(options.extensionOptions[0].totalDueAmount).toBe(123.45);
                expect(options.extensionOptions[0].error).toBeFalsy();

                expect(options.extensionOptions[0].dueDateExtensions).toBeTruthy();
                expect(options.extensionOptions[0].dueDateExtensions.length).toBe(2);
                expect(options.extensionOptions[0].dueDateExtensions[0].numberOfDays).toBe(12);
                expect(options.extensionOptions[0].dueDateExtensions[0].date).toBe(expectedExtensionDueDate1);
                expect(options.extensionOptions[0].dueDateExtensions[1].numberOfDays).toBe(15);
                expect(options.extensionOptions[0].dueDateExtensions[1].date).toBe(expectedExtensionDueDate2);

                expect(options.extensionOptions[1].contractNumber).toBe(2222);
                expect(options.extensionOptions[1].isEligible).toBe(false);
                expect(options.extensionOptions[1].error).toBeTruthy();
                expect(options.extensionOptions[1].error.message).toBe('Ineligible');
                expect(options.extensionOptions[1].error.internalError).toBeTruthy();
                expect(options.extensionOptions[1].error.internalError.errorNumber).toBe('123456789');
                expect(options.extensionOptions[1].dueDateExtensions).toBeFalsy();

                done();
            });
        });

        it(`should error when backend returns error`, (done) => {
            backend.connections.subscribe(
                (connection: MockConnection) => {
                    connection.mockError(new Error('an http error occurred'));
                }
            );

            sut.getPaymentArrangementExtensionOptions('123456')
                .subscribe(
                () => { fail('expected an error'); },
                (error) => {
                    expect(error).toBeDefined();
                    done();
                }
                );
        });
    });

    describe('submitPaymentArrangementExtension', () => {
        it(`should use expected headers, http method and url`, (done) => {
            const contractNumber: string = '123';

            backend.connections.subscribe(
                (connection: MockConnection) => {
                    let headerAssertions = new HttpHeaderAssertions();
                    headerAssertions.assertSecureCORS(connection, false);
                    headerAssertions.assertAuthHeader(connection, true);
                    headerAssertions.assertCorrelationId(connection, true);

                    expect(connection.request.url).toBe(`${configService.current.aglPaymentSchemeApi}/v1/contracts/${contractNumber}/paymentArrangement/paymentExtensions`,
                        `The payment extension post URL is incorrect`);
                    expect(connection.request.method).toBe(RequestMethod.Post, `Expected a POST request`);

                    let options = new ResponseOptions({
                        body: {}
                    });
                    connection.mockRespond(new Response(options));
                }
            );

            sut.submitPaymentArrangementExtension(contractNumber, new Date())
                .subscribe((result) => {
                    done();
                });
        });

        it(`should pass correct data when successful`, (done) => {
            const contractNumber: string = '123';
            const extendedDueDate = new Date('2017-01-01');

            backend.connections.subscribe(
                (connection: MockConnection) => {
                    expect(new Date(JSON.parse(connection.request.getBody()).extendedDueDate)).toEqual(extendedDueDate);

                    let options = new ResponseOptions({
                        status: 200,
                        body: {}
                    });
                    connection.mockRespond(new Response(options));
                }
            );

            sut.submitPaymentArrangementExtension(contractNumber, extendedDueDate)
                .subscribe((result) => {
                    done();
                });
        });

        it(`should submit successfully when server returns 200 response`, (done) => {
            const contractNumber: string = '123';

            backend.connections.subscribe(
                (connection: MockConnection) => {
                    let options = new ResponseOptions({
                        status: 200,
                        body: {}
                    });
                    connection.mockRespond(new Response(options));
                }
            );

            sut.submitPaymentArrangementExtension(contractNumber, new Date())
                .subscribe((result) => {
                    // we just need to check this line is hit when server responds 200 status response
                    expect(true).toBe(true);
                    done();
                });
        });

        it(`should fail with correct error code when server doesn't return 200 response`, (done) => {
            const contractNumber: string = '123';
            const errorCode = 500;

            backend.connections.subscribe(
                (connection: MockConnection) => {
                    const error = {
                        name: 'error name',
                        message: 'error message',
                        stack: 'error stack',
                        status: errorCode
                    };
                    connection.mockError(error);
                }
            );

            sut.submitPaymentArrangementExtension(contractNumber, new Date())
                .subscribe(
                (result) => {
                    fail('expect error');
                },
                (error) => {
                    expect(error.status).toBe(errorCode);
                    done();
                }
                );
        });
    });

    describe('getPaymentArrangementInstalmentPlanOptions', () => {
        const contractNumber: string = '123';
        const payload: PaymentArrangementInstalmentPlanOption[] = [];

        describe('when called', () => {
            it('should return payload', (done) => {
                let params: GetPaymentArrangementInstalmentPlanOptionsParams = {};

                backend.connections.subscribe(
                    (connection: MockConnection) => {
                        connection.mockRespond(new Response(new ResponseOptions({ body: payload })));
                    }
                );

                sut.getPaymentArrangementInstalmentPlanOptions(contractNumber, params)
                    .subscribe((result) => {
                        expect(result).toBe(payload);
                        done();
                    });
            });
        });

        describe('When called', () => {
            it('Should set headers', (done) => {
                let params: GetPaymentArrangementInstalmentPlanOptionsParams = {};

                backend.connections.subscribe(
                    (connection: MockConnection) => {
                        let headerAssertions = new HttpHeaderAssertions();
                        headerAssertions.assertSecureCORS(connection, false);
                        headerAssertions.assertAuthHeader(connection, true);
                        headerAssertions.assertCorrelationId(connection, true);

                        connection.mockRespond(new Response(new ResponseOptions({ body: payload })));
                    }
                );

                sut.getPaymentArrangementInstalmentPlanOptions(contractNumber, params)
                    .subscribe((result) => done());
            });
        });

        describe('when called', () => {
            it('should call expected endpoint', (done) => {
                let params: GetPaymentArrangementInstalmentPlanOptionsParams = {};

                backend.connections.subscribe(
                    (connection: MockConnection) => {
                        expect(connection.request.url.startsWith(`${configService.current.aglPaymentSchemeApi}/v1/contracts/${contractNumber}/paymentArrangement/instalmentPlans/options`))
                            .toBeTruthy(`GetPaymentArrangementInstalmentPlanOptions URL is incorrect: ${connection.request.url}`);
                        expect(connection.request.method).toBe(RequestMethod.Get);

                        connection.mockRespond(new Response(new ResponseOptions({ body: payload })));
                    }
                );

                sut.getPaymentArrangementInstalmentPlanOptions(contractNumber, params)
                    .subscribe((result) => done());
            });
        });

        describe('when suggestInstalments is set', () => {
            it(`should then set it in query string`, (done) => {
                let params: GetPaymentArrangementInstalmentPlanOptionsParams = {
                    suggestInstalments: false
                };

                backend.connections.subscribe(
                    (connection: MockConnection) => {
                        let actualParams = getQueryString(connection.request.url);
                        expect(actualParams.has('suggestInstalments')).toBeTruthy();
                        expect(actualParams.get('suggestInstalments')).toBe('false');

                        connection.mockRespond(new Response(new ResponseOptions({ body: payload })));
                    }
                );

                sut.getPaymentArrangementInstalmentPlanOptions(contractNumber, params)
                    .subscribe((result) => done());
            });
        });

        describe('when frequency is set', () => {
            it(`should then set it in query string`, (done) => {
                let params: GetPaymentArrangementInstalmentPlanOptionsParams = {
                    frequency: InstalmentPlanFrequency.Weekly
                };

                backend.connections.subscribe(
                    (connection: MockConnection) => {
                        let actualParams = getQueryString(connection.request.url);
                        expect(actualParams.has('frequency')).toBeTruthy();
                        expect(actualParams.get('frequency')).toBe('Weekly');

                        connection.mockRespond(new Response(new ResponseOptions({ body: payload })));
                    }
                );

                sut.getPaymentArrangementInstalmentPlanOptions(contractNumber, params)
                    .subscribe((result) => done());
            });
        });

        describe('when date is set', () => {
            it(`should then set it in query string as ISO 8601 Date`, (done) => {
                let params: GetPaymentArrangementInstalmentPlanOptionsParams = {
                    startDate: new Date(2018, 2, 8)
                };

                backend.connections.subscribe(
                    (connection: MockConnection) => {
                        let actualParams = getQueryString(connection.request.url);
                        expect(actualParams.has('startDate')).toBeTruthy();
                        expect(actualParams.get('startDate')).toBe('2018-03-08');

                        connection.mockRespond(new Response(new ResponseOptions({ body: payload })));
                    }
                );

                sut.getPaymentArrangementInstalmentPlanOptions(contractNumber, params)
                    .subscribe((result) => done());
            });
        });
    });

    describe('GET Payment Arrangement Instalment Summary', () => {
        const instalmentPlanParameters: InstalmentPlanParameters = new InstalmentPlanParameters();
        instalmentPlanParameters.contractNumber = '123';
        instalmentPlanParameters.frequency = InstalmentPlanFrequency.Weekly;
        instalmentPlanParameters.startDate = new Date(2018, 5, 1);
        instalmentPlanParameters.instalmentAmount = 150;
        const returnModel: PaymentArrangementInstalmentSummary = {
            instalments: [
                {
                    instalmentDate: '2018-02-10',
                    instalmentAmount: 25
                }
            ]
        };

        it(`should use expected headers, http method and url and map valid responses correctly`, (done) => {
            backend.connections.subscribe(
                (connection: MockConnection) => {
                    let headerAssertions = new HttpHeaderAssertions();
                    headerAssertions.assertSecureCORS(connection, false);
                    headerAssertions.assertAuthHeader(connection, true);
                    headerAssertions.assertCorrelationId(connection, true);

                    expect(connection.request.url).toBe(`${configService.current.aglPaymentSchemeApi}/v1/contracts/${instalmentPlanParameters.contractNumber}/paymentArrangement/instalmentPlans/summary?frequency=${instalmentPlanParameters.frequency}&startDate=${moment(instalmentPlanParameters.startDate).format('YYYY-MM-DD')}&instalmentAmount=${instalmentPlanParameters.instalmentAmount}`,
                        `Instalment Summary URL is incorrect`);
                    expect(connection.request.method).toBe(RequestMethod.Get, `Expected a GET request`);

                    let options = new ResponseOptions({
                        body: returnModel
                    });
                    connection.mockRespond(new Response(options));
                }
            );

            sut.getPaymentArrangementInstalmentSummary(instalmentPlanParameters)
                .subscribe((result) => {
                    expect(result).toBe(returnModel);
                    done();
                });
        });

        it(`should error when backend returns error`, (done) => {
            backend.connections.subscribe(
                (connection: MockConnection) => {
                    connection.mockError(new Error('an http error occurred'));
                }
            );

            sut.getPaymentArrangementInstalmentSummary(instalmentPlanParameters)
                .subscribe(
                    () => {
                        fail('expected an error');
                    },
                    (error) => {
                        expect(error).toBeDefined();
                        done();
                    }
                );
        });
    });

    describe('POST Payment Arrangement Instalment Summary', () => {
        const instalmentPlanParameters: InstalmentPlanParameters = new InstalmentPlanParameters();
        instalmentPlanParameters.contractNumber = '123';
        instalmentPlanParameters.frequency = InstalmentPlanFrequency.Weekly;
        instalmentPlanParameters.startDate = new Date('2018-05-31');
        instalmentPlanParameters.instalmentAmount = 150;

        const returnModel: PaymentArrangementInstalmentSummary = {
            instalments: [
                {
                    instalmentDate: '2018-02-10',
                    instalmentAmount: 25
                }
            ]
        };

        it(`should use expected headers, http method and url`, (done) => {
            backend.connections.subscribe(
                (connection: MockConnection) => {
                    let headerAssertions = new HttpHeaderAssertions();
                    headerAssertions.assertSecureCORS(connection, false);
                    headerAssertions.assertAuthHeader(connection, true);
                    headerAssertions.assertCorrelationId(connection, true);

                    expect(connection.request.url).toBe(`${configService.current.aglPaymentSchemeApi}/v1/contracts/${instalmentPlanParameters.contractNumber}/paymentArrangement/instalmentPlans`,
                        `Instalment Summary post URL is incorrect`);
                    expect(connection.request.method).toBe(RequestMethod.Post, `Expected a POST request`);

                    let options = new ResponseOptions({
                        body: {}
                    });
                    connection.mockRespond(new Response(options));
                }
            );

            sut.submitPaymentArrangementInstalmentPlan(instalmentPlanParameters)
                .subscribe((result) => {
                    done();
                });
        });

        it(`should pass correct data when successful`, (done) => {
            backend.connections.subscribe(
                (connection: MockConnection) => {
                    const body = JSON.parse(connection.request.getBody());
                    expect(body.frequency).toEqual(instalmentPlanParameters.frequency);
                    expect(body.startDate).toEqual(moment(instalmentPlanParameters.startDate).toISOString());
                    expect(body.instalmentAmount).toEqual(instalmentPlanParameters.instalmentAmount);

                    let options = new ResponseOptions({
                        status: 200,
                        body: {}
                    });
                    connection.mockRespond(new Response(options));
                }
            );

            sut.submitPaymentArrangementInstalmentPlan(instalmentPlanParameters)
                .subscribe((result) => {
                    done();
                });
        });

        it(`should submit successfully when server returns 200 response`, (done) => {
            backend.connections.subscribe(
                (connection: MockConnection) => {
                    let options = new ResponseOptions({
                        status: 200,
                        body: {}
                    });
                    connection.mockRespond(new Response(options));
                }
            );

            sut.submitPaymentArrangementInstalmentPlan(instalmentPlanParameters)
                .subscribe((result) => {
                    // we just need to check this line is hit when server responds 200 status response
                    expect(true).toBe(true);
                    done();
                });
        });

        it(`should fail with correct error code when server doesn't return 200 response`, (done) => {
            const errorCode = 500;

            backend.connections.subscribe(
                (connection: MockConnection) => {
                    const error = {
                        name: 'error name',
                        message: 'error message',
                        stack: 'error stack',
                        status: errorCode
                    };
                    connection.mockError(error);
                }
            );

            sut.submitPaymentArrangementInstalmentPlan(instalmentPlanParameters)
                .subscribe(
                    (result) => {
                        fail('expect error');
                    },
                    (error) => {
                        expect(error.status).toBe(errorCode);
                        done();
                    }
                );
        });
    });

    describe('GET Payment Arrangement Instalment Plan', () => {
        const contractAccountNumber: string = '987';
        const returnModel: PaymentArrangementInstalmentPlans[] = [{
            contractNumber: 999,
            instalmentPlans: []
        }];

        it(`should use expected headers, http method and url`, (done) => {
            backend.connections.subscribe(
                (connection: MockConnection) => {
                    let headerAssertions = new HttpHeaderAssertions();
                    headerAssertions.assertSecureCORS(connection, false);
                    headerAssertions.assertAuthHeader(connection, true);
                    headerAssertions.assertCorrelationId(connection, true);

                    expect(connection.request.url).toBe(`${configService.current.aglPaymentSchemeApi}/v1/contractAccounts/${contractAccountNumber}/paymentArrangement/instalmentPlans`,
                        `The payment arrangement instalment plan URL is incorrect`);
                    expect(connection.request.method).toBe(RequestMethod.Get, `Expected a GET request`);

                    let options = new ResponseOptions({
                        body: returnModel
                    });

                    connection.mockRespond(new Response(options));
                }
            );

            sut.getPaymentArrangementInstalmentPlans(contractAccountNumber)
                .subscribe((result) => {
                    expect(result).toBeTruthy();
                    expect(result).toBe(returnModel);
                    done();
                });
        });

        it(`should then set status params in query string`, (done) => {
            let statusOpen: InstalmentPlanStatus = InstalmentPlanStatus.Open;

            backend.connections.subscribe(
                (connection: MockConnection) => {
                    let actualParams = getQueryString(connection.request.url);
                    expect(actualParams.has('status')).toBeTruthy();
                    expect(actualParams.get('status')).toBe('Open');

                    connection.mockRespond(new Response(new ResponseOptions({ body: [] })));
                }
            );

            sut.getPaymentArrangementInstalmentPlans(contractAccountNumber, statusOpen)
                .subscribe(done);
        });

        it(`should submit successfully when server returns 200 response`, (done) => {
            backend.connections.subscribe(
                (connection: MockConnection) => {
                    let options = new ResponseOptions({
                        status: 200,
                        body: returnModel
                    });
                    connection.mockRespond(new Response(options));
                }
            );

            sut.getPaymentArrangementInstalmentPlans(contractAccountNumber)
                .subscribe((result) => {
                    expect(result).toBe(returnModel);
                    done();
                });
        });

        it(`should error when backend returns error`, (done) => {
            const errorResponse = {
                name: 'error name',
                message: 'error message',
                stack: 'error stack',
                status: 400
            };

            backend.connections.subscribe(
                (connection: MockConnection) => {
                    connection.mockError(errorResponse);
                }
            );

            sut.getPaymentArrangementInstalmentPlans(contractAccountNumber)
                .subscribe(
                () => { fail('expected an error'); },
                (error) => {
                    expect(error).toBe(errorResponse);
                    done();
                }
                );
        });
    });
});

function getQueryString(url: string): URLSearchParams {
    let params = new URLSearchParams();
    const indexOfQueryString = url.indexOf('?');

    if (indexOfQueryString > -1) {
        const queryString = url.substring(indexOfQueryString + 1);
        params = new URLSearchParams(queryString);
    }

    return params;
}
