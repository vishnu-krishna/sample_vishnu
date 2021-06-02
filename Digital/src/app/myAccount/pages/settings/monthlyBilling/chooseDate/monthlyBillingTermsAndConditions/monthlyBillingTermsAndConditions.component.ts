import { Component, ViewChild } from '@angular/core';
import { LightBoxComponent } from '../../../../../maui/lightBox/lightBox.component';

@Component({
    selector: 'agl-monthly-billing-terms-conditions',
    templateUrl: './monthlyBillingTermsAndConditions.component.html',
    styleUrls: [ './monthlyBillingTermsAndConditions.component.scss' ]
})

export class TermsAndConditionsMonthlyBillingComponent {
    @ViewChild('termsAndConditionsLightBox') public termsAndConditionsLightBox: LightBoxComponent;

    public showTermsAndConditions() {
        this.termsAndConditionsLightBox.showLightBox(true);
    }

    public onClickButtonPrimary(event: any) {
        this.termsAndConditionsLightBox.showLightBox(false);
    }
}
