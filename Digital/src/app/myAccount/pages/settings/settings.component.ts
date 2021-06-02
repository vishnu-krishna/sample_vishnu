import { Inject, Injectable, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { FeatureFlagService, FeatureFlagTypes } from '../../../myAccount/services/featureFlag.service';
import { ContentService } from '../../../shared/service/content.service';
import { IAccountServiceMA } from '../../services/account.service';

@Component({
    selector: 'agl-account-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
@Injectable()
export class SettingsComponent implements OnInit {
    public ready: boolean = false;
    public lightMode: boolean = false;
    public restrictedMode: boolean = false;
    public isFeatureFlagSettings: boolean = false;
    public isLoading: boolean = true;

    constructor(
        private _accountsService: IAccountServiceMA,
        private _contentService: ContentService,
        private _featureFlagService: FeatureFlagService,
        private router: Router,
        @Inject('AppContentBranch') protected appContentBranch: string) {
    }

    public ngOnInit() {
        this._featureFlagService.featureFlagged(FeatureFlagTypes.manageAccountEnabled).subscribe(
            (featureIsEnabled: boolean) => {
                this.isFeatureFlagSettings = featureIsEnabled;
                Observable.forkJoin(
                    this._contentService.getLightMode(),
                    this._accountsService.getAccounts().first())
                    .subscribe(([lightModeResult, getAccountsResult]) => {
                        this.ready = true;
                        if (lightModeResult !== undefined && lightModeResult !== null) {
                            this.lightMode = lightModeResult;
                        }
                        this.restrictedMode = true;
                        let accounts = getAccountsResult;
                        this.isLoading = false;
                        // TODO: Diamond to fix.
                        // tslint:disable-next-line:prefer-for-of
                        for (let i = 0; i < accounts.length; i++) {
                            if (!accounts[i].allContractsAreRestricted) {
                                this.restrictedMode = false;
                                break;
                            }
                        }
                    });
        });
    }

    // SAP is down
    public isLightMode(): boolean {
        return this.ready && this.lightMode;
    }

    // Don't have access to full features
    public isRestrictedMode(): boolean {
        return this.ready && !this.lightMode && this.restrictedMode;
    }

    // Default mode
    public isSettingsMode(): boolean {
        return this.ready && (!this.lightMode && !this.restrictedMode);
    }

    public showLeftMenu(): boolean  {
        // TODO remove showLeftMenu() and use isFullPageRoute() instead
        return this.router.url.indexOf('monthlybilling') === -1;
    }

    public isFullPageRoute(): boolean {
        let routes = [
            // TODO add routes here once this is merged up into team branches
            // 'settings/contactdetails',
            // 'settings/monthlybilling'
            /* home profile etc */
            'settings/energyinsights',
            'settings/concession',
            'settings/contactdetails',
            'settings/homeprofile/'
        ];

        let url = this.router.url.toLowerCase();
        return routes.filter((r) => url.indexOf(r) !== -1).length > 0;
    }
}
