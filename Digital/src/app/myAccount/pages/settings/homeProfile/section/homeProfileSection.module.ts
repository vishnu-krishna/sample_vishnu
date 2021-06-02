import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomeProfileSectionComponent } from './homeProfileSection.component';

@NgModule({
    declarations: [
        HomeProfileSectionComponent,
    ],
    imports: [
        RouterModule,
        CommonModule
    ],
    exports: [
        HomeProfileSectionComponent
    ]
})
export class HomeProfileSectionModule { }
