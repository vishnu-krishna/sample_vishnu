import { Component, OnInit } from '@angular/core';
import { HomeProfileViewModel, HotWaterType } from '../homeProfileViewModel';
import { HomeProfileComponent } from '../homeProfile.component';
import { HomeProfileStateService, IHomeProfileStateService } from '../homeProfileState.service';
import { HomeProfileNavigationService } from '../homeProfileNavigation.service';
import { HomeProfileService } from '../homeProfile.service';
import { GroupedRadioOption, HomeProfileOptions } from '../homeProfileOptions';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'agl-home-profile-hotwater',
    templateUrl: './homeProfileHotWater.component.html',
    styleUrls: ['./homeProfileHotWater.component.scss']
})
export class HomeProfileHotWaterComponent extends HomeProfileComponent {

    public hotWaterTypes = HomeProfileOptions.hotWaterTypes;

    public homeProfile: HomeProfileViewModel;
    public isLoading: boolean;
    public accountNumber: string;
    public contractNumber: string;

    constructor(
        homeProfileNavigationService: HomeProfileNavigationService,
        homeProfileStateService: IHomeProfileStateService,
        homeProfileService: HomeProfileService,
        route: ActivatedRoute
    ) {
        super(homeProfileNavigationService, homeProfileStateService, homeProfileService, route);
    }

    public setHotWaterType(hotWaterType: HotWaterType) {
        this.homeProfile.hotWaterType = hotWaterType;
    }
}
