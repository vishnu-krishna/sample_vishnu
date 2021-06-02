import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import maxBy from 'lodash-es/maxBy';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/Rx';
import { PrePaymentBalanceTopUpUrgency } from '../../../shared/globals/prePaymentBalanceTopUpUrgency';
import { PaymentAmountView, PaymentView } from '../../globals/paygConstants';
import { PaymentMethodName } from '../../globals/paygConstants';
import { PaymentViewMessage } from '../../messages/paymentView.message';
import { BonusBand } from '../../model/payment/bonusBand.model';
import { BonusEligible } from '../../model/payment/bonusEligible.model';
import { PaymentContentModel } from '../../model/payment/paymentContent.model';
import { PaymentDetails } from '../../model/payment/paymentDetails.model';
import { ApiService } from '../../service/api.service';
import { IMessageBusService } from '../../service/contract/imessageBus.service';

import { Subscription } from 'rxjs/Subscription';
import { Guid } from '../../utils/guid';

@Component({
    selector: 'agl-payment-amount',
    templateUrl: './paymentAmount.component.html',
    styleUrls: ['./paymentAmount.component.scss']
})
export class PaymentAmountComponent implements OnInit {
    @Output() public onUpdateAmount = new EventEmitter<{ amount: number; valid: boolean }>();
    @Input() public selectedMethod: string = '';
    @Input() public savedMethod: any;
    @Input() public content: PaymentContentModel;
    @Input() public paymentDetails: PaymentDetails;
    @Input() public bonusBands: BonusBand[];

    public form: FormGroup;
    public bonusAmount = new ReplaySubject<string>(1);
    public bonus: string = '0';
    public paymentAmount: number = 0;
    public PaymentAmountView = PaymentAmountView;
    public currentView: PaymentAmountView = PaymentAmountView.Default;
    public showBonuses: boolean = false;
    public addBonusAmount: number = 0;
    public topUpAmount: string = '';
    public addAmountForBonus: boolean = false;
    public bonusBandsSorted: BonusBand[] = [];
    public hasBonusBandError: boolean = false;
    public prepaidBalanceUnavailable: boolean = false;
    public bonusRequests: BonusRequest[] = [] ;
    public bonusMessageHasBeenDisplayed: boolean = false;
    public showBonusTopUp: boolean = false;
    public isLoading: boolean = false;
    public isBonusBandException: boolean = false;
    protected subscriptions: Subscription[] = [];

    constructor(
        private _messageBusService: IMessageBusService,
        private _api: ApiService) {
    }

    public ngOnInit() {
        this.form = new FormGroup({
            amount: new FormControl(this.paymentDetails.amount, this.validateAmount)
        });
        if (this.paymentDetails.isPayg) {
            this.prepaidBalanceUnavailable = this.paymentDetails.paygBand === PrePaymentBalanceTopUpUrgency.Unavailable;
            if (this.bonusBands.length === 0) {
                this.hasBonusBandError = true;
            }
            if (this.prepaidBalanceUnavailable ||
                this.paymentDetails.paygBand === PrePaymentBalanceTopUpUrgency.High || this.paymentDetails.showOutstandingBillPayg) {
                Object.assign(this.bonusBandsSorted, this.bonusBands);
                this.bonusBandsSorted.sort((a, b) => {
                    return a.upperBand > b.upperBand ? a.upperBand : b.upperBand;
                });
            }
            if (this.paymentDetails.showOutstandingBillPayg) {
                this.currentView = PaymentAmountView.PAYGFreeText;
            }
        }
        this.bonusAmount.subscribe((bonus) => {
            this.bonus = bonus;
        });
    }

    public validateAmount = (control) => {
        let valid = false;

        if (this.selectedMethod === '' || this.selectedMethod === null) {
            return null;
        } else {
            switch (this.selectedMethod) {
                case PaymentMethodName.CreditCard:
                    valid = control.value >= 10 && control.value <= 100000;
                    break;
                case PaymentMethodName.PayPal:
                    valid = control.value >= 10 && control.value <= 10000;
                    break;
                default:
                    valid = control.value >= 10 && control.value <= 100000;
                    break;
            }
            this.onUpdateAmount.emit({ amount: control.value, valid: valid });
        }
        return valid ? null : {
            validateAmount: {
                valid: false
            }
        };
    }

    /*
     * Change the value to two decimal places.
     * @param  {object} event Event from the front-end
     * @return {number}       Number decimal placed 10.00
     */
    public onBlurNumberTwoDecimalInput(event) {
        let input = event.target;
        let inputValue = input.value;
        let inputValueDecimal: number = 0;
        this.showBonusTopUp = false;

        // If the value is blank, then do this.
        if (inputValue !== '') {
            inputValueDecimal = parseFloat(inputValue);
        }

        input.value = inputValueDecimal.toFixed(2);
        if (inputValueDecimal > 0) {
            if (this.currentView === PaymentAmountView.PAYGFreeText) {
                if (!this.bonusMessageHasBeenDisplayed) {
                    this.getAddBonusAmount(input.value);
                }
            }
        }
    }

    public gotoBonus() {
        this._messageBusService.broadcast(new PaymentViewMessage(PaymentView.PAYGBonusSelect));
    }

    public setAmount(amount: number) {
        this.paymentAmount = amount;
        this.getBonusValue(amount).subscribe((value) => {
            if (!this.isLoading) {
            this.bonusAmount.next(value.toFixed(0));
            }
        });
    }

