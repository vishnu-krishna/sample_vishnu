import { IdentityEmulator } from './../../../common/identityEmulator';
import * as request from 'request';

import { AccountApiModel } from './../../../src/app/shared/service/api.service';
import { MockServer } from './../../mockServer';
import { serverContainer } from '../../ioc/inversify.config';
import { TESTING_PORT, TESTING_BASE_ADDRESS } from '../../tests/runMockserverTests';
import { MockServerModule } from '../../ioc/mockServerModule';
import * as serviceModel from '../../../src/app/myAccount/services/settings/model';
import { Guid } from '../../../src/app/shared/utils/guid';
import { EnergyInsightsUsage } from '../../../src/app/myAccount/services/settings/model/energyInsightsUsage';
import { EnergyInsightsUsageCategory } from '../../../src/app/myAccount/services/settings/model/energyUsageCategories';
import { EnergyInsightsEligibilityContract } from '../../../src/app/myAccount/services/settings/model/energyInsightsEligibilityContract';
import { RequestHelpers, ResponseModel } from '../../tests/requestHelpers';
import { BillDelivery } from '../../../src/app/myAccount/services/settings/model';

let tokenRodBinnington = IdentityEmulator.generateTokenForCustomer('AGL_E413C3BB1354B6F19A520000C99D7ADE');
let tokenClintEastwood = IdentityEmulator.generateTokenForCustomer('AGL_DC2BDC7176F11ED6B1F9D696B98BD84D');
let tokenRichardMunt = IdentityEmulator.generateTokenForCustomer('AGL_E395B7CDAFFF04F18C2A0000C99DF826');

