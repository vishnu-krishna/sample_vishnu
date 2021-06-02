import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';

import { FeatureFlagService, FeatureFlagTypes } from '../../../services/featureFlag.service';
import { IConcessionStateService } from './services/concessionState.service';

@Injectable()
export class ApplyForConcessionSessionGuard implements CanActivate, CanActivateChild {
    constructor(
        private router: Router,
        private featureFlagService: FeatureFlagService,
        private concessionStateService: IConcessionStateService
    ) { }

    public canActivate(activatedRouteSnapshot: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.featureFlagService.featureFlagged(FeatureFlagTypes.applyForConcessionEnabled)
                .map((isFeatureOn: boolean) => {
                    let allowAccess = isFeatureOn && this.hasSession;

                    if (!allowAccess) {
                        this.denyAccess();
                    }
                    return allowAccess;
                })
                .catch((err) => {
                    this.denyAccess();
                    return Observable.of(false);
                });
    }

    public canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.canActivate(childRoute, state);
    }

    private denyAccess() {
        console.log('Access denied to concessions');
        this.router.navigate(['/settings/personal']);
    }

    private get hasSession(): boolean {
        return this.concessionStateService.hasSession;
    }
}
