import { Injectable } from '@angular/core';
import orderBy from 'lodash-es/orderBy';
import flattenDeep from 'lodash-es/flattenDeep';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';
import { CardType } from '../../../../myAccount/services/settings/model/cardType';
import { IPaymentMethodsService } from '../../../../myAccount/services/settings/paymentMethods.service.interface';
import { IAccountServiceMA } from '../../../services/account.service';
import { PaymentMethod } from '../../../services/settings/model/paymentMethod';
import { FeatureFlagService, FeatureFlagTypes } from './../../../services/featureFlag.service';
import { IMyWalletService } from './myWallet.service.interface';

@Injectable()
export class MyWalletService implements IMyWalletService {

    constructor(
        private paymentMethodsService: IPaymentMethodsService,
        private accountService: IAccountServiceMA,
        private featureFlagService: FeatureFlagService
    ) { }

    public getStoredPaymentMethods(): Observable<MyWalletViewModel[]> {
        return new Observable((observer) => {

            Observable.forkJoin(
                this.paymentMethodsService.getPaymentMethods(),
                this.featureFlagService.featureFlagged(FeatureFlagTypes.bankAccountPaymentEnabled)
            ).subscribe(
                (results) => {

                    let paymentMethods = results[0];
                    let bankEnabled = true; // results[1]; we pass this through and then filter in the make a payment section only

                    const uiPaymentMethods: MyWalletViewModel[] = paymentMethods.map((pm: PaymentMethod) => {
                        if (pm.creditCard) { return this.createCreditCardViewModel(pm); }
                        if (bankEnabled && pm.bank) {
                            return this.createBankAccountViewModel(pm);
                        }
                    }).filter((paymentMethod) => {
                        return paymentMethod !== null && paymentMethod !== undefined;
                    });

                    const orderedPaymentMethods = orderBy(uiPaymentMethods, ['expiryYear', 'expiryMonth'], ['desc', 'desc']);
                    observer.next(orderedPaymentMethods);
                    observer.complete();
                },
                (error) => {
                    observer.error(error);
                    console.error('An error occurred retrieving payment methods from the PaymentMethods service.', error);
                }
            );
        });
    }

    public getValidPaymentMethods(paymentMethods: MyWalletViewModel[], paymentMethodSelected?: MyWalletViewModel): MyWalletViewModel[] {
        const filteredPaymentMethods = paymentMethods.filter((paymentMethod) => {
            if (paymentMethodSelected) {
                const isSelectedPaymentMethod = paymentMethod.id === paymentMethodSelected.id;
                const isExpired = this.isExpired(paymentMethod);
                return !isSelectedPaymentMethod && !isExpired;
            } else {
                const isExpired = this.isExpired(paymentMethod);
                return !isExpired;
            }
        });
        const groupedPaymentMethods = this.groupPaymentMethods(filteredPaymentMethods);
        return groupedPaymentMethods;
    }

    public checkPendingPayments(): Observable<boolean> {
        return new Observable((observer) => {
            this.accountService.getAccounts().subscribe(
                (contractAccounts) => {
                    for (let ca of contractAccounts) {
                        for (let c of ca.contracts) {
                            let hasPendingPayment = !!c.pendingPaymentDate;
                            if (hasPendingPayment) {
                                observer.next(hasPendingPayment);
                                observer.complete();
                                return hasPendingPayment;
                            }
                        }
                    }
                },
                (error) => {
                    observer.error(error);
                    console.error('An error occurred retrieving accounts from the Accounts service.', error);
                }
            );
        });
    }

    private isExpired(paymentMethod: MyWalletViewModel) {
        const expiryDate = paymentMethod.isCreditCard && paymentMethod.expiryDate;
        const hasExpired = paymentMethod.expired;
        if (!expiryDate) { return false; }
        if (hasExpired) { return true; }
        return false;
    }

    private groupPaymentMethods(validPaymentMethodArr) {
        const paymentMethodGroupOrder = [MyWalletPaymentMethodTypes.creditCard, MyWalletPaymentMethodTypes.bankAccount];
        const groupedPaymentMethods = paymentMethodGroupOrder.map((paymentMethod) => {
            return validPaymentMethodArr.filter((validPaymentMethod) => {
                return validPaymentMethod.paymentMethodType === paymentMethod;
            });
        });
        return flattenDeep(groupedPaymentMethods);
    }

