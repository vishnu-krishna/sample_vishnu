import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RewardsAnalytics } from '../../rewards-analytics';
import { RewardsDiscountSummary } from '../../shared/rewards-discount-summary';
import { DLSCTATileModel } from '../ctaTile/dlsCtaTile.model';
import { ButtonViewModel } from '../dls';

import { DateFormat } from '../../../../shared/globals/localisation';
import { ButtonType } from '../../../maui/button/button.enum';
import { DLSCTATileImageModel } from '../ctaTile/dlsCtaTileImage.model';

@Component({
    selector: 'agl-rewards-discount-tile',
    templateUrl: './rewardsDiscountTile.component.html',
    styleUrls: ['./rewardsDiscountTile.component.scss']
})
export class RewardsDiscountTileComponent implements OnInit {
    /**
     * 'args' required to setup the rendering of the discount tile
     */
    @Input() public discountArgs: RewardsDiscountSummary = new RewardsDiscountSummary();
    @Input() public isSingleTile: boolean = false;

    public ctaTile: DLSCTATileModel;
    public startDateFormatted: string;
    public DateFormat: any = DateFormat;

    constructor(private router: Router, private analytics: RewardsAnalytics) {}

    public ngOnInit(): void {
        this.ctaTile = new DLSCTATileModel();
        this.ctaTile.button1 = new ButtonViewModel();
        this.ctaTile.button1.buttonText = 'learn more';
        this.ctaTile.button1.buttonType = ButtonType.secondary;
        this.ctaTile.defaultImage.path = 'svg/piggy-bank.svg';
        this.ctaTile.horizontalImage = new DLSCTATileImageModel();
        this.ctaTile.horizontalImage.path = 'svg/piggy-bank.svg';
        this.ctaTile.horizontalImage.style.height = '100px';
        this.ctaTile.horizontalImage.style.width = '130px';
    }

    public ctaClick(event) {
        this.analytics.trackClickDiscountsLearnMore();
        this.router.navigateByUrl('rewards/discounts');
    }
}
