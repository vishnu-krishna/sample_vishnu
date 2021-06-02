import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Locale } from '../../shared/globals/localisation';

@Pipe({ name: 'aglCurrency' })
export class AglCurrencyPipe implements PipeTransform {
    private currencyPipe = new CurrencyPipe(Locale.DEFAULT);

    public transform(value: number) {
        return this.currencyPipe.transform(value, 'AUD', 'symbol-narrow', '1.2-2');
    }
}
