import { Component, OnInit } from '@angular/core';
import { HomeProfileNavigationService, HomeProfilePage } from '../homeProfileNavigation.service';
import { HomeProfileViewModel } from '../homeProfileViewModel';
import { HomeProfileSummaryService } from './homeProfileSummary.service';
import { IHomeProfileStateService } from '../homeProfileState.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'agl-home-profile-summary',
    templateUrl: './homeProfileSummary.component.html',
    styleUrls: ['./homeProfileSummary.component.scss']
})
export class HomeProfileSummaryComponent implements OnInit {
    public sections: HomeProfileSectionSummary[] = [
        {
            title: 'Your home',
            page: HomeProfilePage.YourHome,
            summary: [ '', '' ]
        },
        {
            title: 'Cooling',
            page: HomeProfilePage.Cooling,
            summary: [ '', '' ]
        },
        {
            title: 'Heating',
            page: HomeProfilePage.Heating,
            summary: [ '', '' ]
        },
        {
            title: 'Hot water',
            page: HomeProfilePage.HotWater,
            summary: [ '', '' ]
        },
        {
            title: 'Fridge and freezer',
            page: HomeProfilePage.FridgeAndFreezer,
            summary: [ '', '' ]
        },
        {
            title: 'Oven and cooktop',
            page: HomeProfilePage.Cooking,
            summary: [ '', '' ]
        },
        {
            title: 'Other electrical items',
            page: HomeProfilePage.OtherElectricalItems,
            summary: [ '', '' ]
        },
        {
            title: 'Pool and spa',
            page: HomeProfilePage.PoolAndSpa,
            summary: [ '', '' ]
        }
    ];

    constructor(
        private summaryService: HomeProfileSummaryService,
        private stateService: IHomeProfileStateService,
        private navigationService: HomeProfileNavigationService,
        private route: ActivatedRoute
    ) {}

    public ngOnInit(): void {
        this.summaryService.forProfile(this.stateService.homeProfile);
        this.sections.forEach((section, index) => {
            const page = index + 1;
            this.sections[index].summary = this.summaryService.summarisePage(page);
        });
    }

    public edit(page: HomeProfilePage) {
        const accountNumber = this.route.snapshot.params['accountNumber'];
        const contractNumber = this.route.snapshot.params['contractNumber'];
        this.navigationService.gotoSurveyPage(page, accountNumber, contractNumber);
    }
}

export interface HomeProfileSectionSummary {
    title: string;
    page: HomeProfilePage;
    summary: [ string, string ];
}
