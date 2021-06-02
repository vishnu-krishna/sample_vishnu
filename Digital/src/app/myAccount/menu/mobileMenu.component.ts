/* tslint:disable:no-access-missing-member */
import { Component }               from '@angular/core';
import { Http }                    from '@angular/http';
import { Router }                  from '@angular/router';
import { IAccountServiceMA }       from '../../myAccount/services/account.service';
import { ISolarCheckOfferService } from '../../myAccount/services/contract/isolarCheckOffer.service';
import { ApiService }              from '../../shared/service/api.service';
import { ContentService }          from '../../shared/service/content.service';
import { IMessageBusService } from '../../shared/service/contract/imessageBus.service';
import { IRewardsEligibilityService } from '../rewards';
import { IDecisioningService } from '../services/contract/idecisioning.service';
import { FeatureFlagService }      from '../services/featureFlag.service';
import { MenuDirective }           from './menu.directive';
import { HomeProfileEligibilityService } from '../pages/settings/homeProfile/homeProfileEligibility.service';

/**
 * Menu component base class
 *
 * @export
 * @class MobileMenuComponent
 * @extends {MenuComponent}
 */
@Component({
    selector: 'agl-mobile-menu',
    templateUrl: './mobileMenu.component.html'
})
export class MobileMenuComponent extends MenuDirective {

    constructor(
        _http: Http,
        _content: ContentService,
        _api: ApiService,
        _router: Router,
        _accountService: IAccountServiceMA,
        _solarCheckOfferService: ISolarCheckOfferService,
        _featureFlagService: FeatureFlagService,
        _rewardsEligibilityService: IRewardsEligibilityService,
        _decisioningService: IDecisioningService,
        _messageBusService: IMessageBusService,
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
    }
}
