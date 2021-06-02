import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpandableContainerComponent } from './expandableContainer.component';
import { ChevronMenuComponent } from '../chevronMenu/chevronMenu.component';
import { MauiChevronMenuModule } from '../chevronMenu';

@NgModule({
    declarations: [
        ExpandableContainerComponent,
    ],
    imports: [
        CommonModule,
        MauiChevronMenuModule
    ],
    exports: [
        ExpandableContainerComponent
    ]
})
export class MauiExpandableContainerModule { }
