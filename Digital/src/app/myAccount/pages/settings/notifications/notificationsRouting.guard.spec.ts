import { TestBed, async } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';
import { AglAuthTokenProvider } from '../../../../shared/repository/aglAuthTokenProvider';
import { ConfigService } from '../../../../shared/service/config.service';
import { AglAuthTokenProviderStub } from '../../../../test/stubs/aglAuthTokenProvider.stub';
import { FeatureFlagService, FeatureFlagTypes } from '../../../services/featureFlag.service';
import { ConfigMockService } from '../../../services/mock/config.mock.service';
import { FeatureFlagMockService } from '../../../services/mock/featureflag.mock.service';
import { NotificationsRoutingGuard } from './notificationsRouting.guard';

describe('notifications routing guard', () => {
    let guard: NotificationsRoutingGuard;
    let router: Router;
    let featureFlagService: FeatureFlagService;
    let aglAuthTokenProvider: AglAuthTokenProvider;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            providers: [
                NotificationsRoutingGuard,
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

        this.guard = TestBed.get(NotificationsRoutingGuard);
        this.router = TestBed.get(Router);
        this.featureFlagService = TestBed.get(FeatureFlagService);
        this.aglAuthTokenProvider = TestBed.get(AglAuthTokenProvider);
        this.configService = TestBed.get(ConfigService);
    });

    describe('canActivate', () => {
        describe('when feature flag is on', () => {
            it('should return true', async(() => {
                spyOn(this.featureFlagService, 'featureFlagged').and.callFake((arg) => {
                    return Observable.of(arg === FeatureFlagTypes.manageNotificationsEnabled);
                });
                const result = this.guard.canActivate();
                result.subscribe((value: boolean) => {
                    expect(value).toBe(true);
                });
            }));
        });
        describe('when feature flag is off', () => {

            beforeEach(() => {
                spyOn(this.featureFlagService, 'featureFlagged').and.callFake((arg) => {
                    return Observable.of(false);
                });
            });

            describe('when user is authenticated', () => {
                it('should route to /overview', async(() => {
                    spyOn(this.aglAuthTokenProvider, 'hasToken').and.returnValue(true);
                    spyOn(this.router, 'navigate');
                    const result = this.guard.canActivate();
                    result.subscribe((value: boolean) => {
                        expect(value).toBe(false);
                        expect(this.router.navigate).toHaveBeenCalledWith([
                            '/overview'
                        ]);
                    });
                }));
            });
            describe('when user is not authenticated', () => {
                it('should not navigate', async(() => {
                    spyOn(this.aglAuthTokenProvider, 'hasToken').and.returnValue(false);
                    spyOn(this.configService, 'navigateToLoginWithReturnPath');
                    const result = this.guard.canActivate();
                    result.subscribe((value: boolean) => {
                        expect(value).toBe(false);
                        expect(this.configService.navigateToLoginWithReturnPath).toHaveBeenCalledWith('/overview');
                    });
                }));
            });
        });
    });
});
