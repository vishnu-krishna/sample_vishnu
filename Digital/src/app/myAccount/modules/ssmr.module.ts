import { CommonModule, Location }                   from '@angular/common';
import { NgModule }                       from '@angular/core';
import { FormsModule }                    from '@angular/forms';
import { RouterModule }                   from '@angular/router';
import { MeterEntryComponentModule } from '../pages/ssmr/steps/meterEntry/index';
import { MultiRegisterOnboardComponentModule } from '../pages/ssmr/steps/multiRegisterOnboard/index';
import { CommonPipesModule }              from './commonPipes.module';
import { MyAccountMaterialModule } from './my-account.material.module';

import { SSMRComponent } from '../pages/ssmr/ssmr.component';
import { ChooseServiceComponent } from '../pages/ssmr/steps/chooseService/chooseService.component';
import { OopsComponent } from '../pages/ssmr/steps/oops/oops.component';
import { SafetyComponent } from '../pages/ssmr/steps/safety/safety.component';

import { AdjustmentComponentModule } from '../pages/ssmr/steps/adjustment/index';
import { AttachPhotoComponentModule } from '../pages/ssmr/steps/attachPhoto/index';
import { ChatComponent } from '../pages/ssmr/steps/chat/chat.component';
import { MultiMeterIntroComponent } from '../pages/ssmr/steps/multiMeterIntro/multiMeterIntro.component';
import { SubmittingComponent } from '../pages/ssmr/steps/submitting/submitting.component';
import { SummaryComponent } from '../pages/ssmr/steps/summary/summary.component';

import { MauiButtonModule } from '../maui/button';
import { PhotoIntroComponent } from '../pages/ssmr/steps/photoIntro/photoIntro.component';
import { CommonComponentsModule } from './commonComponents.module';

@NgModule({
    declarations: [
        SSMRComponent,
        ChooseServiceComponent,
        SafetyComponent,
        SubmittingComponent,
        OopsComponent,
        ChatComponent,
        MultiMeterIntroComponent,
        SummaryComponent,
        PhotoIntroComponent
    ],
    exports: [
        SSMRComponent
    ],
    imports: [
        MeterEntryComponentModule,
        AttachPhotoComponentModule,
        MultiRegisterOnboardComponentModule,
        AdjustmentComponentModule,
        CommonModule,
        CommonPipesModule,
        RouterModule,
        MyAccountMaterialModule,
        FormsModule,
        CommonComponentsModule,
        MauiButtonModule
    ],
    providers: [
        Location
    ]
})
export class SSMRModule { }
