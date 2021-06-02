import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeProfileLandingComponent } from './landing/homeProfileLanding.component';
import { HomeProfileLandingModule } from './landing/homeProfileLanding.module';
import { HomeProfileYourHomeModule } from './yourHome/homeProfileYourHome.module';
import { HomeProfileYourHomeComponent } from './yourHome/homeProfileYourHome.component';
import { HomeProfileCoolingComponent } from './cooling/homeProfileCooling.component';
import { HomeProfileCoolingModule } from './cooling/homeProfileCooling.module';
import { HomeProfileCookingComponent } from './cooking/homeProfileCooking.component';
import { HomeProfileCookingModule } from './cooking/homeProfileCooking.module';
import { HomeProfileHeatingComponent } from './heating/homeProfileHeating.component';
import { HomeProfileHeatingModule } from './heating/homeProfileHeating.module';
import { HomeProfileHotWaterComponent } from './hotWater/homeProfileHotWater.component';
import { HomeProfileHotWaterModule } from './hotWater/homeProfileHotWater.module';
import { HomeProfileThankYouModule } from './thankYou/homeProfileThankYou.module';
import { HomeProfileThankYouComponent } from './thankYou/homeProfileThankYou.component';
import { HomeProfileFridgeAndFreezerModule } from './fridgeAndFreezer/homeProfileFridgeAndFreezer.module';
import { HomeProfileFridgeAndFreezerComponent } from './fridgeAndFreezer/homeProfileFridgeAndFreezer.component';
import { HomeProfileOtherElectricalItemsModule } from './otherElectricalItems/homeProfileOtherElectricalItems.module';
import { HomeProfileOtherElectricalItemsComponent } from './otherElectricalItems/homeProfileOtherElectricalItems.component';
import { HomeProfilePoolAndSpaModule } from './poolAndSpa/homeProfilePoolAndSpa.module';
import { HomeProfilePoolAndSpaComponent } from './poolAndSpa/homeProfilePoolAndSpa.component';

import { HomeProfileNavigationService, HomeProfileUrls } from './homeProfileNavigation.service';
import { HomeProfileService } from './homeProfile.service';
import { HomeProfileApiService, IHomeProfileApi } from '../../../services/homeProfile/homeProfileApi.service';
import { HomeProfileStateService, IHomeProfileStateService } from './homeProfileState.service';
import { HomeProfileMapper, IHomeProfileMapper } from './homeProfileMapper';
import { HomeProfileSummaryService } from './summary/homeProfileSummary.service';
import { HomeProfileSelectModule } from './select/homeProfileSelect.module';
import { HomeProfileSelectComponent } from './select/homeProfileSelect.component';
import { HomeProfileEditModule } from './edit/homeProfileEdit.module';
import { HomeProfileEditComponent } from './edit/homeProfileEdit.component';

export const ROUTES: Routes = [
    { path: '', component: HomeProfileLandingComponent },
    { path: 'yourHome/:accountNumber/:contractNumber', component: HomeProfileYourHomeComponent },
    { path: 'cooling/:accountNumber/:contractNumber', component: HomeProfileCoolingComponent },
    { path: 'heating/:accountNumber/:contractNumber', component: HomeProfileHeatingComponent },
    { path: 'hotWater/:accountNumber/:contractNumber', component: HomeProfileHotWaterComponent },
    { path: 'cooking/:accountNumber/:contractNumber', component: HomeProfileCookingComponent },
    { path: 'fridgeAndFreezer/:accountNumber/:contractNumber', component: HomeProfileFridgeAndFreezerComponent },
    { path: 'otherElectricalItems/:accountNumber/:contractNumber', component: HomeProfileOtherElectricalItemsComponent },
    { path: 'poolAndSpa/:accountNumber/:contractNumber', component: HomeProfilePoolAndSpaComponent },
    { path: 'thankYou/:accountNumber/:contractNumber', component: HomeProfileThankYouComponent },
    { path: 'select', component: HomeProfileSelectComponent },
    { path: 'edit/:accountNumber/:contractNumber', component: HomeProfileEditComponent },
    { path: '**', redirectTo: '' }
];

@NgModule({
    declarations: [
    ],
    imports: [
        RouterModule.forChild(ROUTES),
        HomeProfileLandingModule,
        HomeProfileYourHomeModule,
        HomeProfileCoolingModule,
        HomeProfileHeatingModule,
        HomeProfileHotWaterModule,
        HomeProfileCookingModule,
        HomeProfileFridgeAndFreezerModule,
        HomeProfileOtherElectricalItemsModule,
        HomeProfilePoolAndSpaModule,
        HomeProfileThankYouModule,
        HomeProfileSelectModule,
        HomeProfileEditModule
    ],
    providers: [
        HomeProfileUrls,
        HomeProfileNavigationService,
        HomeProfileService,
        { provide: IHomeProfileApi, useClass: HomeProfileApiService },
        { provide: IHomeProfileStateService, useClass: HomeProfileStateService },
        { provide: IHomeProfileMapper, useClass: HomeProfileMapper },
        HomeProfileSummaryService
    ]
})

export class HomeProfileModule { }