    public onKeyup(event) {
        if (this.currentView === PaymentAmountView.PAYGFreeText) {
            let bonusRequest = new BonusRequest();
            bonusRequest.id = Guid.newGuid();
            bonusRequest.timestamp = new Date().getTime();
            this.bonusRequests.push(bonusRequest);
            this.getBonusValue(event.target.value).subscribe((bonus) => {
                if (this.isMostRecentBonusRequest(bonusRequest.id)) {
                    this.bonusAmount.next(bonus.toFixed(0));
                }
            });
        }
    }

    public isPaypalMaxInvalid(): boolean {
        if (this.selectedMethod === PaymentMethodName.PayPal
            && this.form.controls['amount'].touched
            && !this.form.controls['amount'].valid
            && this.form.controls['amount'].value > 10000) {
            return true;
        }

        return false;
    }

    public isDefaultEntryInvalid(): boolean {
        if (this.selectedMethod !== PaymentMethodName.PayPal
            && this.form.controls['amount'].touched
            && !this.form.controls['amount'].valid
            && this.form.controls['amount'].value > 100000) {
            return true;
        }

        return false;
    }

    public isMinAmountInvalid(): boolean {
        if (this.selectedMethod !== null
            && !this.form.controls['amount'].valid) {
            if (this.form.controls['amount'].value < 10 ||
                this.form.controls['amount'].value === '') {
                return true;
            }
        }
        return false;
    }

    /**
     * Function to add the amount to the input value when the user clicks the Add bonus {{amount}} link.
     */
    public addBonus() {
        this.form.patchValue({ amount: this.topUpAmount + '.00' });
        this.bonusAmount.next(this.addBonusAmount.toString());
        this.showBonusTopUp = false;
    }

    /**
     * Function to determine whether the bonus error should be displayed
     */
    public showBonusError() {
        return (!this.prepaidBalanceUnavailable &&
            (this.paymentDetails.isPayg
                && this.paymentDetails.paygBand !== PrePaymentBalanceTopUpUrgency.High
                && this.hasBonusBandError));
    }

    public showDebitDescription() {
        return (this.currentView === PaymentAmountView.PAYGDebit &&
            !this.prepaidBalanceUnavailable);
    }

    public getBonusUnavailableContent() {
        if (this.isBonusBandException) {
            return `Top up now and we'll make sure any bonus you are eligible for is added to your account.`;
        } else {
            return `Top up as usual and we'll make sure any bonus you are eligible for is added to your account.`;
        }
    }

    private getBonusValue(value: any): Observable<number> {
        let bonusBand: BonusBand;
        return new Observable((observer) => {
            if (value === '' || isNaN(value)) {
                observer.next(0);
                observer.complete();
            } else {
                let amount = parseFloat(value);
                if (this.paymentDetails.showOutstandingBillPayg && amount >= 10) {
                    this.isLoading = true;
                    setTimeout(() => {
                        this._api.getBonusEligible(this.paymentDetails.contractNumber, amount).subscribe((bonusEligible: BonusEligible) => {
                            this.isLoading = false;
                            let bonus: number = 0;
                            if (bonusEligible && bonusEligible.isEligible) {
                                bonus = bonusEligible.currentBonusLevel.bonus;
                                this.isBonusBandException = false;
                            } else if (!bonusEligible) {
                                this.isBonusBandException = true;
                            }
                            observer.next(bonus);
                            observer.complete();
                        },
                        (err) => {
                            observer.error(err);
                            console.error('ERROR: apiService.getBonusEligible()', err);
                        });
                        }, 2000);
                    } else {
                    if (this.bonusBands.length > 0) {
                        bonusBand = this.bonusBands.find((x) => {
                            return amount >= x.lowerBand && amount <= x.upperBand;
                        });
                    }
                    if (bonusBand) {
                        observer.next(bonusBand.bonus);
                        observer.complete();
                    } else {
                        observer.next(0);
                        observer.complete();
                    }
                }
            }
        });
    }

    private isMostRecentBonusRequest(id: string): boolean {
        if (this.bonusRequests !== null) {
            let maxBonus = maxBy(this.bonusRequests, (value) => {
                return value.timestamp;
            });

            return maxBonus.id === id;
        }

        return false;
    }

    /**
     * Function to calculate the amount to be added to get a bonus.
     * @param  {number} value
     * @returns number
     */
    private getAddBonusAmount(value: number) {
        this.topUpAmount = '';
        if (value < 10 || this.bonusBands === undefined || this.bonusBands.length === 0) {
            return;
        }
        this.addBonusAmount = 0;
        let bandFound: boolean;

        if (value < this.bonusBands[0].lowerBand) {
            bandFound = true;
        }
        for (let bonusBand of this.bonusBands) {
            // if the bandindex is >=0 it means that we have found the band that the value is in
            // so we then need to get the next band above it where the bonus is greater than 0
            if (bandFound) {
                if (bonusBand.bonus > 0) {
                    this.topUpAmount = bonusBand.lowerBand.toFixed(0);
                    this.addBonusAmount = bonusBand.bonus;
                    this.showBonusTopUp = true;
                    this.bonusMessageHasBeenDisplayed = true;
                    break;
                }
                // if the bandIndex has not been found then we need to find the band that the value is in
            } else if (value >= bonusBand.lowerBand && value <= bonusBand.upperBand) {
                bandFound = true;
            }
        }
    }
}
export class BonusRequest {
    public id: string;
    public timestamp: number;
}
