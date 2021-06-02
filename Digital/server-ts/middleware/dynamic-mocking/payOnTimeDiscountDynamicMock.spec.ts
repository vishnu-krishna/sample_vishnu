
import * as express from 'express';
import * as request from 'request';
import { Mock } from 'ts-mocks';
import { cloneDeep } from 'lodash';

import { PayOnTimeDiscountDynamicMock } from './payOnTimeDiscountDynamicMock';
import { IdentityEmulator } from './../../../common/identityEmulator';

import { AccountApiModel, PaymentApiModel } from './../../../src/app/shared/service/api.service';
import { Product } from '../../../src/app/shared/model/product/product.model';
import { DynamicMockKey, DynamicMockDesiredState, DynamicMock } from './../../../src/app/myAccount/mockManager/models/dynamicMock';
import { IncomingHttpHeaders } from 'http';

describe('Pay on time discount dynamic mock', () => {
    let requestMock: Mock<express.Request>;

    function createRequestWithAuthClaim(desiredState: DynamicMockDesiredState) {
        let additionalClaims: string[] = [ DynamicMock.generateKey(DynamicMockKey.potdProducts, desiredState) ];
        let token = IdentityEmulator.generateTokenForCustomer('AGL_E395B919757991F1B3400000C99D6332', '', additionalClaims);
        let authHeader = <IncomingHttpHeaders> { authorization: `Bearer ${token}` };
        let headers = new Mock<IncomingHttpHeaders>();

        requestMock = new Mock<express.Request>();
        requestMock.setup((m) => m.headers).is( authHeader );
    }

    describe('when POTD dynamic mocking on', () => {
        beforeEach(() => {
            createRequestWithAuthClaim(DynamicMockDesiredState.enabled);
        });

        it(`should add potd product attribute in product api response`, (done: DoneFn) => {
            let apiResponse: Product = {
                id: 'AGLMKTREPP1',
                description: 'Prepay Product Scheduled',
                fuelType: 'Electricity',
                invalid: false,
                attributes: [{
                    id: 'SomeNonPodtId',
                    description: 'some description',
                    regionId: null,
                    dataType: 'String',
                    value: 'COMBINED',
                    valueDescription: 'usage and supply',
                    unitOfMeasure: null
                }]
            };

            let expectedResponseBody: Product = cloneDeep(apiResponse);
            expectedResponseBody.attributes.push({
                id: PayOnTimeDiscountDynamicMock.payOnTimeDiscountAttributeId,
                description: 'A dynamically mocked POTD Product',
                regionId: null,
                dataType: 'String',
                value: 'COMBINED',
                valueDescription: 'usage and supply',
                unitOfMeasure: null
            });

            let responseMock = new Mock<express.Response>();
            let nextMock: express.NextFunction = (err?: any): void => {
                responseMock.Object.send(apiResponse);
                done();
            };

            let sendSpy = responseMock.setup((m) => m.send).Spy;

            PayOnTimeDiscountDynamicMock.alterProductApiResponse(requestMock.Object, responseMock.Object, nextMock);
            expect(sendSpy).toHaveBeenCalledWith(expectedResponseBody);
        });

        it(`should set payOnTimeDiscount value in payment api response`, (done: DoneFn) => {
            let apiResponse = [<PaymentApiModel> {
                account: '1234567890',
                currentBalance: 100
            }];

            let expectedResponseBody: PaymentApiModel[] = cloneDeep(apiResponse);
            expectedResponseBody[0].payOnTimeDiscount = 10;
            expectedResponseBody[0].currentBalanceExcludingPayOnTimeDiscount = 110;

            let responseMock = new Mock<express.Response>();
            let nextMock: express.NextFunction = (err?: any): void => {
                responseMock.Object.send(apiResponse);
                done();
            };

            let sendSpy = responseMock.setup((m) => m.send).Spy;

            PayOnTimeDiscountDynamicMock.alterPaymentsApiResponse(requestMock.Object, responseMock.Object, nextMock);
            expect(sendSpy).toHaveBeenCalledWith(expectedResponseBody);
        });
    });

    describe('when POTD dynamic mocking off', () => {
        beforeEach(() => {
            createRequestWithAuthClaim(DynamicMockDesiredState.disabled);
        });

        it(`should remove potd product attribute in product api response`, (done: DoneFn) => {
            let apiResponse: Product = {
                id: 'AGLMKTREPP1',
                description: 'Prepay Product Scheduled',
                fuelType: 'Electricity',
                invalid: false,
                attributes: [{
                    id: PayOnTimeDiscountDynamicMock.payOnTimeDiscountAttributeId,
                    description: 'some description',
                    regionId: null,
                    dataType: 'String',
                    value: 'COMBINED',
                    valueDescription: 'usage and supply',
                    unitOfMeasure: null
                }]
            };

            let expectedResponseBody: Product = cloneDeep(apiResponse);
            expectedResponseBody.attributes[0].id = 'not_' + PayOnTimeDiscountDynamicMock.payOnTimeDiscountAttributeId;
            expectedResponseBody.attributes[0].description = 'Not some description';

            let responseMock = new Mock<express.Response>();
            let nextMock: express.NextFunction = (err?: any): void => {
                responseMock.Object.send(apiResponse);
                done();
            };

            let sendSpy = responseMock.setup((m) => m.send).Spy;

            PayOnTimeDiscountDynamicMock.alterProductApiResponse(requestMock.Object, responseMock.Object, nextMock);
            expect(sendSpy).toHaveBeenCalledWith(expectedResponseBody);
        });

        it(`should set payOnTimeDiscount value to 0 in payment api response`, (done: DoneFn) => {
            let apiResponse = [<PaymentApiModel> {
                account: '1234567890',
                currentBalance: 100,
                payOnTimeDiscount: 123,
                currentBalanceExcludingPayOnTimeDiscount: 456
            }];

            let expectedResponseBody: PaymentApiModel[] = cloneDeep(apiResponse);
            expectedResponseBody[0].payOnTimeDiscount = 0;
            expectedResponseBody[0].currentBalanceExcludingPayOnTimeDiscount = 0;

            let responseMock = new Mock<express.Response>();
            let nextMock: express.NextFunction = (err?: any): void => {
                responseMock.Object.send(apiResponse);
                done();
            };

            let sendSpy = responseMock.setup((m) => m.send).Spy;

            PayOnTimeDiscountDynamicMock.alterPaymentsApiResponse(requestMock.Object, responseMock.Object, nextMock);
            expect(sendSpy).toHaveBeenCalledWith(expectedResponseBody);
        });
    });
});
