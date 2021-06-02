import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpRequest, HttpErrorResponse, HttpHeaders, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Mock } from 'ts-mocks/lib';

import { ConfigService, IConfig } from '../../../shared/service/config.service';
import { AglAuthTokenProvider } from '../../../shared/repository/aglAuthTokenProvider';
import { AglAuthTokenProviderStub } from '../../../test/stubs/aglAuthTokenProvider.stub';
import { AuthInterceptor } from '../../interceptors/auth.interceptor';
import { CorrelationIdInterceptor } from '../../interceptors/correlationId.interceptor';
import { HomeProfileApiService, HomeProfileApiModel } from './homeProfileApi.service';

interface Data {
    name: string;
  }

const testUrl = '/data';

describe(`HomeProfileApiService test`, () => {

    let homeProfileApiService: HomeProfileApiService = null;
    let httpTestingController: HttpTestingController;
    let mockConfigService: Mock<ConfigService> = new Mock<ConfigService>();
    let FAKE_API_URL: string = `https://www.homeprofile-api-fake-url.com.au`;

    let spies: {
        configServiceCurrentConfig: jasmine.Spy,
    } = {
        configServiceCurrentConfig: null,
    };

    beforeEach(() => {

        let current: any = {
            aglHomeProfileApi: FAKE_API_URL
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
                { provide: ConfigService, useValue: mockConfigService.Object },
                { provide: AglAuthTokenProvider, useClass: AglAuthTokenProviderStub },
                HomeProfileApiService
            ]
        });

        httpTestingController = TestBed.get(HttpTestingController);
        homeProfileApiService = TestBed.get(HomeProfileApiService);

    });

    afterEach(() => {
        // After every test, assert that there are no more pending requests.
        httpTestingController.verify();
    });

    describe(`HomeProfileApiService getProfile`, () => {

        it(`should return an error message in the case of an empty contract number`, async(() => {
            const contractNumber = ``;

            expect(() => homeProfileApiService.getProfile(contractNumber)
                .subscribe()).toThrow(`Contract Number is not valid`);
        }));

        it(`should return error of contract number NaN`, async(() => {
            const contractNumber = `notANumber`;

            expect(() => homeProfileApiService.getProfile(contractNumber)
                .subscribe()).toThrow(`Contract Number is not valid`);
        }));

        it(`should make a get call with correct url`, async(() => {
            const contractNumber: string = `9101004976`;
            const endpointUrl: string = `${FAKE_API_URL}/v1/contracts/${contractNumber}/homeProfile`;
            const testData: Data = { name: `Test Data` };

            homeProfileApiService.getProfile(contractNumber).subscribe();
            const req = httpTestingController.expectOne(endpointUrl);

            expect(req.request.method).toEqual('GET');
            req.flush(testData);
            httpTestingController.verify();
        }));

    });

    describe(`HomeProfileApiService getProfiles`, () => {

        it(`should make a get call with correct url`, async(() => {
            const contractNumber: string = `9101004976`;
            const endpointUrl: string = `${FAKE_API_URL}/v1/homeProfiles`;
            const testData: Data = { name: `Test Data` };

            homeProfileApiService.getProfiles().subscribe();
            const req = httpTestingController.expectOne(endpointUrl);

            expect(req.request.method).toEqual('GET');
            req.flush(testData);
            httpTestingController.verify();
        }));

    });

    describe(`HomeProfileApiService saveProfile`, () => {

        const testRequestData = new HomeProfileApiModel();

        it(`should return error message of empty contract number`, async(() => {

            const contractNumber = ``;

            expect(() => homeProfileApiService.saveProfile(contractNumber, testRequestData)
                .subscribe()).toThrow(`Contract Number is not valid`);

        }));

        it(`should return error of contract number NaN`, async(() => {

            const contractNumber = `notANumber`;

            expect(() => homeProfileApiService.saveProfile(contractNumber, testRequestData)
                .subscribe()).toThrow(`Contract Number is not valid`);

        }));

        it(`Should successfully save home profile`, async(() => {

            const contractNumber: string = `9101004976`;
            const testResponseData: any = {};
            const endpointUrl: string = `${FAKE_API_URL}/v1/contracts/${contractNumber}/homeProfile`;

            homeProfileApiService.saveProfile(contractNumber, testRequestData)
                .subscribe((data) =>
                    expect(data).toEqual(testResponseData)
                );

            const req = httpTestingController.expectOne(endpointUrl);
            expect(req.request.method).toEqual('POST');
            expect(req.request.headers.get('authorization')).toBe(`Bearer mocktoken`);
            expect(req.request.headers.get('X-Correlation-Id')).not.toBeNull();
            req.flush(testResponseData);
            httpTestingController.verify();
        }));

    });

});
