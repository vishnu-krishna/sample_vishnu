import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { RewardsOffer } from '../../../shared/rewards-offer';

@Component({
    selector: 'agl-rewards-dmb-terms-conditions',
    templateUrl: './rewards-dmb-terms-conditions.component.html',
    styleUrls: ['./rewards-dmb-terms-conditions.component.scss']
})
export class RewardsDMBTermsConditionsComponent {
    constructor(public dialogRef: MatDialogRef<RewardsDMBTermsConditionsComponent>, @Inject(MAT_DIALOG_DATA) public data: RewardsOffer) { }

    public closeClick() {
        this.dialogRef.close();
    }
}
