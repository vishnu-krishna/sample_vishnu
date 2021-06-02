import { Component } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { HomeProfileComponent } from '../homeProfile.component';
import { HomeProfileViewModel, PropertyType } from '../homeProfileViewModel';
import { IHomeProfileStateService } from '../homeProfileState.service';
import { HomeProfileService } from './../homeProfile.service';
import { HomeProfileNavigationService } from '../homeProfileNavigation.service';
import { HomeProfileOptions, NumericSegmentedButtonOption } from '../homeProfileOptions';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'agl-home-profile-yourhome',
    templateUrl: './homeProfileYourHome.component.html',
    styleUrls: ['./homeProfileYourHome.component.scss']
})

export class HomeProfileYourHomeComponent extends HomeProfileComponent {

    public numberOfBedroomsOptions: NumericSegmentedButtonOption[] = HomeProfileOptions.numberOfBedroomOptions;
    public numberOfBathroomsOptions: NumericSegmentedButtonOption[] = HomeProfileOptions.numberOfBathroomOptions;
    public numberOfAdultsOptions: NumericSegmentedButtonOption[] = HomeProfileOptions.numberOfAdultOptions;
    public numberOfChildrenOptions: NumericSegmentedButtonOption[] = HomeProfileOptions.numberOfChildrenOptions;

    public homeTypes = HomeProfileOptions.homeTypes;
    public homeProfile: HomeProfileViewModel;
    public accountNumber: string;
    public contractNumber: string;
    public isMultiAddresses: boolean;
    public isLoading: boolean;

    constructor(
        homeProfileNavigationService: HomeProfileNavigationService,
        homeProfileStateService: IHomeProfileStateService,
        homeProfileService: HomeProfileService,
        route: ActivatedRoute
    ) {
        super(homeProfileNavigationService, homeProfileStateService, homeProfileService, route);
        this.isMultiAddresses = homeProfileStateService.isMultiAddresses;
    }

    public setPropertyType(propertyType: PropertyType) {
        this.homeProfile.propertyType = propertyType;
        this.homeProfile.numberOfBedrooms = null;
        this.homeProfile.numberOfBathrooms = null;
    }

    public setNumberOfBedrooms(numberOfBedrooms: string) {
        this.homeProfile.numberOfBedrooms = Number(numberOfBedrooms);
    }

    public setNumberOfBathrooms(numberOfBathrooms: string) {
        this.homeProfile.numberOfBathrooms = Number(numberOfBathrooms);
    }

    public setNumberOfAdults(numberOfAdults: string) {
        this.homeProfile.numberOfAdults = Number(numberOfAdults);
    }

    public setNumberOfChildren(numberOfChildren: string) {
        this.homeProfile.numberOfChildren = Number(numberOfChildren);
    }
}
