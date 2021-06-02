import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { RewardsModalService } from './services/rewards-modal.service';
import { IRewardsEligibilityService } from '../services/contract/iRewardsEligibility.service';

@Injectable()
export class RewardsModalRoutingGuard implements CanActivate {
    constructor(
        private router: Router,
        private rewardsEligibilityService: IRewardsEligibilityService,
        private aglRewardsService: RewardsModalService
    ) { }

    public canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.rewardsEligibilityService.checkEligibility()
        .map((result) => {
            if (result && result.isEligible) {
                 this.aglRewardsService.benefitsShowTermsConditions(result);
            }
            this.router.navigate(['/rewards']);
            return false;
        });
    }
}