    private createCreditCardViewModel(paymentMethod: PaymentMethod) {
        const myWalletViewModel = new MyWalletViewModel();
        const cardReference = paymentMethod.creditCard.creditCardReference;
        const cardLastFourDigits = cardReference.match(/(\d{4})(?!.*\d)/g);
        const expiryDate = paymentMethod.creditCard.expiryDate;
        const expiryDateYear = expiryDate.match(/^([^\-]+)/)[0];
        const expiryDateMonth = expiryDate.match(/([^-]+$)/)[0];

        myWalletViewModel.isCreditCard = true;
        myWalletViewModel.paymentMethodType = 'credit card';
        myWalletViewModel.ccNumber = cardReference;
        myWalletViewModel.id = paymentMethod.id;
        myWalletViewModel.title = CardType[paymentMethod.creditCard.cardType];
        myWalletViewModel.reference = `xxxx xxxx xxxx ${cardLastFourDigits}`;
        myWalletViewModel.shortReference = `${cardLastFourDigits}`;
        myWalletViewModel.expiryDate = `${moment(expiryDate).format('MM/YY')}`;
        myWalletViewModel.expiryMonth = expiryDateMonth;
        myWalletViewModel.expiryYear = expiryDateYear;
        myWalletViewModel.directDebitContractAccounts = paymentMethod.directDebitContractAccounts ? paymentMethod.directDebitContractAccounts : [];
        myWalletViewModel.hasDirectDebitService = !!myWalletViewModel.directDebitContractAccounts.length;
        myWalletViewModel.oneTouchPayContractAccounts = paymentMethod.oneTouchPayContractAccounts ? paymentMethod.oneTouchPayContractAccounts : [];
        myWalletViewModel.hasSmsPayService = !!myWalletViewModel.oneTouchPayContractAccounts.length;

        if (paymentMethod.creditCard.cardType === CardType.Master) {
            myWalletViewModel.icon = 'icon-mastercard';
            myWalletViewModel.title = 'Mastercard';
        } else {
            myWalletViewModel.icon = 'icon-visa';
        }
        if (moment().diff(moment(expiryDate).subtract(1, 'month'), 'months') > 1) {
            myWalletViewModel.expired = true;
            myWalletViewModel.expirationState = ExpirationState.expired;
        }
        if (moment().diff(moment(expiryDate).subtract(1, 'month'), 'months') === 1 && !myWalletViewModel.expired) {
            myWalletViewModel.expiresSoon = true;
            myWalletViewModel.expirationState = ExpirationState.expiresSoon;
        }
        return myWalletViewModel;
    }

    private createBankAccountViewModel(paymentMethod: PaymentMethod) {
        let myWalletViewModel = new MyWalletViewModel();
        myWalletViewModel.isBankAccount = true;
        myWalletViewModel.paymentMethodType = 'bank account';
        myWalletViewModel.reference = `xxxx ${paymentMethod.bank.accountNumber.slice(-4)}`;
        myWalletViewModel.id = paymentMethod.id;
        myWalletViewModel.title = 'Bank account';
        myWalletViewModel.shortReference = `${paymentMethod.bank.accountNumber.slice(-4)}`;
        myWalletViewModel.directDebitContractAccounts = paymentMethod.directDebitContractAccounts ? paymentMethod.directDebitContractAccounts : [];
        myWalletViewModel.hasDirectDebitService = myWalletViewModel.directDebitContractAccounts.length > 0 ? true : false;
        myWalletViewModel.icon = 'icon-bank-two-tone';
        myWalletViewModel.oneTouchPayContractAccounts = paymentMethod.oneTouchPayContractAccounts ? paymentMethod.oneTouchPayContractAccounts : [];
        myWalletViewModel.hasSmsPayService = myWalletViewModel.oneTouchPayContractAccounts.length > 0 ? true : false;
        return myWalletViewModel;
    }
}

export class MyWalletViewModel {
    public isCreditCard: boolean;
    public isBankAccount: boolean;
    public paymentMethodType: string;
    public id: string;
    public title: string;
    public reference: string;
    public shortReference: string;
    public icon: string;
    public expiryDate: string;
    public expiryMonth: string;
    public expiryYear: string;
    public expired: boolean;
    public expiresSoon: boolean;
    public expirationState: ExpirationState = ExpirationState.valid;
    public validPaymentMethods: object[];
    public hasDirectDebitService: boolean;
    public directDebitContractAccounts: number[];
    public oneTouchPayContractAccounts: number[];
    public hasSmsPayService: boolean;
    public ccNumber: string;
}

export enum MyWalletPaymentMethodTypes {
    creditCard = <any> 'credit card',
    bankAccount = <any> 'bank account',
    paypal = <any> 'paypal'
}

export enum ExpirationState {
    valid = <any> 'valid',
    expiresSoon = <any> 'expires soon',
    expired = <any> 'expired'
}
