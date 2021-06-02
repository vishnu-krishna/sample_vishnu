import { Location } from '@angular/common';
import { Injectable, NgZone } from '@angular/core';
import { IBusinessPartnerNumberService } from '../../myAccount/services/contract/ibusinessPartnerNumber.service';
import { PaymentMethodName } from './../globals/paygConstants';
import { ApiService } from './api.service';
import { JwtDecoderService } from './jwt.decoder.service';
import { InstalmentPlanParameters, InstalmentPlanFrequency } from '../../myAccount/services/paymentScheme/paymentSchemeApi.service';
import { UrlSegment } from '@angular/router';
import * as moment from 'moment';

declare let utag: any;

export enum EventTypes {
    Payment = 'payment',
    OmmSuccess = 'omm-success',
    OmmError = 'omm-error',
    PaygButton = 'PAYGButton',

    SccRegisterBatteryError = 'scc-register-battery-error',
    SccRegisterHasBattery = 'scc-register-has-battery',
    SccRegisterSolarDetails = 'scc-register-solar-details',
    SccRegisterSuccess = 'scc-register-success',
    SccRegisterError = 'scc-register-error',
    SccSettingsHasBattery = 'scc-settings-has-battery',
    SccSettingsHasBatteryError = 'scc-settings-has-battery-error',
    SccSettingsDeregister = 'scc-settings-deregister',
    SccSettingsDeregisterError = 'scc-settings-deregister-error',
    SccSettingsSolarDetails = 'scc-settings-update-solar-details',
    SccSettingsSolarDetailsError = 'scc-settings-update-solar-details-error',
    SccUpdateSystemDetailsCorrection = 'scc-update-system-details-correction',
    SccUpdateSystemDetailsCorrectionError = 'scc-update-system-details-correction-error',
    SccUpdateSystemDetailsModification = 'scc-update-system-details-modification',
    SccUpdateSystemDetailsModificationError = 'scc-update-system-details-modification-error',

    ContractAccountsReturned = 'Contract Accounts returned',

    SccMonthlyEmailPreferencesYes = 'scc-monthly-email-preference-yes',
    SccMonthlyEmailPreferencesYesError = 'scc-monthly-email-preference-yes-error',
    SccMonthlyEmailPreferencesNo = 'scc-monthly-email-preference-no',
    SccMonthlyEmailPreferencesNoError = 'scc-monthly-email-preference-no-error',

    SccStatusChangeEmailPreferenceYes = 'scc-status-change-email-preference-yes',
    SccStatusChangeEmailPreferenceYesError = 'scc-status-change-email-preference-yes-error',
    SccStatusChangeEmailPreferenceNo = 'scc-status-change-email-preference-no',
    SccStatusChangeEmailPreferenceNoError = 'scc-status-change-email-preference-no-error',
    SccBannerOfferDisplayed = 'scc-banner-offer-displayed',
    SccBannerOfferDismissed = 'scc-banner-offer-dismissed',
}

type PaymentTypes = 'credit-card' | 'paypal';

const CURRENCY_AUD = 'AUD';
const LANGUAGE_CODE_EN = 'EN';
const SITE_NAME_MY_ACCOUNT = 'MyAccount';

/** Important: Since `utag` methods can take a while to complete, it is essential you run them outside
 *  of angular zones.  In particular, this can cause protractor tests to fail to detect the completion
 *  of angular async tasks and timeout waiting for synchronisation.
 */
@Injectable()
export class DataLayerService {
    private optionalPageVariables: OptionalPageVariable[] = [];

    constructor(
        private jwtDecoderService: JwtDecoderService,
        private apiService: ApiService,
        private ngZone: NgZone,
        private businessPartnerNumberService: IBusinessPartnerNumberService) {

        // Typically set "noview" flag (no first page automatic view event) to true for Single Page Apps (SPAs)
        (<any> window).utag_cfg_ovrd = { noview: true };
        (<any> window).utag_data = {};
    }

    /**
     * Sends a dayalayer push for payments
     * @param {PageChannel} page
     * @param paymentType
     * @param {PageType} pageType
     * @param receiptNumber
     * @param reference
     * @param {SiteSubSection} siteSubSection
     * @param {boolean} storeDetails
     * @param {boolean} paymentSuccessful
     * @param amount
     */
    public pushPayment(
        page: PageChannel,
        paymentType: any,
        pageType: PageType,
        receiptNumber: any,
        reference: any,
        siteSubSection: SiteSubSection,
        storeDetails: boolean,
        paymentSuccessful: boolean,
        amount: any) {

        let event = {
            payment_method: paymentType,
            payment_successful: paymentSuccessful,
            store_details: storeDetails
        };

        this.pushNewPageEvent(ModalName.PaymentModal, page, pageType, siteSubSection, [''], event);
    }

