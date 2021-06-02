import { Component, HostListener, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Http } from '@angular/http';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { NavigationStart, Router } from '@angular/router';
import { Angulartics2GoogleTagManager } from 'angulartics2';
import { ApiService } from '../shared/service/api.service';
import { ConfigService } from '../shared/service/config.service';
import { ContentService } from '../shared/service/content.service';
import { DeviceDetectorService } from '../shared/service/deviceDetector.service';
import { MobileMenuComponent } from './menu/mobileMenu.component';
import { IAuthenticationEventService } from './services/contract/iauthenticationEvent.service';
import { ISsmrService } from './services/contract/issmr.service';
import { FeatureFlagService, FeatureFlagTypes } from './services/featureFlag.service';

/**
 * My account application root container
 */
@Component({
    selector: 'agl-account-app',
    templateUrl: './myAccount.component.html',
    styleUrls: ['../shared/style/agltheme.scss', './style/app.scss', '../shared/style/dls.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MyAccountComponent implements OnInit {

    @ViewChild(MobileMenuComponent)
    public _mobileMenu: MobileMenuComponent;
    public browserClass: string;
    public apiSyncError: Boolean = false;
    public isNewLogo: boolean;

    constructor(private _http: Http,
                private _api: ApiService,
                private _router: Router,
                private _device: DeviceDetectorService,
                private _ga: Angulartics2GoogleTagManager,
                private _config: ConfigService,
                private _contentService: ContentService,
                public sanitizer: DomSanitizer,
                public iconRegistry: MatIconRegistry,
                public ssmrService: ISsmrService,
                public authenticationEventService: IAuthenticationEventService,
                private _featureService: FeatureFlagService) {

        this._api.startSync();

        this._api.getProfile();

        this._api.startTimeout();

        this._router.events.subscribe((val) => {
            if (val instanceof NavigationStart) {
                // Track pages
                this._ga.pageTrack(val.url);
            }
            // whenever the route changes
            this.closeMobileMenu();
            window.scrollTo(0, 0);
        });

        if (_device.isIE) {
            this.browserClass = 'ie';
        }

        this._featureService.featureFlagged(FeatureFlagTypes.decisioningEnabled).subscribe(
            (featureIsEnabled: boolean) => {
                if (featureIsEnabled) {
                    authenticationEventService.sendAuthenticationEvent();
                }
            }
        );

        // All custom SVG icons to be added into the icon registry.
        // Use as: <mat-icon svgIcon="icon-gas" alt="gas icon"></mat-icon>
        iconRegistry.addSvgIcon('icon-gas', sanitizer.bypassSecurityTrustResourceUrl('svg/icon_gas.svg'));
        iconRegistry.addSvgIcon('icon-settings-personal', sanitizer.bypassSecurityTrustResourceUrl('svg/icon_settings_personal.svg'));
        iconRegistry.addSvgIcon('icon-settings-flybuys', sanitizer.bypassSecurityTrustResourceUrl('svg/icon_settings_flyBuys.svg'));
        iconRegistry.addSvgIcon('icon-settings-billsmoothing', sanitizer.bypassSecurityTrustResourceUrl('svg/icon_settings_billSmoothing.svg'));
        iconRegistry.addSvgIcon('icon-settings-billing', sanitizer.bypassSecurityTrustResourceUrl('svg/icon_bills_white.svg'));
        iconRegistry.addSvgIcon('icon-settings-directdebit', sanitizer.bypassSecurityTrustResourceUrl('svg/icon_ma_settings_directDebit.svg'));
        iconRegistry.addSvgIcon('icon-bill', sanitizer.bypassSecurityTrustResourceUrl('svg/icon_bill.svg'));
        iconRegistry.addSvgIcon('icon-graph', sanitizer.bypassSecurityTrustResourceUrl('svg/icon_graph.svg'));
        iconRegistry.addSvgIcon('icon-myaccount', sanitizer.bypassSecurityTrustResourceUrl('svg/icon_myaccount.svg'));
        iconRegistry.addSvgIcon('icon-phone', sanitizer.bypassSecurityTrustResourceUrl('svg/icon_phone.svg'));
        iconRegistry.addSvgIcon('icon-profile', sanitizer.bypassSecurityTrustResourceUrl('svg/icon_profile.svg'));
        iconRegistry.addSvgIcon('icon-settings', sanitizer.bypassSecurityTrustResourceUrl('svg/icon_settings.svg'));
        iconRegistry.addSvgIcon('icon-usage', sanitizer.bypassSecurityTrustResourceUrl('svg/icon_usage.svg'));
        iconRegistry.addSvgIcon('icon-tick', sanitizer.bypassSecurityTrustResourceUrl('svg/icon_tick.svg'));
        iconRegistry.addSvgIcon('icon-settings-elec', sanitizer.bypassSecurityTrustResourceUrl('svg/icon_settings_elec.svg'));
        iconRegistry.addSvgIcon('icon-settings-gas', sanitizer.bypassSecurityTrustResourceUrl('svg/icon_settings_gas.svg'));
        iconRegistry.addSvgIcon('icon-tick-in-box', sanitizer.bypassSecurityTrustResourceUrl('svg/icon_tick_in_box.svg'));
        iconRegistry.addSvgIcon('icon-elec-enabled', sanitizer.bypassSecurityTrustResourceUrl('svg/icon_elec_enabled.svg'));
        iconRegistry.addSvgIcon('icon-gas-enabled', sanitizer.bypassSecurityTrustResourceUrl('svg/icon_gas_enabled.svg'));
        iconRegistry.addSvgIcon('icon-pay-bill-panel', sanitizer.bypassSecurityTrustResourceUrl('svg/icon_pay_bill_panel.svg'));
        iconRegistry.addSvgIcon('icon-exp-bill', sanitizer.bypassSecurityTrustResourceUrl('svg/icon_exp_bill.svg'));
        iconRegistry.addSvgIcon('icon-exp-smooth', sanitizer.bypassSecurityTrustResourceUrl('svg/icon_exp_smooth.svg'));
        iconRegistry.addSvgIcon('icon-person', sanitizer.bypassSecurityTrustResourceUrl('svg/icon_person.svg'));
        iconRegistry.addSvgIcon('icon-hamburger-menu', sanitizer.bypassSecurityTrustResourceUrl('svg/icon_hamburger_menu.svg'));
        iconRegistry.addSvgIcon('icon-thermometer', sanitizer.bypassSecurityTrustResourceUrl('svg/icon-thermometer.svg'));
        iconRegistry.addSvgIcon('icon-low-graph', sanitizer.bypassSecurityTrustResourceUrl('svg/icon-low-graph.svg'));
        iconRegistry.addSvgIcon('icon-warning', sanitizer.bypassSecurityTrustResourceUrl('svg/icon-warning.svg'));
        iconRegistry.addSvgIcon('icon-payment-method-add', sanitizer.bypassSecurityTrustResourceUrl('svg/icon_payment_method_add.svg'));
        iconRegistry.addSvgIcon('icon-mastercard', sanitizer.bypassSecurityTrustResourceUrl('svg/icon_mastercard.svg'));
        iconRegistry.addSvgIcon('icon-visa', sanitizer.bypassSecurityTrustResourceUrl('svg/ico-visa.svg'));
        iconRegistry.addSvgIcon('icon-close', sanitizer.bypassSecurityTrustResourceUrl('svg/icon_close.svg'));
        iconRegistry.addSvgIcon('icon-close-blue', sanitizer.bypassSecurityTrustResourceUrl('svg/icon_close_blue.svg'));
        iconRegistry.addSvgIcon('icon-close-white', sanitizer.bypassSecurityTrustResourceUrl('svg/icon_close_white.svg'));
        iconRegistry.addSvgIcon('icon-bank-two-tone', sanitizer.bypassSecurityTrustResourceUrl('svg/icon_bank_two_tone.svg'));
        iconRegistry.addSvgIcon('icon-bank-disabled', sanitizer.bypassSecurityTrustResourceUrl('svg/icon_bank_disabled.svg'));
        iconRegistry.addSvgIcon('icon-calendar2', sanitizer.bypassSecurityTrustResourceUrl('svg/icon_calendar2.svg'));
        iconRegistry.addSvgIcon('icon-clock', sanitizer.bypassSecurityTrustResourceUrl('svg/icon_clock.svg'));
        iconRegistry.addSvgIcon('icon-direct-debit-ribbon', sanitizer.bypassSecurityTrustResourceUrl('svg/icon_direct_debit_ribbon.svg'));
        iconRegistry.addSvgIcon('icon-sms-pay-ribbon', sanitizer.bypassSecurityTrustResourceUrl('svg/icon_sms_pay_ribbon.svg'));
        iconRegistry.addSvgIcon('icon-sc-solarhousequestion', sanitizer.bypassSecurityTrustResourceUrl('svg/sc-solarhousequestion.svg'));
        iconRegistry.addSvgIcon('icon-paypal', sanitizer.bypassSecurityTrustResourceUrl('svg/icon-paypal.svg'));
        iconRegistry.addSvgIcon('icon-pay-paypal', sanitizer.bypassSecurityTrustResourceUrl('svg/icon_dd_paypal.svg'));
        iconRegistry.addSvgIcon('icon-wallet', sanitizer.bypassSecurityTrustResourceUrl('svg/icon_wallet.svg'));
        iconRegistry.addSvgIcon('icon-dd-visa', sanitizer.bypassSecurityTrustResourceUrl('svg/icon_dd_visa.svg'));
        iconRegistry.addSvgIcon('icon-dd-bank', sanitizer.bypassSecurityTrustResourceUrl('svg/icon_dd_bankaccount.svg'));
        iconRegistry.addSvgIcon('icon-dd-master', sanitizer.bypassSecurityTrustResourceUrl('svg/icon_dd_master.svg'));
        iconRegistry.addSvgIcon('icon-dog-of-doom', sanitizer.bypassSecurityTrustResourceUrl('svg/icon_dog_of_doom.svg'));
        iconRegistry.addSvgIcon('icon-agl-logo-desktop', sanitizer.bypassSecurityTrustResourceUrl('svg/icon-header-desktop.svg'));
        iconRegistry.addSvgIcon('icon-agl-logo-mobile', sanitizer.bypassSecurityTrustResourceUrl('svg/icon-header-mobile.svg'));
        iconRegistry.addSvgIcon('icon-paypal-grey', sanitizer.bypassSecurityTrustResourceUrl('svg/icon_paypal_grey.svg'));
        iconRegistry.addSvgIcon('icon-tick-in-box-large', sanitizer.bypassSecurityTrustResourceUrl('svg/tick_icon.svg'));
        iconRegistry.addSvgIcon('icon-calendar', sanitizer.bypassSecurityTrustResourceUrl('svg/icon-calendar.svg'));
        iconRegistry.addSvgIcon('icon-email', sanitizer.bypassSecurityTrustResourceUrl('svg/icon-email.svg'));
        iconRegistry.addSvgIcon('icon-reminder', sanitizer.bypassSecurityTrustResourceUrl('svg/icon-reminder.svg'));
        iconRegistry.addSvgIcon('icon-alert-inform', sanitizer.bypassSecurityTrustResourceUrl('svg/ico_info.svg'));
        iconRegistry.addSvgIcon('icon-alert-success', sanitizer.bypassSecurityTrustResourceUrl('svg/alert_success.svg'));
        iconRegistry.addSvgIcon('icon-alert-warning', sanitizer.bypassSecurityTrustResourceUrl('svg/alert_warning.svg'));
        iconRegistry.addSvgIcon('icon-alert-error', sanitizer.bypassSecurityTrustResourceUrl('svg/alert_error.svg'));
        iconRegistry.addSvgIcon('icon-alert-pending', sanitizer.bypassSecurityTrustResourceUrl('svg/alert_pending.svg'));
        iconRegistry.addSvgIcon('icon-payment', sanitizer.bypassSecurityTrustResourceUrl('svg/icon-payment.svg'));
        iconRegistry.addSvgIcon('icon-chevron-desktop', sanitizer.bypassSecurityTrustResourceUrl('svg/chevron-desktop.svg'));
        iconRegistry.addSvgIcon('icon-chevron-mobile', sanitizer.bypassSecurityTrustResourceUrl('svg/chevron-mobile.svg'));
        iconRegistry.addSvgIcon('icon-web-chat', sanitizer.bypassSecurityTrustResourceUrl('svg/webchat/web-chat.svg'));

        // concession cards
        iconRegistry.addSvgIcon('icon-concession-ctlk-healthcare', sanitizer.bypassSecurityTrustResourceUrl('svg/concession/cards/ctlk-healthcare.svg'));
        iconRegistry.addSvgIcon('icon-concession-ctlk-pensioner', sanitizer.bypassSecurityTrustResourceUrl('svg/concession/cards/ctlk-pensioner.svg'));
        iconRegistry.addSvgIcon('icon-concession-dva-pensioner', sanitizer.bypassSecurityTrustResourceUrl('svg/concession/cards/dva-pensioner.svg'));
        iconRegistry.addSvgIcon('icon-concession-dva-gold-eda', sanitizer.bypassSecurityTrustResourceUrl('svg/concession/cards/dva-gold-eda.svg'));
        iconRegistry.addSvgIcon('icon-concession-dva-gold-tpi', sanitizer.bypassSecurityTrustResourceUrl('svg/concession/cards/dva-gold-tpi.svg'));
        iconRegistry.addSvgIcon('icon-concession-dva-gold-ww', sanitizer.bypassSecurityTrustResourceUrl('svg/concession/cards/dva-gold-ww.svg'));
        iconRegistry.addSvgIcon('icon-concession-doi-immi', sanitizer.bypassSecurityTrustResourceUrl('svg/concession/cards/doi-immi.svg'));
        iconRegistry.addSvgIcon('icon-concession-qdc-qsc-gov', sanitizer.bypassSecurityTrustResourceUrl('svg/concession/cards/qdc-qsc-gov.svg'));
        iconRegistry.addSvgIcon('icon-concession-unknown', sanitizer.bypassSecurityTrustResourceUrl('svg/concession/cards/unknown.svg'));
        iconRegistry.addSvgIcon('icon-concession-general', sanitizer.bypassSecurityTrustResourceUrl('svg/concession/icon-card.svg'));
        iconRegistry.addSvgIcon('icon-concession-buoy', sanitizer.bypassSecurityTrustResourceUrl('svg/concession/icon-buoy.svg'));
        iconRegistry.addSvgIcon('icon-payontime-applied-tick', sanitizer.bypassSecurityTrustResourceUrl('svg/icon-payontime-applied-tick.svg'));
        iconRegistry.addSvgIcon('icon-payontime-overdue-newbill-warning', sanitizer.bypassSecurityTrustResourceUrl('svg/icon-payontime-overdue-newbill-warning.svg'));

    }

    // Interactions below
    // Click
    @HostListener('click')
    public onClick() {
        this._api.checkTimeout();
    }

    // Key press
    @HostListener('window:keydown')
    public keyboardInput() {
        this._api.checkTimeout();
    }

    public ngOnInit() {
        this._api.errors.subscribe((error) => {
            this.apiSyncError = true;
        });
        this._contentService.load()
            .subscribe((content) => {
                this.isNewLogo = content.selfService.isNewLogo;
            });
    }

    public closeMobileMenu() {
        if (this._mobileMenu.isOpen || this._mobileMenu.isSubMenuOpen) {
            this._mobileMenu.isOpen = false;
            this._mobileMenu.isSubMenuOpen = false;
        }
    }

    public isFullscreenRoute(): boolean {
        if (this._router.url.indexOf('ssmr') !== -1) {
            return true;
        } else {
            return false;
        }
    }

    public showHeader(): boolean {
        return (!this.apiSyncError && this.ssmrService.showHeader);
    }

    public showFooter() {
        return (!this.apiSyncError && this.ssmrService.showFooter);
    }
}