describe('Test the mocked endpoints of the Energy Insights API', () => {

    let mockServer: MockServer;
    const API_BASE_URL: string = `${TESTING_BASE_ADDRESS}aglEnergyInsightsApi`;

    describe(`The submission of subscriptions`, () => {

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

        it(`An empty post model should return a 422 validation failure`, (done: DoneFn) => {
            let requestOptions: request.Options = {
                url: `${API_BASE_URL}/v1/contracts/9133061126/energyInsights/subscriptions`,
                method: 'post',
                json: true,
                body: {},
                headers: {
                    'Authorization': `Bearer ${tokenRodBinnington}`,
                    'x-correlation-id': Guid.newGuid()
                }
            };
            request(requestOptions, (error: any, response: request.RequestResponse, body: any) => {
                if (error) {
                    fail();
                } else {
                    expect(response.statusCode).toBe(422);
                    let responseModel: any = response.body;
                    expect(responseModel).toBeDefined();
                    expect(responseModel['errors']).toBeDefined();
                    expect(responseModel['errors'].length).toBe(1);
                    expect(responseModel['errors'][0]['message']).toBe(`Subscriptions should not be empty.`);
                }
                done();
            });
        });

        it(`A submitted model with true or false values for mid & end should be accepted OK`, (done: DoneFn) => {
            let requestOptions: request.Options = {
                url: `${API_BASE_URL}/v1/contracts/9133061126/energyInsights/subscriptions`,
                method: 'post',
                json: true,
                body: {
                    subscribedToMidBillEnergyBreakdown: true,
                    subscribedToEndBillEnergyBreakdown: null
                },
                headers: {
                    'Authorization': `Bearer ${tokenRodBinnington}`,
                    'x-correlation-id': Guid.newGuid()
                }
            };
            request(requestOptions, (error: any, response: request.RequestResponse, body: any) => {
                if (error) {
                    fail();
                } else {
                    expect(response.statusCode).toBe(204);
                }
                done();
            });
        });

        it(`A submitted model with true or false values for mid should be accepted OK`, (done: DoneFn) => {
            let requestOptions: request.Options = {
                url: `${API_BASE_URL}/v1/contracts/9133061126/energyInsights/subscriptions`,
                method: 'post',
                json: true,
                body: {
                    subscribedToMidBillEnergyBreakdown: true,
                },
                headers: {
                    'Authorization': `Bearer ${tokenRodBinnington}`,
                    'x-correlation-id': Guid.newGuid()
                }
            };
            request(requestOptions, (error: any, response: request.RequestResponse, body: any) => {
                if (error) {
                    fail();
                } else {
                    expect(response.statusCode).toBe(204);
                }
                done();
            });
        });

        it(`A submitted model with true or false values for end should be accepted OK`, (done: DoneFn) => {
            let requestOptions: request.Options = {
                url: `${API_BASE_URL}/v1/contracts/9133061126/energyInsights/subscriptions`,
                method: 'post',
                json: true,
                body: {
                    subscribedToEndBillEnergyBreakdown: true
                },
                headers: {
                    'Authorization': `Bearer ${tokenRodBinnington}`,
                    'x-correlation-id': Guid.newGuid()
                }
            };
            request(requestOptions, (error: any, response: request.RequestResponse, body: any) => {
                if (error) {
                    fail();
                } else {
                    expect(response.statusCode).toBe(204);
                }
                done();
            });
        });

        it(`A submitted model with a null value for end should be rejected with a 422 validation failure`, (done: DoneFn) => {
            let requestOptions: request.Options = {
                url: `${API_BASE_URL}/v1/contracts/9133061126/energyInsights/subscriptions`,
                method: 'post',
                json: true,
                body: {
                    subscribedToEndBillEnergyBreakdown: null
                },
                headers: {
                    'Authorization': `Bearer ${tokenRodBinnington}`,
                    'x-correlation-id': Guid.newGuid()
                }
            };
            request(requestOptions, (error: any, response: request.RequestResponse, body: any) => {
                if (error) {
                    fail();
                } else {
                    expect(response.statusCode).toBe(422);
                }
                done();
            });
        });

        it(`A submitted model with a null value for mid should be rejected with a 422 validation failure`, (done: DoneFn) => {
            let requestOptions: request.Options = {
                url: `${API_BASE_URL}/v1/contracts/9133061126/energyInsights/subscriptions`,
                method: 'post',
                json: true,
                body: {
                    subscribedToMidBillEnergyBreakdown: null
                },
                headers: {
                    'Authorization': `Bearer ${tokenRodBinnington}`,
                    'x-correlation-id': Guid.newGuid()
                }
            };
            request(requestOptions, (error: any, response: request.RequestResponse, body: any) => {
                if (error) {
                    fail();
                } else {
                    expect(response.statusCode).toBe(422);
                }
                done();
            });
        });

        it(`A request with an invalid contract number should return a 400 error`, (done: DoneFn) => {
            let requestOptions: request.Options = {
                url: `${API_BASE_URL}/v1/contracts/gregsmith/energyInsights/subscriptions`,
                method: 'post',
                json: true,
                body: {},
                headers: {
                    'Authorization': `Bearer ${tokenRodBinnington}`,
                    'x-correlation-id': Guid.newGuid()
                }
            };
            request(requestOptions, (error: any, response: request.RequestResponse, body: any) => {
                if (error) {
                    fail();
                } else {
                    expect(response.statusCode).toBe(400);
                }
                done();
            });
        });

    });

    describe(`Test the endpoint '/v1/contractAccounts/:contractAccountNumber/energyInsights/subscriptions'`, () => {

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

        it(`should return the correct data for account '7016135894' on the multi-account user, Richard Munt`, (done) => {

            let accountNumber: string = `7016135894`;

            let requestOptions: request.Options = {
                url: `${API_BASE_URL}/v1/contractAccounts/${accountNumber}/energyInsights/subscriptions`,
                json: true,
                headers: {
                    'Authorization': `Bearer ${tokenRichardMunt}`,
                    'x-correlation-id': Guid.newGuid()
                }
            };
            request(requestOptions, (error: any, response: request.RequestResponse, body: any) => {
                if (error) {
                    fail();
                } else {
                    console.log(JSON.stringify(response));
                    expect(response.statusCode).toBe(200);
                    let responseModel: EnergyInsightsEligibilityContract[] = response.body;
                    expect(responseModel).toBeDefined();
                    expect(responseModel.length).toBe(2);

                    expect(responseModel[0].contractNumber).toBe(9139723699);
                    expect(responseModel[0].isEligible).toBe(false);
                    expect(responseModel[0].ineligibleReason.internal.number).toBe(`024`);
                    expect(responseModel[0].subscribedToMidBillEnergyBreakdown).toBe(false);
                    expect(responseModel[0].subscribedToEndBillEnergyBreakdown).toBe(false);
                    expect(responseModel[0].availableUsageBreakdownBillPeriods.length).toBe(0);

                    expect(responseModel[1].contractNumber).toBe(9139723694);
                    expect(responseModel[1].isEligible).toBe(true);
                    expect(responseModel[1].availableUsageBreakdownBillPeriods.length).toBe(2);

                }
                done();
            });

        });

        it(`should show that contract '9401786227' is ineligible due to not being on ebilling, on account '7029521254' on the multi-account user, Richard Munt`, (done) => {

            let accountNumber: string = `7029521254`;

            let requestOptions: request.Options = {
                url: `${API_BASE_URL}/v1/contractAccounts/${accountNumber}/energyInsights/subscriptions`,
                json: true,
                headers: {
                    'Authorization': `Bearer ${tokenRichardMunt}`,
                    'x-correlation-id': Guid.newGuid()
                }
            };
            request(requestOptions, (error: any, response: request.RequestResponse, body: any) => {
                if (error) {
                    fail();
                } else {
                    console.log(JSON.stringify(response));
                    expect(response.statusCode).toBe(200);
                    let responseModel: EnergyInsightsEligibilityContract[] = response.body;
                    expect(responseModel).toBeDefined();
                    expect(responseModel.length).toBe(2);

                    expect(responseModel[0].contractNumber).toBe(9401786227);

                    // This result incorporates the ebilling status
                    expect(responseModel[0].isEligible).toBe(false);
                    expect(responseModel[0].ineligibleReason.internal.number).toBe(`032`);
                    expect(responseModel[0].subscribedToMidBillEnergyBreakdown).toBe(false);
                    expect(responseModel[0].subscribedToEndBillEnergyBreakdown).toBe(false);
                    expect(responseModel[0].availableUsageBreakdownBillPeriods.length).toBe(2);

                    expect(responseModel[1].contractNumber).toBe(9401786228);
                    expect(responseModel[1].isEligible).toBe(false);
                    expect(responseModel[1].ineligibleReason.internal.number).toBe(`024`);
                    expect(responseModel[1].subscribedToMidBillEnergyBreakdown).toBe(false);
                    expect(responseModel[1].subscribedToEndBillEnergyBreakdown).toBe(false);
                    expect(responseModel[1].availableUsageBreakdownBillPeriods.length).toBe(0);

                }
                done();
            });

        });

        it(`should show that account '7016135894' is on eBilling, and account '7029521254' is not.`, (done) => {

            let getBillPrefRequestOptions: request.Options = {
                url: `${TESTING_BASE_ADDRESS}aglSettingsApi/v2/billdeliverypreferences`,
                headers: {
                    'Authorization': `Bearer ${tokenRichardMunt}`,
                    'x-correlation-id': Guid.newGuid()
                }
            };

            RequestHelpers.RequestAsync(getBillPrefRequestOptions)
                .finally(() => done())
                .subscribe(
                    (responseModel: ResponseModel) => {
                        expect(responseModel.response.statusCode).toBe(200);
                        let viewModel: BillDelivery[] = JSON.parse(responseModel.response.body);
                        expect(viewModel).not.toBeNull();
                        expect(viewModel.length).toBe(2);
                        expect(viewModel[0].billDeliveryMode).toBe(`Email`);
                        expect(viewModel[0].contractAccountNumbers).toEqual([7016135894]);
                        expect(viewModel[1].billDeliveryMode).toBe(`Postal`);
                        expect(viewModel[1].contractAccountNumbers).toEqual([7029521254]);
                    },
                    (error) => {
                        fail();
                    });
        });

        it (`should allow me to update my billing preference to eBilling for account '7029521254'`, (done) => {

            let requestOptions: request.Options = {
                url: `${TESTING_BASE_ADDRESS}aglSettingsApi/v2/billdeliverypreferences/Email/contractAccounts`,
                method: 'post',
                json: true,
                body: {
                    contractAccountNumber: 7029521254
                },
                headers: {
                    'Authorization': `Bearer ${tokenRichardMunt}`,
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

        it(`should show that both contracts are eligible on account '7029521254' for the multi-account user, Richard Munt`, (done) => {

            let accountNumber: string = `7029521254`;

            let requestOptions: request.Options = {
                url: `${API_BASE_URL}/v1/contractAccounts/${accountNumber}/energyInsights/subscriptions`,
                json: true,
                headers: {
                    'Authorization': `Bearer ${tokenRichardMunt}`,
                    'x-correlation-id': Guid.newGuid()
                }
            };
            request(requestOptions, (error: any, response: request.RequestResponse, body: any) => {
                if (error) {
                    fail();
                } else {
                    console.log(JSON.stringify(response));
                    expect(response.statusCode).toBe(200);
                    let responseModel: EnergyInsightsEligibilityContract[] = response.body;
                    expect(responseModel).toBeDefined();
                    expect(responseModel.length).toBe(2);

                    expect(responseModel[0].contractNumber).toBe(9401786227);

                    // This result incorporates the ebilling status
                    expect(responseModel[0].isEligible).toBe(true);
                    expect(responseModel[0].subscribedToMidBillEnergyBreakdown).toBe(false);
                    expect(responseModel[0].subscribedToEndBillEnergyBreakdown).toBe(false);
                    expect(responseModel[0].availableUsageBreakdownBillPeriods.length).toBe(2);

                    expect(responseModel[1].contractNumber).toBe(9401786228);
                    expect(responseModel[1].isEligible).toBe(false);
                    expect(responseModel[1].ineligibleReason.internal.number).toBe(`024`);
                    expect(responseModel[1].subscribedToMidBillEnergyBreakdown).toBe(false);
                    expect(responseModel[1].subscribedToEndBillEnergyBreakdown).toBe(false);
                    expect(responseModel[1].availableUsageBreakdownBillPeriods.length).toBe(0);

                }
                done();
            });

        });

    });

    describe(`Test GetEnergyInsightsBilledUsageBreakdown`, () => {

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

        it(`Should return the correct mock file when the supplied parameters are correct`, (done) => {

            const testContract: string = `9101004976`;
            const testBillStartDate: string = `2018-01-27`;
            const testBillEndDate: string = `2018-02-27`;

            let requestOptions: request.Options = {
                url: `${API_BASE_URL}/v1/contracts/${testContract}/usageBreakdown/billed/billStartDate/${testBillStartDate}/billEndDate/${testBillEndDate}`,
                json: true,
                headers: {
                    'Authorization': `Bearer ${tokenClintEastwood}`,
                    'x-correlation-id': Guid.newGuid()
                }
            };
            request(requestOptions, (error: any, response: request.RequestResponse, body: any) => {
                if (error) {
                    fail();
                } else {
                    console.log(JSON.stringify(response));
                    expect(response.statusCode).toBe(200);
                    let responseModel: EnergyInsightsUsage = response.body;
                    expect(responseModel).toBeDefined();
                    expect(responseModel.totalUsageCost).toBe(150.69);
                    expect(responseModel.highestMeasuredUsageCategory).toBe(EnergyInsightsUsageCategory.Cooling);
                    expect(responseModel.hasUsageAmount).toBe(true);
                    expect(responseModel.usageBreakdown.length).toBe(7);
                }
                done();
            });
        });

        it(`Should return a 400 error when the bill start date is not valid`, (done) => {

            const testContract: string = `9101004976`;
            const testBillStartDate: string = `27-01-2018`;
            const testBillEndDate: string = `2018-02-27`;

            let requestOptions: request.Options = {
                url: `${API_BASE_URL}/v1/contracts/${testContract}/usageBreakdown/billed/billStartDate/${testBillStartDate}/billEndDate/${testBillEndDate}`,
                json: true,
                headers: {
                    'Authorization': `Bearer ${tokenClintEastwood}`,
                    'x-correlation-id': Guid.newGuid()
                }
            };
            request(requestOptions, (error: any, response: request.RequestResponse, body: any) => {
                if (error) {
                    fail();
                } else {
                    console.log(JSON.stringify(response));
                    expect(response.statusCode).toBe(400);
                }
                done();
            });
        });

        it(`Should return a 400 error when the bill end date is not valid`, (done) => {

            const testContract: string = `9101004976`;
            const testBillStartDate: string = `2018-01-27`;
            const testBillEndDate: string = `27-02-2018`;

            let requestOptions: request.Options = {
                url: `${API_BASE_URL}/v1/contracts/${testContract}/usageBreakdown/billed/billStartDate/${testBillStartDate}/billEndDate/${testBillEndDate}`,
                json: true,
                headers: {
                    'Authorization': `Bearer ${tokenClintEastwood}`,
                    'x-correlation-id': Guid.newGuid()
                }
            };
            request(requestOptions, (error: any, response: request.RequestResponse, body: any) => {
                if (error) {
                    fail();
                } else {
                    console.log(JSON.stringify(response));
                    expect(response.statusCode).toBe(400);
                }
                done();
            });
        });

        it(`Should return a 400 error when the bill start date is not before the bill end date`, (done) => {

            const testContract: string = `9101004976`;
            const testBillStartDate: string = `2018-01-27`;
            const testBillEndDate: string = `2018-01-24`;

            let requestOptions: request.Options = {
                url: `${API_BASE_URL}/v1/contracts/${testContract}/usageBreakdown/billed/billStartDate/${testBillStartDate}/billEndDate/${testBillEndDate}`,
                json: true,
                headers: {
                    'Authorization': `Bearer ${tokenClintEastwood}`,
                    'x-correlation-id': Guid.newGuid()
                }
            };
            request(requestOptions, (error: any, response: request.RequestResponse, body: any) => {
                if (error) {
                    fail();
                } else {
                    console.log(JSON.stringify(response));
                    expect(response.statusCode).toBe(400);
                }
                done();
            });
        });

    });
});
