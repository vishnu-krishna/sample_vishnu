import { BillDeliveryMethodType } from '../../../../../myAccount/services/settings/model';
import { AglValidators } from '../../../../../shared/validators/aglValidators';

/**
 * @deprecated: the new EBilling component should be used moving forward
 * The new Manage Account Information Architecture (IA) has the Notifications page which has the eBilling component using the Maui-Toggle
 */
export enum EmailBillingComponentState {
    NoDataState           = <any> 'NoDataState',
    CannotChangeState     = <any> 'CannotChangeState',
    EbillState            = <any> 'EbillState',
    PostalState           = <any> 'PostalState',
    InFlightToEbillState  = <any> 'InFlightToEbillState',
    InFlightToPostalState = <any> 'InFlightToPostalState'
}

export enum AlertType {
    Error   = <any> 'error',
    Warning = <any> 'warning',
    Inform  = <any> 'inform'
}

export class AlertMessage {
    private _alertType: AlertType;
    private _heading: string;
    private _body: string;
    public get alertType(): string { return AlertType[this._alertType].toLowerCase(); }
    public get heading(): string { return this._heading; }
    public get body(): string { return this._body; }
    constructor(alertType = AlertType.Inform, header: string, body: string) {
        this._alertType = alertType;
        this._heading = header;
        this._body = body;
    }
}

export class EmailBillingComponentModel {

    public get billingPreference(): BillDeliveryMethodType {
        return this._actualBillingPreference;
    }

    public get cantChangeReason(): AlertMessage {
        return this._cantChangeReason;
    }

    public get contractAccountNumber(): string {
        return this._contractAccountNumber;
    }

    public get emailAddress(): string {
        return this._emailAddress;
    }

    public get isEmptyOrInvalidEmailAddress(): boolean {
        return this._isEmptyOrInvalidEmailAddress;
    }

    public get hasMultipleBusinessPartners(): boolean {
        return this._hasMultipleBusinessPartners;
    }

    public get modelSequenceId(): number {
        return this._modelSequenceId;
    }

    public get indicatedBillingPreference(): BillDeliveryMethodType {
        return this._indicatedBillingPreference;
    }

    public get loadError(): AlertMessage {
        return this._loadError;
    }

    public get updateError(): AlertMessage {
        return this._updateError;
    }

    public get canChangeBillingPreference(): boolean {
        return (this.billingPreference === BillDeliveryMethodType.Postal || this.billingPreference === BillDeliveryMethodType.Email);
    }

    public get isMandatoryEBilling(): boolean {
        return this._isMandatoryEBilling && this.billingPreference === BillDeliveryMethodType.Email;
    }

    public get isBillingPreferenceBPayView(): boolean {
        return this.billingPreference === BillDeliveryMethodType.BPayView;
    }

    public get isBillingPreferenceNA(): boolean {
        return this.billingPreference === BillDeliveryMethodType.NotApplicable;
    }

    public get isEmailBill(): boolean {
        return this.indicatedBillingPreference === BillDeliveryMethodType.Email;
    }

    public get inFlight(): boolean {
        return ((this._state === EmailBillingComponentState.InFlightToEbillState) ||
                (this._state === EmailBillingComponentState.InFlightToPostalState));
    }

    private _actualBillingPreference: BillDeliveryMethodType;
    private _cantChangeReason: AlertMessage;
    private _contractAccountNumber: string;
    private _emailAddress: string;
    private _isEmptyOrInvalidEmailAddress: boolean;
    private _hasMultipleBusinessPartners: boolean;
    private _modelSequenceId: number;
    private _indicatedBillingPreference: BillDeliveryMethodType;
    private _loadError: AlertMessage;
    private _state: EmailBillingComponentState;
    private _updateError: AlertMessage;
    private _isMandatoryEBilling: boolean;

    private _updateErrorMessage = new AlertMessage(AlertType.Error, 'Well, that didn’t go to plan.', 'Sorry, we couldn’t save your preference. Please give it another try.');

