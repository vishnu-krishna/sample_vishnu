import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TermsAndConditionsComponent } from './termsAndConditions.component';

@NgModule({
    declarations: [
        TermsAndConditionsComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        TermsAndConditionsComponent
    ]
})
export class MauiTermsAndConditionsModule {}
