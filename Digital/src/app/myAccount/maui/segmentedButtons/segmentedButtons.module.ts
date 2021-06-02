import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SegmentedButtonComponent } from './segmentedButton/segmentedButton.component';
import { SegmentedButtonsComponent } from './segmentedButtons.component';

@NgModule({
    declarations: [
        SegmentedButtonsComponent,
        SegmentedButtonComponent
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        SegmentedButtonsComponent,
        SegmentedButtonComponent
    ]
})
export class SegmentedButtonsModule {}
