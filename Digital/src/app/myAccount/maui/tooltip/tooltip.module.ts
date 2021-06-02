import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TooltipComponent } from './tooltip.component';
import { TooltipIconComponent } from './tooltipIcon/tooltipIcon.component';

@NgModule({
    declarations: [
        TooltipComponent,
        TooltipIconComponent,
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        TooltipComponent,
        TooltipIconComponent
    ]
})
export class MauiTooltipModule {}
