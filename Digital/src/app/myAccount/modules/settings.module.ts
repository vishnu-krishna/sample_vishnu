import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CommonComponentsModule } from './commonComponents.module';
import { CommonPipesModule } from './commonPipes.module';
import { MyAccountMaterialModule } from './my-account.material.module';

// All components relating to SettingsModule
import { LeftHandMenuComponent } from '../pages/settings/leftHandMenu/leftHandMenu.component';
import { DeletePaymentMethodComponent } from '../pages/settings/myWallet/deletePaymentMethod/deletePaymentMethod.component';
import { SettingsComponent } from '../pages/settings/settings.component';

// Settings pages with modals and relating components
// Please note these can't be lazy loaded.
// more information: https://github.com/angular/angular/issues/14324
import { BillSmoothingSetupFuelComponent } from '../pages/settings/billSmoothing/billSmoothingSetupFuel/billSmoothingSetupFuel.component';
import { BillSmoothingSetupFuelItemComponent } from '../pages/settings/billSmoothing/billSmoothingSetupFuel/billSmoothingSetupFuelItem/billSmoothingSetupFuelItem.component';
import { MonthlyDatePickerComponent } from '../pages/settings/billSmoothing/billSmoothingSetupFuel/billSmoothingSetupFuelItem/monthlyDatePicker/monthlyDatePicker.component';
import { BillSmoothingSetupModalComponent } from '../pages/settings/billSmoothing/billSmoothingSetupModal/billSmoothingSetupModal.component';
import { BillSmoothingSetupSuccessfulComponent } from '../pages/settings/billSmoothing/billSmoothingSetupSuccessful/billSmoothingSetupSuccessful.component';
import { DeleteDirectDebitComponent } from '../pages/settings/directDebit/deleteDirectDebit/deleteDirectDebit.component';

// Providers and services
import { AddCreditCardResultMessage } from '../../shared/messages/addCreditCardResult.message';
import { DeleteCreditCardResult } from '../../shared/messages/deleteCreditCardResult.message';
import { DeletePaymentMethodLinkPaymentArrangementResult } from '../../shared/messages/deletePaymentMethodLinkPaymentArrangementResult.message';
import { BillingSettingsViewModelFactory } from '../pages/settings/billing/billingSettingsViewModelFactory';
import { MyWalletService } from '../pages/settings/myWallet/myWallet.service';
import { IMyWalletService } from '../pages/settings/myWallet/myWallet.service.interface';
import { PaymentMethodsService } from '../services/settings/paymentMethods.service';
import { IPaymentMethodsService } from '../services/settings/paymentMethods.service.interface';

import { PaymentArrangementSettingsService } from '../../shared/component/paymentArrangement/paymentArrangement.settings.service';
import { IPaymentArrangementSettingsService } from '../../shared/component/paymentArrangement/paymentArrangement.settings.service.interface';
import { AddBankAccountResultMessage } from '../../shared/messages/addBankAccountResult.message';
import { SolarCheckComponent } from '../pages/settings/solarCheck/solarCheck.component';
import { LocalStorageService } from '../services/localStorage.service';

import { DeletePaymentArrangementResultMessage } from '../../shared/messages/deletePaymentArrangementResult.message';
import { SetUpPaymentArrangementResultMessage } from '../../shared/messages/setUpPaymentArrangementResultMessage';
import { SwitchPaymentArrangementResultMessage } from '../../shared/messages/switchPaymentArrangementResult.message';

import { DeleteSmsPayComponent } from '../pages/settings/smspay/deleteSmsPay/deleteSmsPay.component';
import { SMSPaySuccessComponent } from './../pages/settings/smspay/smsPaySuccess/smsPaySuccess.component';

import { BillSmoothingModule } from '../../billSmoothing.module';
import { YesNoSwitchComponent } from '../../shared/component/yesNoSwitch/yesNoSwitch.component';
import { SetUpBillSmoothingResultMessage } from '../../shared/messages/setUpBillSmoothingResultMessage';
import { BillSmoothingService }   from '../pages/settings/billSmoothing/billSmoothing.service';
import { DirectDebitModule } from '../pages/settings/directDebit/directDebit.module';
import { MonthlyBillingModule } from '../pages/settings/monthlyBilling/monthlyBilling.module';
import { EnergyInsightsModule } from '../pages/settings/energyInsights/energyInsights.module';

import { MonthlyBillingSettingsComponent } from '../pages/settings/monthlyBilling/monthlyBillingSettings/monthlyBilling.settings.component';
import { AccountDetailsDeletePaymentMethodComponent } from '../pages/settings/myWallet/deletePaymentMethod/accountDetails.deletePaymentMethod/accountDetails.deletePaymentMethod.component';
import { SMSPayModule } from '../pages/settings/smspay/smspay.module';
import { SolarCheckDeregisterComponent } from '../pages/settings/solarCheck/deregister/solarCheckDeregister.component';
import { SolarCheckSystemDetailsComponent } from '../pages/settings/solarCheck/systemDetails/solarCheckSystemDetails.component';
import { InstalmentPlanService } from '../services/paymentScheme/instalmentPlan.service';

@NgModule({
      declarations: [
            LeftHandMenuComponent,
            SettingsComponent,
            DeletePaymentMethodComponent,
            DeleteDirectDebitComponent,
            DeleteSmsPayComponent,
            SolarCheckComponent,
            SolarCheckSystemDetailsComponent,
            SolarCheckDeregisterComponent,
            YesNoSwitchComponent,
            BillSmoothingSetupModalComponent,
            BillSmoothingSetupFuelComponent,
            BillSmoothingSetupFuelItemComponent,
            BillSmoothingSetupSuccessfulComponent,
            MonthlyDatePickerComponent,
            SMSPaySuccessComponent,
            AccountDetailsDeletePaymentMethodComponent
      ],
      exports: [
            SolarCheckDeregisterComponent,
            AccountDetailsDeletePaymentMethodComponent
      ],
      imports: [
            CommonModule,
            CommonComponentsModule,
            CommonPipesModule,
            RouterModule,
            MyAccountMaterialModule,
            BrowserModule,
            FormsModule,
            BillSmoothingModule,
            SMSPayModule,
            DirectDebitModule,
            MonthlyBillingModule,
            EnergyInsightsModule,
      ],
      providers: [
            BillingSettingsViewModelFactory,
            MyWalletService,
            AddCreditCardResultMessage,
            AddBankAccountResultMessage,
            DeleteCreditCardResult,
            DeletePaymentMethodLinkPaymentArrangementResult,
            DeletePaymentArrangementResultMessage,
            SwitchPaymentArrangementResultMessage,
            SetUpPaymentArrangementResultMessage,
            { provide: IPaymentMethodsService, useClass: PaymentMethodsService },
            { provide: IMyWalletService, useClass: MyWalletService },
            { provide: IPaymentArrangementSettingsService, useClass: PaymentArrangementSettingsService },
            BillSmoothingService,
            SetUpBillSmoothingResultMessage,
            LocalStorageService,
            InstalmentPlanService
      ],
      entryComponents: [
            DeletePaymentMethodComponent,
            DeleteDirectDebitComponent,
            DeleteSmsPayComponent,
            SMSPaySuccessComponent,
            BillSmoothingSetupModalComponent,
            SolarCheckDeregisterComponent,
            MonthlyBillingSettingsComponent
      ]
})
export class SettingsModule { }
