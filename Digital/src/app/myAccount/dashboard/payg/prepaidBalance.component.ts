import { Component, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { PaygView } from '../../../shared/globals/paygView';
import { PrePaymentBalanceTopUpUrgency } from '../../../shared/globals/prePaymentBalanceTopUpUrgency';
import { PaygContentModel } from '../../../shared/model/domain/paygContent.model';
import { ContentService } from '../../../shared/service/content.service';
import { ContractViewModel } from '../../services/account.service';

/**
 * Bar chart component, use this componenet where a bar chart is required.
 *
 * @export
 * @class BarComponent
 * @implements {OnInit}
 */
@Component({
    selector: 'agl-prepaid-balance',
    templateUrl: './prepaidBalance.component.html',
    styleUrls: ['./prepaidBalance.component.scss'],
})

export class PrepaidBalanceComponent implements OnInit {
    @ViewChild('cents') public centsElement;
    @ViewChild('debitSymbol') public debitSymbolElement;
    @Input() public contract: ContractViewModel;
    @Input() public isDashboard: boolean;
    @Input() public page: string;

    public content: PaygContentModel;
    public paygView: PaygView;
    public PaygView = PaygView;
    public tooltipPositionLowered: boolean;
    public showTooltip: boolean;
    public toolTipHeader: string;
    public toolTipBody: string;
    public prepaidCredit: string;

    constructor(
        private _contentService: ContentService) {
    }

    @HostListener('window:resize')
    public onResize() {
        if (this.showTooltip && this.debitSymbolElement !== undefined) {
            this.tooltipPositionLowered = this.centsElement.nativeElement.offsetTop !== this.debitSymbolElement.nativeElement.offsetTop;
        }
    }

    public ngOnInit() {
        this._contentService.getContent().subscribe((result) => {
            if (result.selfService !== undefined &&
                result.selfService.payg !== undefined) {
                this.content = result.selfService.payg;
            }
        });
        this.getPaygView();
        this.showTooltip = this.isDashboard && this.contract.estimatedReads;
        if (this.contract.prepaidCharges) {
            this.prepaidCredit = this.contract.prepaidCredit ? 'CR' : '';
            this.toolTipBody = `Since switching to Prepaid you've used $${this.contract.prepaidCharges.toFixed(2)} worth of energy. We'll deduct this from your prepaid balance once you top up.`;
        }
    }

    private getPaygView() {
        if (this.contract.paygBand === PrePaymentBalanceTopUpUrgency.Unavailable) {
            this.paygView = PaygView.Unavailable;
        } else if (this.contract.paygBalance < 0) {
            this.paygView = PaygView.DebitBalance;
        } else if (this.contract.paygBand === PrePaymentBalanceTopUpUrgency.Medium) {
            this.paygView = PaygView.LowBalance;
        } else {
            this.paygView = PaygView.HighBalance;
        }
    }
}
