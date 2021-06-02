/* tslint:disable:no-access-missing-member */
import {
    animate,
    state,
    style,
    transition,
    trigger }                from '@angular/animations';
import { Component }              from '@angular/core';
import { Http }                 from '@angular/http';
import { Router }               from '@angular/router';
import { IAccountServiceMA }    from '../../myAccount/services/account.service';
import { ISolarCheckOfferService } from '../../myAccount/services/contract/isolarCheckOffer.service';
import { ApiService }     	    from '../../shared/service/api.service';
import { ConfigService } from '../../shared/service/config.service';
import { ContentService }       from '../../shared/service/content.service';
import { IMessageBusService } from '../../shared/service/contract/imessageBus.service';
import { IRewardsEligibilityService } from '../rewards';
import { IAuthenticationEventService } from '../services/contract/iauthenticationEvent.service';
import { IDecisioningService } from '../services/contract/idecisioning.service';
import { FeatureFlagService }      from '../services/featureFlag.service';
import { SecondaryNavigationService }      from '../services/secondaryNavigation.service';
import { MenuDirective }        from './menu.directive';
import { HomeProfileEligibilityService } from '../pages/settings/homeProfile/homeProfileEligibility.service';

/**
 * Desktop navigation menu component
 *
 * @export
 * @class DesktopMenuComponent
 * @implements {OnInit}
 */
@Component({
    selector: 'agl-desktop-menu',
    templateUrl: './desktopMenu.component.html',
    styleUrls: ['./desktopMenu.component.scss'],
    animations: [
      trigger('loadedState', [
        state('hidden', style({
          opacity: '0',
          display: 'none'
        })),
        state('shown',   style({
          opacity: '1'
        })),
        transition('* => *', animate('.2s'))
      ])
    ]
})
export class DesktopMenuComponent extends MenuDirective {

    public logoutUrl: string;

    constructor(
        _http: Http,
        _content: ContentService,
        _api: ApiService,
        _router: Router,
        _accountService: IAccountServiceMA,
        _configService: ConfigService,
        _solarCheckOfferService: ISolarCheckOfferService,
        _featureFlagService: FeatureFlagService,
        _rewardsEligibilityService: IRewardsEligibilityService,
        _decisioningService: IDecisioningService,
        _messageBusService: IMessageBusService,
        private authenticationEventService: IAuthenticationEventService,
        public secondaryNavigationService: SecondaryNavigationService,
        _homeProfileEligibilityService: HomeProfileEligibilityService
    ) {
        super(
            _http,
            _content,
            _api,
            _router,
            _accountService,
            _featureFlagService,
            _solarCheckOfferService,
            _rewardsEligibilityService,
            _decisioningService,
            _messageBusService,
            _homeProfileEligibilityService
        );

        let siteCoreUrl = _configService.current.aglSiteCoreWebsiteBaseUrl;
        this.logoutUrl = `${siteCoreUrl}/svc/Authorization/LogoutAndRedirect`;

        try {
            if (window.location.host === `localhost:8080`) {
                this.logoutUrl = `https://localhost:8080/mockidentity`;
            }
        } catch (e) {
            console.log(`Could not check current URL`);
        }
    }

    public logout($event): void {
        this.authenticationEventService.clearAuthenticatedEventFlag();
        window.location.href = this.logoutUrl;
     }
}