    constructor(contractAccountNumber: string, emailAddress: string, hasMultipleBusinessPartners: boolean, modelSequenceId: number, billDeliveryMethodType?: BillDeliveryMethodType, isMandatoryEBilling?: boolean) {
        this._contractAccountNumber = contractAccountNumber;
        this._emailAddress = emailAddress;
        this._isEmptyOrInvalidEmailAddress = (emailAddress || '').length === 0 || !AglValidators.isEmailAddressValid(emailAddress);
        this._hasMultipleBusinessPartners = hasMultipleBusinessPartners;
        this._modelSequenceId = modelSequenceId;
        this._actualBillingPreference = billDeliveryMethodType;
        this._indicatedBillingPreference = billDeliveryMethodType;
        this._isMandatoryEBilling = isMandatoryEBilling;
        switch (billDeliveryMethodType) {
            case BillDeliveryMethodType.Postal:
                this._state = EmailBillingComponentState.PostalState;
                break;
            case BillDeliveryMethodType.Email:
                this._state = EmailBillingComponentState.EbillState;
                break;
            case BillDeliveryMethodType.BPayView:
                this._state = EmailBillingComponentState.CannotChangeState;
                this._cantChangeReason = new AlertMessage(AlertType.Inform, 'You are on BPayView.', 'Please log into your banking institutions website to view your bill.');
                break;
            case BillDeliveryMethodType.NotApplicable:
                this._state = EmailBillingComponentState.CannotChangeState;
                this._cantChangeReason = new AlertMessage(AlertType.Error, 'Sorry we can\'t retrieve your ebill settings.', 'Please chat with us and we will be happy to help.');
                break;
            default:
                this._state = EmailBillingComponentState.NoDataState;
                this._loadError = new AlertMessage(AlertType.Error, 'Sorry we can\'t retrieve your data right now.', 'Please reload the page and try again.');
                break;
        }
    }

    public beginTransition() {
        if (this._state === EmailBillingComponentState.PostalState) {
            this.beginTransitionToEbill();
        } else if (this._state === EmailBillingComponentState.EbillState) {
            this.beginTransitionToPostal();
        } else {
            // this.dump('beginTransition ERROR');
            throw new Error('Can\'t transition');
        }
    }

    public endTransition() {
        if (this._state === EmailBillingComponentState.InFlightToPostalState) {
            this.endTransitionToPostal();
        } else if (this._state === EmailBillingComponentState.InFlightToEbillState) {
            this.endTransitionToEbill();
        } else {
            // this.dump('endTransition ERROR');
            throw new Error('Can\'t transition');
        }
    }

    public failTransition() {
        if (this._state === EmailBillingComponentState.InFlightToPostalState) {
            this.failedToTransitionToPostal();
        } else if (this._state === EmailBillingComponentState.InFlightToEbillState) {
            this.failedToTransitionToEbill();
        } else {
            // this.dump('failTransition ERROR');
            throw new Error('Can\'t transition');
        }
    }

    // Diagnostics
    public dump(message) {
        message = (message ? ' ' + message + ' ' : ' ');
        console.log((this._state + message + 'property cantChangeReason').trim(), this.cantChangeReason);
        console.log((this._state + message + 'property contractAccountNumber').trim(), this.contractAccountNumber);
        console.log((this._state + message + 'property emailAddress').trim(), this.emailAddress);
        console.log((this._state + message + 'property actualBillingPreference').trim(), this._actualBillingPreference);
        console.log((this._state + message + 'property indicatedBillingPreference').trim(), this._indicatedBillingPreference);
        console.log((this._state + message + 'property loadError').trim(), this._loadError);
        console.log((this._state + message + 'property updateError').trim(), this._updateError);
        console.log((this._state + message + 'computed canChangeBillingPreference').trim(), this.canChangeBillingPreference);
        console.log((this._state + message + 'computed isBillingPreferenceBPayView').trim(), this.isBillingPreferenceBPayView);
        console.log((this._state + message + 'computed isBillingPreferenceNA').trim(), this.isBillingPreferenceNA);
        console.log((this._state + message + 'computed isEmailBill').trim(), this.isEmailBill);
        console.log((this._state + message + 'computed inFlight').trim(), this.inFlight);
    }

    private beginTransitionToEbill() {
        this._state = EmailBillingComponentState.InFlightToEbillState;
        this._indicatedBillingPreference = BillDeliveryMethodType.Email;
        this._updateError = undefined;
    }
    private beginTransitionToPostal() {
        this._state = EmailBillingComponentState.InFlightToPostalState;
        this._indicatedBillingPreference = BillDeliveryMethodType.Postal;
        this._updateError = undefined;
    }
    private endTransitionToEbill() {
        this._state = EmailBillingComponentState.EbillState;
        this._actualBillingPreference = this._indicatedBillingPreference;
        this._updateError = undefined;
    }
    private endTransitionToPostal() {
        this._state = EmailBillingComponentState.PostalState;
        this._actualBillingPreference = this._indicatedBillingPreference;
        this._updateError = undefined;
    }
    private failedToTransitionToEbill() {
        this._state = EmailBillingComponentState.PostalState;
        this._indicatedBillingPreference = BillDeliveryMethodType.Postal;
        this._updateError = this._updateErrorMessage;
    }
    private failedToTransitionToPostal() {
        this._state = EmailBillingComponentState.EbillState;
        this._indicatedBillingPreference = BillDeliveryMethodType.Email;
        this._updateError = this._updateErrorMessage;
    }
}
