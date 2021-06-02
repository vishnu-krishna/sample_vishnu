import { Observable } from 'rxjs/Observable';
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomeProfileViewModel } from './homeProfileViewModel';
import { HomeProfileNavigationService } from './homeProfileNavigation.service';
import { HomeProfileStateService, IHomeProfileStateService, HomeProfileStatus } from './homeProfileState.service';
import { HomeProfileService, AddressContractViewModel } from './homeProfile.service';

export abstract class HomeProfileComponent implements OnInit {

    public abstract homeProfile: HomeProfileViewModel;
    public abstract accountNumber: string;
    public abstract contractNumber: string;
    public abstract isLoading: boolean;

    constructor(
        protected homeProfileNavigationService: HomeProfileNavigationService,
        protected homeProfileStateService: IHomeProfileStateService,
        protected homeProfileService: HomeProfileService,
        protected route: ActivatedRoute
    ) {
    }

    ngOnInit(): void {
        this.isLoading = true;

        if (this.getContractNumberFromParameter() !== this.homeProfileStateService.contractNumber) {
            this.checkProfile().subscribe(() => this.isLoading = false);
        } else {
            this.isLoading = false;
            this.homeProfile = this.homeProfileStateService.homeProfile;
        }

        this.accountNumber = this.getAccountNumberFromParameter();
        this.contractNumber = this.getContractNumberFromParameter();
    }

    public getAccountNumberFromParameter(): string {
        return this.route.snapshot.params['accountNumber'];
    }

    public getContractNumberFromParameter(): string {
        return this.route.snapshot.params['contractNumber'];
    }

    public checkProfile(): Observable<boolean> {
        let accountNumber = this.getAccountNumberFromParameter();
        let contractNumber = this.getContractNumberFromParameter();

        return this.homeProfileService.createAddressContractModel()
            .map((isCreated: boolean) => {
                let isMultiAddress: boolean = false;
                let hasProfile: boolean = false;

                if (isCreated && this.homeProfileService.addressesContracts.find((p) => p.accountId === accountNumber && p.contractId === contractNumber)) {
                    isMultiAddress = this.homeProfileService.getUniqueAddresses().length > 1;
                    hasProfile = this.homeProfileService.getContractForContractNumber(contractNumber).status !== HomeProfileStatus.NotStarted;
                } else {
                    this.homeProfileNavigationService.goToHomeProfileLanding();
                }

                return [isMultiAddress, hasProfile];
            })
            .flatMap(([isMultiAddress, hasProfile]: [boolean, boolean]) => {
                return this.homeProfileStateService.initializeHomeProfile(contractNumber, isMultiAddress, hasProfile);
            })
            .map((result: boolean) => {
                result ? this.homeProfile = this.homeProfileStateService.homeProfile : this.homeProfileNavigationService.goToHomeProfileLanding();

                return result;
            });
    }
}
