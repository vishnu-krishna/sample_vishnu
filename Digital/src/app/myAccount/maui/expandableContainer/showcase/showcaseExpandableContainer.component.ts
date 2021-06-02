import { Component } from '@angular/core';

@Component({
    selector: 'agl-maui-showcase-expandable-container',
    templateUrl: './showcaseExpandableContainer.component.html',
    styleUrls: ['./showcaseExpandableContainer.component.scss']
})

export class ShowcaseExpandableContainerComponent {
    public collapsedHeightForCollapsedContainer: number = 110;
    public expandedHeightForCollapsedContainer: number = 220;
    public gradientHeightForCollapsedContainer: number = 64;

    public codeUsage: string = `
        <agl-maui-expandable-container
            [collapsedHeight]="410"
            [gradientHeight]="64"
            [collapsedMessage]="'Show more'"
            [expandedMessage]="'Show less'">
            <!-- Your content -->
        </agl-maui-expandable-container>
    `;
}
