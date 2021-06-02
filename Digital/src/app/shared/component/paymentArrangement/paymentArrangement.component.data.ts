import * as apiModel from '../../../myAccount/services/settings/model';
import * as serviceModel from '../../../myAccount/services/settings/model';

import { PaymentArrangementType } from '../../../myAccount/common/enums';
import { ExpirationState, MyWalletViewModel } from '../../../myAccount/pages/settings/myWallet/myWallet.service';
import { PaymentMethod } from '../../../myAccount/services/settings/model/paymentMethod';
import { AccountDetailComponentModel } from '../../../myAccount/settings/accountDetail/accountDetail.component';
import { PaymentArrangementContractDetails, PaymentArrangementPaymentMethodModel, SettingUpcomingPaymentDisplayModes } from '../../model/domain/paymentArrangement/paymentArrangementData.model';
import { ContactDetailModel } from '../../service/api.service';
import { PaymentArrangementSettingsViewModel } from './paymentArrangement.settings.service';

const basicTestData: any[] = [
    {
        id: 'ABCDEF',
        creditCard: {
            cardType: 'Visa',
            creditCardReference: '123456',
            expiryDate: '2020-10',
            cardHolderName: 'John Doe'
        },
        directDebitContractAccounts: [],
        oneTouchPayContractAccounts: []
    }, {
        id: 'GHIJKL',
        creditCard: {
            cardType: 'Master',
            creditCardReference: '789012',
            expiryDate: '2022-10',
            cardHolderName: 'John Doe'
        },
        directDebitContractAccounts: [],
        oneTouchPayContractAccounts: []
    }, {
        id: 'HHASYJ',
        creditCard: {
            cardType: 'Master',
            creditCardReference: '345435435',
            expiryDate: '2015-10',
            cardHolderName: 'John Doe'
        },
        directDebitContractAccounts: [],
        oneTouchPayContractAccounts: []
    }, {
        id: 'MNOPQR',
        bank: {
            bsb: '20-10-12',
            accountNumber: '***456',
            accountHolderName: 'James Dunmore',
        },
        directDebitContractAccounts: [],
        oneTouchPayContractAccounts: []
    }, {
        id: 'STUVWX',
        payPal: {
            email: 'james.dunmore@test.com'
        },
        directDebitContractAccounts: [],
        oneTouchPayContractAccounts: []
    }
];

const accountDetailModelWith2Addresses: AccountDetailComponentModel = {
    contractAccountNumber: '12345678',
    contracts: [],
    doesAccountHaveBasicMeter: false,
    hasSingleContract: true,
    numberOfElectricityIcons: 2,
    numberOfGasIcons: 2,
    regionId: '',
    supplyAddresses: ['1 Swanston St Melbourne VIC', '2 Elizabeth St Melbourne VIC']
};

const accountDetailModelWith1Address: AccountDetailComponentModel = {
    contractAccountNumber: '2524325',
    contracts: [],
    doesAccountHaveBasicMeter: false,
    hasSingleContract: true,
    numberOfElectricityIcons: 2,
    numberOfGasIcons: 2,
    regionId: '',
    supplyAddresses: ['1 Swanston St Melbourne VIC']
};

const accountDetailModelWithMultiContracts: AccountDetailComponentModel = {
    contractAccountNumber: '54645423',
    contracts: [],
    doesAccountHaveBasicMeter: false,
    hasSingleContract: false,
    numberOfElectricityIcons: 2,
    numberOfGasIcons: 2,
    regionId: '',
    supplyAddresses: ['1 Swanston St Melbourne VIC']
};

const directDebitContractDetails: PaymentArrangementContractDetails = {
    contractNumber: '7837593475',
    dueDate: new Date(),
    fuelType: 'Electricity',
    isBillSmoothing: false,
    isBillSmoothingV2: false,
    isCurrentBalance: false,
    isOverdue: false,
    isPending: false,
    overdueAmount: 100,
    totalAmountOwing: 200,
    billSmoothingAmount: 0,
    billSmoothingDate: new Date(),
    billSmoothingFrequency: 'Fortnightly',
    billSmoothingPreviousAmountUsed: false,
    upcomingPaymentDisplayMode: SettingUpcomingPaymentDisplayModes.Other,
    displayInBillSmoothingMode: (): boolean => {
        return this.upcomingPaymentDisplayMode === SettingUpcomingPaymentDisplayModes.BillSmoothing;
    },
    displayInPaymentExtensionMode: (): boolean => {
        return this.upcomingPaymentDisplayMode === SettingUpcomingPaymentDisplayModes.PaymentExtension;
    },
    displayInInstalmentPlanMode: (): boolean => {
        return this.upcomingPaymentDisplayMode === SettingUpcomingPaymentDisplayModes.InstalmentPlan;
    },
    displayInDefaultMode: (): boolean => {
        return this.upcomingPaymentDisplayMode === SettingUpcomingPaymentDisplayModes.Other;
    }
};

