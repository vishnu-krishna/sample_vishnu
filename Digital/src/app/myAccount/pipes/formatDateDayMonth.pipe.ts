import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
    name: 'aglFormatDateDayMonth'
})

// This was created as the angular date pipe to show the date as like 10 September or 9 June. It will not show year

export class FormatDateDayMonthPipe implements PipeTransform {
    public transform(value: string): string {
        return moment(value).format('D MMMM');
    }
}
