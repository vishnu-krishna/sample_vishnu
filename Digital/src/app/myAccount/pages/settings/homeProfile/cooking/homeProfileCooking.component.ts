import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { RadioButtonGroupComponent } from '../../../../maui/radioButtonGroup/radioButtonGroup.component';
import { HomeProfileComponent } from '../homeProfile.component';
import { HomeProfileViewModel, CooktopType, OvenType } from '../homeProfileViewModel';
import { HomeProfileStateService, IHomeProfileStateService } from '../homeProfileState.service';
import { HomeProfileNavigationService } from '../homeProfileNavigation.service';
import { HomeProfileOptions, GroupedRadioOption } from '../homeProfileOptions';
import { HomeProfileService } from '../homeProfile.service';

@Component({
    selector: 'agl-home-profile-cooking',
    templateUrl: './homeProfileCooking.component.html',
    styleUrls: ['./homeProfileCooking.component.scss']
})

export class HomeProfileCookingComponent extends HomeProfileComponent {
    public isLoading: boolean;
    public accountNumber: string;
    public contractNumber: string;
    public ovenTypeOptions: GroupedRadioOption[] = HomeProfileOptions.ovenTypeOptions;
    public cooktopTypeOptions: GroupedRadioOption[] = HomeProfileOptions.cooktopTypeOptions;

    public homeProfile: HomeProfileViewModel;

    constructor(
        homeProfileNavigationService: HomeProfileNavigationService,
        homeProfileStateService: IHomeProfileStateService,
        homeProfileService: HomeProfileService,
        route: ActivatedRoute
    ) {
        super(homeProfileNavigationService, homeProfileStateService, homeProfileService, route);
    }

    public ovenTypeChanged(newValue: OvenType) {
        this.homeProfile.ovenType = newValue;
    }

    public cooktopTypeChanged(newValue: CooktopType) {
        this.homeProfile.cooktopType = newValue;
    }
}