    /**
     * Sends a datalayer push for SCC pushSccBannerOfferDisplayed
     */
    public pushSccBannerOfferDisplayed() {
        this.pushSingleEvents({ event: EventTypes.SccBannerOfferDisplayed });
    }

    /**
     * Sends a datalayer push for pushSccBannerOfferDismissed
     */
    public pushSccBannerOfferDismissed() {
        this.pushSingleEvents({ event: EventTypes.SccBannerOfferDismissed });
    }

    /**
     * Sends a datalayer push for SCC Status Deregister Error
     */
    public pushSccSettingsHasBattery() {
        this.pushSingleEvents({ event: EventTypes.SccSettingsHasBattery });
    }

    /**
     * Sends a datalayer push for SCC Status Deregister Error
     */
    public pushSccSettingsHasBatteryError() {
        this.pushSingleEvents({ event: EventTypes.SccSettingsHasBatteryError });
    }

    /**
     * Sends a datalayer push for SCC Update System Details Correction
     */
    public pushSccUpdateSystemDetailsCorrection() {
        this.pushSingleEvents({ event: EventTypes.SccUpdateSystemDetailsCorrection });
    }

    /**
     * Sends a datalayer push for SCC Update System Details Correction Error
     */
    public pushSccUpdateSystemDetailsCorrectionError() {
        this.pushSingleEvents({ event: EventTypes.SccUpdateSystemDetailsCorrectionError });
    }

    /**
     * Sends a datalayer push for SCC Update System Details Modification
     */
    public pushSccUpdateSystemDetailsModification() {
        this.pushSingleEvents({ event: EventTypes.SccUpdateSystemDetailsModification });
    }

    /**
     * Sends a datalayer push for SCC Update System Details Modification
     */
    public pushSccUpdateSystemDetailsModificationError() {
        this.pushSingleEvents({ event: EventTypes.SccUpdateSystemDetailsModificationError });
    }

    /**
     * Sends a datalayer push for SCC Status Deregister Error
     */
    public pushSccSettingsDeregisterError() {
        this.pushSingleEvents({ event: EventTypes.SccSettingsDeregisterError });
    }

    /**
     * Sends a datalayer push for SCC Status Deregister
     */
    public pushSccSettingsDeregister() {
        this.pushSingleEvents({ event: EventTypes.SccSettingsDeregister });
    }

    /**
     * Sends a datalayer push for SCC Status Change Email No Error
     */
    public pushSccStatusChangeEmailPreferenceNoError() {
        this.pushSingleEvents({ event: EventTypes.SccStatusChangeEmailPreferenceNoError });
    }

    /**
     * Sends a datalayer push for SCC Status Change Email No
     */
    public pushSccStatusChangeEmailPreferenceNo() {
        this.pushSingleEvents({ event: EventTypes.SccStatusChangeEmailPreferenceNo });
    }

    /**
     * Sends a datalayer push for SCC Status Change Email Yes
     */
    public pushSccStatusChangeEmailPreferenceYes() {
        this.pushSingleEvents({ event: EventTypes.SccStatusChangeEmailPreferenceYes });
    }

    /**
     * Sends a datalayer push for SCC Status Change Email Yes Error
     */
    public pushSccStatusChangeEmailPreferenceYesError() {
        this.pushSingleEvents({ event: EventTypes.SccStatusChangeEmailPreferenceYesError });
    }

    /**
     * Sends a datalayer push for SCC Monthly Email No Error
     */
    public pushSccMonthlyEmailPreferencesNoError() {
        this.pushSingleEvents({ event: EventTypes.SccMonthlyEmailPreferencesNoError });
    }

    /**
     * Sends a datalayer push for SCC Monthly Email No
     */
    public pushSccMonthlyEmailPreferencesNo() {
        this.pushSingleEvents({ event: EventTypes.SccMonthlyEmailPreferencesNo });
    }

