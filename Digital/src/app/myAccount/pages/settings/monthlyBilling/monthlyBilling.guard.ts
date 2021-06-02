import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { MonthlyBillingService } from '../../../services/monthlyBilling.service';

@Injectable()
export class MonthlyBillingRoutingGuard implements CanActivate {
    constructor(private router: Router, public monthlyBillingService: MonthlyBillingService) { }

    public canActivate(router: ActivatedRouteSnapshot): Observable<boolean> {
        if (this.monthlyBillingService.selectedMonthlyBillingAccount) {
            return Observable.of(true);
        } else {
            this.router.navigate(['/settings/billing']);
            return Observable.of(false);
        }
    }
}
