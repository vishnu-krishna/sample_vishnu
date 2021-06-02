import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { GenericErrorImageComponent } from './genericErrorImage.component';

@NgModule({
    imports: [
        MatIconModule
    ],
    declarations: [
        GenericErrorImageComponent
    ],
    exports: [
        GenericErrorImageComponent
    ]
})
export class GenericErrorImageModule { }
