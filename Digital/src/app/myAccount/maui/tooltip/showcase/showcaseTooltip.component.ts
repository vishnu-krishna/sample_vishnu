import { Component } from '@angular/core';

@Component({
    selector: 'agl-maui-showcase-tooltip',
    templateUrl: './showcaseTooltip.component.html',
    styleUrls: [
        './showcaseTooltip.component.scss'
    ]
})

export class ShowcaseTooltipComponent {

    public codeUsage: string = `
    <!-- Tooltip with an question mark icon trigger. Single quote character contained in text. -->
    <agl-maui-tooltip tooltipBody="I'm a tooltip, that's what I am. I give tips about tools, to placate the man.">
        <agl-maui-tooltip-icon>?</agl-maui-tooltip-icon>
    </agl-maui-tooltip>

    <!-- Tooltip with an i icon trigger bottom aligned. No single quote, so can hide tooltipBody attribute in html. -->
    <agl-maui-tooltip [tooltipBody]="'Another tooltip.'" [position]="'bottom'">
        <agl-maui-tooltip-icon>i</agl-maui-tooltip-icon>
    </agl-maui-tooltip>
    `;
}
