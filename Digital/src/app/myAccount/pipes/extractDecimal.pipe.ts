import { Pipe, PipeTransform } from '@angular/core';
/*
 * Extracts the decimal place from a number/string.
 *
 * Usage:
 *   value | aglExtractDecimal
 * -or-
 *   new ExtractDecimalPipe().transform(<object>);
*/
@Pipe({ name: 'aglExtractDecimal' })

export class ExtractDecimalPipe implements PipeTransform {
  public transform(value) {
    // Handle nothing coming in with a 0.
    if (!value) {
      return 0;
    }
    let regex = new RegExp('.([0-9]+)$');
    // Return the result.
    return value.match(regex)[0];
  }
}
