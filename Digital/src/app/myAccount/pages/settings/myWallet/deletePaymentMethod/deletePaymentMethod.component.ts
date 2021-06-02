import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ModalService } from '../../../../../myAccount/modal/modal.service';
import { IPaymentMethodsService } from '../../../../../myAccount/services/settings/paymentMethods.service.interface';
import { DeleteCreditCardResult } from '../../../../../shared/messages/deleteCreditCardResult.message';
import { DeletePaymentMethodLinkPaymentArrangementResult } from '../../../../../shared/messages/deletePaymentMethodLinkPaymentArrangementResult.message';
import { IMessageBusService } from '../../../../../shared/service/contract/imessageBus.service';
import { NumberOfPaymentMethodsExists,  PaymentArrangementType } from '../../../../common/enums';
import { IModalComponent } from '../../../../modal/modal-loader.directive';
import { IAccountServiceMA } from '../../../../services/account.service';
import { MyWalletViewModel } from '../myWallet.service';
import { IMyWalletService } from '../myWallet.service.interface';

@Component({
    selector: 'agl-delete-payment-method',
    templateUrl: './deletePaymentMethod.component.html',
    styleUrls: ['./deletePaymentMethod.component.scss']

})
export class DeletePaymentMethodComponent implements OnInit, IModalComponent {

    public args: MyWalletViewModel;
    public validPaymentMethods: MyWalletViewModel[];
    public hasMultipleCA: boolean = false;
    public hasOnePaymentArrangement: boolean = false;
    public hasDirectDebit: boolean;
    public hasSmsPay: boolean;
    public hasPendingPayment: boolean = false;
    public paymentArrangementText: string;
    public NumberOfPaymentMethodsExists: typeof NumberOfPaymentMethodsExists = NumberOfPaymentMethodsExists; // This is to make enum visible in the html
    public numberOfPaymentMethodsExists: NumberOfPaymentMethodsExists;

    public isLoading: boolean;
    public hasSelectedOptions: boolean;
    public paymentMethodId: string;
    public newPaymentMethodId: string;
    public updatePaymentArrangement: boolean = false;
    public removePaymentArrangement: boolean = false;
    public showOtherPaymentMethods: boolean = false;
    public accountDetails: MyWalletAccountDetailsModel[];
    public newCreditCardSelected: boolean;

    constructor(
        private _accountService: IAccountServiceMA,
        private _paymentMethodsService: IPaymentMethodsService,
        private _myWalletService: IMyWalletService,
        private _modalService: ModalService,
        private _messageBusService: IMessageBusService,
        private _deleteCreditCardResult: DeleteCreditCardResult,
        private _deletePaymentMethodLinkPaymentArrangementResult: DeletePaymentMethodLinkPaymentArrangementResult
    ) { }

    public ngOnInit() {
        this.paymentMethodId = this.args.id;
        this.getValidPaymentMethods();
        this.getAccountDetails();
        this.setPendingPaymentFlag();
        this.getPaymentArrangementDetails(this.args);
    }

    public getPaymentArrangementDetails(paymentMethod: MyWalletViewModel) {
        if (paymentMethod) {
            if (paymentMethod.directDebitContractAccounts.length && paymentMethod.oneTouchPayContractAccounts.length) {
                this.hasDirectDebit = true;
                this.hasSmsPay = true;
                this.paymentArrangementText = `direct debit and sms pay`;
            } else if (paymentMethod.directDebitContractAccounts.length > 0) {
                this.hasDirectDebit = true;
                this.paymentArrangementText = `direct debit`;
            } else if (paymentMethod.oneTouchPayContractAccounts.length > 0) {
                this.hasSmsPay = true;
                this.paymentArrangementText = `sms pay`;
            }

            let numberOfPaymentArrangements = this.args.directDebitContractAccounts.length +  this.args.oneTouchPayContractAccounts.length;
            // boolean to set the plural wording
            if (numberOfPaymentArrangements > 1) {
                this.hasOnePaymentArrangement = false;
            } else if (numberOfPaymentArrangements === 1) {
                this.hasOnePaymentArrangement = true;
            }
        }
    }

    public getValidPaymentMethods() {
        this._myWalletService.getStoredPaymentMethods().subscribe(
            (paymentMethods) => {
                this.validPaymentMethods = this._myWalletService.getValidPaymentMethods(paymentMethods, this.args);
                this.setDeleteScenario();
            },
            (error) => {
                console.error('An error occurred retrieving payment methods from the PaymentMethods service.', error);
            }
        );
    }

