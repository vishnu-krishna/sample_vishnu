import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
    name: 'aglFormatDate'
})

// This was created as the angular date pipe was giving a period after the 3 letter month ie MMM  =  Jun.

export class FormatDatePipe implements PipeTransform {
    public transform(value: string | Date): string {
        return moment(value).format('ddd DD MMM YYYY');
    }
}
