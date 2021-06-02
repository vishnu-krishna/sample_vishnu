import { Component } from '@angular/core';
import { InstalmentStatus, InstalmentProgressItem } from './exampleInstalmentProgressItem/instalmentProgressItem.model';

@Component({
    selector: 'agl-maui-showcase-progress-tracker',
    templateUrl: './showcaseProgressTracker.component.html',
    styleUrls: ['./showcaseProgressTracker.component.scss']
})

export class ShowcaseProgressTrackerComponent {
    public progressItems: InstalmentProgressItem[] = [
        new InstalmentProgressItem(11, new Date('2018-03-01'), InstalmentStatus.Paid),
        new InstalmentProgressItem(22, new Date('2018-02-20'), InstalmentStatus.Overdue),
        new InstalmentProgressItem(33, new Date('2018-03-05'), InstalmentStatus.Due),
        new InstalmentProgressItem(44, new Date('2018-03-20'), InstalmentStatus.Upcoming),
        new InstalmentProgressItem(55, new Date('2018-03-25'), InstalmentStatus.Upcoming),
        new InstalmentProgressItem(66, new Date('2018-03-30'), InstalmentStatus.Upcoming)
    ];
    public codeUsage: string = `
        <agl-maui-progress-tracker [progressItems]="progressItems">
            <ng-template let-progressItem>
                <agl-maui-vertical-progress-item [model]="progressItem.getModel()">
                    <div leftPane>
                        <agl-maui-instalment-left-pane [primaryMessage]="progressItem.getPane1().primaryMessage" [secondaryMessage]="progressItem.getPane1().secondaryMessage"
                            [isPrimaryMessageGrey]="progressItem.getPane1().isPrimaryMessageGrey">
                        </agl-maui-instalment-left-pane>
                    </div>
                    <div rightPane>
                        <agl-maui-instalment-right-pane [primaryMessageStatus]="progressItem.getPane2().primaryMessageStatus" [primaryMessageDueDate]="progressItem.getPane2().primaryMessageDueDate"
                            [secondaryMessage]="progressItem.getPane2().secondaryMessage" [tertiaryMessage]="progressItem.getPane2().tertiaryMessage"
                            [isPrimaryMessageGrey]="progressItem.getPane2().isPrimaryMessageGrey" [color]="progressItem.getModel().color">
                        </agl-maui-instalment-right-pane>
                    </div>
                </agl-maui-vertical-progress-item>
            </ng-template>
        </agl-maui-progress-tracker>
    `;
}
