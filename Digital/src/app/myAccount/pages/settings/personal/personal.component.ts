import { AfterViewInit, Component, OnInit } from '@angular/core';

import { FeatureFlagService, FeatureFlagTypes } from '../../../../myAccount/services/featureFlag.service';
import { ConfigService } from '../../../../shared/service/config.service';
import { IApiService } from '../../../../shared/service/contract/iapi.service';
import { ContactDetailModel } from './../../../../shared/service/api.service';

@Component({
    selector: 'agl-settings-personal',
    templateUrl: './personal.component.html',
    styleUrls: ['./personal.component.scss']
})
export class PersonalComponent implements OnInit {
    public isFeatureFlagSettings: boolean;
    public isFeatureFlagLoginDetails: boolean;
    public isFeatureFlagContactDetails: boolean;
    public isFeatureFlagNotifications: boolean;
    public currentUrl: string;
    public loginDetailsUrl: string;

    public updateDetailsUrl: string;
    public changePasswordUrl: string;
    public manageAuthorizedPersonsUrl: string;
    public preferencesUrl: string;

    public hasMultipleBusinessPartners: boolean;

    constructor(
        private featureFlagService: FeatureFlagService,
        private config: ConfigService,
        private apiService: IApiService
    ) {
        this.currentUrl = encodeURIComponent(document.location.href);
        this.loginDetailsUrl = `${this.config.current.loginDetailsBaseUrl}/profile?returnTo=${this.currentUrl}`;
        this.changePasswordUrl = `${this.config.current.aglSiteCoreWebsiteBaseUrl}/aeo/home/myaccount/change-password`;
        this.manageAuthorizedPersonsUrl = `${this.config.current.aglSiteCoreWebsiteBaseUrl}/aeo/myaccount/manage-authorised-persons`;
        this.preferencesUrl = `${this.config.current.aglSiteCoreWebsiteBaseUrl}/aeo/Home/MyAccount/Update-Details/PreferencesPage`;
    }

    public ngOnInit() {
        this.featureFlagService.featureFlagged(FeatureFlagTypes.manageAccountEnabled).subscribe(
            (featureIsEnabled: boolean) => {
                this.isFeatureFlagSettings = featureIsEnabled;
            }
        );
        this.featureFlagService.featureFlagged(FeatureFlagTypes.loginDetailsEnabled).subscribe(
            (featureIsEnabled: boolean) => {
                this.isFeatureFlagLoginDetails = featureIsEnabled;
            }
        );
        this.featureFlagService.featureFlagged(FeatureFlagTypes.contactDetailsEnabled).subscribe(
            (featureIsEnabled: boolean) => {
                this.isFeatureFlagContactDetails = featureIsEnabled;
                if (!featureIsEnabled) {
                    this.updateDetailsUrl = `${this.config.current.aglSiteCoreWebsiteBaseUrl}/aeo/myaccount/update-details`;
                } else {
                    this.apiService.getContactDetail().subscribe(
                        (data: ContactDetailModel) => {
                            this.hasMultipleBusinessPartners = data.hasMultipleBusinessPartners;
                        },
                        (err) => {
                            console.error('ERROR: apiService.getContactDetail()', err);
                        }
                    );
                }
            }
        );
        this.featureFlagService.featureFlagged(FeatureFlagTypes.manageNotificationsEnabled).subscribe(
            (featureIsEnabled: boolean) => {
                this.isFeatureFlagNotifications = featureIsEnabled;
            }
        );
    }
}