    /**
     * Sends a datalayer push for SCC Monthly Email Yes Error
     */
    public pushSccMonthlyEmailPreferencesYesError() {
        this.pushSingleEvents({ event: EventTypes.SccMonthlyEmailPreferencesYesError });
    }

    /**
     * Sends a datalayer push for SCC Monthly Email Yes
     */
    public pushSccMonthlyEmailPreferencesYes() {
        this.pushSingleEvents({ event: EventTypes.SccMonthlyEmailPreferencesYes });
    }

    /**
     * Sends a datalayer push for SCC Registration Has Battery
     */
    public pushSccRegisterHasBattery() {
        this.pushSingleEvents({ event: EventTypes.SccRegisterHasBattery });
    }

    /**
     * Sends a datalayer push for SCC Registration Battery Errors
     */
    public pushSccRegisterBatteryError() {
        this.pushSingleEvents({ event: EventTypes.SccRegisterBatteryError });
    }

    /**
     * Sends a datalayer push for SCC when Solar Details screen is displayed
     */
    public pushSccRegisterSolarDetails() {
        this.pushSingleEvents({ event: EventTypes.SccRegisterSolarDetails });
    }

    /**
     * Sends a datalayer push for SCC when registration fails
     */
    public pushSccRegisterError() {
        this.pushSingleEvents({ event: EventTypes.SccRegisterError });
    }

    /**
     * Sends a datalayer push for SCC when registration successful
     */
    public pushSccRegisterSuccess() {
        this.pushSingleEvents({ event: EventTypes.SccRegisterSuccess });
    }

    /**
     * Sends a datalayer push for OMM Success
     */
    public pushOmmSuccess() {
        this.pushSingleEvents({ event: EventTypes.OmmSuccess });
    }

    /**
     * Sends a datalayer push for PAYG button
     */
    public pushPaygButton() {
        this.pushSingleEvents({ event: EventTypes.PaygButton });
    }

    /**
     * Sends a datalayer push for PAYG button
     */
    public pushPayg(paygBand: string) {
        this.pushSingleEvents({ PAYGcustomer: paygBand });
    }

    /**
     * Sends a datalayer push for Errors
     */
    public pushError(
        type: EventTypes,
        message: string) {

        this.pushInlineErrorEvent(ModalName.None, message);
    }

    /**
     * Sends a datalayer push for contract Account Numbers
     * @param {{}} accountNumbers
     */
    public pushContractAccounts(accountNumbers: {}) {

        let pushContractAccounts: UtagLink = {
            eventCategory: EventCategory.AccountsPush,
            eventAction: EventAction.AccountsPush,
            eventLabel: EventLabel.AccountsPush,
            event_name: EventName.AccountsPush,
            page_name: '',
            event: accountNumbers
        };

        this.ngZone.runOutsideAngular(() => {
            utag.link('pushContractAccounts', pushContractAccounts);
        });
    }

    /**
     * To Fetch the page channel field in tealium tag.
     * @param pageUrl
     * @returns {any}
     */
    public getPageChannel(pageUrl) {

        switch (true) {
            case pageUrl.includes(pageUrls.overview): {
                return 'Overview';
            }
            case pageUrl.includes(pageUrls.billing):
            case pageUrl.includes(pageUrls.paymentAssistance): {
                return 'Billing';
            }
            case pageUrl.includes(pageUrls.usage): {
                return 'Usage';
            }
            case pageUrl.includes(pageUrls.settings): {
                return 'Manage Account';
            }
            case pageUrl.includes(pageUrls.rewards):
            case pageUrl.includes(pageUrls.rewardsDiscounts):
            case pageUrl.includes(pageUrls.rewardsFlybuys): {
                return 'Rewards';
            }
            default: {
                return 'Manage Account';
            }
        }

    }

    /**
     * Sends a datalayer push for Errors in Make payment, My wallet and Directdebit
     */
    public pushPaymentError(failureEvent: string, errorMessage: string, paymentType?: PaymentMethodName, accounts?: string[]) {
        let event = {
            payment_method: paymentType,
            payment_successful: false
        };

        // Accounts aren't always available but are a required field, so create blank where appropriate.
        if (!accounts) {
            accounts = [];
        }

        this.pushNewPageEvent(ModalName.PaymentModal, PageChannel.Payments, PageType.Modal, SiteSubSection.Payment, accounts, event);
    }

