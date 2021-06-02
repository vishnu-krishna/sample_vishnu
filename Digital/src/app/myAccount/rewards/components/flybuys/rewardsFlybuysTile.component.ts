import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ButtonType } from '../../../maui/button/button.enum';
import { RewardsAnalytics } from '../../rewards-analytics';
import { RewardsFlybuysSummary } from '../../shared/rewards-flybuys-summary';
import { DLSCTATileModel } from '../ctaTile/dlsCtaTile.model';
import { DLSCTATileImageModel } from '../ctaTile/dlsCtaTileImage.model';
import { ButtonViewModel } from '../dls';

@Component({
    selector: 'agl-rewards-flybuys-tile',
    templateUrl: './rewardsFlybuysTile.component.html',
    styleUrls: ['./rewardsFlybuysTile.component.scss']
})
export class RewardsFlybuysTileComponent implements OnInit {
    /**
     * 'args' required to setup the rendering of the fly buys tile
     */
    @Input() public flybuysArgs: RewardsFlybuysSummary = new RewardsFlybuysSummary();
    @Input() public isSingleTile: boolean = false;

    public ctaTile: DLSCTATileModel;

    constructor(private router: Router, private analytics: RewardsAnalytics) {}

    public ngOnInit(): void {
        this.ctaTile = new DLSCTATileModel();
        this.ctaTile.button1 = new ButtonViewModel();
        this.ctaTile.button1.buttonText = 'view details';
        this.ctaTile.button1.buttonType = ButtonType.secondary;
        this.ctaTile.defaultImage.path = 'svg/flybuys.svg';
        this.ctaTile.defaultImage.style['margin-bottom'] = '-15px';
        this.ctaTile.horizontalImage = new DLSCTATileImageModel();
        this.ctaTile.horizontalImage.path = 'svg/flybuys.svg';
    }

    public ctaClick(event) {
        this.analytics.trackClickFlybuysViewDetails();
        this.router.navigateByUrl('rewards/flybuys');
    }
}
