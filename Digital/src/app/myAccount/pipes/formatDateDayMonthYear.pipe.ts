import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
    name: 'aglFormatDateDayMonthYear'
})

// Formats dates from string or date formats into 'DD MMM YYYY' format
// e.g. '2018-05-30' => '30 May 2018'

export class FormatDateDayMonthYearPipe implements PipeTransform {
    public transform(value: string | Date): string {
        return moment(value).format('DD MMM YYYY');
    }
}
