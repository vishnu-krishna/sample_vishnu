import { BillDeliveryMethod } from './../../../src/app/myAccount/services/settings/model/billDeliveryMethod';
import { IdentityEmulator } from './../../../common/identityEmulator';
import * as request from 'request';

import { AccountApiModel } from './../../../src/app/shared/service/api.service';
import { MockServer } from './../../mockServer';
import { serverContainer } from '../../ioc/inversify.config';
import { TESTING_PORT, TESTING_BASE_ADDRESS } from '../../tests/runMockserverTests';
import { MockServerModule } from '../../ioc/mockServerModule';
import * as serviceModel from '../../../src/app/myAccount/services/settings/model';
import { Guid } from '../../../src/app/shared/utils/guid';
import { BillDelivery, BillDeliveryMethodType } from '../../../src/app/myAccount/services/settings/model';
import { RequestHelpers, ResponseModel } from '../../tests/requestHelpers';

let tokenRodBinnington = IdentityEmulator.generateTokenForCustomer('AGL_E413C3BB1354B6F19A520000C99D7ADE');
let tokenClintEastwood = IdentityEmulator.generateTokenForCustomer('AGL_DC2BDC7176F11ED6B1F9D696B98BD84D');
let tokenSusHef = IdentityEmulator.generateTokenForCustomer(`AGL_000D3AD07CE31ED78A96476E03A7C8E6`);

