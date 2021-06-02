import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observer } from 'rxjs';
import { Observable } from 'rxjs/Observable';

import { FeatureFlagService, FeatureFlagTypes } from '../../../services/featureFlag.service';
import { ConfigService } from '../../../../shared/service/config.service';
import { AglAuthTokenProvider } from '../../../../shared/repository/aglAuthTokenProvider';

@Injectable()
export class NotificationsRoutingGuard implements CanActivate {

    constructor(
        private router: Router,
        private featureFlagService: FeatureFlagService,
        private configService: ConfigService,
        private aglAuthTokenProvider: AglAuthTokenProvider
    ) {}

    public canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return new Observable((observer: Observer<boolean>) => {
            this.featureFlagService.featureFlagged(FeatureFlagTypes.manageNotificationsEnabled)
            .subscribe(
                (featureFlagOn: boolean) => {
                    if (featureFlagOn) {
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
