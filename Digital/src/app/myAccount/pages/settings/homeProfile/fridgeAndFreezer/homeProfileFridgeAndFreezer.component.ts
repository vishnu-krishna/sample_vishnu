import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HomeProfileComponent } from '../homeProfile.component';
import { HomeProfileViewModel, FridgeType, FridgeAge } from '../homeProfileViewModel';
import { IHomeProfileStateService } from '../homeProfileState.service';
import { HomeProfileNavigationService } from '../homeProfileNavigation.service';
import { HomeProfileService } from '../homeProfile.service';
import { NumericSegmentedButtonOption, HomeProfileOptions } from '../homeProfileOptions';

@Component({
    selector: 'agl-home-profile-fridgeandfreezer',
    templateUrl: './homeProfileFridgeAndFreezer.component.html',
    styleUrls: ['./homeProfileFridgeAndFreezer.component.scss']
})
export class HomeProfileFridgeAndFreezerComponent extends HomeProfileComponent {

    public fridgeTypeSelections = HomeProfileOptions.fridgeTypeSelections;
    public fridgeAgeSelections = HomeProfileOptions.fridgeAgeSelections;

    public isLoading: boolean;
    public fridgeType = FridgeType;
    public accountNumber: string;
    public contractNumber: string;
    public homeProfile: HomeProfileViewModel;

    constructor(
        homeProfileNavigationService: HomeProfileNavigationService,
        homeProfileStateService: IHomeProfileStateService,
        homeProfileService: HomeProfileService,
        route: ActivatedRoute
    ) {
        super(homeProfileNavigationService, homeProfileStateService, homeProfileService, route);
    }

    public setMainFridgeType(fridgeType: FridgeType) {
        this.homeProfile.mainFridgeType = fridgeType;
        this.homeProfile.mainFridgeAge = null;
        if (this.homeProfile.mainFridgeType === FridgeType.None) {
            this.resetSecondaryFridge();
        }
    }

    public setSecondaryFridgeType(fridgeType: FridgeType) {
        this.homeProfile.secondaryFridgeType = fridgeType;
        this.homeProfile.secondaryFridgeAge = null;
    }

    public setMainFridgeAge(fridgeAge: FridgeAge) {
        this.homeProfile.mainFridgeAge = fridgeAge;
    }

    public setSecondaryFridgeAge(fridgeAge: FridgeAge) {
        this.homeProfile.secondaryFridgeAge = fridgeAge;
    }

    public hideSecondaryFridgeDisplay() {
        this.resetSecondaryFridge();
    }

    public showSecondaryFridgeDisplay() {
        if (!this.isAddFridgeDisabled()) {
            this.homeProfile.hasSecondaryFridge = true;
        }
    }

    public isAddFridgeDisabled(): boolean {
        return !this.homeProfile.mainFridgeType || this.homeProfile.mainFridgeType === FridgeType.None;
    }

    private resetSecondaryFridge() {
        this.homeProfile.hasSecondaryFridge = false;
        this.homeProfile.secondaryFridgeType = null;
        this.homeProfile.secondaryFridgeAge = null;
    }
}