    /**
     * Sends a datalayer push for Success in Make payment, My wallet and Directdebit
     */
    public pushPaymentSuccess(successMessage: string, buttonLabel: string, paymentType?: PaymentMethodName, accounts?: string[]) {
        let event = {
            payment_method: paymentType,
            payment_successful: true
        };

        // Accounts aren't always available but are a required field, so create blank where appropriate.
        if (!accounts) {
            accounts = [];
        }

        this.pushNewPageEvent(ModalName.PaymentModal, PageChannel.Payments, PageType.Modal, SiteSubSection.Payment, accounts, event);
    }

    public pushFormFailure(modalName: ModalName, pageChannel: PageChannel, pageType: PageType, siteSubSection: SiteSubSection, formFieldsUpdated: string[], errorDescription: string, errorCode: ErrorCodes) {
        let utagFailure = {
            update_success: false,
            update_type: formFieldsUpdated.join('|'),
            error_code: errorCode,
            error_description: errorDescription
        };
        this.pushNewPageEvent(modalName, pageChannel, pageType, siteSubSection, [''], utagFailure);
    }

    public pushFormSuccess(modalName: ModalName, pageChannel: PageChannel, pageType: PageType, siteSubSection: SiteSubSection, formFieldsUpdated: string[]) {
        let utagSuccess = {
            update_success: true,
            update_type: formFieldsUpdated.join('|'),
        };
        this.pushNewPageEvent(modalName, pageChannel, pageType, siteSubSection, [''], utagSuccess);
    }

    /**
     * Tracks adding calendar event for calendar reminder events
     */
    public trackAddCalendarReminderEvent(addEventUrl: string, href: string, pathName: string): void {

        const hierarchy = this.generateHierarchy('', pathName);

        const utagLink: UtagCalendarReminderEvent = {
            application_category: 'payment',
            application_name: this.generateApplicationName(href),
            event: 'set_calendar_event',
            eventCategory: EventCategory.Calendar,
            eventAction: addEventUrl,
            eventLabel: EventLabel.None,
            event_name: EventName.ButtonClick,
            page_channel: 'Billing',
            page_hierarchy: 'myaccount' + hierarchy,
            page_name: this.generatePageName('', pathName),
            page_url: href
        };

        this.ngZone.runOutsideAngular(() => {
            utag.link(utagLink);
        });
    }

