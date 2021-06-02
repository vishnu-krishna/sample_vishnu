import * as apiModel from '../../../../../myAccount/services/settings/model';
import * as serviceModel from '../../../../../myAccount/services/settings/model';
import { ContactDetailModel } from '../../../../../shared/service/api.service';

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
        outputItem.payPal = inputItem.payPal;
    }
    outputItem.directDebitContractAccounts = inputItem.directDebitContractAccounts;
    outputItem.oneTouchPayContractAccounts = inputItem.oneTouchPayContractAccounts;
    return outputItem;
});

export class TestData {
    public static get noReturnedMethods(): serviceModel.PaymentMethod[] {
        return [];
    }
    public static get singleVisaCreditCard(): serviceModel.PaymentMethod[] {
        return [mappedTestData.find((pm) => pm.PaymentMethodType === serviceModel.PaymentMethodType.CreditCard && pm.creditCard.cardType === serviceModel.CardType.Visa)];
    }
    public static get singleMastercardCreditCard(): serviceModel.PaymentMethod[] {
        return [mappedTestData.find((pm) => pm.PaymentMethodType === serviceModel.PaymentMethodType.CreditCard && pm.creditCard.cardType === serviceModel.CardType.Master)];
    }
    public static get singleExpiredMastercardCreditCard(): serviceModel.PaymentMethod[] {
        return [mappedTestData.find((pm) => pm.PaymentMethodType === serviceModel.PaymentMethodType.CreditCard && pm.creditCard.cardType === serviceModel.CardType.Master && pm.creditCard.creditCardReference === '345435435')];
    }
    public static get all(): serviceModel.PaymentMethod[] {
        return mappedTestData;
    }
    public static get singleValidVisaCreditCard() {
        return [{
            title: 'Visa',
            shortReference: '3456'
        }];
    }
    public static get singleValidMastercardCreditCard() {
        return [{
            title: 'Mastercard',
            shortReference: '9012'
        }];
    }
    public static get contactDetailForCustomerWithSingleBusinessPartner(): ContactDetailModel {
        return {
            hasMultipleBusinessPartners: false,
            businessPartners: []
        };
    }
    public static get contactDetailForCustomerWithMultipleBusinessPartners(): ContactDetailModel {
        return {
            hasMultipleBusinessPartners: true,
            businessPartners: []
        };
    }
}
