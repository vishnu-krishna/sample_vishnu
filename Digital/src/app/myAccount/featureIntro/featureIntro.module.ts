import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RewardsEligibilityModule } from '../rewards';

import { ModalService } from '../modal/modal.service';

import { FeatureIntroDetailComponent } from './featureIntroDetail/featureIntroDetail.component';
import { FeatureIntroModalComponent } from './featureIntroModal/featureIntroModal.component';
import { FeatureIntrosComponent } from './featureIntros.component';
import { FeatureIntroService } from './services/featureIntro.service';
import { FeatureIntroApi } from './services/featureIntroApi.service';
import { FeatureIntroAnalytics } from './services/featureIntro-analytics';

// adding maui
import { MauiButtonModule } from '../maui/button';

@NgModule({
    imports: [
        CommonModule,
        RewardsEligibilityModule,
        MauiButtonModule
    ],
    declarations: [
        FeatureIntroModalComponent,
        FeatureIntrosComponent,
        FeatureIntroDetailComponent
    ],
    entryComponents: [
        FeatureIntroModalComponent
    ],
    providers: [
        ModalService,
        FeatureIntroService,
        FeatureIntroApi,
        FeatureIntroAnalytics
    ],
    exports: [
        FeatureIntroModalComponent,
        FeatureIntrosComponent
    ]
})
export class FeatureIntroModule { }