    /**
     * Tracks extending payment due date failure
     */
    public trackExtendingPaymentDueDateFailure(message: string) {
        let pageName = 'agl:myaccount' + location.pathname.replace(/\//g, ':');

        let utagError: UtagError = {
            error_code: ErrorCodes.None,
            error_description: message,
            event_name: EventName.InlineError,
            page_name: pageName.slice(0, -1)
        };

        this.ngZone.runOutsideAngular(() => {
            utag.link(utagError);
        });
    }

    /**
     * Tracks extension option dog doom error
     */
    public trackPaymentExtensionDogDoomError(errorDescription: string) {
        this.pushNewPageEvent(ModalName.PaymentExtension, PageChannel.Payments, PageType.None, SiteSubSection.Confirm, [], {
            error_description: errorDescription,
            error_code: ErrorCodes.MyAccountApplicationError
        });
    }

    /**
     * The function is to add optional data to page change analytics tracking.
     * The function is called to cache optional data to dataLayerservice before page navigation (in "optionalPageVariables" variable). Then in navigation, "pushPageChangeEvent" is called,
     * it tries to add the optional data previously cached in dataLayerService to utagView (ref: tryAddOptionalDataToUtagView)
     */
    public addOptionalPageVariableForTracking(page: PageRequireOptionalVariables, key: string, value: string) {
        let optionalPageVariable = this.optionalPageVariables.find((p: OptionalPageVariable) => {
            return p.page === page && p.key === key;
        });

        if (optionalPageVariable) {
            optionalPageVariable.value = value;
        } else {
            optionalPageVariable = new OptionalPageVariable(page, key, value);
            this.optionalPageVariables.push(optionalPageVariable);
        }
    }

    public pushNewPageEvent(
        modalName: ModalName,
        pageChannel: PageChannel,
        pageType: PageType,
        siteSubSection1: SiteSubSection,
        accountNumbers: string[],
        optionalData?: any) {
        let pageUri = this.normaliseModalName(modalName);
        let hierarchy = this.generateHierarchy(pageUri);
        let pageName = this.generatePageName(pageUri);

        this.businessPartnerNumberService.getBusinessPartnerNumber().subscribe((bpId) => {
            let utagView: UtagView = {
                page_URL: location.href + '/' + pageUri,
                page_channel: pageChannel,
                page_hierarchy: hierarchy.substr(1).slice(0, -1),
                page_name: pageName,
                page_pathName: location.pathname,
                page_previousPageName: '',
                page_title: document.title,
                page_type: pageType,
                site_currencyCode: CURRENCY_AUD,
                site_languageCode: LANGUAGE_CODE_EN,
                site_name: SITE_NAME_MY_ACCOUNT,
                site_section: pageChannel,
                site_subSection1: siteSubSection1,
                site_subSection2: SiteSubSection.None,
                site_subSection3: SiteSubSection.None,
                user_BPID: bpId.bpId,
                user_BPID_hashed: bpId.hashed,
                user_accountNo: accountNumbers,
                user_nameID: this.jwtDecoderService.nameIdentifier(),
                user_email: this.jwtDecoderService.emailAddress(),
                user_loggedInStatus: LoggedInStatus.LoggedIn
            };

            // Merge the objects
            if (optionalData) {
                utagView = Object.assign(utagView, optionalData);
            }

            console.log('pushNewPageEvent', utagView);
            this.ngZone.runOutsideAngular(() => {
                utag.view(utagView);
            });
        });
    }

    public pushClickEvent(modalName: ModalName, eventCategory: EventCategory, eventAction: EventAction, eventLabel: EventLabel) {
        let pageUri = this.normaliseModalName(modalName);
        let pageName = this.generatePageName(pageUri);

        let utagLink: UtagLink = {
            eventCategory: eventCategory,
            eventAction: eventAction,
            eventLabel: eventLabel,
            event_name: EventName.ButtonClick,
            page_name: pageName.slice(0, -1)
        };

        console.log('pushClickEvent', utagLink);
        this.ngZone.runOutsideAngular(() => {
            utag.link(utagLink);
        });
    }

    public pushEvent(modalName: ModalName, eventCategory: EventCategory, eventAction: EventAction, eventLabel: EventLabel, event: any) {
        let pageUri = this.normaliseModalName(modalName);
        let pageName = this.generatePageName(pageUri);

        let utagLink: UtagLink = {
            eventCategory: eventCategory,
            eventAction: eventAction,
            eventLabel: eventLabel,
            event_name: EventName.None,
            page_name: pageName.slice(0, -1),
            event: event
        };

        console.log('pushEvent', utagLink);
        this.ngZone.runOutsideAngular(() => {
            utag.link(utagLink);
        });
    }

    public pushInlineErrorEvent(modalName: ModalName, errorDescription: string) {
        let pageUri = this.normaliseModalName(modalName);
        let pageName = this.generatePageName(pageUri);

        let utagError: UtagError = {
            error_code: ErrorCodes.None,
            error_description: errorDescription,
            event_name: EventName.InlineError,
            page_name: pageName.slice(0, -1)
        };

        console.log('pushInlineErrorEvent', utagError);
        this.ngZone.runOutsideAngular(() => {
            utag.link(utagError);
        });
    }

    public pushPaymentAssistancePlanSetupEvent(instalmentPlanParameters: InstalmentPlanParameters, url: string, pathName: string): void {

        const hierarchy = this.generateHierarchy('', pathName);
        const instalmentPlan = instalmentPlanParameters.selectedNumberOfInstalments ? instalmentPlanParameters.selectedNumberOfInstalments.toString() + ' ' + instalmentPlanParameters.frequency.toString() : 'custom';

        const utagLink: UtagPaymentAssistancePlanSetup = {
            application_name: this.generateApplicationName(url),
            application_category: 'payment',
            app_firstPaymentDue: moment(instalmentPlanParameters.startDate).format('DD MMM YYYY'),
            app_instalmentPlan: instalmentPlan,
            app_isCustomPlan: (url.includes('/custom/') ? 'true' : 'false'),
            app_preferredFrequency: instalmentPlanParameters.frequency,
            event: 'instalmentplan_setup_success',
            page_channel: 'Billing',
            page_hierarchy: 'myaccount' + hierarchy,
            page_name: 'agl:myaccount:bills:paymentassistance:plan:success',
            page_URL: url,
        };

        console.log('pushPaymentAssistancePlanSetupEvent', utagLink);
        this.ngZone.runOutsideAngular(() => {
            utag.link(utagLink);
        });
    }

    public pushPaymentAssistancePaymentMadeEvent(url: string, pathName: string): void {

        const hierarchy = this.generateHierarchy('', pathName);
        const utagLink: UtagPaymentAssistance = {
            application_name: this.generateApplicationName(url),
            application_category: 'payment',
            event: 'make_a_payment',
            page_channel: 'Billing',
            page_hierarchy: 'myaccount' + hierarchy.substr(1).slice(0, -1),
            page_name: 'agl:myaccount:bills:paymentassistance:plan:success',
            page_URL: url
        };

        console.log('pushPaymentAssistancePaymentMadeEvent', utagLink);
        this.ngZone.runOutsideAngular(() => {
            utag.link(utagLink);
        });
    }

    public pushPaymentAssistanceErrorEvent(apiErrorPoint: string, pathname: string, url: string): void {

        const hierarchy = this.generateHierarchy('', pathname);
        const utagLink: UtagPaymentAssistanceError = {
            application_name: 'myaccount:paymentassistance',
            application_category: 'payment',
            error_code: '',
            error_description: apiErrorPoint,
            event: 'payment_assistance_error',
            page_channel: 'Billing',
            page_hierarchy: 'myaccount' + hierarchy.substr(1).slice(0, -1),
            page_name: this.generatePageName('', pathname),
            page_URL: url
        };

        console.log('pushPaymentAssistanceErrorEvent', utagLink);
        this.ngZone.runOutsideAngular(() => {
            utag.link(utagLink);
        });
    }

    /**
     * Similar method to pushNewPageEvent but is only for new page changes
     * This code is to stop duplicate of router events per page.
     * @param {ModalName} modalName
     * @param pageType
     * @param siteSubSection
     * @param pageUrl
     */
    public pushPageChangeEvent(modalName: ModalName, pageType, siteSubSection, pageUrl, href, pathname, isUserAuthenticated: boolean) {
        console.log(`The page url is ${pageUrl}`);
        let pageUri = this.normaliseModalName(modalName);
        let hierarchy = this.generateHierarchy(pageUri, pathname);
        let pageName = this.generatePageName(pageUri, pathname);

        let utagView = {
            application_category: this.generateApplicatioCategory(pageName),
            application_name: this.generateApplicationName(pageName),
            page_name: pageName.slice(0, -1),
            page_hierarchy: hierarchy.substr(1).slice(0, -1),
            page_URL: href,
            page_channel: this.getPageChannel(pageUrl),
            page_pathName: pathname,
            page_previousPageName: '',
            page_title: document.title,
            page_type: pageType,
            site_currencyCode: CURRENCY_AUD,
            site_languageCode: LANGUAGE_CODE_EN,
            site_name: SITE_NAME_MY_ACCOUNT,
            site_section: this.getPageChannel(pageUrl),
            site_subSection1: pathname.split('/')[2] || '',
            site_subSection2: '',
            site_subSection3: ''
        };

        if (isUserAuthenticated) {
            console.log(`The account number is ${this.apiService.accountNumber}`);
            let uniqueAccountNumbers = this.apiService.accountNumber.filter((value, index, array) => array.indexOf(value) === index);

            this.businessPartnerNumberService.getBusinessPartnerNumber().subscribe((bpId) => {

                let dataForUserAuthenticated = {
                    user_BPID: bpId.bpId,
                    user_BPID_hashed: bpId.hashed,
                    user_accountNo: uniqueAccountNumbers,
                    user_nameID: this.jwtDecoderService.nameIdentifier(),
                    user_email: this.jwtDecoderService.emailAddress(),
                    user_loggedInStatus: LoggedInStatus.LoggedIn
                };

                utagView = Object.assign(utagView, dataForUserAuthenticated);

                utagView = this.tryAddOptionalDataToUtagView(pageUrl, utagView);

                console.log('pushPageChangeEvent', utagView);
                this.ngZone.runOutsideAngular(() => {
                    utag.view(utagView);
                });
            });
        } else {
            let dataForUserUnauthenticated = {
                user_BPID: '',
                user_BPID_hashed: '',
                user_accountNo: [],
                user_nameID: '',
                user_email: '',
                user_loggedInStatus: LoggedInStatus.NotLoggedIn
            };

            utagView = Object.assign(utagView, dataForUserUnauthenticated);

            utagView = this.tryAddOptionalDataToUtagView(pageUrl, utagView);

            console.log('pushPageChangeEvent', utagView);
            this.ngZone.runOutsideAngular(() => {
                utag.view(utagView);
            });
        }
    }

    /**
     * This is to do a simple migration from the singular datalayer pushes.
     * @param event
     */
    public pushSingleEvents(event: {}) {
        console.log('pushSingleEvents', event);
        this.ngZone.runOutsideAngular(() => {
            utag.link(event);
        });
    }

    private generateHierarchy(pageUri: string, pathname: string = location.pathname): string {
        return pathname.replace(/\//g, '|') + '|' + pageUri;
    }

    private normalisePageChannel(pageChannel: PageChannel): string {
        return pageChannel.toString().replace(' ', '-').toLowerCase();
    }

    private normaliseModalName(modalName: ModalName): string {
        return modalName.toString().replace(/\s+/g, '-').toLowerCase();
    }

    private generatePageName(pageUri: string, pathname: string = location.pathname): string {
        return 'agl:myaccount' + pathname.replace(/\//g, ':') + ':' + pageUri;
    }

    private generateApplicatioCategory(pageUri: string) {
        if (pageUri.indexOf('paymentassistance') > -1) {
            return 'payment';
        }
        return '';
    }

    private generateApplicationName(pageUri: string) {
        if (pageUri.indexOf('paymentassistance') > -1) {
            return 'myaccount:paymentassistance';
        }
        return '';
    }

    private tryAddOptionalDataToUtagView(pageUrl: string, utagView: any): any {
        if (this.optionalPageVariables.length === 0) {
            return utagView;
        }

        const variablesToAdd = [];
        const indexes = [];

        for (let index in this.optionalPageVariables) {
            if (this.optionalPageVariables[index].page.toString() === pageUrl) {
                const optionalPageVariable = this.optionalPageVariables[index];
                const obj = {};
                obj[optionalPageVariable.key] = optionalPageVariable.value;
                variablesToAdd.push(obj);
                indexes.push(index);
            }
        }

        let result = utagView;
        for (let variableToAdd of variablesToAdd) {
            result = Object.assign(result, variableToAdd);
        }

        // variables have been added to utagview, they can be removed from cache variable
        for (let index of indexes) {
            this.optionalPageVariables.splice(index, 1);
        }

        return result;
    }
}

interface UtagView {
    application_category?: string;
    application_name?: string;
    page_URL: string;
    page_channel: PageChannel;
    page_hierarchy: string;
    page_name: string;
    page_pathName: string;
    page_previousPageName: string;
    page_title: string;
    page_type: PageType;
    site_currencyCode: string;
    site_languageCode: string;
    site_name: string;
    site_section: PageChannel;
    site_subSection1: SiteSubSection;
    site_subSection2: SiteSubSection;
    site_subSection3: SiteSubSection;
    user_BPID: string;
    user_BPID_hashed: string;
    user_accountNo: string[];
    user_nameID: string;
    user_email: string;
    user_loggedInStatus: LoggedInStatus;
}

interface UtagLink {
    eventCategory: EventCategory;
    eventAction: EventAction;
    eventLabel: EventLabel;
    event_name: EventName;
    page_name: string;
    event?: any;
}

interface UtagPaymentAssistance {
    application_name: string;
    application_category: string;
    event?: string;
    page_channel: string;
    page_hierarchy: string;
    page_name: string;
    page_URL: string;
}

interface UtagPaymentAssistancePlanSetup extends UtagPaymentAssistance {
    app_firstPaymentDue: string;
    app_instalmentPlan: string;
    app_isCustomPlan: string;
    app_preferredFrequency: InstalmentPlanFrequency;
}

interface UtagPaymentAssistanceError extends UtagPaymentAssistance {
    error_code: string;
    error_description: string;
}

interface UtagCalendarReminderEvent {
    application_category: string;
    application_name: string;
    event: string;
    eventCategory: EventCategory;
    eventAction: string;
    eventLabel: EventLabel;
    event_name: EventName;
    page_channel: string;
    page_hierarchy: string;
    page_name: string;
    page_url: string;
}

interface UtagError {
    error_code: ErrorCodes;
    error_description: string;
    event_name: EventName;
    page_name: string;
}

class OptionalPageVariable {
    constructor(public page: PageRequireOptionalVariables, public key: string, public value: string) {
    }
}

export enum ModalName {
    BillSmoothingSetup = 'Set Up Bill Smoothing',
    UpdateContactDetails = 'Update Contact Details',
    BillSmoothingSuccessSetup = 'Success Set Up Bill Smoothing',
    PaymentModal = 'Make a Payment Modal',
    PaymentExtension = 'Payment Extension',
    FeatureIntro = 'Feature Intro',
    None = ''
}

export enum pageUrls {
    overview = '/overview',
    billing = '/bills',
    usage = '/usage',
    settings = '/settings',
    rewards = '/rewards',
    rewardsFlybuys = '/rewards/flybuys',
    rewardsDiscounts = '/rewards/discounts',
    paymentAssistance = '/paymentassistance'
}

export enum PageChannel {
    ManageAccount = 'Manage Account',
    Payments = 'Make a payment',
    Billing = 'Billing',
    Usage = 'Usage',
    Personal = 'Personal',
    Offers = 'Offers and Rewards',
    BillSmoothing = 'Bill Smoothing',
    DirectDebit = 'Direct debit',
    MyWallet = 'My Wallet',
    Smspay = 'SMS Pay',
    Solar = 'Solar',
    Rewards = 'Rewards',
    UpdateContactDetails = 'Update Contact Details'
}

export enum PageType {
    Modal = 'Modal',
    Account = 'account',
    None = ''
}

export enum SiteSubSection {
    BillSmoothing = 'Bill Smoothing',
    UpdateContactDetails = 'Update Contact Details',
    Payment = 'Make a Payment',
    Confirm = 'Confirm',
    None = ''
}

enum LoggedInStatus {
    LoggedIn = 'LoggedIn',
    NotLoggedIn = 'NotLoggedIn'
}

export enum EventCategory {
    BillSmoothing = 'Bill Smoothing',
    AccountsPush = 'My Accounts',
    Rewards = 'Rewards',
    Calendar = 'Calendar',
    FeatureIntro = 'Feature Intro',
    AglRewards = 'AGL Rewards'
}

export enum EventAction {
    BillSmoothingFrequencySelection = 'Frequency Selection',
    AccountsPush = '',
    ClickAction = 'Button Click',
    ShowFeatureIntro = 'Show Feature Intro',
    ShowBenefits = 'Show Benefits'
}

export enum EventLabel {
    Weekly = 'Weekly',
    Fortnightly = 'Fortnightly',
    Monthly = 'Monthly',
    AccountsPush = '',
    MakePayment = 'Make a Payment',
    RewardsDiscountsLearnMore = 'Discounts Learn More',
    RewardsFlybuysViewDetails = 'Flybuys View Details',
    RewardsRedeemOffer = 'Redeem Offer',
    RewardsOfferTermsAndConditions = 'Offer Terms and Conditions',
    RewardsDiscountsViewYourBills = 'Discounts View Your Bills',
    RewardsFlybuysTransactionsSeeMore = 'Flybuys Transactions See More',
    RewardsFlybuysTransactionsSeeLess = 'Flybuys Transactions See Less',
    FeatureIntroNavigateToFeature = 'Navigate to the feature',
    FeatureIntroDismissFeature = 'Dismiss the current feature',
    FeatureIntroCloseModal = 'Close the feature intro modal',
    ShowFeatureIntro = 'Show Feature intro',
    ActivateAglRewards = 'Activate AGL Rewards',
    ShowAglRewardsTermsConditions = 'Show Terms and Conditions for AGL Rewards',
    ShowBenefitInAglRewards = 'Show benefit on AGL Rewards website',
    ShowBenefitsInMyAccount = 'Show benefits on My Account',
    NavigateToAGLRewards = 'Navigate to AGL Rewards website',
    LoadAglRewardsWebsiteError = 'Error in redirecting to AGL Rewards website',
    None = ''
}

enum EventName {
    ButtonClick = 'button_click',
    InlineError = 'inline_error',
    AccountsPush = 'accounts_push',
    None = ''
}

export enum ErrorCodes {
    None = '',
    MyAccountApplicationError = 10, /* for errors that occurred within My Account (i.e javascript errors, dog of doom etc) */
    ApiError = 20 /* for errors that came back from api calls */
}

export enum PageRequireOptionalVariables {
    PaymentExtensionSuccess = '/bills/paymentassistance/extend/success'
}
