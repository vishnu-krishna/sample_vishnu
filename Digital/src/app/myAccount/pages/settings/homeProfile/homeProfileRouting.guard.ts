import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { FeatureFlagService, FeatureFlagTypes } from '../../../services/featureFlag.service';

@Injectable()
export class HomeProfileRoutingGuard implements CanActivate {

    constructor(
        private router: Router,
        private featureFlagService: FeatureFlagService
    ) { }

    public canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.featureFlagService.featureFlagged(FeatureFlagTypes.homeProfileEnabled).map((isFeatureOn: boolean) => {
            if (isFeatureOn) {
                return true;
            } else {
                this.goToOverview();
                return false;
            }
        });
    }

    private goToOverview() {
        this.router.navigate(['/overview']);
    }
}
