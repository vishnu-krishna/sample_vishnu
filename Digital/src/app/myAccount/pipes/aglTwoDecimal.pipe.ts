import { Pipe, PipeTransform } from '@angular/core';
/*
 * Display two decimal place for a float number if value is less than 1.
 *
 * Usage:
 *   value | aglTwoDecimalPipe
 * -or-
 *   new aglTwoDecimalPipe().transform(<object>);
*/
@Pipe({ name: 'aglTwoDecimalPipe' })

export class AglTwoDecimalPipe implements PipeTransform {
  public transform(value) {
    // If value less than 1 and greater than 0
    if (value > 0 && value < 1) {
        return value.toFixed(2);
    }
    return value;
  }
}
