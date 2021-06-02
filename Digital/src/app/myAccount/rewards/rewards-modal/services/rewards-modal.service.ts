import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MatDialog } from '@angular/material/dialog';

import { BenefitsTermsConditionsComponent } from '../components/benefits-terms-conditions/benefits-terms-conditions.component';

@Injectable()
export class RewardsModalService {

    constructor(private dialog: MatDialog) {}

    public benefitsShowTermsConditions(result) {
            this.dialog.open(BenefitsTermsConditionsComponent, {
                panelClass: 'agl-dialog--mobile-full-screen'
            });
    }
}
