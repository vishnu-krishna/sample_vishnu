import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerComponent } from './date-picker.component';
import { FocusDirective } from './directives/date-picker.focus.directive';
import { InputAutoFillDirective } from './directives/date-picker.input.auto.fill.directive';

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [DatePickerComponent, FocusDirective, InputAutoFillDirective],
    exports: [DatePickerComponent, FocusDirective, InputAutoFillDirective]
})
export class DatePickerModule {
}
