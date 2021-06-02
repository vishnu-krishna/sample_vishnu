import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HomeProfileViewModel } from '../homeProfileViewModel';
import { ContractViewModel } from '../../../../services/account.service';
import { HomeProfileNavigationService, HomeProfilePage } from '../homeProfileNavigation.service';
import { IHomeProfileStateService, HomeProfileStatus } from '../homeProfileState.service';
import { HomeProfileService, AddressContractViewModel } from './../homeProfile.service';
import { FlashMessageType } from '../../../../maui/flashMessage';

@Component({
    selector: 'agl-home-profile-landing',
    templateUrl: './homeProfileLanding.component.html',
    styleUrls: ['./homeProfileLanding.component.scss']
})
export class HomeProfileLandingComponent implements OnInit {
    public eligible: boolean;
    public address: string = '';
    public isLoading: boolean = false;
    public isError: boolean = false;
    public flashMessageType = FlashMessageType;
    public accountNumber: string;
    public contractNumber: string;

    constructor(
        private homeProfileNavigationService: HomeProfileNavigationService,
        private homeProfileStateService: IHomeProfileStateService,
        private homeProfileService: HomeProfileService
    ) {}

    /**
     * Create list of address-contract relations
     * Display address immediately if users only have single address
     */
    public ngOnInit(): void {
        this.isLoading = true;
        this.homeProfileService.createAddressContractModel()
            .subscribe((isCreated: boolean) => {
                if (isCreated) {
                    let uniqueAddresses = this.homeProfileService.getUniqueAddresses();

                    if (uniqueAddresses.length === 1) {
                        this.singleAddressRoutine(uniqueAddresses[0]);
                    } else {
                        this.isLoading = false;
                        this.address = ''; // reset on multiple addresses
                    }
                } else {
                    this.isLoading = false;
                    this.isError = true;
                    console.error('Failed to create addresses contract models');
                }
            }, (error) => {
                this.isLoading = false;
                this.isError = true;
                console.error('Error', error);
            });
    }

    /**
     * Directly go to survey if users only have single address
     * Displays multi address selector page otherwise
     */
    public startHomeProfile() {
        if (this.isSingleAddress()) {
            this.homeProfileNavigationService.startHomeProfile(this.accountNumber, this.contractNumber);
        } else {
            this.homeProfileNavigationService.selectAddressForHomeProfile();
        }
    }

    /**
     * Account has one single address
     */
    public isSingleAddress(): boolean {
        return !!this.address && this.homeProfileService.getUniqueAddresses().length === 1;
    }

    /**
     * Determine button text to be 'Manage Home Profile' or 'Start Home Profile'
     */
    public hasHomeProfile(): boolean {
        return this.homeProfileService.addressesContracts.some((addressContract) => addressContract.status !== HomeProfileStatus.NotStarted);
    }

    /**
     * Set address and contractId directly
     * @param {AddressContractViewModel} addressContract
     */
    private singleAddressRoutine(address: string): void {
        this.address = address;
        const addressContractViewModel = this.homeProfileService.getContractForAddress(address);
        const contractNumber = addressContractViewModel.contractId;
        const homeProfileStatus = addressContractViewModel.status;
        const accountNumber = addressContractViewModel.accountId;
        this.homeProfileStateService.initializeHomeProfile(contractNumber, false, homeProfileStatus !== HomeProfileStatus.NotStarted)
            .finally(() => this.isLoading = false)
            .subscribe(() => {
                this.accountNumber = accountNumber;
                this.contractNumber = contractNumber;
            }, (err) => {
                    console.error('Failed loading home profile', err);
                    this.isError = true;
                }
            );
    }
}