// We can't return just plain data as PaymentMethod has a helper method on it called PaymentMethodType
// which the component needs, so we must return an array of PaymentMethod objects.

const mappedTestData: serviceModel.PaymentMethod[] = basicTestData.map((inputItem) => {
    let outputItem = new serviceModel.PaymentMethod();
    outputItem.id = inputItem.id;
    outputItem.bank = inputItem.bank;
    if (inputItem.creditCard) {
        outputItem.creditCard = inputItem.creditCard;
        let w: string = <string> inputItem.creditCard.cardType;
        let x: apiModel.CardType = apiModel.CardType[w];
        let y: string = apiModel.CardType[x];
        let z: serviceModel.CardType = serviceModel.CardType[y];
        outputItem.creditCard.cardType = z;
    }
    if (inputItem.payPal) {
        outputItem.payPal = inputItem.paypal;
    }
    outputItem.directDebitContractAccounts = inputItem.directDebitContractAccounts;
    outputItem.oneTouchPayContractAccounts = inputItem.oneTouchPayContractAccounts;
    return outputItem;
});

export class TestData {
    static get noReturnedMethods(): serviceModel.PaymentMethod[] {
        return [];
    }

    static get singleVisaCreditCard(): serviceModel.PaymentMethod[] {
        return [mappedTestData.find((pm) => pm.PaymentMethodType === serviceModel.PaymentMethodType.CreditCard && pm.creditCard.cardType === serviceModel.CardType.Visa)];
    }

    static get singleMastercardCreditCard(): serviceModel.PaymentMethod[] {
        return [mappedTestData.find((pm) => pm.PaymentMethodType === serviceModel.PaymentMethodType.CreditCard && pm.creditCard.cardType === serviceModel.CardType.Master)];
    }

    static get singleExpiredMastercardCreditCard(): serviceModel.PaymentMethod[] {
        return [mappedTestData.find((pm) => pm.PaymentMethodType === serviceModel.PaymentMethodType.CreditCard && pm.creditCard.cardType === serviceModel.CardType.Master && pm.creditCard.creditCardReference === '345435435')];
    }

    static get all(): serviceModel.PaymentMethod[] {
        return mappedTestData;
    }

    static get singleValidVisaCreditCard() {
        return [{
            title: 'Visa',
            shortReference: '3456'
        }];
    }

    static get singleValidMastercardCreditCard() {
        return [{
            title: 'Mastercard',
            shortReference: '8742'
        }];
    }

    static get multipleValidCreditCard() {
        return [
            {
                title: 'Mastercard',
                shortReference: '8742'
            },
            {
                title: 'Visa',
                shortReference: '7652'
            }
        ];
    }

    static get contactDetailForCustomerWithSingleBusinessPartner(): ContactDetailModel {
        return {
            hasMultipleBusinessPartners: false,
            businessPartners: []
        };
    }

    static get contactDetailForCustomerWithMultipleBusinessPartners(): ContactDetailModel {
        return {
            hasMultipleBusinessPartners: true,
            businessPartners: []
        };
    }

    // DIRECT DEBIT

    static get singleDirectDebitSettingViewModelWithNoDirectDebit(): PaymentArrangementSettingsViewModel[] {
        return [{
            hasPaygContract: false,
            isMandatoryDirectDebit: false,
            showAccountDetailComponent: true,
            hasDirectDebitPaymentArrangement: false,
            accountDetailModel: accountDetailModelWith1Address,
            paymentArrangementPaymentMethodModel: new PaymentArrangementPaymentMethodModel(new PaymentMethod(), PaymentArrangementType.DirectDebit),
            upcomingPaymentArrangementModel: [directDebitContractDetails],
        }];
    }

