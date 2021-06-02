import { CommonModule }                   from '@angular/common';
import { NgModule }                       from '@angular/core';

// All pipes
import { AddressFormatterPipe }     from '../pipes/addressFormatter.pipe';
import { AddSpacesPipe }            from '../pipes/addSpaces.pipe';
import { BooleanToYesNo } from '../pipes/booleanToYesNo.pipe';
import { AglCurrencyPipe } from '../pipes/aglCurrency.pipe';
import { ConvertCasePipe }          from '../pipes/convertCase.pipe';
import { ConvertDashToSpace }          from '../pipes/convertDash.pipe';
import { DayPluralPipe }            from '../pipes/dayPlural.pipe';
import { DefinitionCheckPipe }      from '../pipes/definitionCheck.pipe';
import { ExtractBeforeDecimalPipe } from '../pipes/extractBeforeDecimal.pipe';
import { ExtractDecimalPipe }       from '../pipes/extractDecimal.pipe';
import { FormatDatePipe }           from '../pipes/formatDate.pipe';
import { FormatDateDayMonthPipe }          from '../pipes/formatDateDayMonth.pipe';
import { FormatDateDayAbbreviatedMonthPipe } from '../pipes/formatDateDayAbbreviatedMonth.pipe';
import { MonthNumberToNamePipe }    from '../pipes/monthNumberToName.pipe';
import { SafeHtmlPipe }             from '../pipes/safeHtml.pipe';
import { AglTwoDecimalPipe }        from '../pipes/aglTwoDecimal.pipe';
import { FormatDateDayMonthYearPipe } from '../pipes/formatDateDayMonthYear.pipe';

@NgModule({
  declarations: [
        AddSpacesPipe,
        ConvertCasePipe,
        ConvertDashToSpace,
        DefinitionCheckPipe,
        ExtractBeforeDecimalPipe,
        ExtractDecimalPipe,
        SafeHtmlPipe,
        MonthNumberToNamePipe,
        DayPluralPipe,
        AddressFormatterPipe,
        FormatDatePipe,
        FormatDateDayMonthPipe,
        BooleanToYesNo,
        AglCurrencyPipe,
        AglTwoDecimalPipe,
        FormatDateDayAbbreviatedMonthPipe,
        FormatDateDayMonthYearPipe
  ],
  exports: [
        AddSpacesPipe,
        ConvertCasePipe,
        ConvertDashToSpace,
        DefinitionCheckPipe,
        ExtractBeforeDecimalPipe,
        ExtractDecimalPipe,
        SafeHtmlPipe,
        MonthNumberToNamePipe,
        DayPluralPipe,
        AddressFormatterPipe,
        FormatDatePipe,
        FormatDateDayMonthPipe,
        BooleanToYesNo,
        AglCurrencyPipe,
        AglTwoDecimalPipe,
        FormatDateDayAbbreviatedMonthPipe,
        FormatDateDayMonthYearPipe
  ],
  imports: [
        CommonModule
  ],
  providers: [
  ]
})
export class CommonPipesModule { }
