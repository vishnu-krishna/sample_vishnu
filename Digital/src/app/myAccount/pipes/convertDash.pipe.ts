import { Pipe, PipeTransform } from '@angular/core';
/*
 * Takes a string and replaces dashes with a spaces.
 * Usage:
 *   value | aglConvertDashToSpace
 * Example:
 *   {{ some-name |  aglConvertDashToSpace}}
 *   formats to: same name
*/
@Pipe({ name: 'aglConvertDashToSpace' })
export class ConvertDashToSpace implements PipeTransform {
  public transform(value: string) {
    return value.replace(/-/g, ' ').toLowerCase();
  }
}
