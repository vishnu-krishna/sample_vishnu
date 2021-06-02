import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';
import { AglAuthTokenProvider } from '../../../../shared/repository/aglAuthTokenProvider';
import { ConfigService } from '../../../../shared/service/config.service';
import { AglAuthTokenProviderStub } from '../../../../test/stubs/aglAuthTokenProvider.stub';
import { FeatureFlagService } from '../../../services/featureFlag.service';
import { ConfigMockService } from '../../../services/mock/config.mock.service';
import { FeatureFlagMockService } from '../../../services/mock/featureflag.mock.service';
import { PaymentAssistanceRoutingGuard } from './paymentAssistanceRouting.guard';

describe('payment assistance plan routing guard', () => {
    let guard: PaymentAssistanceRoutingGuard;
    let router: Router;
    let featureFlagService: FeatureFlagService;
    let aglAuthTokenProvider: AglAuthTokenProvider;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            providers: [
                PaymentAssistanceRoutingGuard,
                { provide: ConfigService, useClass: ConfigMockService },
                {
                    provide: FeatureFlagService,
                    useClass: FeatureFlagMockService
                },
                {
                    provide: AglAuthTokenProvider,
                    useClass: AglAuthTokenProviderStub
                }
            ]
        });

        this.guard = TestBed.get(PaymentAssistanceRoutingGuard);
        this.router = TestBed.get(Router);
        this.featureFlagService = TestBed.get(FeatureFlagService);
        this.aglAuthTokenProvider = TestBed.get(AglAuthTokenProvider);
        this.configService = TestBed.get(ConfigService);
    });

    describe('canActivate', () => {
        describe('when feature flag is on', () => {
            it('should return true', () => {
                // arrange
                spyOn(this.featureFlagService, 'featureFlagged').and.returnValue(Observable.of(true));

                // act
                const result = this.guard.canActivate();

                // assert
                result.subscribe((value: boolean) => {
                    expect(value).toBe(true);
                });
            });
        });
        describe('when feature flag is off', () => {

            beforeEach(() => {
                // arrange
                spyOn(this.featureFlagService, 'featureFlagged').and.returnValue(Observable.of(false));
            });

            describe('when user is authenticated', () => {
                it('should route to /overview', () => {
                    // arrange
                    spyOn(this.aglAuthTokenProvider, 'hasToken').and.returnValue(true);
                    spyOn(this.router, 'navigate');

                    // act
                    const result = this.guard.canActivate();

                    // assert
                    result.subscribe((value: boolean) => {
                        expect(value).toBe(false);
                        expect(this.router.navigate).toHaveBeenCalledWith([
                            '/overview'
                        ]);
                    });
                });
            });
            describe('when user is not authenticated', () => {
                it('should navigate to /overview', () => {
                    // arrangeF
                    spyOn(this.aglAuthTokenProvider, 'hasToken').and.returnValue(false);
                    spyOn(this.configService, 'navigateToLoginWithReturnPath');

                    // act
                    const result = this.guard.canActivate();

                    // assert
                    result.subscribe((value: boolean) => {
                        expect(value).toBe(false);
                        expect(this.configService.navigateToLoginWithReturnPath).toHaveBeenCalledWith('/overview');
                    });
                });
            });
        });
    });
});
