import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpRequest, HttpErrorResponse, HttpHeaders, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Mock } from 'ts-mocks/lib';

import { EnergyInsightsApiRepository } from './energyInsightsApi.repository';
import { ConfigService, IConfig } from '../../shared/service/config.service';
import { AglAuthTokenProvider } from '../../shared/repository/aglAuthTokenProvider';
import { AglAuthTokenProviderStub } from '../../test/stubs/aglAuthTokenProvider.stub';
import { SetupEnergyInsightsRequest } from '../services/settings/model/setupEnergyInsightsRequest';
import { AuthInterceptor } from '../interceptors/auth.interceptor';
import { CorrelationIdInterceptor } from '../interceptors/correlationId.interceptor';
import { EnergyInsightsUsage } from '../services/settings/model/energyInsightsUsage';
import { EnergyInsightsUsageCategory } from '../services/settings/model/energyUsageCategories';
import { EnergyInsightsUsageBreakdown } from '../services/settings/model/energyInsightsUsageBreakdown';

interface Data {
    name: string;
  }

const testUrl = '/data';

describe(`Energy insights api repository test`, () => {

    let energyInsightsApiRepository: EnergyInsightsApiRepository = null;
    let httpTestingController: HttpTestingController;
    let mockConfigService: Mock<ConfigService> = new Mock<ConfigService>();
    let FAKE_API_URL: string = `https://www.energy-insights-api-fake-url.com.au`;

    let spies: {
        configServiceCurrentConfig: jasmine.Spy,
    } = {
        configServiceCurrentConfig: null,
    };

    beforeEach(() => {

        let current: any = {
            aglEnergyInsightsApiBaseUrl: FAKE_API_URL
        };

        spies.configServiceCurrentConfig = mockConfigService
            .setup((x) => x.current)
            .is(current).Spy;

        TestBed.configureTestingModule({
            declarations: [],
            imports: [ HttpClientTestingModule ],
            providers: [
                { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
                { provide: HTTP_INTERCEPTORS, useClass: CorrelationIdInterceptor, multi: true },
                EnergyInsightsApiRepository,
                { provide: ConfigService, useValue: mockConfigService.Object },
                { provide: AglAuthTokenProvider, useClass: AglAuthTokenProviderStub },
            ]
        });

        httpTestingController = TestBed.get(HttpTestingController);
        energyInsightsApiRepository = TestBed.get(EnergyInsightsApiRepository);

    });

    afterEach(() => {
        // After every test, assert that there are no more pending requests.
        httpTestingController.verify();
    });

    describe(`Test getEligibilityAndSubscriptionStatus`, () => {

        beforeEach(() => {
            energyInsightsApiRepository = TestBed.get(EnergyInsightsApiRepository);
        });

        it(`should return an error message in the case of an empty account number`, async(() => {
            const accountNumber = ``;

            expect(() => energyInsightsApiRepository.getEligibilityAndSubscriptionStatus(accountNumber)
                .subscribe()).toThrow(`accountNumber was empty`);
        }));

        it(`should return error of contract number NaN`, async(() => {
            const accountNumber = `notANumber`;

            expect(() => energyInsightsApiRepository.getEligibilityAndSubscriptionStatus(accountNumber)
                .subscribe()).toThrow(`accountNumber was not a valid number`);
        }));

        it(`should make a get call with correct url`, async(() => {
            const contractAccountNumber: string = `9101004976`;
            const endpointUrl: string = `${FAKE_API_URL}/v1/contractAccounts/${contractAccountNumber}/energyInsights/subscriptions`;
            const testData: Data = { name: `Test Data` };

            energyInsightsApiRepository.getEligibilityAndSubscriptionStatus(contractAccountNumber).subscribe();
            const req = httpTestingController.expectOne(endpointUrl);

            expect(req.request.method).toEqual('GET');
            req.flush(testData);
            httpTestingController.verify();
        }));

    });

    describe(`getUsageBreakdownForBilled`, () => {

        beforeEach(() => {
            energyInsightsApiRepository = TestBed.get(EnergyInsightsApiRepository);
        });

        it(`should return error message of empty contract number`, async(() => {

            const contractNumber = ``;
            const billStartDate: string = `2017-05-17`;
            const billEndDate: string = `2017-05-17`;

            expect(() => energyInsightsApiRepository.getUsageBreakdownForBilled(contractNumber, billStartDate, billEndDate)
                .subscribe()).toThrow(`contractNumber was empty`);

        }));

        it(`should return error of contract number NaN`, async(() => {

            const contractNumber = `notANumber`;
            const billStartDate: string = `2017-05-17`;
            const billEndDate: string = `2017-05-17`;

            expect(() => energyInsightsApiRepository.getUsageBreakdownForBilled(contractNumber, billStartDate, billEndDate)
                .subscribe()).toThrow(`contractNumber was not a valid number`);

        }));

        it(`should return a 'billStartDate was invalid' error if the bill start date is not valid`, async(() => {

            const contractNumber: string = `9101004976`;
            const billStartDate: string = ``;
            const billEndDate: string = `2017-05-17`;

            const endpointUrl: string = `${FAKE_API_URL}/v1/contracts/${contractNumber}/usageBreakdown/billed/billStartDate/${billStartDate}/billEndDate/${billEndDate}`;

            expect(() => energyInsightsApiRepository.getUsageBreakdownForBilled(contractNumber, billStartDate, billEndDate)
                .subscribe()).toThrow(`billStartDate was invalid`);

            const req = httpTestingController.expectNone(endpointUrl);
            httpTestingController.verify();

        }));

        it(`should call the usage breakdown for billed endpoint`, async(() => {

            const contractNumber: string = `9101004976`;
            const billStartDate: string = `2017-05-17`;
            const billEndDate: string = `2017-05-17`;
            const testResponseData: EnergyInsightsUsage = new EnergyInsightsUsage();
            testResponseData.highestMeasuredUsageCategory = EnergyInsightsUsageCategory.Heating;
            testResponseData.hasUsageAmount = true;
            testResponseData.totalUsageCost = 14.03;
            testResponseData.usageBreakdown = [
                {
                    ...new EnergyInsightsUsageBreakdown(),
                    category: EnergyInsightsUsageCategory.Heating,
                    usagePercentage: 100,
                    usageAmount: 14.03
                }
            ];

            const endpointUrl: string = `${FAKE_API_URL}/v1/contracts/${contractNumber}/usageBreakdown/billed/billStartDate/${billStartDate}/billEndDate/${billEndDate}`;

            energyInsightsApiRepository.getUsageBreakdownForBilled(contractNumber, billStartDate, billEndDate)
                .subscribe((data) =>
                    expect(data).toEqual(testResponseData)
                );

            const req = httpTestingController.expectOne(endpointUrl);
            expect(req.request.method).toEqual('GET');
            expect(req.request.headers.get('authorization')).toBe(`Bearer mocktoken`);

            req.flush(testResponseData);
            httpTestingController.verify();

        }));

    });

    describe(`Test setupEnergyInsights`, () => {

        beforeEach(() => {
            energyInsightsApiRepository = TestBed.get(EnergyInsightsApiRepository);
        });

        it(`should return error message of empty contract number`, async(() => {

            const contractNumber = ``;
            const testRequestData: SetupEnergyInsightsRequest = new SetupEnergyInsightsRequest(true, true);

            expect(() => energyInsightsApiRepository.setupEnergyInsights(contractNumber, testRequestData)
                .subscribe()).toThrow(`contractNumber was empty`);

        }));

        it(`should return error of contract number NaN`, async(() => {

            const contractNumber = `notANumber`;
            const testRequestData: SetupEnergyInsightsRequest = new SetupEnergyInsightsRequest(true, true);

            expect(() => energyInsightsApiRepository.setupEnergyInsights(contractNumber, testRequestData)
                .subscribe()).toThrow(`contractNumber was not a valid number`);

        }));

        it(`should return minimum of 1 mid or end subscription`, async(() => {

            const contractNumber: string = `9101004976`;
            const testRequestData: SetupEnergyInsightsRequest = new SetupEnergyInsightsRequest(null, null);

            expect(() => energyInsightsApiRepository.setupEnergyInsights(contractNumber, testRequestData)
                .subscribe()).toThrow(`at least one of Mid or End subscription must be provided`);

        }));

        it(`Should successfully setup energy insights`, async(() => {

            const contractNumber: string = `9101004976`;
            const testRequestData: SetupEnergyInsightsRequest = new SetupEnergyInsightsRequest(true, true);
            const testResponseData: any = {};
            const endpointUrl: string = `${FAKE_API_URL}/v1/contracts/${contractNumber}/energyInsights/subscriptions`;

            energyInsightsApiRepository.setupEnergyInsights(contractNumber, testRequestData)
                .subscribe((data) =>
                    expect(data).toEqual(testResponseData)
                );

            const req = httpTestingController.expectOne(endpointUrl);
            expect(req.request.method).toEqual('POST');
            expect(req.request.headers.get('authorization')).toBe(`Bearer mocktoken`);

            req.flush(testResponseData);
            httpTestingController.verify();
        }));

    });

});
