import { HomeProfileSectionModule } from './../section/homeProfileSection.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomeProfileLandingComponent } from './homeProfileLanding.component';
import { MauiButtonModule } from '../../../../maui/button/button.module';
import { MauiFlashMessageModule } from '../../../../maui/flashMessage';
import { LoadingModule } from '../../../../../shared/loaders/loading.module';
import { HomeProfileStateService } from '../homeProfileState.service';
import { HomeProfileApiService } from '../../../../services/homeProfile/homeProfileApi.service';
import { HomeProfileService } from './../homeProfile.service';

@NgModule({
    declarations: [
        HomeProfileLandingComponent,
    ],
    imports: [
        RouterModule,
        CommonModule,
        MauiButtonModule,
        MauiFlashMessageModule,
        LoadingModule,
        HomeProfileSectionModule
    ],
    exports: [
        HomeProfileLandingComponent
    ]
})
export class HomeProfileLandingModule { }
