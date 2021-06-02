import { Pipe, PipeTransform } from '@angular/core';
/*
 * Extracts the decimal place from a number/string.
 *
 * Usage:
 *   value | aglExtractBeforeDecimal
 * -or-
 *   new ExtractBeforeDecimalPipe().transform(<object>);
*/
@Pipe({ name: 'aglExtractBeforeDecimal' })

export class ExtractBeforeDecimalPipe implements PipeTransform {
  public transform(value: string, includeSign: boolean = true) {
    // Handle nothing coming in with a 0.
    let regex: RegExp = new RegExp('[^.]*');
    if (!value) {
      return 0;
    }
    if (!includeSign) {
      value = value.replace('-', '');
    }
    // Return the result.
    return value.match(regex)[0];
  }
}
