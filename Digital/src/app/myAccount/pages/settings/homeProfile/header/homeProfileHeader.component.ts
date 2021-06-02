import { Component, Input } from '@angular/core';
import { HomeProfileNavigationService } from '../homeProfileNavigation.service';

@Component({
    selector: 'agl-home-profile-header',
    templateUrl: './homeProfileHeader.component.html',
    styleUrls: ['./homeProfileHeader.component.scss']
})

export class HomeProfileHeaderComponent {
    private currentYPosition: number = 0;

    public hideNavigation: boolean = false;
    public totalPages: number;
    public currentPage: number;
    @Input() public pageHeading: string = '';
    @Input() public accountNumber: string;
    @Input() public contractNumber: string;
    @Input() public isMultiAddresses: boolean = false;

    constructor(
        private homeProfileNavigationService: HomeProfileNavigationService
    ) {
        this.currentPage = homeProfileNavigationService.currentPage;
        this.totalPages = homeProfileNavigationService.totalPages;
    }

    public backClick() {
        this.homeProfileNavigationService.back(this.accountNumber, this.contractNumber, this.isMultiAddresses);
    }
}
