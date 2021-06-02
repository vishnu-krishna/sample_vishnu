import { Injectable } from '@angular/core';
import { IDatePickerOptions, ILocales } from '../interfaces/index';

@Injectable()
export class LocaleService {
    private locales: ILocales = {
      'en' : {
          dayLabels: { su: 'Sun', mo: 'Mon', tu: 'Tue', we: 'Wed', th: 'Thu', fr: 'Fri', sa: 'Sat' },
          monthLabels: { 1: 'January', 2: 'Febuary', 3: 'March', 4: 'April', 5: 'May', 6: 'June', 7: 'July', 8: 'August', 9: 'September', 10: 'October', 11: 'November', 12: 'December' },
          dateFormat: 'yyyy-mm-dd',
          todayBtnTxt: 'Today',
          firstDayOfWeek: 'mo',
          sunHighlight: true,
      },
      'en-au' : {
          dayLabels: { su: 'Sun', mo: 'Mon', tu: 'Tue', we: 'Wed', th: 'Thu', fr: 'Fri', sa: 'Sat' },
          monthLabels: { 1: 'January', 2: 'Febuary', 3: 'March', 4: 'April', 5: 'May', 6: 'June', 7: 'July', 8: 'August', 9: 'September', 10: 'October', 11: 'November', 12: 'December' },
          dateFormat: 'yyyy-mm-dd',
          todayBtnTxt: 'Today',
          firstDayOfWeek: 'mo',
          sunHighlight: true,
      }
    };

    public getLocaleOptions(locale: string): IDatePickerOptions {
        if (locale && this.locales.hasOwnProperty(locale)) {
            // User given locale
            return this.locales[locale];
        }
        // Default: en
        return this.locales['en'];
    }
}
