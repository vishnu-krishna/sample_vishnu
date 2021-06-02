import { Component, Input, HostBinding, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'agl-benefit-tile',
    templateUrl: './benefit-tile.component.html',
    styleUrls: ['./benefit-tile.component.scss']
})
export class BenefitTileComponent {
    @Input() public title = '';
    @Input() public description = '';
    @Input() public summary = '';
    @Input() public highlight = '';
    @Input() public cta = 'Find out more';
    @Input() public ctaURL = '';
    @Output() public benefitTileClick = new EventEmitter<boolean>();

    @HostBinding('class.dark-theme') @Input() public useDarkTheme = false;

    public openBenefitInAglRewards() {
        this.benefitTileClick.emit(true);
    }
}
