import { OnInit }  from '@angular/core';
import { Http }               from '@angular/http';
import { Router }             from '@angular/router';
import { Observable }         from 'rxjs/Observable';
import { IAccountServiceMA }  from '../../myAccount/services/account.service';
import { ISolarCheckOfferService } from '../../myAccount/services/contract/isolarCheckOffer.service';
import { ApiService }         from '../../shared/service/api.service';
import { ContentService }     from '../../shared/service/content.service';
import { FeatureFlagService, FeatureFlagTypes } from '../services/featureFlag.service';
import { MenuItemModel } from './menuItem.model';

import { MenuIndicatorMessage } from '../../shared/messages/menuIndicator.message';
import { IMessageBusService } from '../../shared/service/contract/imessageBus.service';
import { IRewardsEligibilityService, RewardsEligibility } from '../rewards';
import { IDecisioningService } from '../services/contract/idecisioning.service';
import { HomeProfileEligibilityService } from '../pages/settings/homeProfile/homeProfileEligibility.service';

export class MenuDirective implements OnInit {

    public isOpen: boolean;
    public isSubMenuOpen: boolean;
    public isLoaded: boolean = false;
    public visibility: string = 'shown';
    public showMyWallet;
    public smsPayEnabled: boolean = false;
    public manageNotificationsEnabled: boolean = false;

    public name: Observable<Object>;
    public _content: any;
    public isNewLogo: boolean;
    public mainMenu: any[] = [];
    public subMenu: any[] = [];
    public leftHandMenu: MenuItemModel[] = [];
    public mobileSettingsView: MenuItemModel[] = [];
    public myWalletMenuItem: MenuItemModel;
    public solarMenuItemSettings: MenuItemModel;
    public hasSolar: boolean = false;
    public isSolarRegistered: boolean = false;
    public isSolarEligible: boolean = false;
    public monthlyBillingEnabled: boolean = false;
    public settingsSolarKey: string = 'solar';
    public settingsMyWalletKey: string = 'myWallet';
    public settingsOffersKey: string = 'offers';
    public settingsBillSmoothingKey: string = 'billSmoothing';
    public settingsHomeProfileKey: string = 'homeProfile';
    public showBillSmoothing: boolean;
    public showHomeProfile: boolean;
    public isSolarDeregistrationPending;
    public readonly rewardsMenuItemKey: string = 'rewards';
    public rewardsEligibility: RewardsEligibility;

    constructor(
        protected _http: Http,
        protected _contentService: ContentService,
        protected _api: ApiService,
        public router: Router,
        protected _accountService: IAccountServiceMA,
        public _featureFlagService: FeatureFlagService,
        protected _solarCheckOfferService: ISolarCheckOfferService,
        protected _rewardsEligibilityService: IRewardsEligibilityService,
        protected _decisioningService: IDecisioningService,
        protected _messageBusService: IMessageBusService,
        protected _homeProfileEligibilityService: HomeProfileEligibilityService
    ) {
    }

    public ngOnInit() {
        this._contentService.load()
            .subscribe((content) => {
                this._content = content.selfService.menu;
                this.isNewLogo = content.selfService.isNewLogo;

                let featureFlagValues: FeatureFlagTypes[] = [
                    FeatureFlagTypes.billSmoothingEnabled,
                    FeatureFlagTypes.monthlyBillingEnabled,
                    FeatureFlagTypes.manageNotificationsEnabled,
                    FeatureFlagTypes.homeProfileEnabled
                ];
                Observable.forkJoin(
                    this._accountService.getAccounts(),
                    this._decisioningService.isSmsPayEntryPointAvailableForCustomer(),
                    this._rewardsEligibilityService.checkEligibility(),
                    this._featureFlagService.featureFlagValues(featureFlagValues)
                ).subscribe(([
                    accounts,
                    smsPayEntryPointAvailableForCustomer,
                    rewardsEligibility,
                    [
                        billSmoothingFeatureFlag,
                        monthlyBillingFeatureFlag,
                        manageNotificationsFeatureFlag,
                        homeProfileFeatureFlag
                    ]
                ]) => {
                        this.isLoaded = true;
                        this.visibility = 'hidden';
                        this.showMyWallet = (accounts.length === 1);
                        this.hasSolar = this._solarCheckOfferService.checkAccountHasSolar(accounts);
                        this.showBillSmoothing = billSmoothingFeatureFlag && !this._accountService.isExcludedFromBillSmoothing(accounts);
                        this.showHomeProfile = homeProfileFeatureFlag && this._homeProfileEligibilityService.isEligibleForHomeProfile(accounts);
                        this.rewardsEligibility = rewardsEligibility;
                        this.monthlyBillingEnabled = monthlyBillingFeatureFlag;
                        this.manageNotificationsEnabled = manageNotificationsFeatureFlag;
                        this.smsPayEnabled = smsPayEntryPointAvailableForCustomer;
                    },
                    (err) => {
                        console.error('Error in menu directive', err);
                    },
                    () => {
                        this.buildMenu();
                        this.evaluateSolarMenuVisibility();
                    });

            });

        this.name = this._accountService.getName();

        this._messageBusService.listen(MenuIndicatorMessage).subscribe((message) => {
            let menuItem = this.findTopLevelMenuItem(message.menuLabel);
            if (menuItem) {
                menuItem.showIndicator = message.showIndicator;
            }
        });
    }

