import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { LightBoxComponent } from '../../../../../../maui/lightBox/lightBox.component';

@Component({
    selector: 'agl-payment-assistance-terms-conditions',
    templateUrl: './paymentAssistanceTermsAndConditions.component.html',
    styleUrls: [ './paymentAssistanceTermsAndConditions.component.scss' ]
})

export class PaymentAssistanceTermsAndConditionsComponent {
    @ViewChild('termsAndConditionsLightBox') public termsAndConditionsLightBox: LightBoxComponent;
    @Output() public termAccepted = new EventEmitter();

    public showTermsAndConditions() {
        this.termsAndConditionsLightBox.showLightBox(true);
    }

    public onClickButtonPrimary(): void {
        this.termsAndConditionsLightBox.showLightBox(false);
        this.termAccepted.emit();
    }

    public onClickButtonDismiss(): void {
        this.termsAndConditionsLightBox.showLightBox(false);
    }
}
