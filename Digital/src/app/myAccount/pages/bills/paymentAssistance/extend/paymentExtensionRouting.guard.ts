import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Observer } from 'rxjs';
import { AglAuthTokenProvider } from '../../../../../shared/repository/aglAuthTokenProvider';
import { ConfigService } from '../../../../../shared/service/config.service';
import { FeatureFlagService, FeatureFlagTypes } from '../../../../services/featureFlag.service';

@Injectable()
export class PaymentExtensionRoutingGuard implements CanActivate {

    constructor(
        private router: Router,
        private configService: ConfigService,
        private featureFlagService: FeatureFlagService,
        private aglAuthTokenProvider: AglAuthTokenProvider
    ) { }

    public canActivate(r: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return new Observable((observer: Observer<boolean>) => {
            this.featureFlagService.featureFlagged(FeatureFlagTypes.paymentExtensionEnabled).subscribe(
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

    // TODO: haven't found a way to mock window.location.replace, this function is for assisting unit test
    public replaceWindowLocation(newLocation: string) {
        window.location.replace(newLocation);
    }

    private handleFeatureFlagOff() {
        if (this.aglAuthTokenProvider.getToken()) {
            this.goToOverview();
        } else {
            this.goToLogin();
        }
    }

    private goToOverview() {
        this.router.navigate(['/overview']);
    }

    private goToLogin() {
        const siteCoreUrl = this.configService.current.aglSiteCoreWebsiteBaseUrl;
        const loginPage = `${siteCoreUrl}/sts/account/login?returnApp=MyAccount&returnPath=${encodeURIComponent('/overview')}`;
        this.replaceWindowLocation(loginPage);
    }
}