describe('Test the mocked endpoints of the settings API (https://settings.api.agl.com.au)', () => {

    let mockServer: MockServer;
    const API_BASE_URL: string = `${TESTING_BASE_ADDRESS}aglSettingsApi`;

    describe(`Payment methods`, () => {

        describe(`Manage Credit Cards`, () => {

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

            it(`should return a list of payment methods for the user`, (done: DoneFn) => {
                let requestOptions: request.Options = {
                    url: `${API_BASE_URL}/v2/paymentmethods?expand=DirectDebit,OneTouchPay`,
                    headers: {
                        Authorization: `Bearer ${tokenRodBinnington}`,
                    }
                };
                request(requestOptions, (error: any, response: request.RequestResponse, body: any) => {
                    if (error) {
                        fail();
                    } else {
                        expect(response.statusCode).toBe(200);
                        let viewModel: serviceModel.PaymentMethod[];
                        viewModel = JSON.parse(response.body);
                        expect(viewModel).not.toBeNull();
                        expect(viewModel.length).toBe(1);
                        expect(viewModel[0].creditCard).toBeDefined();
                        expect(viewModel[0].creditCard.creditCardReference).toBe(`5105105105105100`);
                        expect(viewModel[0].creditCard.expiryDate).toBe(`2019-02`);
                        expect(viewModel[0].creditCard.cardHolderName).toBe(`Rod Binnington`);
                        expect(viewModel[0].directDebitContractAccounts.length).toBe(1);
                        expect(viewModel[0].directDebitContractAccounts[0]).toBe(7013149351);
                        expect(viewModel[0].bank).toBeNull();
                        expect(viewModel[0].payPal).toBeNull();
                    }
                    done();
                });
            });

            it('should allow us to create a new credit card', (done: DoneFn) => {

                let postModel: any = {
                    creditCard: {
                        cardType: 'Master',
                        creditCardReference: '4012888888881881',
                        expiryDate: '2020-04',
                        cardHolderName: 'Wendy Binnington'
                    }
                };

                let requestOptions: request.Options = {
                    url: `${API_BASE_URL}/v2/paymentmethods`,
                    method: 'post',
                    json: true,
                    body: postModel,
                    headers: {
                        Authorization: `Bearer ${tokenRodBinnington}`,
                    }
                };
                request(requestOptions, (error: any, response: request.RequestResponse, body: any) => {
                    if (error) {
                        fail();
                    } else {
                        // Creating a new payment method should return a 200 OK with an empty string as the body
                        expect(response.statusCode).toBe(200);
                    }
                    done();
                });

            });

            it(`should allow us to see a newly created credit card with the already exsting cards`, (done: DoneFn) => {
                let requestOptions: request.Options = {
                    url: `${API_BASE_URL}/v2/paymentmethods?expand=DirectDebit,OneTouchPay`,
                    headers: {
                        Authorization: `Bearer ${tokenRodBinnington}`,
                    }
                };
                request(requestOptions, (error: any, response: request.RequestResponse, body: any) => {
                    if (error) {
                        fail();
                    } else {
                        expect(response.statusCode).toBe(200);
                        let viewModel: serviceModel.PaymentMethod[];
                        viewModel = JSON.parse(response.body);
                        expect(viewModel).not.toBeNull();

                        expect(viewModel.length).toBe(2);

                        expect(viewModel[0].creditCard).toBeDefined();
                        expect(viewModel[0].creditCard.creditCardReference).toBe(`5105105105105100`);
                        expect(viewModel[0].creditCard.expiryDate).toBe(`2019-02`);
                        expect(viewModel[0].creditCard.cardHolderName).toBe(`Rod Binnington`);
                        expect(viewModel[0].directDebitContractAccounts.length).toBe(1);
                        expect(viewModel[0].directDebitContractAccounts[0]).toBe(7013149351);
                        expect(viewModel[0].bank).toBeNull();
                        expect(viewModel[0].payPal).toBeNull();

                        expect(viewModel[1].creditCard).toBeDefined();
                        expect(viewModel[1].creditCard.creditCardReference).toBe(`4012888888881881`);
                        expect(viewModel[1].creditCard.expiryDate).toBe(`2020-04`);
                        expect(viewModel[1].creditCard.cardHolderName).toBe(`Wendy Binnington`);
                        expect(viewModel[1].bank).toBeNull();
                        expect(viewModel[1].payPal).toBeNull();

                    }
                    done();
                });
            });

        });

        describe(`Managing Bank Accounts`, () => {
            // TODO:
        });

    });

    describe(`Direct Debit`, () => {

        describe(`should allow me to setup`, () => {

            describe(`with a Credit Card`, () => {
                // TODO:
            });

            describe(`with a Bank Account`, () => {
                // TODO:
            });

            describe(`with PayPal`, () => {
                // TODO:
            });

        });

        describe(`should allow me to cancel`, () => {
            // TODO:
        });

    });

    describe(`SMS Pay`, () => {

        describe(`should allow me to setup`, () => {

            describe(`with a Credit Card`, () => {
                // TODO:
            });

            describe(`with a Bank Account`, () => {
                // TODO:
            });

            describe(`with PayPal`, () => {
                // TODO:
            });

        });

        describe(`should allow me to cancel`, () => {
            // TODO:
        });

    });

    describe(`Bill delivery preferences`, () => {

        describe(`For a single account customer`, () => {

            let getBillPrefRequestOptions: request.Options = {
                url: `${API_BASE_URL}/v2/billdeliverypreferences`,
                headers: {
                    'Authorization': `Bearer ${tokenClintEastwood}`,
                    'x-correlation-id': Guid.newGuid()
                }
            };

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

            it(`should return my current bill delivery preference of Email`, (done) => {
                RequestHelpers.RequestAsync(getBillPrefRequestOptions)
                    .finally(() => done())
                    .subscribe(
                        (responseModel: ResponseModel) => {
                            expect(responseModel.response.statusCode).toBe(200);
                            let viewModel: BillDelivery[] = JSON.parse(responseModel.response.body);
                            expect(viewModel).not.toBeNull();
                            expect(viewModel.length).toBe(1);
                            expect(viewModel[0].contractAccountNumbers.length).toBe(1);
                            expect(viewModel[0].billDeliveryMode).toBe(`Email`);
                        },
                        (error) => {
                            fail();
                        });
            });

            it(`should return a 400 error if an invalid bill delivery method is specified`, (done) => {
                let requestOptions: request.Options = {
                    url: `${API_BASE_URL}/v2/billdeliverypreferences/envelope/contractAccounts`,
                    method: 'post',
                    json: true,
                    body: {
                        contractAccountNumber: 90428798
                    },
                    headers: {
                        'Authorization': `Bearer ${tokenClintEastwood}`,
                        'x-correlation-id': Guid.newGuid()
                    }
                };
                RequestHelpers.RequestAsync(requestOptions)
                    .finally(() => done())
                    .subscribe(
                        (responseModel: ResponseModel) => {
                            expect(responseModel.response.statusCode).toBe(400);
                        },
                        (error) => {
                            fail();
                        });
            });

            it(`should return a 422 error if an invalid bill delivery method is specified`, (done) => {
                let requestOptions: request.Options = {
                    url: `${API_BASE_URL}/v2/billdeliverypreferences/Postal/contractAccounts`,
                    method: 'post',
                    json: true,
                    body: {},
                    headers: {
                        'Authorization': `Bearer ${tokenClintEastwood}`,
                        'x-correlation-id': Guid.newGuid()
                    }
                };
                RequestHelpers.RequestAsync(requestOptions)
                    .finally(() => done())
                    .subscribe(
                        (responseModel: ResponseModel) => {
                            expect(responseModel.response.statusCode).toBe(422);
                        },
                        (error) => {
                            fail();
                        });
            });

            it(`should allow me to change my billing preference to Postal`, (done) => {
                let requestOptions: request.Options = {
                    url: `${API_BASE_URL}/v2/billdeliverypreferences/Postal/contractAccounts`,
                    method: 'post',
                    json: true,
                    body: {
                        contractAccountNumber: 90428798
                    },
                    headers: {
                        'Authorization': `Bearer ${tokenClintEastwood}`,
                        'x-correlation-id': Guid.newGuid()
                    }
                };
                RequestHelpers.RequestAsync(requestOptions)
                    .finally(() => done())
                    .subscribe(
                        (responseModel: ResponseModel) => {
                            expect(responseModel.response.statusCode).toBe(200);
                        },
                        (error) => {
                            fail();
                        });
            });

            it(`should return my new bill delivery preference of Postal`, (done) => {
                RequestHelpers.RequestAsync(getBillPrefRequestOptions)
                    .finally(() => done())
                    .subscribe(
                        (responseModel: ResponseModel) => {
                            expect(responseModel.response.statusCode).toBe(200);
                            let viewModel: BillDelivery[] = JSON.parse(responseModel.response.body);
                            expect(viewModel).not.toBeNull();
                            expect(viewModel.length).toBe(1);
                            expect(viewModel[0].contractAccountNumbers.length).toBe(1);
                            expect(viewModel[0].billDeliveryMode).toBe(`Postal`);
                        },
                        (error) => {
                            fail();
                        });
            });

            it(`should allow me to change my billing preference to Email`, (done) => {
                let requestOptions: request.Options = {
                    url: `${API_BASE_URL}/v2/billdeliverypreferences/Email/contractAccounts`,
                    method: 'post',
                    json: true,
                    body: {
                        contractAccountNumber: 90428798
                    },
                    headers: {
                        'Authorization': `Bearer ${tokenClintEastwood}`,
                        'x-correlation-id': Guid.newGuid()
                    }
                };
                RequestHelpers.RequestAsync(requestOptions)
                    .finally(() => done())
                    .subscribe(
                        (responseModel: ResponseModel) => {
                            expect(responseModel.response.statusCode).toBe(200);
                        },
                        (error) => {
                            fail();
                        });
            });

            it(`should return my new bill delivery preference of Email`, (done) => {
                RequestHelpers.RequestAsync(getBillPrefRequestOptions)
                    .finally(() => done())
                    .subscribe(
                        (responseModel: ResponseModel) => {
                            expect(responseModel.response.statusCode).toBe(200);
                            let viewModel: BillDelivery[] = JSON.parse(responseModel.response.body);
                            expect(viewModel).not.toBeNull();
                            expect(viewModel.length).toBe(1);
                            expect(viewModel[0].contractAccountNumbers.length).toBe(1);
                            expect(viewModel[0].billDeliveryMode).toBe(`Email`);
                        },
                        (error) => {
                            fail();
                        });
            });

        });

        describe(`For a multi-account customer`, () => {

            let getBillPrefRequestOptions: request.Options = {
                url: `${API_BASE_URL}/v2/billdeliverypreferences`,
                headers: {
                    'Authorization': `Bearer ${tokenSusHef}`,
                    'x-correlation-id': Guid.newGuid()
                }
            };

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

            it(`should show my billing preferences; 23227754 and 23222490 on Email`, (done) => {
                RequestHelpers.RequestAsync(getBillPrefRequestOptions)
                    .finally(() => done())
                    .subscribe(
                        (responseModel: ResponseModel) => {
                            expect(responseModel.response.statusCode).toBe(200);
                            let viewModel: BillDelivery[] = JSON.parse(responseModel.response.body);
                            expect(viewModel).not.toBeNull();
                            expect(viewModel.length).toBe(1);
                            expect(viewModel[0].contractAccountNumbers.length).toBe(2);
                            expect(viewModel[0].contractAccountNumbers[0]).toBe(23227754);
                            expect(viewModel[0].contractAccountNumbers[1]).toBe(23222490);
                            expect(viewModel[0].billDeliveryMode).toBe(`Email`);
                        },
                        (error) => {
                            fail();
                        });
            });

            it(`should update my billing preference to 'Postal' for account '23227754'`, (done) => {
                let requestOptions: request.Options = {
                    url: `${API_BASE_URL}/v2/billdeliverypreferences/Postal/contractAccounts`,
                    method: 'post',
                    json: true,
                    body: {
                        contractAccountNumber: 23227754
                    },
                    headers: {
                        'Authorization': `Bearer ${tokenSusHef}`,
                        'x-correlation-id': Guid.newGuid()
                    }
                };
                RequestHelpers.RequestAsync(requestOptions)
                    .finally(() => done())
                    .subscribe(
                        (responseModel: ResponseModel) => {
                            expect(responseModel.response.statusCode).toBe(200);
                        },
                        (error) => {
                            fail();
                        });
            });

            it(`should show my updated billing preferences; 23227754 on Postal, 23222490 on Email`, (done) => {
                RequestHelpers.RequestAsync(getBillPrefRequestOptions)
                    .finally(() => done())
                    .subscribe(
                        (responseModel: ResponseModel) => {
                            expect(responseModel.response.statusCode).toBe(200);
                            let viewModel: BillDelivery[] = JSON.parse(responseModel.response.body);
                            expect(viewModel).not.toBeNull();
                            expect(viewModel.length).toBe(2);

                            let emailGroup: BillDelivery = viewModel.find((b) => b.billDeliveryMode === BillDeliveryMethodType.Email);
                            let postalGroup: BillDelivery = viewModel.find((b) => b.billDeliveryMode === BillDeliveryMethodType.Postal);

                            expect(emailGroup).toBeDefined();
                            expect(emailGroup.billDeliveryMode).toBe(`Email`);

                            expect(postalGroup).toBeDefined();
                            expect(postalGroup.billDeliveryMode).toBe(`Postal`);

                            expect(emailGroup.contractAccountNumbers.length).toBe(1);
                            expect(emailGroup.contractAccountNumbers[0]).toBe(23222490);

                            expect(postalGroup.contractAccountNumbers.length).toBe(1);
                            expect(postalGroup.contractAccountNumbers[0]).toBe(23227754);
                        },
                        (error) => {
                            fail();
                        });
            });

            it(`should update my billing preference to 'Postal' for account '23222490'`, (done) => {
                let requestOptions: request.Options = {
                    url: `${API_BASE_URL}/v2/billdeliverypreferences/Postal/contractAccounts`,
                    method: 'post',
                    json: true,
                    body: {
                        contractAccountNumber: 23222490
                    },
                    headers: {
                        'Authorization': `Bearer ${tokenSusHef}`,
                        'x-correlation-id': Guid.newGuid()
                    }
                };
                RequestHelpers.RequestAsync(requestOptions)
                    .finally(() => done())
                    .subscribe(
                        (responseModel: ResponseModel) => {
                            expect(responseModel.response.statusCode).toBe(200);
                        },
                        (error) => {
                            fail();
                        });
            });

            it(`should show my billing preferences; 23227754 and 23222490 on Postal`, (done) => {
                RequestHelpers.RequestAsync(getBillPrefRequestOptions)
                    .finally(() => done())
                    .subscribe(
                        (responseModel: ResponseModel) => {
                            expect(responseModel.response.statusCode).toBe(200);
                            let viewModel: BillDelivery[] = JSON.parse(responseModel.response.body);
                            expect(viewModel).not.toBeNull();
                            expect(viewModel.length).toBe(1);
                            expect(viewModel[0].contractAccountNumbers.length).toBe(2);
                            expect(viewModel[0].contractAccountNumbers[0]).toBe(23227754);
                            expect(viewModel[0].contractAccountNumbers[1]).toBe(23222490);
                            expect(viewModel[0].billDeliveryMode).toBe(`Postal`);
                        },
                        (error) => {
                            fail();
                        });
            });

            it(`should update my billing preference to 'Email' for account '23227754'`, (done) => {
                let requestOptions: request.Options = {
                    url: `${API_BASE_URL}/v2/billdeliverypreferences/Email/contractAccounts`,
                    method: 'post',
                    json: true,
                    body: {
                        contractAccountNumber: 23227754
                    },
                    headers: {
                        'Authorization': `Bearer ${tokenSusHef}`,
                        'x-correlation-id': Guid.newGuid()
                    }
                };
                RequestHelpers.RequestAsync(requestOptions)
                    .finally(() => done())
                    .subscribe(
                        (responseModel: ResponseModel) => {
                            expect(responseModel.response.statusCode).toBe(200);
                        },
                        (error) => {
                            fail();
                        });
            });

            it(`should show my updated billing preferences; 23222490 on Postal, 23227754 on Email`, (done) => {
                RequestHelpers.RequestAsync(getBillPrefRequestOptions)
                    .finally(() => done())
                    .subscribe(
                        (responseModel: ResponseModel) => {
                            expect(responseModel.response.statusCode).toBe(200);
                            let viewModel: BillDelivery[] = JSON.parse(responseModel.response.body);
                            expect(viewModel).not.toBeNull();
                            expect(viewModel.length).toBe(2);

                            let emailGroup: BillDelivery = viewModel.find((b) => b.billDeliveryMode === BillDeliveryMethodType.Email);
                            let postalGroup: BillDelivery = viewModel.find((b) => b.billDeliveryMode === BillDeliveryMethodType.Postal);

                            expect(emailGroup).toBeDefined();
                            expect(emailGroup.billDeliveryMode).toBe(`Email`);

                            expect(postalGroup).toBeDefined();
                            expect(postalGroup.billDeliveryMode).toBe(`Postal`);

                            expect(emailGroup.contractAccountNumbers.length).toBe(1);
                            expect(emailGroup.contractAccountNumbers[0]).toBe(23227754);

                            expect(postalGroup.contractAccountNumbers.length).toBe(1);
                            expect(postalGroup.contractAccountNumbers[0]).toBe(23222490);
                        },
                        (error) => {
                            fail();
                        });
            });

        });

    });

    describe(`Monthly Billing`, () => {

        describe(`Setup`, () => {

            it(`should allow a contract to be setup on monthly billing`, () => {
                // TODO:
            });

        });

        describe(`Manage`, () => {

            it(`should allow a contract that is setup to have the day of the month changed`, () => {
                // TODO:
            });

        });

        describe(`Cancel`, () => {

            it(`should allow a contract that is setup on monthly billing to be cancelled`, () => {
                // TODO:
            });

        });

    });

});
