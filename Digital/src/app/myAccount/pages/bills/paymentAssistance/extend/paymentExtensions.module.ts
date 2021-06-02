import { NgModule } from '@angular/core';

import { PaymentExtensionApplicationModule } from './application/paymentExtensionApplication.module';
import { PaymentExtensionConfirmationModule } from './confirmation/paymentExtensionConfirmation.module';
import { PaymentExtensionEligibilityModule } from './eligibility/paymentExtensionEligibility.module';
import { PaymentExtensionStateService } from './services/paymentExtensionState.service';

@NgModule({
    declarations: [
    ],
    imports: [
        PaymentExtensionEligibilityModule,
        PaymentExtensionApplicationModule,
        PaymentExtensionConfirmationModule
    ],
    providers: [
        { provide: PaymentExtensionStateService, useClass: PaymentExtensionStateService }
    ]
})
export class PaymentExtensionsModule { }
