import { Component, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
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
 *  <agl-maui-tooltip [tooltipBody]="'Tooltip text which will appear in the popover'" [position]="'bottom'">
 *      <agl-maui-tooltip-icon>i</agl-maui-tooltip-icon>
 *  </agl-maui-tooltip>
 *
 *  The content inside of the <agl-maui-tooltip> tag will be the content within <ng-content>.
 *
 */
@Component({
    selector: 'agl-maui-tooltip',
    templateUrl: './tooltip.component.html',
    styleUrls: ['./tooltip.component.scss']
})

export class TooltipComponent implements OnInit {
    @ViewChild('tooltip') public tooltip: Element;
    @ViewChild('tooltipTrigger') public tooltipTrigger: Element;
    @Input() public tooltipBody: string = '';
    @Input() public position: string = 'top';

    // public tooltipClasses: string[] = [];
    public showTooltip: boolean;
    public countDownStarted: boolean;
    public rightAlign: boolean = false;
    public leftAlign: boolean = false;
    public positionClass: string;
    public tooltipTimer: any;

    public loadTooltip(tooltip: Element, tooltipTrigger: Element) {
        this.adjustTooltipPosition(tooltip, tooltipTrigger);
        this.showTooltip = true;
    }

    public ngOnInit() {
        // this.tooltipClasses.push('tooltip--' + this.size);
    }

    public removeVisibility(): void {
        if (!this.showTooltip) {
            return;
        }
        this.showTooltip = false;
    }

    @HostListener('focusout')
    @HostListener('mouseleave')
    public turnOffTooltip(): void {
        clearTimeout(this.tooltipTimer);
        this.removeVisibility();
    }

    @HostListener('touchend')
    public mobileLiftDelay(): void {
        clearTimeout(this.tooltipTimer);
        this.tooltipTimer = setTimeout(() => {
            this.removeVisibility();
        }, 2500);
    }

    /*
     * Check whether the tooltip will be cut off by the top or bottom edge of the screen and set variables accordingly
     * @param  {tooltip} the tooltip element
     * @param  {tooltipTrigger} the tooltip trigger element - usually an icon
     */
    private adjustTooltipPosition(tooltip: Element, tooltipTrigger: Element): void {
        this.positionClass = this.position;

        // only adjust vertical positions if vertically aligning i.e. top or bottom
        if (this.position === 'top' || this.position === 'bottom') {
            let height = tooltip.getBoundingClientRect().height;
            if (tooltipTrigger.getBoundingClientRect().top - height < 65) {
                this.positionClass = 'bottom';
            } else if (tooltipTrigger.getBoundingClientRect().bottom + height + 10 > window.innerHeight) {
                this.positionClass = 'top';
            }
        }

        this.setTooltipAlignment(tooltip, tooltipTrigger);
    }
    /*
     * Check whether the tooltip will be cut off by the right or left edge of the screen and set variables accordingly
     * @param  {tooltip} the tooltip element
     * @param  {tooltipTrigger} the tooltip trigger element - usually an icon
     */
    private setTooltipAlignment(tooltip: Element, tooltipTrigger: Element): void {
        let contentRect = tooltipTrigger.getBoundingClientRect();
        let tooltipRect = tooltip.getBoundingClientRect();
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
