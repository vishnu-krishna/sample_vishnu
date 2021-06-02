import { CommonModule }                         from '@angular/common';
import { NgModule }                             from '@angular/core';
import { ReactiveFormsModule }                          from '@angular/forms';
import { RouterModule }                         from '@angular/router';
import { MyAccountMaterialModule } from './my-account.material.module';

import { BillingModule }                        from './billing.module';
import { CommonComponentsModule }               from './commonComponents.module';
import { CommonPipesModule }                    from './commonPipes.module';
import { DirectivesModule }                     from './directives.module';

// All components relating to the Payments Pages
import { CtaButtonModule } from '../../shared/component/ctaButton/index';
import { PaygBonusComponent } from '../../shared/component/payment/payg/paygBonus.component';
import { PaymentAmountComponent } from '../../shared/component/payment/paymentAmount.component';
import { PaymentContainerComponent } from '../../shared/component/payment/paymentContainer.component';
import { PaymentCreditCardComponent } from '../../shared/component/payment/paymentMethods/creditCard/payment.creditCard.component';
import { IframeCreditCardComponent } from '../../shared/component/payment/paymentMethods/iframeCreditCardComponent/iframe.credit-card.component';
import { PaymentPaypalComponent } from '../../shared/component/payment/paymentMethods/paypal/payment.paypal.component';
import { StoredMethodPaymentComponent } from '../../shared/component/payment/paymentMethods/storedMethod/storedMethod.component';
import { PaymentSelectComponent } from '../../shared/component/payment/paymentSelect.component';
import { PaymentSmsPayBannerComponent } from '../../shared/component/payment/paymentSmsPayBanner/paymentSmsPayBanner.component';
import { PaymentSuccessComponent } from '../../shared/component/payment/paymentSuccess.component';

@NgModule({
  declarations: [
        PaymentSelectComponent,
        PaymentAmountComponent,
        PaymentCreditCardComponent,
        IframeCreditCardComponent,
        PaymentPaypalComponent,
        PaymentContainerComponent,
        PaymentSuccessComponent,
        PaymentSmsPayBannerComponent,
        PaygBonusComponent,
        StoredMethodPaymentComponent
  ],
  imports: [
        CommonModule,
        ReactiveFormsModule,
        CommonComponentsModule,
        CommonPipesModule,
        RouterModule,
        MyAccountMaterialModule,
        BillingModule,
        DirectivesModule,
        CtaButtonModule
    ],
  exports: [
        PaymentSuccessComponent,
        PaymentContainerComponent,
        PaygBonusComponent,
  ],
  entryComponents: [
        PaymentContainerComponent,
        PaymentSuccessComponent
  ]
})
export class PaymentsModule { }
