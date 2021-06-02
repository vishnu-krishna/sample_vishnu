import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomeProfileSummaryComponent } from './homeProfileSummary.component';

@NgModule({
    declarations: [
        HomeProfileSummaryComponent,
    ],
    imports: [
        RouterModule,
        CommonModule
    ],
    exports: [
        HomeProfileSummaryComponent
    ]
})
export class HomeProfileSummaryModule { }
