import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonComponentsModule } from '../../myAccount/modules/commonComponents.module';
import { CommonPipesModule } from '../modules/commonPipes.module';
import { MyAccountMaterialModule } from './my-account.material.module';

// All components relating to the overview page
import { ErrorMessageComponent } from '../../shared/component/genericError/errorMessage/errorMessage.component';
import { ErrorPageComponent } from '../../shared/component/genericError/errorPage/errorPage.component';
import { TrackConnectionComponent } from '../ommtracker/components/connection/trackConnection.component';
import { TrackConnectionContainerComponent } from '../ommtracker/components/connection/trackConnectionContainer.component';
import { DidYouKnowComponent } from '../ommtracker/components/didYouKnow/didYouKnow.component';
import { TrackerHeaderComponent } from '../ommtracker/components/header/trackerHeader.component';
import { NeedToMakeChangeComponent } from '../ommtracker/components/needToMakeChange/needToMakeChange.component';
import { TrackerWrapperComponent } from '../ommtracker/components/trackerWrapper/trackerWrapper.component';
import { TrackProgressComponent } from '../ommtracker/components/trackProgress/trackProgress.component';
import { TrackStatusHeaderComponent } from '../ommtracker/components/trackStatusHeader/trackStatusHeader.component';
import { WelcomeHomeComponent } from '../ommtracker/components/welcomeHome/welcomeHome.component';
import { WhatHappensNextComponent } from '../ommtracker/components/whatHappensNext/whatHappensNext.component';
import { OmmTrackerComponent } from '../ommtracker/ommTracker.component';
import { TrackerService } from '../services/tracker.service';

@NgModule({
  declarations: [
    OmmTrackerComponent,
    TrackConnectionContainerComponent,
    TrackConnectionComponent,
    TrackerHeaderComponent,
    TrackStatusHeaderComponent,
    DidYouKnowComponent,
    TrackProgressComponent,
    TrackerWrapperComponent,
    NeedToMakeChangeComponent,
    WhatHappensNextComponent,
    WelcomeHomeComponent,
    ErrorPageComponent,
    ErrorMessageComponent],
  exports: [],
  imports: [
    RouterModule,
    MyAccountMaterialModule,
    CommonModule,
    CommonPipesModule,
    CommonComponentsModule
  ],
  providers: [
    TrackerService
  ]
})
export class OmmTrackerModule { }
