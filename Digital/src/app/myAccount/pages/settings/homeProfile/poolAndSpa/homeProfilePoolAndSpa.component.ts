import { Component, OnInit } from '@angular/core';
import { HomeProfileViewModel, PoolSize, PoolHeaterType, PoolPumpAge } from '../homeProfileViewModel';
import { HomeProfileComponent } from '../homeProfile.component';
import { HomeProfileStateService, IHomeProfileStateService } from '../homeProfileState.service';
import { HomeProfileNavigationService } from '../homeProfileNavigation.service';
import { HomeProfileService } from '../homeProfile.service';
import { GroupedRadioOption, HomeProfileOptions } from '../homeProfileOptions';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'agl-home-profile-poolandspa',
    templateUrl: './homeProfilePoolAndSpa.component.html',
    styleUrls: ['./homeProfilePoolAndSpa.component.scss']
})
export class HomeProfilePoolAndSpaComponent extends HomeProfileComponent {

    public hasPoolOptions = HomeProfileOptions.yesOrNoOptions;
    public hasSpaOptions = HomeProfileOptions.yesOrNoOptions;
    public poolSizeOptions = HomeProfileOptions.poolSizes;
    public poolHeaterTypeOptions = HomeProfileOptions.poolHeaterTypes;
    public poolPumpAgeOptions = HomeProfileOptions.poolPumpAge;
    public homeProfile: HomeProfileViewModel;
    public accountNumber: string;
    public contractNumber: string;
    public isLoading: boolean;

    constructor(
        homeProfileNavigationService: HomeProfileNavigationService,
        homeProfileStateService: IHomeProfileStateService,
        homeProfileService: HomeProfileService,
        route: ActivatedRoute
    ) {
        super(homeProfileNavigationService, homeProfileStateService, homeProfileService, route);
    }

    public setHasPool(value: string): void {
        this.homeProfile.hasPool = value === 'true';
        if (!this.homeProfile.hasPool) {
            this.homeProfile.poolSize = undefined;
            this.homeProfile.poolHeaterType = undefined;
            this.homeProfile.poolPumpAge = undefined;
        }
    }

    public setPoolSize(poolSize: PoolSize): void {
        this.homeProfile.poolSize = poolSize;
    }

    public setPoolHeaterFuelType(poolHeaterType: PoolHeaterType): void {
        this.homeProfile.poolHeaterType = poolHeaterType;
    }

    public setPoolPumpAge(poolPumpAge: PoolPumpAge): void {
        this.homeProfile.poolPumpAge = poolPumpAge;
    }

    public setHasSpa(value: string): void {
        this.homeProfile.hasSpa = value === 'true';
    }
}
