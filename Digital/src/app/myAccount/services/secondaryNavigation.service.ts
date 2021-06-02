import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { MonthlyBillingService } from './monthlyBilling.service';

@Injectable()
export class SecondaryNavigationService {
    public url: string;

    private concessionPaths: string[] = [
        '/settings/concession/selectaccount',
        '/settings/concession/selectfuel',
        '/settings/concession/selectcard',
        '/settings/concession/confirmdetails',
        '/settings/concession/apply'
    ];

    constructor(
        private router: Router,
        private location: Location,
        private monthlyBillingService: MonthlyBillingService
    ) {}

    public get display(): boolean {
        const urlsWithSecondaryNav = [
            '/settings/monthlybilling/services',
            '/settings/monthlybilling/date',
            '/usage/meterreadcheck',
        ].concat(this.concessionPaths);

        this.url = this.normaliseURLToCompare();
        return urlsWithSecondaryNav.indexOf(this.url.toLowerCase()) > -1;
    }

    public get displayBack(): boolean {
        return this.backClick !== null;
    }

    public get desktopText(): string {
        const urlToDesktopTextMap = {
            ['/settings/monthlybilling/services']: 'Monthly billing',
            ['/settings/monthlybilling/date']: 'Monthly billing',
            ['/usage/meterreadcheck']: 'Self Service Meter Read'
        };
        this.concessionPaths.forEach((path) => urlToDesktopTextMap[path] = 'Concessions');

        this.url = this.normaliseURLToCompare();
        return urlToDesktopTextMap[this.url.toLowerCase()] || '';
    }

    public get mobileText(): string {
        // only required if the mobile text is different to the desktop text
        const urlToMobileTextMap = {};
        this.url = this.normaliseURLToCompare();
        return urlToMobileTextMap[this.url.toLowerCase()] || '';
    }

    public get backClick() {
        const urlToBackActionMap = {
            ['/settings/concession/selectfuel']: () => this.router.navigate(['/settings/concession']),
            ['/usage/meterreadcheck']: () => this.router.navigate(['/overview']),
            ['/settings/monthlybilling/date']: () => this.router.navigate(['/settings/monthlybilling/services']),
            ['/settings/monthlybilling/services']: () => this.router.navigate([this.monthlyBillingService.getEntryPointUrl()]),
        };
        this.concessionPaths.forEach((path) => urlToBackActionMap[path] = () => this.location.back());

        this.url = this.normaliseURLToCompare();
        return urlToBackActionMap[this.url.toLowerCase()] || null;
    }

    private normaliseURLToCompare(): string {
        const selectConcessionFuelUrl = window.location.pathname.includes('/settings/concession/selectfuel');

        if (selectConcessionFuelUrl) {
            return '/settings/concession/selectfuel';
        } else {
            return window.location.pathname;
        }
    }
}
