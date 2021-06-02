import { Pipe, PipeTransform } from '@angular/core';
/*
 * Add spaces between strings.
 * Takes a string and add spaces in between, primarily for Contract Account numbers.
 * Usage:
 *   value | aglAddSpaces
 * Example:
 *   {{ 1234567890 |  aglConvertCase}}
 *   formats to: 1234 567 890
*/
@Pipe({ name: 'aglAddSpaces' })
export class AddSpacesPipe implements PipeTransform {
    public transform(value) {
        if (value) { // Check for value before continuing
            let stringValue = value.toString();
            if (stringValue.length === 8) {
                return stringValue.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim();
            } else if (stringValue.length === 10) {
                return stringValue.replace(/[^\dA-Z]/g, '').replace(/(.{4})(.{3})(.*)/g, '$1 $2 $3').trim();
            } else {
                return stringValue.replace(/[^\dA-Z]/g, '').replace(/(.{3})/g, '$1 ').trim();
            }
        }
    }
}
