import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { IRewardsEligibilityService } from './services/contract/iRewardsEligibility.service';

@Injectable()
export class RewardsRoutingGuard implements CanActivate {
    constructor(private router: Router, private rewardsEligibilityService: IRewardsEligibilityService) { }

    public canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.rewardsEligibilityService.checkEligibility()
            .map((result) => {
                if (result && result.isEligible) {
                    return true;
                } else {
                    this.router.navigate(['/settings/offers']);
                    return false;
                }
            });
    }
}