    static get singleDirectDebitSettingViewModelWithDirectDebit(): PaymentArrangementSettingsViewModel[] {
        return [{
            hasPaygContract: false,
            isMandatoryDirectDebit: false,
            showAccountDetailComponent: true,
            hasDirectDebitPaymentArrangement: true,
            accountDetailModel: accountDetailModelWith1Address,
            paymentArrangementPaymentMethodModel: new PaymentArrangementPaymentMethodModel(new PaymentMethod(),  PaymentArrangementType.DirectDebit),
            upcomingPaymentArrangementModel: [directDebitContractDetails],
        }];
    }
    // Mandatory Direct Debit
    static get singleDirectDebitSettingViewModelWithMandatoryDirectDebit(): PaymentArrangementSettingsViewModel[] {
        return [{
            hasPaygContract: false,
            isMandatoryDirectDebit: true,
            showAccountDetailComponent: true,
            hasDirectDebitPaymentArrangement: true,
            accountDetailModel: accountDetailModelWith1Address,
            paymentArrangementPaymentMethodModel: new PaymentArrangementPaymentMethodModel(new PaymentMethod(), PaymentArrangementType.DirectDebit),
            upcomingPaymentArrangementModel: [directDebitContractDetails],
        }];
    }

    static get multiDirectDebitSettingViewModelsWithNoDirectDebit(): PaymentArrangementSettingsViewModel[] {
        return [{
            hasPaygContract: false,
            isMandatoryDirectDebit: false,
            showAccountDetailComponent: true,
            hasDirectDebitPaymentArrangement: false,
            accountDetailModel: accountDetailModelWith1Address,
            paymentArrangementPaymentMethodModel: new PaymentArrangementPaymentMethodModel(new PaymentMethod(), PaymentArrangementType.DirectDebit),
            upcomingPaymentArrangementModel: [directDebitContractDetails],
        },
        {
            hasPaygContract: false,
            isMandatoryDirectDebit: false,
            showAccountDetailComponent: true,
            hasDirectDebitPaymentArrangement: false,
            accountDetailModel: accountDetailModelWith1Address,
            paymentArrangementPaymentMethodModel: new PaymentArrangementPaymentMethodModel(new PaymentMethod(), PaymentArrangementType.DirectDebit),
            upcomingPaymentArrangementModel: [directDebitContractDetails],
        }];
    }

    static get multiDirectDebitSettingViewModelsWithOneDirectDebit(): PaymentArrangementSettingsViewModel[] {
        return [{
            hasPaygContract: false,
            isMandatoryDirectDebit: false,
            showAccountDetailComponent: true,
            hasDirectDebitPaymentArrangement: false,
            accountDetailModel: accountDetailModelWith1Address,
            paymentArrangementPaymentMethodModel: new PaymentArrangementPaymentMethodModel(new PaymentMethod(), PaymentArrangementType.DirectDebit),
            upcomingPaymentArrangementModel: [directDebitContractDetails],
        },
        {
            hasPaygContract: false,
            isMandatoryDirectDebit: false,
            showAccountDetailComponent: true,
            hasDirectDebitPaymentArrangement: true,
            accountDetailModel: accountDetailModelWith1Address,
            paymentArrangementPaymentMethodModel: new PaymentArrangementPaymentMethodModel(new PaymentMethod(), PaymentArrangementType.DirectDebit),
            upcomingPaymentArrangementModel: [directDebitContractDetails],
        }];
    }

    static get multiDirectDebitSettingViewModelsWithDirectDebit(): PaymentArrangementSettingsViewModel[] {
        return [{
            hasPaygContract: false,
            isMandatoryDirectDebit: false,
            showAccountDetailComponent: true,
            hasDirectDebitPaymentArrangement: true,
            accountDetailModel: accountDetailModelWith1Address,
            paymentArrangementPaymentMethodModel: new PaymentArrangementPaymentMethodModel(new PaymentMethod(), PaymentArrangementType.DirectDebit),
            upcomingPaymentArrangementModel: [directDebitContractDetails],
        },
        {
            hasPaygContract: false,
            isMandatoryDirectDebit: false,
            showAccountDetailComponent: true,
            hasDirectDebitPaymentArrangement: true,
            accountDetailModel: accountDetailModelWith1Address,
            paymentArrangementPaymentMethodModel: new PaymentArrangementPaymentMethodModel(new PaymentMethod(), PaymentArrangementType.DirectDebit),
            upcomingPaymentArrangementModel: [directDebitContractDetails],
        }];
    }

