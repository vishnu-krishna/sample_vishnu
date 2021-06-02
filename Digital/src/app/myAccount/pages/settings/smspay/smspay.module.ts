import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Modules
import { CommonComponentsModule } from '../../../modules/commonComponents.module';
import { CommonPipesModule } from '../../../modules/commonPipes.module';
import { MyAccountMaterialModule } from '../../../modules/my-account.material.module';

// Components
import { SMSPaySettingsComponent } from './smspay.settings.component';
import { SmsPayButtonComponent } from './smsPayButton/smsPayButton.component';
import { UpcomingBillsSmsPayComponent } from './upcomingBills/upcomingBills.smspay.component';

// routes
export const ROUTES: Routes = [
    { path: '', component: SMSPaySettingsComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(ROUTES),
        CommonModule,
        MyAccountMaterialModule,
        CommonComponentsModule,
        CommonPipesModule
    ],
    declarations: [
        SMSPaySettingsComponent,
        SmsPayButtonComponent,
        UpcomingBillsSmsPayComponent
    ],
    exports: [SmsPayButtonComponent],
    providers: [
    ],
    entryComponents: [
        SMSPaySettingsComponent
    ]
})
export class SMSPayModule {}
