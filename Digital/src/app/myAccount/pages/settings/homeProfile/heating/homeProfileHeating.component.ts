import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { HomeProfileComponent } from '../homeProfile.component';
import { HomeProfileViewModel, DuctedHeatingType, OtherHeatingType } from '../homeProfileViewModel';
import { HomeProfileStateService, IHomeProfileStateService } from '../homeProfileState.service';
import { HomeProfileNavigationService } from '../homeProfileNavigation.service';
import { HomeProfileService } from '../homeProfile.service';
import { HomeProfileOptions, NumericSegmentedButtonOption, BooleanSegmentedButtonOption, StringSegmentedButtonOption } from '../homeProfileOptions';

@Component({
    selector: 'agl-home-profile-heating',
    templateUrl: './homeProfileHeating.component.html',
    styleUrls: ['./homeProfileHeating.component.scss']
})

export class HomeProfileHeatingComponent extends HomeProfileComponent {
    public numberOfAirconsOptions: NumericSegmentedButtonOption[] = HomeProfileOptions.numberOfSplitSystemHeaterOptions;
    public numberOfPortableElecHeaters: NumericSegmentedButtonOption[] = HomeProfileOptions.numberOfPortableElectricHeaterOptions;
    public ductedPowerSourceOptions: StringSegmentedButtonOption[] = HomeProfileOptions.ductedHeatingTypes;
    public otherPowerSourceOptions: StringSegmentedButtonOption[] = HomeProfileOptions.otherHeatingTypes;

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

    public setTypeOfDuctedHeating(value: DuctedHeatingType) {
        this.homeProfile.typeOfDuctedHeating = value;
    }

    public setNumberOfHeatingSplitSystems(value: string) {
        this.homeProfile.numberOfHeatingSplitSystems = Number(value);
    }

    public setNumberOfPortableElecHeaters(value: string) {
        this.homeProfile.numberOfPortableElecHeaters = Number(value);
    }

    public setTypeOfOtherHeating(value: OtherHeatingType) {
        this.homeProfile.typeOfOtherHeating = value;
    }
}
