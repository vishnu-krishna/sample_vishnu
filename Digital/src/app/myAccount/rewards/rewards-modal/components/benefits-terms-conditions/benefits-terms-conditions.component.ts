import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'agl-benefits-terms-conditions',
    templateUrl: './benefits-terms-conditions.component.html',
    styleUrls: ['./benefits-terms-conditions.component.scss']
})
export class BenefitsTermsConditionsComponent {
   constructor(public dialogRef: MatDialogRef<BenefitsTermsConditionsComponent>, @Inject(MAT_DIALOG_DATA) public data: string) {}

    public closeClick() {
        this.dialogRef.close();
    }
}
