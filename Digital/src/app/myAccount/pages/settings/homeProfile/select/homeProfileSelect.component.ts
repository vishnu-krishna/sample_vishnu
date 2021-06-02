import { HomeProfileStatus, IHomeProfileStateService } from './../homeProfileState.service';
import { HomeProfileNavigationService, HomeProfilePage } from './../homeProfileNavigation.service';
import { HomeProfileService, AddressContractViewModel } from './../homeProfile.service';
import { FuelChipContract } from './../../../../maui/fuelChip/fuelChip.component.model';
import { Component, OnInit } from '@angular/core';
import { HomeProfileViewModel } from '../homeProfileViewModel';

@Component({
    selector: 'agl-home-profile-select',
    templateUrl: './homeProfileSelect.component.html',
    styleUrls: ['./homeProfileSelect.component.scss']
})

export class HomeProfileSelectComponent implements OnInit {
    public selectorHover: boolean = false;
    public notStartedAddressContracts: AddressContractViewModel[] = [];
    public alreadyStartedAddressContracts: AddressContractViewModel[] = [];
    public newStart: boolean = true;
    public isLoading: boolean = true;
    public homeProfilePage = HomeProfilePage;

    constructor(
        private homeProfileService: HomeProfileService,
        private homeProfileStateService: IHomeProfileStateService,
        private homeProfileNavigationService: HomeProfileNavigationService
    ) {}

    public ngOnInit(): void {
        this.isLoading = true;
        this.homeProfileService.createAddressContractModel()
            .finally(() => this.isLoading = false)
            .subscribe((isCreated: boolean) => {
                if (isCreated) {
                    this.homeProfileService.getUniqueAddresses().forEach((uniqueAddress: string) => {
                        const contract = this.homeProfileService.getContractForAddress(uniqueAddress);
                        if (contract.status === HomeProfileStatus.NotStarted) {
                            this.notStartedAddressContracts.push(contract);
                        } else {
                            this.alreadyStartedAddressContracts.push(contract);
                            this.newStart = false;
                        }
                    });
                } else {
                    this.homeProfileNavigationService.goToHomeProfileLanding();
                }
        });
    }

    public editHomeProfile(accountNumber: string, contractNumber: string, status: HomeProfileStatus): void {
        this.isLoading = true;
        this.homeProfileStateService.initializeHomeProfile(contractNumber, true, status !== HomeProfileStatus.NotStarted)
            .finally(() => this.isLoading = false)
            .subscribe((result) => {
                if (status === HomeProfileStatus.NotStarted) {
                    this.homeProfileNavigationService.gotoSurveyPage(this.homeProfilePage.YourHome, accountNumber, contractNumber);
                } else {
                    this.homeProfileNavigationService.editHomeProfile(accountNumber, contractNumber);
                }
            }, (error) => {
                console.error('error retrieving home profile');
            });
    }

    public backClick(): void {
        this.homeProfileNavigationService.back();
    }
}