    public evaluateSolarMenuVisibility() {

        if (this.hasSolar) {
            this._solarCheckOfferService.isEligible()
                .subscribe(
                    (isEligible) => {
                        this.isSolarEligible = isEligible;
                        this.updateSolarSettingsVisibility();
                    },
                    (err) => {
                        console.error('Error in solar menu creation when retreiving eligibility', err);
                    }
                );
            this._solarCheckOfferService.isRegistered()
                .subscribe(
                    (isRegistered) => {
                        this.isSolarRegistered = isRegistered;
                        this.updateSolarSettingsVisibility();
                    },
                    (err) => {
                        console.error('Error in solar menu creation when retreiving registered status', err);
                    }
                );
            this._solarCheckOfferService.isDeregistrationPending()
                .subscribe(
                    (isDeregistrating) => {
                        this.isSolarDeregistrationPending = isDeregistrating;
                        this.updateSolarSettingsVisibility();
                    },
                    (err) => {
                        console.error('Error in solar menu creation when retreiving registered status', err);
                    }
                );
        }
    }

    public buildMenu() {
        for (let key of Object.keys(this._content)) {
            let item = this._content[key];
            if (!item.isEnabled) { continue; }
            // Get sub menu out of settings menu Item from content
            if (key === 'settings') {
                for (let settingKey of Object.keys(item)) {
                    let settingItem = item[settingKey];
                    if (settingItem instanceof Object) {
                        if (settingKey === this.settingsSolarKey) {
                            this.solarMenuItemSettings = settingItem;
                            // solar settings to be added conditionally elsewhere
                            continue;
                        } else if (settingKey === this.settingsBillSmoothingKey && !this.showBillSmoothing) {
                            continue;
                        } else if (settingKey === this.settingsHomeProfileKey && !this.showHomeProfile) {
                            continue;
                        }  else if (settingKey === this.settingsOffersKey && this.rewardsEligibility.isEligible) {
                            continue;
                        } else {
                            this.leftHandMenu.push(settingItem);
                            this.mobileSettingsView.push(settingItem);
                        }
                    }
                }
            }
            if (key === this.rewardsMenuItemKey) {
                if (!this.rewardsEligibility.isEligible) {
                    continue;
                } else {
                    item.showIndicator = this.rewardsEligibility.hasRedeemableOffers;
                }
            }

            let location = (item.isSubItem) ? this.subMenu : this.mainMenu;
            location.push(item);
        }
        // Add SMS Pay
        if (this.smsPayEnabled) {
            this.addMenuItem('SMS Pay', '/settings/smspay');
        }
        if (this.manageNotificationsEnabled) {
            this.addMenuItem('Notifications', '/settings/notifications');
        }
    }

    public addMenuItem(label, route) {
        const item: any = {
            icon: 'icon_settings_white',
            isEnabled: true,
            isSubItem: true,
            label: label,
            route: route
        };

        const location = (item.isSubItem) ? this.subMenu : this.mainMenu;
        this.leftHandMenu.push(item);
        this.mobileSettingsView.push(item);
        location.push(item);
    }

    public updateSolarSettingsVisibility() {
        let isDisplaySolarSettings: boolean = this.isSolarEligible || this.isSolarRegistered || this.isSolarDeregistrationPending;
        this.updateSolarSettingsMenuItem(isDisplaySolarSettings);
    }

    public updateSolarSettingsMenuItem(isDisplaySolarSettings: boolean) {
        if (isDisplaySolarSettings) {
            this.addSettingsMenuItem(this.solarMenuItemSettings);
        } else {
            this.removeSettingsMenuItem(this.solarMenuItemSettings);
        }
    }

    public addSettingsMenuItem(menuItem: MenuItemModel) {
        if (!menuItem || !menuItem.isEnabled) {
            return;
        } else {
            if (!this.leftHandMenu.some((x) => x === menuItem)) {
                this.leftHandMenu.push(menuItem);
            }

            if (!this.mobileSettingsView.some((x) => x === menuItem)) {
                this.mobileSettingsView.push(menuItem);
            }
        }
    }

    public removeSettingsMenuItem(menuItem: MenuItemModel) {
        this.leftHandMenu = this.leftHandMenu.filter((x) => x !== menuItem);
        this.mobileSettingsView = this.mobileSettingsView.filter((x) => x !== menuItem);
    }

    private findTopLevelMenuItem(menuLabel: string): MenuItemModel {
        let results = this.mainMenu.filter( (m: MenuItemModel) => (m.label + '').toUpperCase() === (menuLabel + '').toUpperCase());

        return results.length > 0 ? results[0] : null;
    }

}
