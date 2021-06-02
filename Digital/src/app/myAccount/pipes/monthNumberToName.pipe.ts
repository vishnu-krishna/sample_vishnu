import { Pipe, PipeTransform } from '@angular/core';
import { monthEnum } from '../../shared/constant/monthName';

@Pipe({
    name: 'aglMonthNumberToName'
})

export class MonthNumberToNamePipe implements PipeTransform {
    public transform(value: number): string {
        return monthEnum[ Number(value) ];
    }
}
