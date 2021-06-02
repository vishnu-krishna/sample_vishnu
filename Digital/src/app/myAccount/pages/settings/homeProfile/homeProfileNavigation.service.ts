import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

export class HomeProfileUrls {
    public readonly homePageUrl = '/settings/homeprofile';
    public readonly surveyCompletionPageUrl = '/settings/homeprofile/thankYou';
    public readonly selectHomeProfileUrl = '/settings/homeprofile/select';
    public readonly editHomeProfileUrl = '/settings/homeprofile/edit';
    public readonly surveyPageUrls = [
        '/settings/homeprofile/yourHome',
        '/settings/homeprofile/cooling',
        '/settings/homeprofile/heating',
        '/settings/homeprofile/hotWater',
        '/settings/homeprofile/fridgeAndFreezer',
        '/settings/homeprofile/cooking',
        '/settings/homeprofile/otherElectricalItems',
        '/settings/homeprofile/poolAndSpa',
    ];
    public readonly title = 'Home profile';
}

export enum HomeProfilePage {
    YourHome = 1,
    Cooling,
    Heating,
    HotWater,
    FridgeAndFreezer,
    Cooking,
    OtherElectricalItems,
    PoolAndSpa
}

@Injectable()
export class HomeProfileNavigationService {

    private readonly surveyUrlsInLowerCase: string[];

    constructor(
        private router: Router,
        private hp: HomeProfileUrls
    ) {
        this.surveyUrlsInLowerCase = this.hp.surveyPageUrls.map((value) => value.toLowerCase());
    }

    public get currentPage(): number {
        return this.surveyUrlsInLowerCase.indexOf(this.baseUrl) + 1;
    }

    public get totalPages(): number {
        return this.hp.surveyPageUrls.length;
    }

    public isInSurvey(): boolean {
        return this.surveyUrlsInLowerCase.indexOf(this.baseUrl) > -1;
    }

    public startHomeProfile(accountNumber: string, contractNumber: string): void {
        this.router.navigate([`${this.pageLink(1)}/${accountNumber}/${contractNumber}`]);
    }

    public selectAddressForHomeProfile(): void {
        this.router.navigate([this.hp.selectHomeProfileUrl]);
    }

    public editHomeProfile(accountNumber: string, contractNumber: string): void {
        this.router.navigate([`${this.hp.editHomeProfileUrl}/${accountNumber}/${contractNumber}`]);
    }

    public nextPage(accountNumber: string, contractNumber: string): void {
        this.router.navigate([`${this.nextLink}/${accountNumber}/${contractNumber}`]);
    }

    public back(accountNumber: string = null, contractNumber: string = null, isMultiAddresses: boolean = false): void {
        if (!this.isInSurvey()) {
            const previousUrlMap = {
                [this.hp.editHomeProfileUrl.toLocaleLowerCase()]: this.hp.selectHomeProfileUrl,
                [this.hp.selectHomeProfileUrl.toLocaleLowerCase()]: this.hp.homePageUrl
            };
            this.router.navigate([previousUrlMap[this.baseUrl]]);
        } else {
            let page = this.currentPage;
            if (page === 1) {
                isMultiAddresses
                    ? this.router.navigate([`${this.hp.editHomeProfileUrl}/${accountNumber}/${contractNumber}`])
                    : this.goToHomeProfileLanding();
            } else {
                const url = `${this.pageLink(--page)}/${accountNumber}/${contractNumber}`;
                this.router.navigate([url]);
            }
        }
    }

    public gotoSurveyPage(pageNumber: number, accountNumber: string, contractNumber: string): void {
        const link = `${this.pageLink(pageNumber)}/${accountNumber}/${contractNumber}`;
        this.router.navigate([link]);
    }

    public goToHomeProfileLanding(): void {
        this.router.navigate([this.hp.homePageUrl]);
    }

    private get baseUrl(): string {
        let url = this.router.url.toLowerCase();
        if (url === this.hp.homePageUrl || url === this.hp.selectHomeProfileUrl) {
            return url;
        }
        url = url.slice(0, url.lastIndexOf('/'));
        url = url.slice(0, url.lastIndexOf('/'));
        return url;
    }
    /**
     * Gets the link for the next page in the Home Profile survey
     * @returns { string | null } null if current location is not Home Profile survey
     */
    private get nextLink(): string | null {
        if (!this.isInSurvey()) {
            return null;
        }
        let page = this.currentPage;
        if (page === this.totalPages) {
            return this.hp.surveyCompletionPageUrl;
        } else {

            return this.pageLink(++page);
        }
    }
    /**
     * Gets the link for a specific Home Profile survey page
     * @param { number } pageNumber The page number
     * @returns { string | null } null if page number is invalid
     */
    private pageLink(pageNumber: number): string | null {
        return this.hp.surveyPageUrls[pageNumber - 1]; // Page 1 would be zero index.
    }
}
