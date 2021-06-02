import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RadioButtonComponent } from './radioButton/radioButton.component';
import { RadioButtonGroupComponent } from './radioButtonGroup.component';

@NgModule({
    declarations: [
        RadioButtonGroupComponent,
        RadioButtonComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        RadioButtonGroupComponent,
        RadioButtonComponent
    ]
})

export class MauiRadioButtonGroupModule {}
