import { Pipe, PipeTransform } from '@angular/core';
/*
 * Converts pipes in address to comma and space.
 * Takes a string and finds all pipes in address, replacing it with a comma and space.
 * Usage:
 *   value | aglAddressFormatter
 * Example:
 *   {{ 53 Dennis Street|Northcote VIC 3070 |  aglAddressFormatter}}
 *   formats to: 53 Dennis Street, Northcote VIC 3070
*/
@Pipe({ name: 'aglAddressFormatter' })
export class AddressFormatterPipe implements PipeTransform {
    public transform(address) {
        const formattedAddress = !address ? '' : address
            .replace(/(\|)/g, ', ')
            .replace(/\s\s+/g, ' ')
            .toLowerCase()
            .split(' ')
            .map((word) => {
                return word.replace(word[0], word[0].toUpperCase());
            })
            .join(' ')
            .replace(/([a-z]{3})\s+\d{4}$/i, (v) => v.toUpperCase());
        return formattedAddress;
    }
}
