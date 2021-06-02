import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MauiButtonModule } from '../button/button.module';
import { LightBoxComponent } from './lightBox.component';

@NgModule({
    declarations: [
        LightBoxComponent
    ],
    exports: [
        LightBoxComponent
    ],
    imports: [
        CommonModule,
        MauiButtonModule
    ]
})
export class MauiLightBoxModule { }
