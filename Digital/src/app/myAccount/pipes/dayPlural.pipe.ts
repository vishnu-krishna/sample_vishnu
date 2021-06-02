import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'aglDayPlural' })

export class DayPluralPipe implements PipeTransform {
    public transform(numberOfdays: string): string {
        if (numberOfdays === undefined || numberOfdays === null) {
            return '';
        } else if ( +numberOfdays > 1) {
            return numberOfdays + ' days';
        } else if (+numberOfdays === 1) {
            return numberOfdays + ' day';
        }
    }
}
