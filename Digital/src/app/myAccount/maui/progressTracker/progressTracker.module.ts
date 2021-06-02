import { NgModule } from '@angular/core';
import { ProgressTrackerComponent } from './progressTracker.component';
import { VerticalProgressItemComponent } from './progressItems/verticalProgressItem/verticalProgressItem.component';
import { CommonModule } from '@angular/common';
import { InstalmentLeftPaneComponent } from './showcase/exampleInstalmentProgressItem/instalmentLeftPane/instalmentLeftPane.component';
import { InstalmentRightPaneComponent } from './showcase/exampleInstalmentProgressItem/instalmentRightPane/instalmentRightPane.component';

@NgModule({
    declarations: [
        ProgressTrackerComponent,
        VerticalProgressItemComponent,
        InstalmentLeftPaneComponent,
        InstalmentRightPaneComponent,
    ],
    imports: [
        CommonModule
    ],
    exports: [
        ProgressTrackerComponent,
        VerticalProgressItemComponent,
        InstalmentLeftPaneComponent,
        InstalmentRightPaneComponent,
    ]
})
export class MauiProgressTrackerModule { }
