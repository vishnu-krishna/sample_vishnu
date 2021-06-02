import { Component, HostListener, Input, OnInit, ViewChild } from '@angular/core';
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
    selector: 'agl-white-tooltip',
    templateUrl: './tooltipWhite.component.html',
    styleUrls: ['./tooltipWhite.component.scss']
})

export class ToolTipWhiteComponent implements OnInit {
    @ViewChild('tooltipDiv') public tooltipDiv;
    @ViewChild('tooltipTrigger') public tooltipTrigger;
    @Input() public tooltipHtml: string = '';
    @Input() public tooltipHeader: string = '';
    // small, medium or large - size determines the width of the tooltip.  Text will wrap with a fixed width.
    @Input() public size: string = 'medium';
    // top, bottom - position determines where the tooltip will be placed relative to the icon (or whatever is in ng-content).
    @Input() public position: string = 'top';
    // Use this to add a class to the popup.  The class must be added to agltheme.scss or the tooltip won't find it.
    @Input() public popupClass: string = '';
    @Input() public pendingDate: string;

    public tooltipClasses: string[] = [];
    public showToolTip: boolean;
    public rightAlign: boolean = false;
    public leftAlign: boolean = false;
    public positionClass: string;

    // Shows the tooltip.
    public loadToolTip(tooltipDiv, tooltipTrigger) {
        this.adjustTooltipPosition(tooltipDiv, tooltipTrigger);
        this.showToolTip = true;
    }

    public ngOnInit() {
        this.tooltipClasses.push('tt-' + this.size);
        if (this.popupClass !== '') {
            this.tooltipClasses.push(this.popupClass);
        }
    }
    @HostListener('focusout')
    @HostListener('mouseleave')
    public hide(): void {
        if (!this.showToolTip) {
            return;
        }
        this.showToolTip = false;
    }
    /*
     * Check whether the tooltip will be cut off by the top or bottom edge of the screen and set variables accordingly
     * @param  {tooltipDiv} the tooltip element
     * @param  {tooltipTrigger} the tooltip trigger element - usually an icon
     */
    private adjustTooltipPosition(tooltipDiv, tooltipTrigger) {
        this.positionClass = this.position;

        // only adjust vertical positions if vertically aligning i.e. top or bottom
        if (this.position === 'top' || this.position === 'bottom') {
            let height = tooltipDiv.getBoundingClientRect().height;
            if (tooltipTrigger.getBoundingClientRect().top - height < 65) {
                this.positionClass = 'bottom';
            } else if (tooltipTrigger.getBoundingClientRect().bottom + height + 10 > window.innerHeight) {
                this.positionClass = 'top';
            }
        }

        this.setTooltipAlignment(tooltipDiv, tooltipTrigger);
    }
    /*
     * Check whether the tooltip will be cut off by the right or left edge of the screen and set variables accordingly
     * @param  {tooltipDiv} the tooltip element
     * @param  {tooltipTrigger} the tooltip trigger element - usually an icon
     */
    private setTooltipAlignment(tooltipDiv, tooltipTrigger) {
        let contentRect = tooltipTrigger.getBoundingClientRect();
        let tooltipRect = tooltipDiv.getBoundingClientRect();
        // get the centre point of the icon/content
        let contentCentre = contentRect.left + (contentRect.width / 2);
        // get the far right point of the tooltip by adding the centre point of the icon with half the size of the tooltip
        let tooltipRight = contentCentre + (tooltipRect.width / 2);
        this.rightAlign = tooltipRight > window.innerWidth;
        // get the far left point of the tooltip by subtracting the centre point of the icon with half the size of the tooltip
        let tooltipLeft = contentCentre - (tooltipRect.width / 2);
        this.leftAlign = tooltipLeft < 0;
    }
}
