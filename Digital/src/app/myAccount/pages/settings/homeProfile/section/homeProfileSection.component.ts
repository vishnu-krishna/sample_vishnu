import { Component, Input } from '@angular/core';
import { HomeProfilePage, HomeProfileNavigationService } from '../homeProfileNavigation.service';

@Component({
    selector: 'agl-home-profile-section',
    templateUrl: './homeProfileSection.component.html',
    styleUrls: ['./homeProfileSection.component.scss']
})

export class HomeProfileSectionComponent {
    @Input() public allowEdit: boolean;
    @Input() public accountNumber: string;
    @Input() public contractNumber: string;
    public page = HomeProfilePage;
    public surveyPages = [
        { icon: 'yourhome', page: HomeProfilePage.YourHome, desc: 'Your home' },
        { icon: 'cooling', page: HomeProfilePage.Cooling, desc: 'Cooling' },
        { icon: 'heating', page: HomeProfilePage.Heating, desc: 'Heating' },
        { icon: 'hotwater', page: HomeProfilePage.HotWater, desc: 'Hot water' },
        { icon: 'fridgefreezer', page: HomeProfilePage.FridgeAndFreezer, desc: 'Fridge and freezer' },
        { icon: 'cooking', page: HomeProfilePage.Cooking, desc: 'Oven and cooktop' },
        { icon: 'entertainment', page: HomeProfilePage.OtherElectricalItems, desc: 'Other electrical items' },
        { icon: 'poolspa', page: HomeProfilePage.PoolAndSpa, desc: 'Pool and spa' },
    ];

    constructor(private homeProfileNavigationService: HomeProfileNavigationService) {}

    public edit(page: HomeProfilePage) {
        if (this.allowEdit) {
            this.homeProfileNavigationService.gotoSurveyPage(page, this.accountNumber, this.contractNumber);
        }
    }
}
