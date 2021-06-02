import { Injectable } from '@angular/core';
import { ModalName, PageChannel, PageType, SiteSubSection, EventCategory, EventAction, EventLabel } from '../../shared/service/dataLayer.service';
import { InstalmentPlanParameters } from '../../myAccount/services/paymentScheme/paymentSchemeApi.service';

export enum EventTypes {
    Payment = <any> 'payment',
    OmmSuccess = <any> 'omm-success',
    OmmError = <any> 'omm-error',
    PaygButton = <any> 'PAYGButton',
    SccRegisterBatteryError = <any> 'scc-register-battery-error',
    SccRegisterHasBattery = <any> 'scc-register-has-battery',
    SccRegisterSolarDetails = <any> 'scc-register-solar-details',
    SccRegisterSuccess = <any> 'scc-register-success',
    SccRegisterError = <any> 'scc-register-error',
    SccUpdateSystemDetailsCorrection = <any> 'scc-update-system-details-correction',
    SccUpdateSystemDetailsCorrectionError = <any> 'scc-update-system-details-correction-error',
    SccUpdateSystemDetailsModification = <any> 'scc-update-system-details-modification',
    SccUpdateSystemDetailsModificationError = <any> 'scc-update-system-details-modification-error',
    ContractAccountsReturned = <any> 'Contract Accounts returned'
}

type PaymentTypes = 'credit-card' | 'paypal';

@Injectable()
export class DataLayerStubService {
    public pushPayment(
        type: PaymentTypes,
        receiptNumber: any,
        reference: any,
        amount: any) {
        throw new Error('Method not implemented.');
    }
    public pushFormFailure() {
        throw new Error('Method not implemented.');
    }
    public pushFormSuccess() {
        throw new Error('Method not implemented.');
    }
    public setPrePushPageChangeFormSubmissionSuccessEventData() {
        throw new Error('Method not implemented.');
    }
    public pushNewPageEvent(modalName: ModalName, pageChannel: PageChannel, pageType: PageType, siteSubSection1: SiteSubSection, accountNumbers: string[], optionalData?: any) {
        throw new Error('Method not implemented.');
    }
    public pushSccRegisterHasBattery() {
        throw new Error('Method not implemented.');
    }
    public pushSccRegisterBatteryError() {
        throw new Error('Method not implemented.');
    }
    public pushSccRegisterSolarDetails() {
        throw new Error('Method not implemented.');
    }
    public pushSccRegisterError() {
        throw new Error('Method not implemented.');
    }
    public pushSccRegisterSuccess() {
        throw new Error('Method not implemented.');
    }

    public pushSccUpdateSystemDetailsCorrection() {
        throw new Error('Method not implemented.');
    }

    public pushSccUpdateSystemDetailsCorrectionError() {
        throw new Error('Method not implemented.');
    }

    public pushSccUpdateSystemDetailsModification() {
        throw new Error('Method not implemented.');
    }

    public pushSccUpdateSystemDetailsModificationError() {
        throw new Error('Method not implemented.');
    }

    public pushOmmSuccess() {
        throw new Error('Method not implemented.');
    }
    public pushPaygButton() {
        throw new Error('Method not implemented.');
    }
    public pushPayg(paygBand: string) {
        throw new Error('Method not implemented.');
    }
    public pushError(
        type: EventTypes,
        message: string) {
        throw new Error('Method not implemented.');
    }
    public pushContractAccounts(
        accountNumbers: {}) {
        throw new Error('Method not implemented.');
    }
    public pushPaymentError(failureEvent: string, errorMessage: string) {
        throw new Error('Method not implemented.');
    }
    public pushPaymentSuccess(successMessage: string, buttonLabel: string) {
        throw new Error('Method not implemented.');
    }
    public pushClickEvent(modalName: ModalName, eventCategory: EventCategory, eventAction: EventAction, eventLabel: EventLabel) {
        throw new Error('Method not implemented.');
    }

    public pushPaymentAssistancePlanSetupEvent(instalmentPlanParameters: InstalmentPlanParameters, url: string, pathName: string) {
        throw new Error('Method not implemented.');
    }

    public pushPaymentAssistanceErrorEvent(apiErrorPoint: string, pathname: string): void {
        throw new Error('Method not implemented.');
    }

    public pushPaymentAssistancePaymentMadeEvent(url: string, pathName: string) {
        throw new Error('Method not implemented.');
    }

    public trackAddCalendarReminderEvent(addEventUrl: string, href: string, pathName: string) {
        throw new Error('Method not implemented');
    }
}
