import { AbstractControl, Validators } from '@angular/forms';
import { CreditCard } from './creditCard.validators';

export class CreditCardValidator {
  public static validateCCNumber(control: AbstractControl): any {
    if (Validators.required(control) !== undefined && Validators.required(control) !== null) {
      return { ccNumber: false };
    }

    let num = control.value.toString().replace(/\s+|-/g, '');

    if (!/^\d+$/.test(num)) {
      return { ccNumber: false };
    }

    let card = CreditCard.cardFromNumber(num);
    let cardType = CreditCard.cardType(num);

    if (cardType !== 'visa' && cardType !== 'mastercard') {
      return { ccNumber: false };
    }

    if (!card) {
      return { ccNumber: false };
    }

    if (card.length.includes(num.length) && (card.luhn === false || CreditCard.luhnCheck(num))) {
      return null;
    }

    return { ccNumber: false };
  }

  public static validateExpDate(control: AbstractControl): any {
    if (Validators.required(control) !== undefined && Validators.required(control) !== null) {
      return { expDate: false };
    }

    if (typeof control.value !== 'undefined' && control.value.length >= 7) {
      let [month, year] = control.value.split(/[\s\/]+/, 2);
      let prefix;

      if ((year != null ? year.length : void 0) === 2 && /^\d+$/.test(year)) {
        prefix = new Date().getFullYear();
        prefix = prefix.toString().slice(0, 2);
        year = prefix + year;
      }
      month = parseInt(month, 10).toString();
      year  = parseInt(year, 10).toString();

      if (/^\d+$/.test(month) && /^\d+$/.test(year) && (month >= 1 && month <= 12)) {
        let currentTime;
        let expiry;
        expiry = new Date(year, month);
        currentTime = new Date();
        expiry.setMonth(expiry.getMonth() - 1);
        expiry.setMonth(expiry.getMonth() + 1, 1);

        if (expiry > currentTime) {
          return null;
        }
      }
    }

    return { expDate: false };

  }
}