    public onClickLink(paymentMethodId?: string) {
        this.enableButtons();
        this.getNewPaymentMethodId(paymentMethodId);
    }

    public onClickCancel(paymentMethodId?: string) {
        this.enableButtons();
        this.newCreditCardSelected = false;
        this.getOldPaymentMethodId(paymentMethodId);
    }

    public enableButtons() {
        this.hasSelectedOptions = true;
    }

    public getOldPaymentMethodId(paymentMethodId?: string) {
        this.paymentMethodId = paymentMethodId;
        this.removePaymentArrangement = true;
        this.showOtherPaymentMethods = false;
    }

    public getNewPaymentMethodId(paymentMethodId?: string) {
        this.enableButtons();
        this.updatePaymentArrangement = true;
        this.newCreditCardSelected = this.validPaymentMethods.some( (paymentMethod) => ( paymentMethod.id === paymentMethodId && paymentMethod.isCreditCard ));
        if (paymentMethodId) {
            this.newPaymentMethodId = paymentMethodId;
        }
    }

    public showDropDownMenu() {
        this.showOtherPaymentMethods = true;
        this.removePaymentArrangement = false;
    }

    public closeModal() {
        this._modalService.close();
    }

    public deleteCreditCard(paymentMethodId: string) { // TODO: maybe add paymentArrangementType to work with SmsPay also
        this.isLoading = true;

        // Delete old payment method
        this._paymentMethodsService.deletePaymentMethod(paymentMethodId).subscribe(
            (data) => {
                this._deleteCreditCardResult.isSuccessful = true;
                this._deleteCreditCardResult.creditCardNumber = this.args.shortReference;
                this._deleteCreditCardResult.creditCardType = this.args.title;
                this._accountService.refreshAccounts();

                // Attach payment arrangement to another payment method.
                if (this.updatePaymentArrangement && !this.removePaymentArrangement) {
                    let paymentMethodRequests = new Array<Observable<any>>();

                    this.args.directDebitContractAccounts.map((directDebitCA) => {
                        paymentMethodRequests.push(this._paymentMethodsService.attachPaymentArrangementToPaymentMethod(this.newPaymentMethodId, directDebitCA, PaymentArrangementType.DirectDebit));
                    });
                    this.args.oneTouchPayContractAccounts.map((smsPayCA) => {
                        paymentMethodRequests.push(this._paymentMethodsService.attachPaymentArrangementToPaymentMethod(this.newPaymentMethodId, smsPayCA, PaymentArrangementType.SmsPay));
                    });

                    Observable.forkJoin(paymentMethodRequests).subscribe(
                        (res) => {
                            this._deletePaymentMethodLinkPaymentArrangementResult.isSuccessful = true;
                            this.setDeletePaymentMethodResults();
                        },
                        (err) => {
                            console.error('Error within the attachPaymentArrangementToPaymentMethod method', err);
                            this._deletePaymentMethodLinkPaymentArrangementResult.isSuccessful = false;
                            this.setDeletePaymentMethodResults();
                        }
                    );
                } else {
                    this._deleteCreditCardResult.isSuccessful = true;
                    this._messageBusService.broadcast(this._deleteCreditCardResult);
                    this._modalService.close();
                }
            },
            (error) => {
                console.error('Error within the deleteCreditCard method', error);
                this._deleteCreditCardResult.isSuccessful = false;
                this._messageBusService.broadcast(this._deleteCreditCardResult);
                this._modalService.close();
            }
        );
    }

