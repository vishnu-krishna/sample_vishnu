import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
    name: 'aglFormatDateDayAbbreviatedMonth'
})

// Formats dates from string or date formats into 'DD MMM' format
// e.g. '2018-05-30' => '30 May'

export class FormatDateDayAbbreviatedMonthPipe implements PipeTransform {
    public transform(value: string | Date): string {
        return moment(value).format('DD MMM');
    }
}
