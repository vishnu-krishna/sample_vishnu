import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IconListComponent } from './iconList.component';
import { IconListItemComponent } from './iconListItem/iconListItem.component';

@NgModule({
    declarations: [
        IconListComponent,
        IconListItemComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        IconListComponent,
        IconListItemComponent
    ]
})

export class MauiIconListModule { }
