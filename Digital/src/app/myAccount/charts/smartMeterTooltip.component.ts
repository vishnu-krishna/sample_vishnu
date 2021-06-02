import { Component, HostListener, Input } from '@angular/core';

@Component({
    selector: 'agl-smart-meter-tooltip',
    templateUrl: './smartMeterTooltip.component.html',
    styleUrls: ['./smartMeterTooltip.component.scss']
})

export class SmartMeterTooltipComponent {
    @Input() public projection: number;

    // Shows the tooltip.
    public loadToolTip() {
        this.showToolTip = true;
    }

    // Hides the tooltip.
    // tslint:disable-next-line:member-access
    @HostListener('focusout')
    @HostListener('mouseleave')
    public hide(): void {
        if (!this.showToolTip) {
            return;
        }
        this.showToolTip = false;
    }

    // tslint:disable-next-line:member-ordering
    public showToolTip: boolean;

}
