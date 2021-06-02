import { Component, Input, ContentChild, TemplateRef, OnInit } from '@angular/core';
import { VerticalProgressItemComponent } from './progressItems/verticalProgressItem/verticalProgressItem.component';
import { ProgressItem } from './progressTracker.model';

@Component({
    selector: 'agl-maui-progress-tracker',
    templateUrl: './progressTracker.component.html',
    styleUrls: ['./progressTracker.component.scss']
})
export class ProgressTrackerComponent implements OnInit {
    @Input() public progressItems: ProgressItem[];
    // it can be extended to have more possible templates, e.g. @ContentChild(TemplateRef) templateRef: TemplateRef<VerticalProgressItemComponent | HorizontalProgressItemComponent>;
    @ContentChild(TemplateRef) templateRef: TemplateRef<VerticalProgressItemComponent>;

    public ngOnInit(): void {
        const lastIndex = this.progressItems.length - 1;
        this.progressItems.forEach((item: ProgressItem, index: number) => {
            const isLast = index === lastIndex;
            item.initialise(index, isLast);
        });
    }
}
