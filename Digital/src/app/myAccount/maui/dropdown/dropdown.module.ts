import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DropdownComponent } from './dropdown.component';
import { DropdownFunctionComponent } from './dropdownSelections/dropdownFunction.component';
import { DropdownOptionComponent } from './dropdownSelections/dropdownOption.component';

@NgModule({
    declarations: [
        DropdownComponent,
        DropdownOptionComponent,
        DropdownFunctionComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        DropdownComponent,
        DropdownOptionComponent,
        DropdownFunctionComponent
    ]
})
export class DropdownModule { }
