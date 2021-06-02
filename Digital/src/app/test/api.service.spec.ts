// src/app/user.service.spec.ts
import { async, inject, TestBed } from '@angular/core/testing';
import { BaseRequestOptions, Http, RequestMethod, Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BusinessPartnerModel, EmailReceiptRequestModel, SelfServicePhotoReading, SelfServicePhotoSubmissionDataModel } from './../shared/service/api.service';
import { MessageBusService } from './../shared/service/messageBus.service';

import { ProgressHttp } from 'angular-progress-http';
import { ModalService } from '../myAccount/modal/modal.service';
import { PatchDocument } from '../shared/model/api.model';
import { AglAuthTokenProvider } from '../shared/repository/aglAuthTokenProvider';
import { ApiRepository, ApiRepositoryBase } from '../shared/repository/api.repository';
import { Apiv2Repository, Apiv2RepositoryBase } from '../shared/repository/apiv2.repository';
import { IApiRepository } from '../shared/repository/contract/iapi.repository';
import { IApiv2Repository } from '../shared/repository/contract/iapiv2.repository';
import { ApiService, SelfServiceMeterReading } from '../shared/service/api.service';
import { ConfigService } from '../shared/service/config.service';
import { IMessageBusService } from './../shared/service/contract/imessageBus.service';
import { HttpHeaderAssertions } from './httpHeaderAssertions';
import { AglAuthTokenProviderStub } from './stubs/aglAuthTokenProvider.stub';
import { ConfigStubService } from './stubs/config.stub.service';
import { ProgressHttpStub } from './stubs/progressHttp.stub';

