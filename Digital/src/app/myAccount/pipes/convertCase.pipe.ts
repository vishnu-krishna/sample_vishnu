import { Pipe, PipeTransform } from '@angular/core';
/*
 * Create snake case
 * Takes a string and converts it to snake case.
 * Usage:
 *   value | aglConvertCase
 * Example:
 *   {{ some name |  aglConvertCase}}
 *   formats to: same-name
*/
@Pipe({ name: 'aglConvertCase' })
export class ConvertCasePipe implements PipeTransform {
  public transform(value: string) {
    value.replace(/\s+/g, '-').toLowerCase();
    return value.replace(/\/+/g, '-');
  }
}
