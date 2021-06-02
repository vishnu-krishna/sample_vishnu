import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Observer } from 'rxjs';
import { AglAuthTokenProvider } from '../../../../../shared/repository/aglAuthTokenProvider';
import { ConfigService } from '../../../../../shared/service/config.service';
import { FeatureFlagTypes } from '../../../../services/featureFlag.constants';
import { FeatureFlagService } from '../../../../services/featureFlag.service';
import { MonthlyBillingService } from '../../../../services/monthlyBilling.service';
import { MonthlyBillingRoutes } from '../monthlyBillingRoutes.const';

@Injectable()
export class MonthlyBillingWelcomeRoutingGuard implements CanActivate {

    constructor(
        private router: Router,
        private configService: ConfigService,
        private featureFlagService: FeatureFlagService,
        private aglAuthTokenProvider: AglAuthTokenProvider,
        private monthlyBillingService: MonthlyBillingService
    ) { }

    public canActivate(activatedRouteSnapshot: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return new Observable((observer: Observer<boolean>) => {

            if (this.aglAuthTokenProvider.getToken()) {
                this.featureFlagService.featureFlagged(FeatureFlagTypes.monthlyBillingEnabled).subscribe(
                    (isFeatureOn: boolean) => {
                        if (isFeatureOn) {
                            this.monthlyBillingService.isSingleAccountCustomer().subscribe((result) => {
                                if (result) {
                                    this.router.navigate([MonthlyBillingRoutes.ChooseService]);
                                } else {
                                    this.router.navigate(['/settings/billing']);
                                }
                            },
                            (error) => {
                                this.goToOverview();
                                observer.next(false);
                            });
                            observer.next(true);
                        } else {
                            this.goToOverview();
                            observer.next(false);
                        }
                    },
                    (error) => {
                        this.goToOverview();
                        observer.next(false);
                    },
                    () => {
                        observer.complete();
                    }
                );
            } else {
                this.goToLogin();
            }
        });
    }

    // TODO: haven't found a way to mock window.location.replace, this function is for assisting unit test
    public replaceWindowLocation(newLocation: string) {
        window.location.replace(newLocation);
    }

    private goToOverview() {
        this.router.navigate(['/overview']);
    }

    private goToLogin() {
        const siteCoreUrl = this.configService.current.aglSiteCoreWebsiteBaseUrl;
        const loginPage = `${siteCoreUrl}/sts/account/login?returnApp=MyAccount&returnPath=${encodeURIComponent('/settings/monthlybilling/welcome')}`;
        this.replaceWindowLocation(loginPage);
    }
}
