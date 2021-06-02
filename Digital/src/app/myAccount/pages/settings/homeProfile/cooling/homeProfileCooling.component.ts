import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { HomeProfileComponent } from '../homeProfile.component';
import { HomeProfileViewModel } from '../homeProfileViewModel';
import { HomeProfileStateService, IHomeProfileStateService } from '../homeProfileState.service';
import { HomeProfileNavigationService } from '../homeProfileNavigation.service';
import { HomeProfileService } from '../homeProfile.service';
import { HomeProfileOptions, NumericSegmentedButtonOption, BooleanSegmentedButtonOption } from '../homeProfileOptions';

@Component({
    selector: 'agl-home-profile-cooling',
    templateUrl: './homeProfileCooling.component.html',
    styleUrls: ['./homeProfileCooling.component.scss']
})
export class HomeProfileCoolingComponent extends HomeProfileComponent {
    public numberOfSplitAirconOptions: NumericSegmentedButtonOption[] = HomeProfileOptions.numberOfSplitAirconCoolerOptions;
    public numberOfFixedAirconOptions: NumericSegmentedButtonOption[] = HomeProfileOptions.numberOfFixedAirconCoolerOptions;
    public numberOfEvaporativesOptions: NumericSegmentedButtonOption[] = HomeProfileOptions.numberOfEvaporativeCoolerOptions;
    public numberOfFansOptions: NumericSegmentedButtonOption[] = HomeProfileOptions.numberOfFanCoolerOptions;
    public yesOrNo: BooleanSegmentedButtonOption[] = HomeProfileOptions.yesOrNoOptions;

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

    public setNumberOfSplitSystemAirconCooling(value: string) {
        this.homeProfile.numberOfSplitSystemAirconCooling = Number(value);
    }

    public setNumberOfWallUnitAirconCooling(value: string) {
        this.homeProfile.numberOfWallUnitAirconCooling = Number(value);
    }

    public setHasDuctedAirconCooling(value: string) {
        this.homeProfile.hasDuctedAirconCooling = value === 'true';
    }

    public setHasDuctedEvaporativeCooling(value: string) {
        this.homeProfile.hasDuctedEvaporativeCooling = value === 'true';
    }

    public setNumberOfPortableEvaporativeCooling(value: string) {
        this.homeProfile.numberOfPortableEvaporativeCooling = Number(value);
    }

    public setNumberOfCoolingFans(value: string) {
        this.homeProfile.numberOfCoolingFans = Number(value);
    }
}
