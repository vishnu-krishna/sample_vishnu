import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CheckboxGroupComponent } from './checkboxGroup.component';
import { MauiCheckboxModule } from '../checkbox';

@NgModule({
    declarations: [
        CheckboxGroupComponent
    ],
    imports: [
        CommonModule,
        MauiCheckboxModule
    ],
    exports: [
        CheckboxGroupComponent
    ]
})
export class MauiCheckboxGroupModule { }