    // When I wrote this, only God and I understood what I was doing
    // Now, God only knows
    public getAccountDetails() {
        this.accountDetails = [];

        this._accountService.getAccounts().subscribe((contractAccounts) => {

            // >1 contract account
            if (contractAccounts.length > 1) {

                this.hasMultipleCA = true;
                let contractAccount = contractAccounts.filter((ca) =>
                                            (this.args.directDebitContractAccounts.includes(+ca.accountNumber) ||
                                            this.args.oneTouchPayContractAccounts.includes(+ca.accountNumber)));

                contractAccount.map((ca) => {
                    // If CA has a grouped address
                    let myWalletAccountDetails = new MyWalletAccountDetailsModel();
                    myWalletAccountDetails.isDirectDebit = this.args.directDebitContractAccounts.includes(+ca.accountNumber);
                    myWalletAccountDetails.isSmsPay = this.args.oneTouchPayContractAccounts.includes(+ca.accountNumber);

                    if (ca.groupedAddress) {
                        myWalletAccountDetails.accountNumber = ca.accountNumber;
                        myWalletAccountDetails.address = ca.groupedAddress;

                        for (let c of ca.contracts) {
                            if (c.fuelType === 'Electricity') {
                                myWalletAccountDetails.electricityFuel.push(1);
                            }
                            if (c.fuelType === 'Gas') {
                                myWalletAccountDetails.gasFuel.push(1);
                            }
                        }
                        this.accountDetails.push(myWalletAccountDetails);
                    }

                    // If CA has no grouped address
                    if (!ca.groupedAddress) {
                        let isAccountWithMultipleContracts = ca.contracts.length > 1;
                        let isAccountWithSingleContract = ca.contracts.length <= 1;

                        if (isAccountWithMultipleContracts) {
                            myWalletAccountDetails.accountNumber = ca.accountNumber;
                            myWalletAccountDetails.address = `and associated addresses`;
                            for (let c of ca.contracts) {
                                if (c.fuelType === 'Electricity') {
                                    myWalletAccountDetails.electricityFuel.push(1);
                                }
                                if (c.fuelType === 'Gas') {
                                    myWalletAccountDetails.gasFuel.push(1);
                                }
                            }
                            this.accountDetails.push(myWalletAccountDetails);
                        }

                        if (isAccountWithSingleContract) {
                            for (let c of ca.contracts) {

                                myWalletAccountDetails.accountNumber = c.accountNumber;
                                myWalletAccountDetails.address = c.address;
                                if (c.fuelType === 'Electricity') {
                                    myWalletAccountDetails.electricityFuel.push(1);
                                }
                                if (c.fuelType === 'Gas') {
                                    myWalletAccountDetails.gasFuel.push(1);
                                }
                                this.accountDetails.push(myWalletAccountDetails);
                            }
                        }
                    }
                });
            }
        });
    }

    private setDeleteScenario() {
        let numberOfPaymentMethodsStored = this.validPaymentMethods.length;
        if (numberOfPaymentMethodsStored < 1) {
            this.numberOfPaymentMethodsExists = NumberOfPaymentMethodsExists.NoOtherValidPaymentMethodExists;
        } else if (numberOfPaymentMethodsStored === 1) {
            this.numberOfPaymentMethodsExists = NumberOfPaymentMethodsExists.OneOtherValidPaymentMethodExists;
        } else if (numberOfPaymentMethodsStored > 1) {
            this.numberOfPaymentMethodsExists = NumberOfPaymentMethodsExists.MultipleValidPaymentMethodExists;
        }
    }

    private setPendingPaymentFlag() {
        this._myWalletService.checkPendingPayments().subscribe((pendingPayment) => {
            this.hasPendingPayment = pendingPayment;
        });
    }

    private setDeletePaymentMethodResults() {
        this._deletePaymentMethodLinkPaymentArrangementResult.oldPaymentMethodNumber = this.args.shortReference;
        this._deletePaymentMethodLinkPaymentArrangementResult.oldPaymentMethodType = this.args.title;
        this._paymentMethodsService.getPaymentMethods().subscribe((paymentMethods) => {
            let newPaymentMethodDetails = paymentMethods.find((pm) => pm.id === this.newPaymentMethodId);
            if (!!newPaymentMethodDetails.creditCard) {
                let newCreditCardType = newPaymentMethodDetails.creditCard.cardType.toString();
                let newCreditCardNumber = newPaymentMethodDetails.creditCard.creditCardReference.match(/(\d{4})(?!.*\d)/g).toString();
                this._deletePaymentMethodLinkPaymentArrangementResult.newPaymentMethodType = newCreditCardType === 'Master' ? 'Mastercard' : newCreditCardType;
                this._deletePaymentMethodLinkPaymentArrangementResult.newPaymentMethodNumber = newCreditCardNumber;
            } else if (!!newPaymentMethodDetails.bank) {
                this._deletePaymentMethodLinkPaymentArrangementResult.newPaymentMethodType = 'Bank account';
                this._deletePaymentMethodLinkPaymentArrangementResult.newPaymentMethodNumber = newPaymentMethodDetails.bank.accountNumber.slice(-4);
            }
            this._messageBusService.broadcast(this._deletePaymentMethodLinkPaymentArrangementResult);
            this._modalService.close();
        });
    }
}

export class MyWalletAccountDetailsModel {
    public address: string;
    public electricityFuel: number[] = [];
    public gasFuel: number[] = [];
    public accountNumber: string;
    public isDirectDebit: boolean;
    public isSmsPay: boolean;
}
