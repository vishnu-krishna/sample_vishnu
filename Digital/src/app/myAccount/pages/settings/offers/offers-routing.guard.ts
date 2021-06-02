import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { IRewardsEligibilityService } from '../../../rewards/index';

@Injectable()
export class OffersRoutingGuard implements CanActivate {
    constructor(private router: Router, private rewardsEligibilityService: IRewardsEligibilityService) { }

    public canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.rewardsEligibilityService.checkEligibility()
            .map((result) => {
                if (result && result.isEligible) {
                    this.router.navigate(['/rewards']);
                    return false;
                } else {
                    return true;
                }
            });
    }
}
