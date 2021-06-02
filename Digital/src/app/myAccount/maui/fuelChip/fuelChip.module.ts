import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CommonPipesModule } from '../../modules/commonPipes.module';

import { FuelChipComponent } from './fuelChip.component';
import { FuelChipFooterComponent } from './fuelChipFooter/fuelChipFooter.component';
import { FuelChipMessageComponent } from './fuelChipMessage/fuelChipMessage.component';

@NgModule({
    declarations: [
        FuelChipComponent,
        FuelChipMessageComponent,
        FuelChipFooterComponent
    ],
    imports: [
        CommonModule,
        CommonPipesModule
    ],
    exports: [
        FuelChipComponent,
        FuelChipMessageComponent,
        FuelChipFooterComponent
    ]
})
export class MauiFuelChipModule { }
