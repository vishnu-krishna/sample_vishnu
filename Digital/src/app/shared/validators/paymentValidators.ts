import { FormControl } from '@angular/forms';
import * as moment from 'moment';

export class PaymentValidators {

  public validateBsb = ((c: FormControl) => {
    let bsbRegEx = /^[0-9]{3}-?[0-9]{3}$/;

    return bsbRegEx.test(c.value) ? null : {
      validateBsb: false
    };
  });

  public validateDateAfter = ((c: FormControl) => {
    if (c.value === null || c.value === '') {
      return null;
    }
    return this.convertDate(c.value) ? null : {
      validateDateAfter: false
    };
  });

  /**
   * Validates a MM/YY range against the current date.
   *
   * @param {FormControl} group
   * @returns boolean
   *
   * @memberOf PaymentValidators
   */
  public validateCombinedDate(group: FormControl) {
      let month = group.value.creditCardExpiryDateMonth;
      let year = group.value.creditCardExpiryDateYear;

      let currentDate = `${month}/${year}`;
      let currentDateTo = moment(currentDate, 'MM/YYYY');

      let numberOfMonths = moment().diff(currentDateTo, 'months');

      if (numberOfMonths <= 0) {
          return null;
      } else {
          return {
              validateCombinedDate: true
          };
      }
  }

  private convertDate(data: string) {
    let expiryDateRegEx = /^(1[0-2]|0[1-9]|\d)\/(20\d{2}|19\d{2}|0(?!0)\d|[1-9]\d)$/;
    if (expiryDateRegEx.test(data == null ? null : data.toString())) {
        let mon = Number(data.split('/')[0]);
        let year = Number((Number(data.split('/')[1]) < 90) ? '20' + data.split('/')[1] : '19' + data.split('/')[1]);
        let date = new Date(year, mon, 0);
        return date.getTime() >= new Date().getTime();
    } else { return false; }
  }
}
