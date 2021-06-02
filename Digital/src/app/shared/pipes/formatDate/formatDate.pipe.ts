import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { DateFormat } from '../../globals/localisation';

/*
 * format a given string to a specififed date format.
 *
 * Usage:
 *   value | aglFormatDate:'<format to>':'<input format...default is ISO_8601>'
*/
@Pipe({
    name: 'aglFormatDate'
})

export class FormatDatePipe implements PipeTransform {
    public transform(value: string, formatTo: string, inputformat?: string): string {
        return moment(value, inputformat || DateFormat.IS0_8601).format(formatTo);
    }
}