    // Mandatory Direct Debit

    static get multiDirectDebitSettingViewModelsWithMandatoryDirectDebit(): PaymentArrangementSettingsViewModel[] {
        return [{
            hasPaygContract: false,
            isMandatoryDirectDebit: true,
            showAccountDetailComponent: true,
            hasDirectDebitPaymentArrangement: true,
            accountDetailModel: accountDetailModelWith1Address,
            paymentArrangementPaymentMethodModel: new PaymentArrangementPaymentMethodModel(new PaymentMethod(), PaymentArrangementType.DirectDebit),
            upcomingPaymentArrangementModel: [directDebitContractDetails],
        },
        {
            hasPaygContract: false,
            isMandatoryDirectDebit: true,
            showAccountDetailComponent: true,
            hasDirectDebitPaymentArrangement: true,
            accountDetailModel: accountDetailModelWith1Address,
            paymentArrangementPaymentMethodModel: new PaymentArrangementPaymentMethodModel(new PaymentMethod(), PaymentArrangementType.DirectDebit),
            upcomingPaymentArrangementModel: [directDebitContractDetails],
        }];
    }

    // SMS PAY

    static get singleSmsPaySettingViewModelWithNoSmsPay(): PaymentArrangementSettingsViewModel[] {
        return [{
            hasPaygContract: false,
            isMandatoryDirectDebit: false,
            showAccountDetailComponent: true,
            hasSmsPayPaymentArrangement: false,
            accountDetailModel: accountDetailModelWith1Address,
            paymentArrangementPaymentMethodModel: new PaymentArrangementPaymentMethodModel(new PaymentMethod(), PaymentArrangementType.SmsPay),
            upcomingPaymentArrangementModel: [directDebitContractDetails],
        }];
    }

    static get singleSmsPaySettingViewModelWithSmsPay(): PaymentArrangementSettingsViewModel[] {
        const paymentMethods = new PaymentMethod();
        paymentMethods.oneTouchPayContractAccounts = [+accountDetailModelWith1Address.contractAccountNumber];
        paymentMethods.directDebitContractAccounts = [];

        return [{
            hasPaygContract: false,
            isMandatoryDirectDebit: false,
            showAccountDetailComponent: true,
            hasSmsPayPaymentArrangement: true,
            accountDetailModel: accountDetailModelWith1Address,
            paymentArrangementPaymentMethodModel: new PaymentArrangementPaymentMethodModel(paymentMethods, PaymentArrangementType.SmsPay),
            upcomingPaymentArrangementModel: [directDebitContractDetails],
        }];
    }

    static get multiSmsPaySettingViewModelsWithNoSmsPay(): PaymentArrangementSettingsViewModel[] {
        return [{
            hasPaygContract: false,
            isMandatoryDirectDebit: false,
            showAccountDetailComponent: true,
            hasSmsPayPaymentArrangement: false,
            accountDetailModel: accountDetailModelWith1Address,
            paymentArrangementPaymentMethodModel: new PaymentArrangementPaymentMethodModel(new PaymentMethod(), PaymentArrangementType.SmsPay),
            upcomingPaymentArrangementModel: [directDebitContractDetails],
        },
        {
            hasPaygContract: false,
            isMandatoryDirectDebit: false,
            showAccountDetailComponent: true,
            hasSmsPayPaymentArrangement: false,
            accountDetailModel: accountDetailModelWith1Address,
            paymentArrangementPaymentMethodModel: new PaymentArrangementPaymentMethodModel(new PaymentMethod(), PaymentArrangementType.SmsPay),
            upcomingPaymentArrangementModel: [directDebitContractDetails],
        }];
    }

