import * as moment from 'moment';
import { PaymentArrangementType } from '../../../../myAccount/common/enums';
import { CardType } from '../../../../myAccount/services/settings/model/cardType';
import { PaymentMethod } from '../../../../myAccount/services/settings/model/paymentMethod';

export class PaymentArrangementPaymentMethodModel {
    // TODO: change to type
    public paymentMethodType: any;
    public id: string;
    public reference: string;
    public icon: string;
    public expiryDate: string;
    public email: string;
    public paymentType: string;
    public directDebitType: string;
    public bsb: string;
    public accountNumber: string;
    public accountHolderName: string;
    public cardType: CardType;
    public creditCardReference: string;
    public cardHolderName: string;
    public expired: boolean;
    public expiresSoon: boolean;
    public billingAgreementId: string;
    public isDirectDebit: boolean;
    public isSmsPay: boolean;

    public constructor(
        paymentMethod: PaymentMethod,
        paymentArrangementType: PaymentArrangementType) {

            if (paymentArrangementType === PaymentArrangementType.DirectDebit) {
                this.isDirectDebit = true;
            } else if (paymentArrangementType === PaymentArrangementType.SmsPay) {
                this.isSmsPay = true;
            }

            if (paymentMethod) {

                if (paymentMethod.bank) {
                    this.paymentMethodType = 'Bank account';
                    this.id = paymentMethod.id;
                    this.reference = `xxxx ${paymentMethod.bank.accountNumber.slice(-4)}`;
                    this.icon = 'icon-bank-two-tone';
                    this.paymentType = 'bank';
                } else if (paymentMethod.creditCard) {
                    let creditCard = paymentMethod.creditCard;
                    this.paymentMethodType = creditCard.cardType === CardType.Master ? 'Mastercard' : creditCard.cardType;
                    this.id = paymentMethod.id;
                    this.reference = `xxxx xxxx xxxx ${creditCard.creditCardReference.slice(-4)}`;
                    this.icon = creditCard.cardType === CardType.Master ? 'icon-mastercard' : 'icon-visa';
                    this.expiryDate = `${moment(creditCard.expiryDate).format('MM/YY')}`;
                    this.paymentType = 'creditcard';
                    if (moment().diff(moment(creditCard.expiryDate).subtract(1, 'month'), 'months') > 0) {
                        this.expired = true;
                    }
                    if (moment().diff(moment(creditCard.expiryDate).subtract(0, 'month'), 'months') === 0 && !this.expired) {
                        this.expiresSoon = true;
                    }
                } else if (paymentMethod.payPal) {
                    this.paymentMethodType = 'PayPal';
                    this.id = paymentMethod.id;
                    this.reference = paymentMethod.payPal.email;
                    this.icon = 'icon-pay-paypal';
                    this.paymentType = 'paypal';
                }
            }
    }
}

export class PaymentArrangementContractDetails {
    public contractNumber: string;
    public isOverdue: boolean;
    public overdueAmount: number;
    public totalAmountOwing: number;
    public dueDate: Date;
    public extendedDueDate?: Date;
    public fuelType: string;
    public isCurrentBalance: boolean;
    public isBillSmoothing: boolean;
    public isBillSmoothingV2: boolean;
    public frequency?: string;
    public billSmoothingAmount?: number;
    public isPending: boolean;
    public paymentArrangementType?: PaymentArrangementType;
    public billSmoothingDate: Date;
    public billSmoothingFrequency: string;
    public billSmoothingPreviousAmountUsed: boolean;
    public upcomingPaymentDisplayMode: SettingUpcomingPaymentDisplayModes;
    public displayInBillSmoothingMode(): boolean {
        return this.upcomingPaymentDisplayMode === SettingUpcomingPaymentDisplayModes.BillSmoothing;
    }
    public displayInPaymentExtensionMode(): boolean {
        return this.upcomingPaymentDisplayMode === SettingUpcomingPaymentDisplayModes.PaymentExtension;
    }
    public displayInInstalmentPlanMode(): boolean {
        return this.upcomingPaymentDisplayMode === SettingUpcomingPaymentDisplayModes.InstalmentPlan;
    }
    public displayInDefaultMode(): boolean {
        return this.upcomingPaymentDisplayMode === SettingUpcomingPaymentDisplayModes.Other;
    }
}

export enum SettingUpcomingPaymentDisplayModes {
    BillSmoothing,
    PaymentExtension,
    InstalmentPlan,
    Other
}
