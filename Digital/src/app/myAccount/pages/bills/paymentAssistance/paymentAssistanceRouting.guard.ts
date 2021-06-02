import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Observer } from 'rxjs';
import { AglAuthTokenProvider } from '../../../../shared/repository/aglAuthTokenProvider';
import { ConfigService } from '../../../../shared/service/config.service';
import { FeatureFlagService, FeatureFlagTypes } from '../../../services/featureFlag.service';

@Injectable()
export class PaymentAssistanceRoutingGuard implements CanActivate {

    constructor(
        private router: Router,
        private configService: ConfigService,
        private featureFlagService: FeatureFlagService,
        private aglAuthTokenProvider: AglAuthTokenProvider
    ) { }

    public canActivate(activatedRouteSnapshot: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return new Observable((observer: Observer<boolean>) => {
            this.featureFlagService.featureFlagged(FeatureFlagTypes.paymentAssistanceEnabled)
            // .finally(() => {
            //     observer.complete();
            // })
            .subscribe(
                (isFeatureOn: boolean) => {
                    if (isFeatureOn) {
                        observer.next(true);
                    } else {
                        this.handleFeatureFlagOff();
                        observer.next(false);
                    }
                },
                (error) => {
                    this.handleFeatureFlagOff();
                    observer.next(false);
                },
                () => {
                    observer.complete();
                }
            );
        });
    }

    private handleFeatureFlagOff() {
        if (this.aglAuthTokenProvider.hasToken()) {
            this.goToOverviewPage();
        } else {
            this.goToLoginPage();
        }
    }

    private goToOverviewPage() {
        this.router.navigate(['/overview']);
    }
    private goToLoginPage() {
        this.configService.navigateToLoginWithReturnPath('/overview');
    }
}