    static get multiSmsPaySettingViewModelsWithOneSmsPay(): PaymentArrangementSettingsViewModel[] {
        const paymentMethods = new PaymentMethod();
        paymentMethods.oneTouchPayContractAccounts = [+accountDetailModelWith1Address.contractAccountNumber];
        paymentMethods.directDebitContractAccounts = [];

        return [{
            hasPaygContract: false,
            isMandatoryDirectDebit: false,
            showAccountDetailComponent: true,
            hasSmsPayPaymentArrangement: true,
            accountDetailModel: accountDetailModelWith1Address,
            paymentArrangementPaymentMethodModel: new PaymentArrangementPaymentMethodModel(paymentMethods, PaymentArrangementType.SmsPay),
            upcomingPaymentArrangementModel: [directDebitContractDetails],
        },
        {
            hasPaygContract: false,
            isMandatoryDirectDebit: false,
            showAccountDetailComponent: true,
            hasSmsPayPaymentArrangement: true,
            accountDetailModel: accountDetailModelWith1Address,
            paymentArrangementPaymentMethodModel: new PaymentArrangementPaymentMethodModel(new PaymentMethod(), PaymentArrangementType.SmsPay),
            upcomingPaymentArrangementModel: [directDebitContractDetails],
        }];
    }

    static get multiSmsPaySettingViewModelsWithSmsPay(): PaymentArrangementSettingsViewModel[] {
        return [{
            hasPaygContract: false,
            isMandatoryDirectDebit: false,
            showAccountDetailComponent: true,
            hasSmsPayPaymentArrangement: true,
            accountDetailModel: accountDetailModelWith1Address,
            paymentArrangementPaymentMethodModel: new PaymentArrangementPaymentMethodModel(new PaymentMethod(), PaymentArrangementType.DirectDebit),
            upcomingPaymentArrangementModel: [directDebitContractDetails],
        },
        {
            hasPaygContract: false,
            isMandatoryDirectDebit: false,
            showAccountDetailComponent: true,
            hasSmsPayPaymentArrangement: true,
            accountDetailModel: accountDetailModelWith1Address,
            paymentArrangementPaymentMethodModel: new PaymentArrangementPaymentMethodModel(new PaymentMethod(), PaymentArrangementType.DirectDebit),
            upcomingPaymentArrangementModel: [directDebitContractDetails],
        }];
    }

    static get contactWithSingleBP(): ContactDetailModel {
        return {
            hasMultipleBusinessPartners: false,
            businessPartners: [{
                firstName: 'firstName',
                lastName: 'lastName',
                businessPartnerNumber: '123',
                phone: '',
                mobile: '0400 000 333',
                hasDateOfBirth: false,
                email: '',
            }]
        };
    }

    static get contactWithSingleBPAndMobileNumber(): ContactDetailModel {
        return {
            hasMultipleBusinessPartners: false,
            businessPartners: [{
                firstName: 'firstName',
                lastName: 'lastName',
                businessPartnerNumber: '',
                phone: '',
                mobile: '0400 000 333',
                hasDateOfBirth: false,
                email: 'email@email.com'
            }]
        };
    }

    static get contactWithSingleBPButNoMobileNumber(): ContactDetailModel {
        let contact = this.contactWithSingleBPAndMobileNumber;
        contact.businessPartners[0].mobile = '';
        return contact;
    }

    static get contactWithMultiBP(): ContactDetailModel {
        return {
            hasMultipleBusinessPartners: true,
            businessPartners: []
        };
    }

    static get myWalletViewModels(): MyWalletViewModel[] {
        return [{
            isCreditCard: true,
            isBankAccount: false,
            paymentMethodType: 'paymentMethodType',
            id: '340958',
            title: 'title',
            reference: 'reference',
            shortReference: 'shortReference',
            icon: 'icon',
            expiryDate: '01',
            expiryMonth: '02',
            expiryYear: '2050',
            expired: false,
            expiresSoon: false,
            expirationState: ExpirationState.valid,
            validPaymentMethods: [],
            hasDirectDebitService: false,
            directDebitContractAccounts: [],
            oneTouchPayContractAccounts: [],
            hasSmsPayService: false,
            ccNumber: '4325345'
        }, {
            isCreditCard: false,
            isBankAccount: true,
            paymentMethodType: 'paymentMethodType',
            id: '23454',
            title: 'title',
            reference: 'reference',
            shortReference: 'shortReference',
            icon: 'icon',
            expiryDate: '',
            expiryMonth: '',
            expiryYear: '',
            expired: false,
            expiresSoon: false,
            expirationState: ExpirationState.valid,
            validPaymentMethods: [],
            hasDirectDebitService: false,
            directDebitContractAccounts: [],
            oneTouchPayContractAccounts: [],
            hasSmsPayService: false,
            ccNumber: ''
        }];
    }
}
