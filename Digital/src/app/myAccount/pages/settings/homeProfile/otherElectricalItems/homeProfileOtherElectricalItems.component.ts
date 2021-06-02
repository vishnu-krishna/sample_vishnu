import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HomeProfileComponent } from '../homeProfile.component';
import { HomeProfileViewModel } from '../homeProfileViewModel';
import { IHomeProfileStateService } from '../homeProfileState.service';
import { HomeProfileOptions, BooleanSegmentedButtonOption, NumericSegmentedButtonOption } from '../homeProfileOptions';
import { HomeProfileNavigationService } from '../homeProfileNavigation.service';
import { HomeProfileService } from '../homeProfile.service';

@Component({
    selector: 'agl-home-profile-otherelectricalitems',
    templateUrl: './homeProfileOtherElectricalItems.component.html',
    styleUrls: ['./homeProfileOtherElectricalItems.component.scss']
})
export class HomeProfileOtherElectricalItemsComponent extends HomeProfileComponent {

    public isLoading: boolean;
    public accountNumber: string;
    public contractNumber: string;
    public homeProfile: HomeProfileViewModel;
    public nextPageRoute: string = '/settings/homeprofile/thankYou';
    public electricalItemSelections: BooleanSegmentedButtonOption[] = HomeProfileOptions.yesOrNoOptions;
    public televisionSelections: NumericSegmentedButtonOption[] = HomeProfileOptions.numberOfTelevisionOptions;

    constructor(
        homeProfileNavigationService: HomeProfileNavigationService,
        homeProfileStateService: IHomeProfileStateService,
        homeProfileService: HomeProfileService,
        route: ActivatedRoute
    ) {
        super(homeProfileNavigationService, homeProfileStateService, homeProfileService, route);
    }

    public setNumberOfTelevisions(numberOfTv: string) {
        this.homeProfile.numberOfTelevisions = Number(numberOfTv);
    }

    public setHasWashingMachine(hasWashingMachine: string) {
        this.homeProfile.hasWashingMachine = hasWashingMachine === 'true';
    }

    public setHasClothesDryer(hasClothesDryer: string) {
        this.homeProfile.hasClothesDryer = hasClothesDryer === 'true';
    }

    public setHasDishwasher(hasDishwasher: string) {
        this.homeProfile.hasDishwasher = hasDishwasher === 'true';
    }

    public setHasMicrowave(hasMicrowave: string) {
        this.homeProfile.hasMicrowave = hasMicrowave === 'true';
    }

    public setHasElectricVehicle(hasElectricalVehicle: string) {
        this.homeProfile.hasElectricalVehicle = hasElectricalVehicle === 'true';
    }
}
