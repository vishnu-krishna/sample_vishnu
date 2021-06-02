import { CommonModule } from '@angular/common';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { RouterModule } from '@angular/router';
import { CommonComponentsModule } from './commonComponents.module';
import { CommonPipesModule } from './commonPipes.module';
import { MyAccountMaterialModule } from './my-account.material.module';

import { FeatureFlagService } from '../../myAccount/services/featureFlag.service';
import { Locale }  from '../../shared/globals/localisation';
import { SolarCheckMessageComponent } from '../dashboard/solarCheck/solarCheckOffer/solarCheckMessage/solarCheckMessage.component';
import { SolarCheckOfferComponent } from '../dashboard/solarCheck/solarCheckOffer/solarCheckOffer.component';
import { SolarCheckPrerequisiteComponent } from '../dashboard/solarCheck/solarCheckRegisterProcess/solarCheckPrerequisite/solarCheckPrerequisite.component';
import { SolarCheckRegisterComponent } from '../dashboard/solarCheck/solarCheckRegisterProcess/solarCheckRegister/solarCheckRegister.component';
import { SolarCheckRegisterProcessComponent } from '../dashboard/solarCheck/solarCheckRegisterProcess/solarCheckRegisterProcess.component';
import { MyDateAdapterService, SolarCheckSolarDetailsComponent } from '../dashboard/solarCheck/solarCheckRegisterProcess/solarCheckSolarDetails/solarCheckSolarDetails.component';
import { SolarCheckUnsuitableComponent } from '../dashboard/solarCheck/solarCheckRegisterProcess/solarCheckUnsuitable/solarCheckUnsuitable.component';
import { SolarCheckWelcomeComponent } from '../dashboard/solarCheck/solarCheckRegisterProcess/solarCheckWelcome/solarCheckWelcome.component';
import { SolarCheckStatusComponent } from '../dashboard/solarCheck/solarCheckStatus/solarCheckStatus.component';
import { SolarCheckStatusViewModelFactory } from '../dashboard/solarCheck/solarCheckStatus/solarCheckStatusViewModelFactory';
import { SolarCheckUpdateSystemDetailsComponent } from '../pages/settings/solarCheck/systemDetails/update/solarCheckUpdateSystemDetails.component';
import { SolarCheckUpdateDetailsProcessComponent } from '../pages/settings/solarCheck/systemDetails/updateProcess/solarCheckUpdateDetailsProcess.component';
import { SolarCheckUpdateReasonComponent } from '../pages/settings/solarCheck/systemDetails/updateProcess/solarCheckUpdateReason/solarCheckUpdateReason.component';
import { ISolarCheckOfferService } from '../services/contract/isolarCheckOffer.service';
import { SolarCheckOfferService } from '../services/solarCheckOffer.service';

@NgModule({
    declarations: [
        SolarCheckOfferComponent,
        SolarCheckRegisterProcessComponent,
        SolarCheckWelcomeComponent,
        SolarCheckPrerequisiteComponent,
        SolarCheckUnsuitableComponent,
        SolarCheckSolarDetailsComponent,
        SolarCheckRegisterComponent,
        SolarCheckMessageComponent,
        SolarCheckStatusComponent,
        SolarCheckUpdateSystemDetailsComponent,
        SolarCheckUpdateDetailsProcessComponent,
        SolarCheckUpdateReasonComponent
    ],
    exports: [
        SolarCheckOfferComponent,
        SolarCheckStatusComponent,
        SolarCheckUnsuitableComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CommonPipesModule,
        RouterModule,
        CommonComponentsModule,
        MyAccountMaterialModule
    ],
    providers: [
        { provide: ISolarCheckOfferService, useClass: SolarCheckOfferService },
        { provide: LOCALE_ID, useValue: Locale.DEFAULT },
        { provide: DateAdapter, useClass: MyDateAdapterService },
        FeatureFlagService,
        SolarCheckStatusViewModelFactory
    ],
    entryComponents: [
        SolarCheckRegisterProcessComponent,
        SolarCheckUpdateDetailsProcessComponent
    ]
})
export class SolarCheckModule {
    constructor(private dateAdapter: DateAdapter<Date>) {
        this.dateAdapter.setLocale(Locale.DEFAULT);
    }
}
