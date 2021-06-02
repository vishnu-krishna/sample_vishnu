import { PaymentArrangementPaymentMethodComponent } from './../../shared/component/paymentArrangement/paymentArrangementPaymentMethod/paymentArrangementPaymentMethod.component';

import { CommonModule }        from '@angular/common';
import { NgModule }            from '@angular/core';
import { FormsModule,
         ReactiveFormsModule }         from '@angular/forms';
import { RouterModule }        from '@angular/router';
import { CommonPipesModule }   from '../modules/commonPipes.module';
import { DirectivesModule }    from '../modules/directives.module';
import { AlertMessages } from './../../shared/messages/alertMessages';
import { MyAccountMaterialModule } from './my-account.material.module';

// All common components
import { BackToTopComponent }                from '../../myAccount/backToTop/backToTop.component';
import { OfferTileComponent }                 from '../../myAccount/dashboard/offerTile/offerTile.component';
import { StoreBankFormComponent }            from '../../myAccount/forms/storeBankAccountForm/storeBankForm.component';
import { StoreCreditCardFormComponent }      from '../../myAccount/forms/storeCreditCardForm/storeCreditCardForm.component';
import { StorePaypalFormComponent }          from '../../myAccount/forms/storePaypalForm/storePaypalForm.component';
import { AlertComponent }                    from '../../shared/component/alert/alert.component';
import { BillSmoothingLearnMoreComponent } from '../../shared/component/billSmoothingLearnMore/billSmoothingLearnMore.component';
import { ButtonDropdownComponent }           from '../../shared/component/buttonDropdown/buttonDropdown.component';
import { PaymentBankAccountComponent } from '../../shared/component/payment/paymentMethods/bankAccount/payment.bankAccount.component';
import { AddPaymentMethodComponent }         from '../../shared/component/paymentMethods/addPaymentMethod.component';
import { PaymentMethodsBankAccountComponent } from '../../shared/component/paymentMethods/paymentMethods.bankAccount.component';
import { PaymentMethodsCreditCardComponent } from '../../shared/component/paymentMethods/paymentMethods.creditCard.component';
import { PaymentMethodsPaypalComponent } from '../../shared/component/paymentMethods/paymentMethods.paypal.component';
import { ToolTipWhiteComponent }             from '../../shared/component/usagetooltip/tooltipWhite.component';
import { UsageTooltipComponent }             from '../../shared/component/usagetooltip/usageTooltip.component';
import { LoadingModule }                     from '../../shared/loaders/loading.module';
import { PrepaidBalanceComponent }           from '../dashboard/payg/prepaidBalance.component';
import { ContactDetailsUpdateConfirmationModule } from '../pages/settings/contactDetails/contactDetailsUpdateConfirmation/contactDetailsUpdateConfirmation.module';
import { MobileNumberComponent } from '../pages/settings/mobileNumber/mobileNumber.component';
import { AccountDetailComponent }            from '../settings/accountDetail/accountDetail.component';

// Common providers
import { PaymentValidators } from '../../shared/validators/paymentValidators';

import { BusinessPartnerNumberService } from '../../myAccount/services/businessPartnerNumber/businessPartnerNumber.service';
import { IBusinessPartnerNumberService } from '../../myAccount/services/contract/ibusinessPartnerNumber.service';
import { WebChatModule } from '../../shared/component/webChat/webChat.module';
import { DeepLinkActionDirective } from '../../shared/directives/deepLinkAction.directive';
import { ConcessionModule } from '../pages/settings/concession/concession.module';

@NgModule({
      declarations: [
            AccountDetailComponent,
            BackToTopComponent,
            AlertComponent,
            PrepaidBalanceComponent,
            UsageTooltipComponent,
            ToolTipWhiteComponent,
            PaymentMethodsCreditCardComponent,
            AddPaymentMethodComponent,
            StoreCreditCardFormComponent,
            StoreBankFormComponent,
            StorePaypalFormComponent,
            ButtonDropdownComponent,
            PaymentMethodsBankAccountComponent,
            PaymentMethodsPaypalComponent,
            PaymentBankAccountComponent,
            BillSmoothingLearnMoreComponent,
            MobileNumberComponent,
            PaymentArrangementPaymentMethodComponent,
            OfferTileComponent,
            DeepLinkActionDirective
      ],
      exports: [
            AccountDetailComponent,
            BackToTopComponent,
            AlertComponent,
            PrepaidBalanceComponent,
            UsageTooltipComponent,
            ToolTipWhiteComponent,
            PaymentMethodsCreditCardComponent,
            AddPaymentMethodComponent,
            StoreCreditCardFormComponent,
            StoreBankFormComponent,
            StorePaypalFormComponent,
            ButtonDropdownComponent,
            PaymentMethodsBankAccountComponent,
            PaymentMethodsPaypalComponent,
            PaymentBankAccountComponent,
            BillSmoothingLearnMoreComponent,
            LoadingModule,
            MobileNumberComponent,
            PaymentArrangementPaymentMethodComponent,
            OfferTileComponent,
            WebChatModule,
            DeepLinkActionDirective,
            ContactDetailsUpdateConfirmationModule,
            ConcessionModule
      ],
      imports: [
            CommonModule,
            MyAccountMaterialModule,
            CommonPipesModule,
            ReactiveFormsModule,
            FormsModule,
            DirectivesModule,
            RouterModule,
            LoadingModule,
            WebChatModule,
            ContactDetailsUpdateConfirmationModule,
            ConcessionModule
      ],
      providers: [
        PaymentValidators,
        AlertMessages,
        { provide: IBusinessPartnerNumberService, useClass: BusinessPartnerNumberService }
    ],
  entryComponents: [
        PaymentMethodsCreditCardComponent,
        AddPaymentMethodComponent,
        StoreCreditCardFormComponent,
        StoreBankFormComponent,
        StorePaypalFormComponent,
        BillSmoothingLearnMoreComponent
      ]
})
export class CommonComponentsModule {}
