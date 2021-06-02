import { Observable } from 'rxjs/Rx';
import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AglAuthTokenProvider } from '../../../../shared/repository/aglAuthTokenProvider';
import { ConfigService } from '../../../../shared/service/config.service';
import { AglAuthTokenProviderStub } from '../../../../test/stubs/aglAuthTokenProvider.stub';
import { ConfigMockService } from '../../../services/mock/config.mock.service';
import { PaymentAssistanceModule } from './paymentAssistance.module';
import { PaymentAssistanceWelcomeComponent } from './paymentAssistanceWelcome.component';

describe('Payment Assistance Welcome', () => {

    let comp: PaymentAssistanceWelcomeComponent;
    let fixture: ComponentFixture<PaymentAssistanceWelcomeComponent>;

    let aglAuthTokenProvider: AglAuthTokenProvider;
    let configService: ConfigService;
    let router: Router;
    const anyCide: string = 'dummycide';
    const destinationRoute: string = '/bills/paymentassistance/select';

    beforeEach(() => {
        const activatedRouteStub = {
            queryParams: Observable.of({
                cide: anyCide
            })
        };

        TestBed.configureTestingModule({
            declarations: [
            ],
            imports: [
                PaymentAssistanceModule,
                RouterTestingModule
            ],
            providers: [
                { provide: ConfigService, useClass: ConfigMockService },
                { provide: AglAuthTokenProvider, useClass: AglAuthTokenProviderStub },
                { provide: MATERIAL_SANITY_CHECKS, useValue: false },
                { provide: ActivatedRoute, useValue: activatedRouteStub }
            ]
        });

        fixture = TestBed.createComponent(PaymentAssistanceWelcomeComponent);
        comp = fixture.componentInstance;

        aglAuthTokenProvider = TestBed.get(AglAuthTokenProvider);
        router = TestBed.get(Router);
        configService = TestBed.get(ConfigService);
    });

    describe('Customer who is not logged into My Account', () => {

        beforeEach(() => {
            spyOn(aglAuthTokenProvider, 'getToken').and.returnValue(null);
        });

        it('should see the landing page for payment assistance', () => {
            // ARRANGE
            // ACT
            fixture.detectChanges();

            // ASSERT
            expect(comp.showPage).toBeTruthy();
        });

        describe('clicks the login button', () => {

            it('should redirect to the login page passing a redirect to the payment assistance select page', () => {
                // ARRANGE
                const destinationUrl = destinationRoute + `?cide=${anyCide}`;
                spyOn(configService, 'navigateToLoginWithReturnPath');
                spyOn(configService, 'getForwardingRouteWithParameters').and.returnValue(destinationUrl);

                // ACT
                comp.login();

                // ASSERT
                expect(configService.getForwardingRouteWithParameters).toHaveBeenCalled();
                expect(configService.navigateToLoginWithReturnPath).toHaveBeenCalledWith(destinationUrl);
            });
        });

        describe('clicks the register button', () => {
            it('should redirect to the register page passing a redirect to the payment assistance select page', () => {
                // ARRANGE
                const destinationUrl = destinationRoute + `?cide=${anyCide}`;
                spyOn(configService, 'navigateToRegisterWithReturnPath');
                spyOn(configService, 'getForwardingRouteWithParameters').and.returnValue(destinationUrl);

                // ACT
                comp.register();

                // ASSERT
                expect(configService.getForwardingRouteWithParameters).toHaveBeenCalled();
                expect(configService.navigateToRegisterWithReturnPath).toHaveBeenCalledWith(destinationUrl);
            });
        });

    });

    describe('Customer who is logged into My Account', () => {
        beforeEach(() => {
            const dummyToken = 'DUMMY TOKEN';
            spyOn(aglAuthTokenProvider, 'getToken').and.returnValue(dummyToken);
        });

        it('should be redirected to the payment assistance select page', () => {
            // ARRANGE
            spyOn(configService, 'routeWithParameters');

            // ACT
            fixture.detectChanges();

            // ASSERT
            expect(configService.routeWithParameters).toHaveBeenCalled();
        });

    });

});
