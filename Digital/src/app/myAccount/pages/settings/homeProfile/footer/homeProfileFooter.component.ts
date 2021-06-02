import { Component, Input } from '@angular/core';
import { IHomeProfileStateService } from '../homeProfileState.service';
import { HomeProfileViewModel } from '../homeProfileViewModel';
import { FlashMessageType } from '../../../../maui/flashMessage/flashMessageType.enum';
import { HomeProfileNavigationService } from '../homeProfileNavigation.service';

@Component({
    selector: 'agl-home-profile-footer',
    templateUrl: './homeProfileFooter.component.html',
    styleUrls: ['./homeProfileFooter.component.scss']
})
export class HomeProfileFooterComponent {
    @Input() public accountNumber: string;
    @Input() public contractNumber: string;
    public isNextLoading: boolean = false;
    public isSaveAndCloseLoading: boolean = false;
    public isError: boolean = false;
    public flashMessageType = FlashMessageType;

    constructor(
        private homeProfileStateService: IHomeProfileStateService,
        private homeProfileNavigationService: HomeProfileNavigationService
    ) { }

    public get isLoading() {
        return this.isNextLoading || this.isSaveAndCloseLoading;
    }

    public next() {
        this.isNextLoading = true;
        const thenGotoNext = () => {
            this.homeProfileNavigationService.nextPage(this.accountNumber, this.contractNumber);
        };
        this.saveProfile(thenGotoNext);
    }

    public saveAndClose() {
        this.isSaveAndCloseLoading = true;
        const thenClose = () => this.homeProfileNavigationService.goToHomeProfileLanding();
        this.saveProfile(thenClose);
    }

    private saveProfile(doOnSuccess) {
        this.isError = false;
        this.homeProfileStateService.contractNumber = this.contractNumber;
        this.homeProfileStateService.saveProfile()
            .finally(() => {
                this.isNextLoading = false;
                this.isSaveAndCloseLoading = false;
            })
            .subscribe(
                (result) => {
                    doOnSuccess();
                },
                (error) => {
                    this.isError = true;
                }
            );
    }

}
