import { async, inject, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';
import { AglAuthTokenProvider } from '../../../../../shared/repository/aglAuthTokenProvider';
import { ConfigService } from '../../../../../shared/service/config.service';
import { FeatureFlagService } from '../../../../services/featureFlag.service';
import { FeatureFlagMockService } from '../../../../services/mock/featureflag.mock.service';
import { PaymentExtensionRoutingGuard } from './paymentExtensionRouting.guard';

describe('payment extension routing guard', () => {
    const siteCoreUrl = 'SITECOREURL';

    beforeEach(() => {
        const configService = {
            current: {
                aglSiteCoreWebsiteBaseUrl: siteCoreUrl
            }
        };
        const aglAuthTokenProvider = {
            getToken: (): string => {
                throw new Error('getToken is not implemented');
            }
        };

        TestBed.configureTestingModule({
          imports: [RouterTestingModule],
          providers: [
              PaymentExtensionRoutingGuard,
              { provide: ConfigService, useValue: configService },
              { provide: FeatureFlagService, useClass: FeatureFlagMockService },
              { provide: AglAuthTokenProvider, useValue: aglAuthTokenProvider }
            ]
        });
      });

    describe('canActivate', () => {
        it('canActivate return true when feature flag is on', async(inject([PaymentExtensionRoutingGuard, Router, ConfigService, FeatureFlagService, AglAuthTokenProvider],
            (guard, router, configService, featureFlagService, aglAuthTokenProvider) => {
            // arrange
            spyOn(featureFlagService, 'featureFlagged').and.returnValue(Observable.of(true));

            // act
            const result = guard.canActivate();

            // assert
            result.subscribe((value: boolean) => {
                expect(value).toBe(true);
            });
        })));

        it('canActivate return false and navigate to overview page when  feature flag is off and user is authenticated', async(inject([PaymentExtensionRoutingGuard, Router, ConfigService, FeatureFlagService, AglAuthTokenProvider],
            (guard, router, configService, featureFlagService, aglAuthTokenProvider) => {
            // arrange
            const token = 'DUMMYTOKEN';
            spyOn(featureFlagService, 'featureFlagged').and.returnValue(Observable.of(false));
            spyOn(aglAuthTokenProvider, 'getToken').and.returnValue(token);
            spyOn(router, 'navigate').and.returnValue(null);

            // act
            const result = guard.canActivate();

            // assert
            result.subscribe((value: boolean) => {
                expect(value).toBe(false);
                expect(router.navigate).toHaveBeenCalledWith(['/overview']);
            });
        })));

        it('canActivate return false and navigate to login page when  feature flag is off and user is NOT authenticated', async(inject([PaymentExtensionRoutingGuard, Router, ConfigService, FeatureFlagService, AglAuthTokenProvider],
            (guard, router, configService, featureFlagService, aglAuthTokenProvider) => {
            // arrange
            const loginPage = `${siteCoreUrl}/sts/account/login?returnApp=MyAccount&returnPath=${encodeURIComponent('/overview')}`;
            spyOn(featureFlagService, 'featureFlagged').and.returnValue(Observable.of(false));
            spyOn(aglAuthTokenProvider, 'getToken').and.returnValue(null);
            spyOn(guard, 'replaceWindowLocation').and.returnValue(null);

            // act
            const result = guard.canActivate();

            // assert
            result.subscribe((value: boolean) => {
                expect(value).toBe(false);
                expect(guard.replaceWindowLocation).toHaveBeenCalledWith(loginPage);
            });
        })));
    });
});
