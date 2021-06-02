import { Component, Input } from '@angular/core';
/*
 * Tooltip Component
 *
 * @export
 * @class TooltipComponent
 * This tooltip will appear
 * for desktop: when a user hovers over the content within <ng-content>
 * for mobile: when a user clicks on the content within <ng-content>
 *
 * typical usage:
 *
 * <agl-tooltip [tooltipHtml]="'Tooltip text which will appear in the popover'" [size]="'medium'" [position]="'bottom'">
        <img class="agltooltip-icon" src="svg/icon_info_tooltip.svg"  />
    </agl-tooltip>

    The content inside of the <agl-tooltip> tag will be the content within <ng-content>.  In this case it's an image of an icon.

 */
@Component({
    selector: 'agl-usage-tooltip',
    templateUrl: './usageTooltip.component.html',
    styleUrls: ['./usageTooltip.component.scss']
})

export class UsageTooltipComponent {

    @Input() public tooltipHtml: string = '';
    @Input() public tooltipHeader: string = '';
    // small, medium or large - size determines the width of the tooltip.  Text will wrap with a fixed width.
    @Input() public size: string = 'medium';
    // top, bottom, right or left - position determines where the tooltip will be placed relative to the icon (or whatever is in ng-content).
    @Input() public position: string = 'top';
    @Input() public secondaryIconColour: boolean = false;

    public getIconSource() {
        if (this.secondaryIconColour) {
            return 'svg/icon_info_tooltip_blue.svg';
        } else {
            return 'svg/icon_info_tooltip.svg';
        }
    }

}