describe('API Service Tests', () => {

    let subject: ApiService = null;
    let backend: MockBackend = null;
    let configService: ConfigStubService = null;
    let headerAssertions = new HttpHeaderAssertions();

    beforeEach(() => {

        TestBed.configureTestingModule({
            declarations: [],
            imports: [],
            providers: [
                MockBackend,
                {
                    provide: Http,
                    useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
                        return new Http(backendInstance, defaultOptions);
                    },
                    deps: [MockBackend, BaseRequestOptions]
                },
                { provide: ConfigService, useClass: ConfigStubService },
                { provide: ModalService, useClass: ModalService },
                { provide: AglAuthTokenProvider, useClass: AglAuthTokenProviderStub },
                {
                    provide: ProgressHttp,
                    useClass: ProgressHttpStub,
                    deps: [MockBackend, BaseRequestOptions]
                },
                { provide: IMessageBusService, useClass: MessageBusService },
                BaseRequestOptions,
                {
                    provide: ApiRepositoryBase,
                    deps: [Http, ConfigService, AglAuthTokenProvider]
                },
                {
                    provide: IApiRepository,
                    useClass: ApiRepository,
                    deps: [Http, ConfigService, AglAuthTokenProvider
                    ]
                },
                {
                    provide: Apiv2RepositoryBase,
                    useClass: Apiv2RepositoryBase,
                    deps: [Http, ConfigService, AglAuthTokenProvider, ProgressHttp, IMessageBusService]
                },
                {
                    provide: IApiv2Repository,
                    useClass: Apiv2Repository,
                    deps: [Http, ConfigService, AglAuthTokenProvider, ProgressHttp, IMessageBusService]
                },
                {
                    provide: ApiService,
                    useClass: ApiService,
                    deps: [Http, IApiRepository, ConfigService, ModalService, IApiv2Repository]
                },
            ]
        });

    });

    beforeEach(
        inject([
            ApiService,
            MockBackend,
            ConfigService
        ], (apiService: ApiService,
            mockBackend: MockBackend,
            mockConfigService: ConfigService) => {
            subject = apiService;
            backend = mockBackend;
            configService = mockConfigService;
        }));

    beforeEach((done) => {

        expect(subject).toBeTruthy(`The API service does not exist`);

        let syncStartCalled: boolean = false;
        let syncStatusCalled: boolean = false;

        backend.connections.subscribe(
            (connection: MockConnection) => {
                if (connection.request.url === `${configService.current.aglWebApiBaseUrl}/api/v1/syncdata/start`) {
                    expect(syncStartCalled).toBeFalsy(`The sync start has already been called`);
                    syncStartCalled = true;
                    let options = new ResponseOptions({
                        body: 'Started',
                    });
                    connection.mockRespond(new Response(options));
                } else if (connection.request.url === `${configService.current.aglWebApiBaseUrl}/api/v1/syncdata/status`) {
                    syncStatusCalled = true;
                    let syncModel = `
                                [
                                    {
                                        "dataGroup": "Account",
                                        "status": "Complete",
                                        "lastUpdated": "2017-03-27T21:11:25.5745178+00:00",
                                        "failed": false
                                    },
                                    {
                                        "dataGroup": "BillingHistory",
                                        "status": "Complete",
                                        "lastUpdated": "2017-03-15T20:48:15.3199016+00:00",
                                        "failed": false
                                    },
                                    {
                                        "dataGroup": "Dashboard",
                                        "status": "Complete",
                                        "lastUpdated": "2017-03-27T09:42:55.9993205+00:00",
                                        "failed": false
                                    },
                                    {
                                        "dataGroup": "Payments",
                                        "status": "Complete",
                                        "lastUpdated": "2017-03-15T20:48:15.6562184+00:00",
                                        "failed": false
                                    },
                                    {
                                        "dataGroup": "Usage",
                                        "status": "Complete",
                                        "lastUpdated": "2017-03-27T09:42:55.9993205+00:00",
                                        "failed": false
                                    }
                                ]`;
                    let options = new ResponseOptions({
                        body: syncModel
                    });
                    connection.mockRespond(new Response(options));
                }
            }
        );

        subject.startSync();
        subject.businessPartnerNumber = [];
        subject.allContentLoaded.subscribe(
            (result) => {
                done();
            }
        );
        subject.accountLoadedStatus.subscribe(
            (result) => {
                done();
            }
        );
        subject.contactLoadedStatus.subscribe(
            (result) => {
                done();
            }
        );
    });

    describe(`DASHBOARD`, () => {

        it(`should allow me to get the dashboard data`, (done) => {

            backend.connections.subscribe(
                (connection: MockConnection) => {

                    headerAssertions.assertSecureCORS(connection);
                    headerAssertions.assertAuthHeader(connection, true);
                    headerAssertions.assertCorrelationId(connection, false);

                    expect(connection.request.url).toEqual(`${configService.current.aglWebApiBaseUrl}/api/v1/dashboard`, `The dashboard URL is incorrect`);
                    expect(connection.request.method).toEqual(RequestMethod.Get, `Expected a GET request`);

                    let returnModel = `
                        [
                            {
                                "account": "7019079511",
                                "contract": "9400307029",
                                "currentBillStartDate": "2017-03-15T00:00:00.000Z",
                                "currentBillEndDate": "2017-04-15T00:00:00.000Z",
                                "costToDate": 34.09,
                                "projectedBill": 81.47,
                                "usageCostThisWeek": 14.057138,
                                "usageCostLastWeek": 12.799916,
                                "usageThisWeek": "64.667",
                                "usageLastWeek": "61.655",
                                "balance": 0,
                                "dueDate": "0001-01-01T00:00:00.000Z",
                                "isSmartMeter": true
                            }
                        ]`;

                    let options = new ResponseOptions({
                        body: returnModel
                    });
                    connection.mockRespond(new Response(options));
                }
            );

            subject
                .getDashboard()
                .subscribe(
                    (result) => {
                        expect(result).toBeTruthy();
                        expect(result.length).toBe(1, `The amount of dashboard models was incorrect`);
                        expect(result[0].account).toBe('7019079511', `The account number was incorrect`);
                        expect(result[0].projectedBill).toBe(81.47, `Incorrect projected bill`);
                        expect(result[0].usageThisWeek).toBe('64.667', `Incorrect usage this week`);
                        // TODO: NG5-UPGRADE somewhere at runtime the property is being set to a string rather than a date, should be fixed
                        expect(result[0].currentBillStartDate as any).toEqual('2017-03-15T00:00:00.000Z', `Incorrect bill start date`);
                        done();
                    }
                );

        });

    });

    describe(`BILLS`, () => {

        // We need test coverage in this area

    });

    describe(`PAYMENTS`, () => {

        // We need test coverage in this area

        it(`should send an email to the customer with the payment receipt`, (done) => {

            backend.connections.subscribe(
                (connection: MockConnection) => {

                    expect(connection.request.url).toEqual(`${configService.current.aglWebApiBaseUrl}/api/v1/payments/emailreceipt`);
                    expect(connection.request.method).toEqual(RequestMethod.Post);
                    expect(connection.request.detectContentType()).toBe(1); // JSON = 1
                    headerAssertions.assertSecureCORS(connection);
                    headerAssertions.assertAuthHeader(connection, true);

                    let requestBody: EmailReceiptRequestModel = <EmailReceiptRequestModel> connection.request.json();

                    expect(requestBody.referenceNumber).toBe(`123456789111111111`);
                    expect(requestBody.receiptNumber).toBe(`731563846`);
                    expect(requestBody.paymentAmount).toBe(1234.56);
                    expect(requestBody.paymentDate).toBe(`16 Mar 2017`);
                    expect(requestBody.payg).toBeFalsy();
                    expect(requestBody.creditCardExpiry).toBeFalsy();

                    let options = new ResponseOptions({
                        status: 200
                    });
                    connection.mockRespond(new Response(options));

                }
            );

            let submitModel: EmailReceiptRequestModel = {
                referenceNumber: `123456789111111111`,
                receiptNumber: `731563846`,
                paymentAmount: 1234.56,
                paymentDate: `16 Mar 2017`,
                payg: false,
            };

            subject
                .sendPaymentEmail(submitModel)
                .subscribe(
                    (result) => {
                        expect(result).toBeDefined();
                    },
                    (error) => {
                        fail();
                    }
                );

            done();
        });

    });

    describe(`PENDING PAYMENTS`, () => {

        // We need test coverage in this area

    });

    describe(`ACCOUNTS`, () => {

        it(`should return 1 account model for a customer with 1 account`, (done) => {

            backend.connections.subscribe(
                (connection: MockConnection) => {

                    headerAssertions.assertSecureCORS(connection);
                    headerAssertions.assertAuthHeader(connection, true);
                    headerAssertions.assertCorrelationId(connection, false);
                    expect(connection.request.url).toEqual(`${configService.current.aglWebApiBaseUrl}/api/accounts/list?includeInFlight=true`, `Incorrect URL for accounts list`);
                    expect(connection.request.method).toEqual(RequestMethod.Get, `Expected a GET request`);

                    let returnModel = `
                        [
                            {
                                "number": "7019079511",
                                "firstName": "Lauren",
                                "lastName": "Ferguson",
                                "contracts": [
                                    {
                                        "address": "U C105/460 Victoria Street|BRUNSWICK VIC 3056",
                                        "accountNumber": "7019079511",
                                        "fuelType": "Electricity",
                                        "nameId": "AGL_0000C99DF8261ED582B680F41CDC4EDF",
                                        "number": "9400307029",
                                        "planName": "Set and Forget",
                                        "inFlight": false,
                                        "contractStatus": "",
                                        "isRestricted": false,
                                        "hasElectricVehicle": false
                                    }
                                ]
                            }
                        ]`;

                    let options = new ResponseOptions({
                        body: returnModel
                    });
                    connection.mockRespond(new Response(options));
                }
            );

            subject
                .getAccounts()
                .subscribe(
                    (response) => {

                        // ASSERT
                        expect(response).toBeDefined();
                        expect(response[0].firstName).toBe(`Lauren`, `Expected a firstname of Lauren`);
                        expect(response[0].lastName).toBe(`Ferguson`, `Expected a lastname of Ferguson`);
                        expect(response.length).toBe(1, `The amount of contracts for the customer is incorrect`);
                        expect(response[0].contracts).toBeDefined(`Cannot find contracts for the account`);
                        expect(response[0].contracts.length).toBe(1, `The amount of contracts for this customer is incorrect`);
                        expect(response[0].contracts[0]).toBeDefined(`Contracts are missing`);
                        expect(response[0].contracts[0].accountNumber).toBe(`7019079511`, `Account Number is incorrect`);
                        expect(response[0].contracts[0].fuelType).toBe(`Electricity`, `Wrong fuel type`);
                        expect(response[0].contracts[0].number).toBe(`9400307029`, `Wrong contract number`);
                        done();
                    }
                );

        });

    });

    describe(`SSMR Eligibility Checks`, () => {

        it('should get a list of meters for the contract 9400307029 when I check eligibility', (done) => {

            // ARRANGE
            backend.connections.subscribe(
                (connection: MockConnection) => {

                    expect(connection.request.url).toEqual(`${configService.current.aglWebApiBaseUrl}/v2/contracts/9400307029/meters/selfServiceEligibility?source=Web`);
                    expect(connection.request.method).toEqual(RequestMethod.Get);
                    headerAssertions.assertSecureCORS(connection);
                    headerAssertions.assertAuthHeader(connection, true);
                    headerAssertions.assertCorrelationId(connection, true);

                    let returnModel = `
                    {
                        "screenCode": "SSMR_MRE",
                        "meters": [
                            {
                                "meterSerial": "000000000001308654",
                                "registers": [
                                    {
                                        "registerId": "001",
                                        "dialFormat": 5,
                                        "currentMeterRead": "",
                                        "lastMeterRead": "21300",
                                        "lastReadQuality": "Meter reading by customer - SAP",
                                        "lastReadDate": "2017-05-01"
                                    },
                                    {
                                        "registerId": "002",
                                        "dialFormat": 5,
                                        "currentMeterRead": "",
                                        "lastMeterRead": "7700",
                                        "lastReadQuality": "Meter reading by customer - SAP",
                                        "lastReadDate": "2017-05-01"
                                    },
                                    {
                                        "registerId": "003",
                                        "dialFormat": 5,
                                        "currentMeterRead": "",
                                        "lastMeterRead": "28100",
                                        "lastReadQuality": "Meter reading by customer - SAP",
                                        "lastReadDate": "2017-05-01"
                                    }
                                ]
                            }
                        ],
                        "error": null
                    }`;

                    let options = new ResponseOptions({
                        body: returnModel
                    });
                    connection.mockRespond(new Response(options));
                }
            );

            // ACT
            subject
                .getMetersForContract('9400307029')
                .subscribe(
                    (response) => {

                        // ASSERT
                        expect(response).toBeTruthy();
                        expect(response.screenCode).toBe(`SSMR_MRE`);
                        expect(response.meters).toBeTruthy();
                        expect(response.meters.length).toEqual(1);
                        expect(response.meters[0].meterSerial).toBe(`000000000001308654`);
                        expect(response.meters[0].registers).toBeTruthy();
                        expect(response.meters[0].registers.length).toEqual(3, `The amount of registers for the meter was incorrect`);

                        expect(response.meters[0].registers[0].registerId).toBe(`001`, `Expected meter 1, register 1, register id to be 001`);
                        expect(response.meters[0].registers[0].dialFormat).toBe(5);
                        expect(response.meters[0].registers[0].lastMeterRead).toBe(`21300`);
                        expect(response.meters[0].registers[0].lastReadQuality).toBe(`Meter reading by customer - SAP`);
                        expect(response.meters[0].registers[0].lastReadDate).toBe(`2017-05-01`);

                        expect(response.meters[0].registers[1].registerId).toBe(`002`, `Expected meter 1, register 2, register id to be 002`);
                        expect(response.meters[0].registers[1].dialFormat).toBe(5);
                        expect(response.meters[0].registers[1].lastMeterRead).toBe(`7700`);
                        expect(response.meters[0].registers[1].lastReadQuality).toBe(`Meter reading by customer - SAP`);
                        expect(response.meters[0].registers[1].lastReadDate).toBe(`2017-05-01`);

                        expect(response.meters[0].registers[2].registerId).toBe(`003`, `Expected meter 1, register 3, register id to be 003`);
                        expect(response.meters[0].registers[2].dialFormat).toBe(5);
                        expect(response.meters[0].registers[2].lastMeterRead).toBe(`28100`);
                        expect(response.meters[0].registers[2].lastReadQuality).toBe(`Meter reading by customer - SAP`);
                        expect(response.meters[0].registers[2].lastReadDate).toBe(`2017-05-01`);

                        expect(response.error).toBeNull(`Error should be null`);

                        done();
                    }
                );

        });

        it(`should return an SSMR eligibility error if I've exceeded my max attempts`, (done) => {

            // ARRANGE
            backend.connections.subscribe(
                (connection: MockConnection) => {

                    expect(connection.request.url).toEqual(`${configService.current.aglWebApiBaseUrl}/v2/contracts/9400307029/meters/selfServiceEligibility?source=Web`, `URL was incorrect`);
                    expect(connection.request.method).toEqual(RequestMethod.Get);
                    headerAssertions.assertSecureCORS(connection);
                    headerAssertions.assertAuthHeader(connection, true);
                    headerAssertions.assertCorrelationId(connection, true);

                    let returnModel = `
                    {
                        "screenCode": "SSMR_EX1",
                        "meters": [
                            {
                                "meterSerial": "000000000001308654",
                                "registers": [
                                    {
                                        "registerId": "001",
                                        "dialFormat": "05",
                                        "currentMeterRead": "",
                                        "lastMeterRead": "21300",
                                        "lastReadQuality": "Meter reading by customer - SAP",
                                        "lastReadDate": "2017-05-01"
                                    },
                                    {
                                        "registerId": "002",
                                        "dialFormat": "05",
                                        "currentMeterRead": "",
                                        "lastMeterRead": "7700",
                                        "lastReadQuality": "Meter reading by customer - SAP",
                                        "lastReadDate": "2017-05-01"
                                    },
                                    {
                                        "registerId": "003",
                                        "dialFormat": "05",
                                        "currentMeterRead": "",
                                        "lastMeterRead": "28100",
                                        "lastReadQuality": "Meter reading by customer - SAP",
                                        "lastReadDate": "2017-05-01"
                                    }
                                ]
                            }
                        ],
                        "error": {
                            "message": "Maximum Number of daily COR attempts crossed.",
                            "internalError": {
                                "errorId": "ZISS011",
                                "errorNumber": "025",
                                "description": "Maximum Number of daily COR attempts crossed."
                            }
                        }
                    }`;

                    let options = new ResponseOptions({
                        body: returnModel
                    });
                    connection.mockRespond(new Response(options));
                }
            );

            // ACT
            subject
                .getMetersForContract('9400307029')
                .subscribe(
                    (response) => {

                        // ASSERT
                        expect(response).toBeTruthy();
                        expect(response.screenCode).toBe(`SSMR_EX1`);
                        expect(response.meters).toBeTruthy();
                        expect(response.meters.length).toEqual(1);
                        expect(response.meters[0].registers).toBeTruthy();
                        expect(response.meters[0].registers.length).toEqual(3);

                        expect(response.error).toBeTruthy();
                        expect(response.error.message).toBe(`Maximum Number of daily COR attempts crossed.`);
                        expect(response.error.internalError).toBeTruthy();
                        expect(response.error.internalError.errorId).toBe(`ZISS011`);
                        expect(response.error.internalError.errorNumber).toBe(`025`);
                        expect(response.error.internalError.description).toBe(`Maximum Number of daily COR attempts crossed.`);

                        done();
                    }
                );

        });

    });

    describe(`SSMR Meter read submission`, () => {

        it(`should allow me to submit a valid meter read`, (done) => {

            // ARRANGE
            backend.connections.subscribe(
                (connection: MockConnection) => {

                    headerAssertions.assertSecureCORS(connection);
                    headerAssertions.assertAuthHeader(connection, true);
                    headerAssertions.assertCorrelationId(connection, true);
                    expect(connection.request.method).toEqual(RequestMethod.Post);
                    expect(connection.request.url).toEqual(`${configService.current.aglWebApiBaseUrl}/v2/contracts/9035991302/meters/selfServiceReadings?source=Web`);

                    let requestBody: SelfServiceMeterReading[] = <SelfServiceMeterReading[]> connection.request.json();

                    expect(requestBody).toBeTruthy(`The request body was empty!`);
                    expect(requestBody.length).toBe(1);

                    expect(requestBody[0].meterSerial).toBe(`EB047674`);
                    expect(requestBody[0].registers).toBeTruthy();
                    expect(requestBody[0].registers.length).toBe(1);

                    expect(requestBody[0].registers[0].registerId).toBe(`001`);
                    expect(requestBody[0].registers[0].reading).toBe(`1620`);

                    let returnModel = `
                    {
                        "isSuccess": true,
                        "screenCode": "SSMR_PROJ3",
                        "dailyUsage": 1.02,
                        "accountBalance": 75.45,
                        "invoiceDueDate": "2017-05-18",
                        "nextScheduledBillDate": "2017-06-24",
                        "numberOfDaysTillNextBill": 52,
                        "currentBill": {
                            "amount": 169.59,
                            "startDate": "2016-11-17",
                            "endDate": "2017-05-03"
                        },
                        "projectedBill": {
                            "amount": 215.95,
                            "startDate": "2016-11-17",
                            "endDate": "2017-06-24"
                        },
                        "lastInvoice": {
                            "amount": 75.45,
                            "startDate": "2016-08-18",
                            "endDate": "2016-11-16",
                            "quality": "Customer Read"
                        },
                        "adjustment": null,
                        "meters": [],
                        "error": null
                    }
                    `;

                    let options = new ResponseOptions({
                        body: returnModel
                    });
                    connection.mockRespond(new Response(options));
                }
            );

            let postData: SelfServiceMeterReading[] = [
                {
                    meterSerial: 'EB047674',
                    registers: [
                        {
                            registerId: '001',
                            reading: '1620',
                        }
                    ]
                }
            ];

            // ACT
            subject
                .postMetersForContract('9035991302', postData)
                .subscribe(
                    (response) => {

                        // ASSERT
                        expect(response).toBeDefined();
                        expect(response.isSuccess).toBeTruthy();
                        expect(response.screenCode).toBe(`SSMR_PROJ3`);

                        // TODO: NG5-UPGRADE somewhere at runtime the property is being set to an int rather than a string, should be fixed
                        expect(response.numberOfDaysTillNextBill as any).toBe(52);

                        expect(response.projectedBill).toBeTruthy();
                        expect(response.projectedBill.amount).toBe(215.95);
                        // TODO: NG5-UPGRADE somewhere at runtime the property is being set to a string rather than a date, should be fixed
                        expect(response.projectedBill.startDate as any).toEqual('2016-11-17');
                        // TODO: NG5-UPGRADE somewhere at runtime the property is being set to a string rather than a date, should be fixed
                        expect(response.projectedBill.endDate as any).toBe('2017-06-24');

                        expect(response.lastInvoice).toBeTruthy();
                        expect(response.lastInvoice.amount).toBe(75.45);
                        expect(response.lastInvoice.quality).toBe(`Customer Read`);

                        expect(response.error).toBeFalsy();

                        done();
                    }
                );
        });

        it(`should trim the reading for a register that has an empty reading, before submission (2 meters, each with 1 register. 1 valid, 1 empty reading)`, (done) => {

            backend.connections.subscribe(
                (connection: MockConnection) => {

                    expect(connection.request.url).toEqual(`${configService.current.aglWebApiBaseUrl}/v2/contracts/9402508450/meters/selfServiceReadings?source=Web`);

                    let requestBody: SelfServiceMeterReading[] = <SelfServiceMeterReading[]> connection.request.json();

                    expect(requestBody).toBeTruthy(`The request body was empty!`);
                    expect(requestBody.length).toBe(1, `Expected 1 meter`);
                    expect(requestBody[0].meterSerial).toBe(`000000000000811610`, `Serial for meter 1 was incorrect`);
                    expect(requestBody[0].registers).toBeTruthy(`Expected register data for meter 1`);
                    expect(requestBody[0].registers.length).toBe(1, `There should be 1 register for Meter 1`);
                    expect(requestBody[0].registers[0].registerId).toBe(`001`, `The register is for meter 1, register 1 was incorrect`);
                    expect(requestBody[0].registers[0].reading).toBe(`18600`, `The reading for meter 1, register 1 was incorrect`);

                    let options = new ResponseOptions();
                    connection.mockRespond(new Response(options));
                });

            let postData: SelfServiceMeterReading[] = [
                {
                    meterSerial: `000000000000811610`,
                    registers: [
                        {
                            registerId: `001`,
                            reading: `18600`
                        }
                    ]
                },
                {
                    meterSerial: `000000000000862913`,
                    registers: [
                        {
                            registerId: `001`,
                            reading: ``
                        }
                    ]
                }
            ];

            subject
                .postMetersForContract('9402508450', postData)
                .subscribe(
                    (response) => {
                        expect(response).toBeDefined(`The response was empty`);
                        done();
                    });
        });

        it(`should trim the reading for a register that has an empty reading, before submission (2 meters, each with 2 registers. 1 valid, 1 empty reading per each meter)`, (done) => {

            backend.connections.subscribe(
                (connection: MockConnection) => {

                    expect(connection.request.url).toEqual(`${configService.current.aglWebApiBaseUrl}/v2/contracts/9402508450/meters/selfServiceReadings?source=Web`);

                    let requestBody: SelfServiceMeterReading[] = <SelfServiceMeterReading[]> connection.request.json();

                    expect(requestBody).toBeTruthy(`The request body was empty!`);
                    expect(requestBody.length).toBe(2, `Expected 2 meters`);

                    expect(requestBody[0].meterSerial).toBe(`000000000000811610`, `Serial for meter 1 was incorrect`);
                    expect(requestBody[0].registers.length).toBe(2, `There should be 2 registers for Meter 1`);
                    expect(requestBody[0].registers[0].registerId).toBe(`001`, `The register is for meter 1, register 1 was incorrect`);
                    expect(requestBody[0].registers[0].reading).toBe(`18600`, `The reading for meter 1, register 1 was incorrect`);
                    expect(requestBody[0].registers[1].registerId).toBe(`002`, `The register is for meter 1, register 2 was incorrect`);
                    expect(requestBody[0].registers[1].reading).toBe(`34500`, `The reading for meter 1, register 2 was incorrect`);

                    expect(requestBody[1].meterSerial).toBe(`000000000000862913`, `Serial for meter 2 was incorrect`);
                    expect(requestBody[1].registers.length).toBe(1, `There should be 1 register for Meter 2`);
                    expect(requestBody[1].registers[0].registerId).toBe(`001`, `The register is for meter 2, register 1 was incorrect`);
                    expect(requestBody[1].registers[0].reading).toBe(`4343`, `The reading for meter 2, register 1 was incorrect`);

                    let options = new ResponseOptions();
                    connection.mockRespond(new Response(options));
                });

            let postData: SelfServiceMeterReading[] = [
                {
                    meterSerial: `000000000000811610`,
                    registers: [
                        {
                            registerId: `001`,
                            reading: `18600`
                        },
                        {
                            registerId: `002`,
                            reading: `34500`
                        }
                    ]
                },
                {
                    meterSerial: `000000000000862913`,
                    registers: [
                        {
                            registerId: `001`,
                            reading: `4343`
                        },
                        {
                            registerId: `002`,
                            reading: ``
                        }
                    ]
                }
            ];

            subject
                .postMetersForContract('9402508450', postData)
                .subscribe(
                    (response) => {
                        expect(response).toBeDefined(`The response was empty`);
                        done();
                    });
        });

        it(`should return a 422 model validation failure if I submit a invalid data model`, (done) => {

            // ARRANGE
            backend.connections.subscribe(
                (connection: MockConnection) => {

                    headerAssertions.assertSecureCORS(connection);
                    headerAssertions.assertAuthHeader(connection, true);
                    headerAssertions.assertCorrelationId(connection, true);
                    expect(connection.request.method).toEqual(RequestMethod.Post);
                    expect(connection.request.url).toEqual(`${configService.current.aglWebApiBaseUrl}/v2/contracts/9400307029/meters/selfServiceReadings?source=Web`);

                    let returnModel = `
                    {
                    }
                `;

                    let options = new ResponseOptions({
                        body: returnModel,
                        status: 422
                    });
                    connection.mockRespond(new Response(options));
                }
            );

            let postData: SelfServiceMeterReading[] = [
                {
                    meterSerial: 'SSMR_MRE1',
                    registers: [
                        {
                            registerId: '001',
                            reading: '1790824',
                        },
                        {
                            registerId: '002',
                            reading: '1790824',
                        }
                    ]
                },
                {
                    meterSerial: 'SSMR_MRE2',
                    registers: [
                        {
                            registerId: '001',
                            reading: '4343434',
                        }
                    ]
                }
            ];

            // ACT
            subject
                .postMetersForContract('9400307029', postData)
                .subscribe(
                    (response) => {

                        // ASSERT
                        expect(response).toBeDefined();
                        done();
                    }
                );
        });

        it(`should request a photo be uploaded if the reading is out of range`, (done) => {

            backend.connections.subscribe(
                (connection: MockConnection) => {

                    headerAssertions.assertSecureCORS(connection);
                    headerAssertions.assertAuthHeader(connection, true);
                    headerAssertions.assertCorrelationId(connection, true);
                    expect(connection.request.method).toEqual(RequestMethod.Post);
                    expect(connection.request.url).toEqual(`${configService.current.aglWebApiBaseUrl}/v2/contracts/9400307029/meters/selfServiceReadings?source=Web`);

                    let requestBody: SelfServiceMeterReading[] = <SelfServiceMeterReading[]> connection.request.json();

                    expect(requestBody).toBeTruthy(`The request body was empty!`);
                    expect(requestBody.length).toBe(1);

                    expect(requestBody[0].meterSerial).toBe(`000000000001308654`);
                    expect(requestBody[0].registers).toBeTruthy();
                    expect(requestBody[0].registers.length).toBe(3);

                    expect(requestBody[0].registers[0].registerId).toBe(`001`);
                    expect(requestBody[0].registers[0].reading).toBe(`21200`);

                    expect(requestBody[0].registers[1].registerId).toBe(`002`);
                    expect(requestBody[0].registers[1].reading).toBe(`7400`);

                    expect(requestBody[0].registers[2].registerId).toBe(`003`);
                    expect(requestBody[0].registers[2].reading).toBe(`28000`);

                    let returnModel = `
                    {
                        "isSuccess": false,
                        "screenCode": "SSMR_EX1",
                        "dailyUsage": 0.0,
                        "accountBalance": 0.0,
                        "invoiceDueDate": null,
                        "nextScheduledBillDate": null,
                        "numberOfDaysTillNextBill": 0,
                        "currentBill": null,
                        "projectedBill": null,
                        "lastInvoice": null,
                        "adjustment": null,
                        "meters": [
                            {
                                "meterSerial": "000000000001308654",
                                "photoUploadRequired": true,
                                "registers": [
                                    {
                                        "registerId": "001",
                                        "reading": "21200",
                                        "isValid": false,
                                        "status": "019"
                                    },
                                    {
                                        "registerId": "002",
                                        "reading": "7400",
                                        "isValid": false,
                                        "status": "019"
                                    },
                                    {
                                        "registerId": "003",
                                        "reading": "28000",
                                        "isValid": false,
                                        "status": "019"
                                    }
                                ]
                            }
                        ],
                        "error": {
                            "message": "COR meter reading/s submitted failed validation",
                            "internalError": {
                                "errorId": "ZIBI105",
                                "errorNumber": "095",
                                "description": "COR meter reading/s submitted failed validation"
                            }
                        }
                    }
                    `;

                    let options = new ResponseOptions({
                        body: returnModel
                    });
                    connection.mockRespond(new Response(options));
                }
            );

            let postData: SelfServiceMeterReading[] = [
                {
                    meterSerial: `000000000001308654`,
                    registers: [
                        {
                            registerId: `001`,
                            reading: `21200`
                        },
                        {
                            registerId: `002`,
                            reading: `7400`
                        },
                        {
                            registerId: `003`,
                            reading: `28000`
                        }
                    ]
                }
            ];

            subject
                .postMetersForContract(`9400307029`, postData)
                .subscribe((response) => {
                    expect(response).toBeDefined();
                    expect(response.isSuccess).toBeFalsy();
                    expect(response.screenCode).toBe(`SSMR_EX1`);
                    expect(response.projectedBill).toBeFalsy();
                    expect(response.lastInvoice).toBeFalsy();
                    expect(response.adjustment).toBeFalsy();
                    expect(response.meters).toBeTruthy();
                    expect(response.meters.length).toBe(1);
                    expect(response.meters[0].meterSerial).toBe(`000000000001308654`);
                    expect(response.meters[0].photoUploadRequired).toBeTruthy();
                    expect(response.meters[0].registers).toBeTruthy();
                    expect(response.meters[0].registers.length).toBe(3);

                    expect(response.error).toBeTruthy();
                    expect(response.error.internalError).toBeTruthy();
                    expect(response.error.message).toBe(`COR meter reading/s submitted failed validation`);
                    expect(response.error.internalError.errorId).toBe(`ZIBI105`);
                    expect(response.error.internalError.errorNumber).toBe(`095`);
                    expect(response.error.internalError.description).toBe(`COR meter reading/s submitted failed validation`);
                    done();
                });

        });

        it(`should submit a multi-part form data to the API if the user uploads a 1 photo`, (done) => {

            let lastModifedDate = new Date();

            backend.connections.subscribe(
                (connection: MockConnection) => {
                    headerAssertions.assertSecureCORS(connection);
                    headerAssertions.assertAuthHeader(connection, true);
                    headerAssertions.assertCorrelationId(connection, true);
                    expect(connection.request.method).toEqual(RequestMethod.Post);
                    expect(connection.request.url).toEqual(`${configService.current.aglWebApiBaseUrl}/v2/contracts/9133061126/meters/selfServicePhotos?source=Web`);

                    let body = connection.request.getBody();

                    let data: SelfServicePhotoSubmissionDataModel[] = JSON.parse(body.get(`data`));
                    let photo1: File = body.get(`photo1`);
                    let photo2: File = body.get(`photo2`);

                    expect(photo1).toBeTruthy(`Photo1 file should be attached`);
                    expect(photo1.type).toBe(`image/png`, `The mime type should be 'image/png'`);
                    expect(photo1.size).toBe(2776, `The size of the file should be 2776 bytes`);

                    expect(photo2).toBeFalsy(`There should not be a 2nd photo attached in this scenario`);

                    expect(data).toBeTruthy(`The data element of the file upload was not present`);
                    expect(data.length).toBe(1, `There should be exactly 1 element in the data package`);
                    expect(data[0].meterSerial).toBe(`ELEC5678901234567a`, `The meter serial should be 'ELEC5678901234567a'`);
                    expect(data[0].photoName).toBe(`logo.png`, `The photo name should be 'logo.png'`);
                    expect(data[0].registers.length).toBe(1, `There should be exactly 1 register for the Meter 1`);
                    expect(data[0].registers[0].registerId).toBe(`002`, `The register id for meter 1, register 1 should be '002'`);

                    let options = new ResponseOptions({
                        body: {},
                    });
                    connection.mockRespond(new Response(options));
                });

            let fakedata: SelfServicePhotoReading[] = [];

            let blob: Blob = new Blob([`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`],
                {
                    type: 'image/png'
                });
            blob[`lastModifiedDate`] = lastModifedDate;
            blob[`lastModified`] = lastModifedDate.getTime();
            blob[`name`] = `logo.png`;

            let photo: File = <File> blob;

            let item1: SelfServicePhotoReading = {
                meterSerial: `ELEC5678901234567a`,
                registers: [
                    {
                        registerId: `002`,
                        dialFormat: 6,
                        currentMeterRead: `1790824`,
                        lastMeterRead: `610534`,
                        lastReadQuality: `Actual Read by MDP`,
                        lastReadDate: `2016-11-28`
                    }
                ],
                fileMetadata: photo
            };

            fakedata.push(item1);

            subject
                .postPhotosForContract(`9133061126`, fakedata)
                .subscribe(
                    (result) => {
                        done();
                    },
                    (error) => {
                        fail();
                    }
                );
        });

        it(`should not post the data for the second meter if there isn't a photo for it`, (done) => {

            let lastModifedDate = new Date();

            backend.connections.subscribe(
                (connection: MockConnection) => {
                    headerAssertions.assertSecureCORS(connection);
                    headerAssertions.assertAuthHeader(connection, true);
                    headerAssertions.assertCorrelationId(connection, true);
                    expect(connection.request.method).toEqual(RequestMethod.Post);
                    expect(connection.request.url).toEqual(`${configService.current.aglWebApiBaseUrl}/v2/contracts/9133061126/meters/selfServicePhotos?source=Web`);

                    let body = connection.request.getBody();

                    let data: SelfServicePhotoSubmissionDataModel[] = JSON.parse(body.get(`data`));
                    let photo1: File = body.get(`photo1`);
                    let photo2: File = body.get(`photo2`);

                    expect(photo1).toBeTruthy(`Photo1 file should be attached`);
                    expect(photo1.type).toBe(`image/png`, `The mime type should be 'image/png'`);
                    expect(photo1.size).toBe(2776, `The size of the file should be 2776 bytes`);

                    expect(photo2).toBeFalsy(`There should not be a 2nd photo attached in this scenario`);

                    expect(data).toBeTruthy(`The data element of the file upload was not present`);
                    expect(data.length).toBe(1, `There should be exactly 2 elements in the data package`);

                    expect(data[0].meterSerial).toBe(`ELEC5678901234567a`, `The meter serial should be 'ELEC5678901234567a'`);
                    expect(data[0].photoName).toBe(`logo.png`, `The photo name should be 'logo.png'`);
                    expect(data[0].registers.length).toBe(1, `There should be exactly 1 register for the Meter 1`);
                    expect(data[0].registers[0].registerId).toBe(`002`, `The register id for meter 1, register 1 should be '002'`);

                    let options = new ResponseOptions({
                        body: {},
                    });
                    connection.mockRespond(new Response(options));
                });

            let fakedata: SelfServicePhotoReading[] = [];

            let blob: Blob = new Blob([`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`],
                {
                    type: 'image/png'
                });
            blob[`lastModifiedDate`] = lastModifedDate;
            blob[`lastModified`] = lastModifedDate.getTime();
            blob[`name`] = `logo.png`;

            let anotherPhoto: File = <File> blob;

            let item1: SelfServicePhotoReading = {
                meterSerial: `ELEC5678901234567a`,
                registers: [
                    {
                        registerId: `002`,
                        dialFormat: 6,
                        currentMeterRead: `1790824`,
                        lastMeterRead: `610534`,
                        lastReadQuality: `Actual Read by MDP`,
                        lastReadDate: `2016-11-28`
                    }
                ],
                fileMetadata: anotherPhoto
            };

            let item2: SelfServicePhotoReading = {
                meterSerial: `ELEC5678901234567b`,
                registers: [
                    {
                        registerId: `003`,
                        dialFormat: 7,
                        currentMeterRead: `2947123`,
                        lastMeterRead: `2947123`,
                        lastReadQuality: `Actual Read by MDP`,
                        lastReadDate: `2016-11-28`
                    }
                ]
            };

            fakedata.push(item1);
            fakedata.push(item2);

            subject
                .postPhotosForContract(`9133061126`, fakedata)
                .subscribe(
                    (result) => {
                        done();
                    },
                    (error) => {
                        fail();
                    }
                );
        });

        it(`2 photos and 2 meter data models should be submitted`, (done) => {

            let lastModifedDate = new Date();

            backend.connections.subscribe(
                (connection: MockConnection) => {
                    headerAssertions.assertSecureCORS(connection);
                    headerAssertions.assertAuthHeader(connection, true);
                    headerAssertions.assertCorrelationId(connection, true);
                    expect(connection.request.method).toEqual(RequestMethod.Post);
                    expect(connection.request.url).toEqual(`${configService.current.aglWebApiBaseUrl}/v2/contracts/9133061126/meters/selfServicePhotos?source=Web`);

                    let body = connection.request.getBody();

                    let data: SelfServicePhotoSubmissionDataModel[] = JSON.parse(body.get(`data`));
                    let photo1: File = body.get(`photo1`);
                    let photo2: File = body.get(`photo2`);

                    expect(photo1).toBeTruthy(`Photo1 file should be attached`);
                    expect(photo1.type).toBe(`image/png`, `The mime type for photo1 should be 'image/png'`);
                    expect(photo1.size).toBe(2776, `The size of the file for photo1 should be 2776 bytes`);

                    expect(photo2).toBeTruthy(`Photo2 file should be attached`);
                    expect(photo2.type).toBe(`image/png`, `The mime type for photo2 should be 'image/png'`);
                    expect(photo2.size).toBe(2212, `The size of the file for photo2 should be 2212 bytes`);

                    expect(data).toBeTruthy(`The data element of the file upload was not present`);
                    expect(data.length).toBe(2, `There should be exactly 2 elements in the data package`);

                    expect(data[0].meterSerial).toBe(`ELEC5678901234567a`, `The meter serial should be 'ELEC5678901234567a'`);
                    expect(data[0].photoName).toBe(`logo.png`, `The photo name should be 'logo.png'`);
                    expect(data[0].registers.length).toBe(1, `There should be exactly 1 register for the Meter 1`);
                    expect(data[0].registers[0].registerId).toBe(`002`, `The register id for meter 1, register 1 should be '002'`);

                    expect(data[1].meterSerial).toBe(`ELEC5678901234567b`, `The meter serial should be 'ELEC5678901234567b'`);
                    expect(data[1].photoName).toBe(`logo-inverted.png`, `The photo name should be 'logo-inverted.png'`);
                    expect(data[1].registers.length).toBe(1, `There should be exactly 1 register for the Meter 2`);
                    expect(data[1].registers[0].registerId).toBe(`003`, `The register id for meter 2, register 1 should be '003'`);

                    let options = new ResponseOptions({
                        body: {},
                    });
                    connection.mockRespond(new Response(options));
                });

            let fakedata: SelfServicePhotoReading[] = [];

            let blob1: Blob = new Blob([`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`],
                {
                    type: 'image/png'
                });
            blob1[`lastModifiedDate`] = lastModifedDate;
            blob1[`lastModified`] = lastModifedDate.getTime();
            blob1[`name`] = `logo.png`;
            let photo: File = <File> blob1;

            let blob2: Blob = new Blob([`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`],
                {
                    type: 'image/png'
                });
            blob2[`lastModifiedDate`] = lastModifedDate;
            blob2[`lastModified`] = lastModifedDate.getTime();
            blob2[`name`] = `logo-inverted.png`;

            let anotherPhoto: File = <File> blob2;

            let item1: SelfServicePhotoReading = {
                meterSerial: `ELEC5678901234567a`,
                registers: [
                    {
                        registerId: `002`,
                        dialFormat: 6,
                        currentMeterRead: `1790824`,
                        lastMeterRead: `610534`,
                        lastReadQuality: `Actual Read by MDP`,
                        lastReadDate: `2016-11-28`
                    }
                ],
                fileMetadata: photo
            };

            let item2: SelfServicePhotoReading = {
                meterSerial: `ELEC5678901234567b`,
                registers: [
                    {
                        registerId: `003`,
                        dialFormat: 7,
                        currentMeterRead: `2947123`,
                        lastMeterRead: `2947123`,
                        lastReadQuality: `Actual Read by MDP`,
                        lastReadDate: `2016-11-28`
                    }
                ],
                fileMetadata: anotherPhoto
            };

            fakedata.push(item1);
            fakedata.push(item2);

            subject
                .postPhotosForContract(`9133061126`, fakedata)
                .subscribe(
                    (result) => {
                        done();
                    },
                    (error) => {
                        fail();
                    }
                );
        });

    });

    describe('CONTACT DETAILS', () => {
        describe('update contact details', () => {
            const currentBPDetails: BusinessPartnerModel = {
                firstName: 'Vishnu',
                lastName: 'Chander',
                businessPartnerNumber: '1234567890',
                email: 'current@agl.com.au',
                mobile: '1111 111 111',
                phone: '',
                hasDateOfBirth: true
            };

            it(`should use expected headers, http method and url`, async(() => {
                backend.connections.subscribe(
                    (connection: MockConnection) => {
                        headerAssertions.assertSecureCORS(connection, true);
                        headerAssertions.assertAuthHeader(connection, true);
                        headerAssertions.assertCorrelationId(connection, true);

                        expect(connection.request.url).toBe(`${configService.current.aglWebApiBaseUrl}/v2/businessPartners/${currentBPDetails.businessPartnerNumber}`,
                                                            `The update business partners URL is incorrect`);
                        expect(connection.request.method).toBe(RequestMethod.Patch, `Expected a PATCH request`);

                        let options = new ResponseOptions({
                            // empty body
                        });
                        connection.mockRespond(new Response(options));
                    }
                );

                let updatedBPDetails: BusinessPartnerModel = Object.assign({}, currentBPDetails);
                updatedBPDetails.email = 'new.email@agl.com.au';

                subject.updateContactDetail(currentBPDetails, updatedBPDetails)
                        .subscribe((result) => {
                            expect(result).toBe(true);
                        });
            }));

            it('should call repository patch when email value is updated', async(() => {
                let updatedBPDetails: BusinessPartnerModel = Object.assign({}, currentBPDetails);
                updatedBPDetails.email = 'new.email@agl.com.au';

                backend.connections.subscribe(
                    (connection: MockConnection) => {
                        let body: PatchDocument[] = JSON.parse(connection.request.getBody());
                        expect(body).not.toBeNull();
                        expect(body.length).toBe(1);
                        expect(body[0].op).toBe('Replace');
                        expect(body[0].path).toBe('/email');
                        expect(body[0].value).toBe(updatedBPDetails.email);

                        let options = new ResponseOptions({
                            status: 200
                            // empty body
                        });
                        connection.mockRespond(new Response(options));
                    }
                );

                subject.updateContactDetail(currentBPDetails, updatedBPDetails)
                       .subscribe((res: boolean) => {
                            expect(res).toBe(true);
                       });
            }));

            it('should call repository patch when mobile value is updated', async(() => {
                let updatedBPDetails: BusinessPartnerModel = Object.assign({}, currentBPDetails);
                updatedBPDetails.mobile = '2222 222 222';

                backend.connections.subscribe(
                    (connection: MockConnection) => {
                        let body: PatchDocument[] = JSON.parse(connection.request.getBody());
                        expect(body).not.toBeNull();
                        expect(body.length).toBe(1);
                        expect(body[0].op).toBe('Replace');
                        expect(body[0].path).toBe('/mobile');
                        expect(body[0].value).toBe(updatedBPDetails.mobile);

                        let options = new ResponseOptions({
                            status: 200,
                            // empty body
                        });
                        connection.mockRespond(new Response(options));
                    }
                );

                subject.updateContactDetail(currentBPDetails, updatedBPDetails)
                        .subscribe((res: boolean) => {
                            expect(res).toBe(true);
                        });
            }));

            it('should call repository patch when both email and mobile values are updated', async(() => {
                let updatedBPDetails: BusinessPartnerModel = Object.assign({}, currentBPDetails);
                updatedBPDetails.mobile = '2222 222 222';
                updatedBPDetails.email = 'new.email@agl.com.au';

                backend.connections.subscribe(
                    (connection: MockConnection) => {
                        let body: PatchDocument[] = JSON.parse(connection.request.getBody());
                        expect(body).not.toBeNull();
                        expect(body.length).toBe(2);
                        expect(body[0].op).toBe('Replace');
                        expect(body[0].path).toBe('/mobile');
                        expect(body[0].value).toBe(updatedBPDetails.mobile);

                        expect(body[1].op).toBe('Replace');
                        expect(body[1].path).toBe('/email');
                        expect(body[1].value).toBe(updatedBPDetails.email);

                        let options = new ResponseOptions({
                            status: 200,
                            // empty body
                        });
                        connection.mockRespond(new Response(options));
                    }
                );

                subject.updateContactDetail(currentBPDetails, updatedBPDetails)
                        .subscribe((res: boolean) => {
                            expect(res).toBe(true);
                        });
            }));

            it('should not call repository patch when neither email or mobile values are updated', async(() => {
                let updatedBPDetails: BusinessPartnerModel = Object.assign({}, currentBPDetails);

                backend.connections.subscribe(
                    (connection: MockConnection) => {
                        fail('backend should not be called');
                    }
                );

                subject.updateContactDetail(currentBPDetails, updatedBPDetails)
                        .subscribe((res: boolean) => {
                            expect(res).toBe(true);
                        });
            }));

            it('should not call repository patch when values are updated but are empty', async(() => {
                let updatedBPDetails: BusinessPartnerModel = Object.assign({}, currentBPDetails);
                updatedBPDetails.email = '';
                updatedBPDetails.mobile = '';

                backend.connections.subscribe(
                    (connection: MockConnection) => {
                        fail('backend should not be called');
                    }
                );

                subject.updateContactDetail(currentBPDetails, updatedBPDetails)
                        .subscribe((res: boolean) => {
                            expect(res).toBe(true);
                        });
            }));

            it(`should return false when server doesn't return 200 response`, async(() => {
                let updatedBPDetails: BusinessPartnerModel = Object.assign({}, currentBPDetails);
                updatedBPDetails.mobile = '2222 222 222';

                backend.connections.subscribe(
                    (connection: MockConnection) => {
                        const error = {
                            name: 'error name',
                            message: 'error message',
                            stack: 'error stack',
                            status: 500
                        };
                        connection.mockError(error);
                    }
                );

                subject.updateContactDetail(currentBPDetails, updatedBPDetails)
                        .subscribe((res: boolean) => {
                            expect(res).toBe(false);
                        });
            }));
        });
    });
});
