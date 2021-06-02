import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { PrePaymentBalanceTopUpUrgency } from '../../../../../shared/globals/prePaymentBalanceTopUpUrgency';
import { PaygContentModel } from '../../../../../shared/model/domain/paygContent.model';
import { ContentService } from '../../../../../shared/service/content.service';
import { ContractViewModel, IAccountServiceMA } from '../../../../services/account.service';
import { BillPanelComponent, BillTypes } from '../billPanel.component';

@Component({
    selector: 'agl-bill-message-panel-payg',
    templateUrl: './billMessagePanelPayg.component.html',
    styleUrls: ['./billMessagePanelPayg.component.scss']
})
export class BillMessagePanelPaygComponent implements OnInit {

    @Input() public type: BillTypes;
    @Input() public contract: ContractViewModel;
    @Input() public hideContextMessage;

    public noBalance: boolean = true;
    public svgIconPayg: string;
    public contextualMessageHeader: string;
    public contextualMessage: string;
    public content: PaygContentModel;
    public PrePaymentBalanceTopUpUrgency: PrePaymentBalanceTopUpUrgency;
    public showDDMessage: boolean = false;
    public firstPrepaymentDueDate: string;

    constructor(
        private _billPanelComponent: BillPanelComponent,
        private _accountService: IAccountServiceMA,
        private _contentService: ContentService
    ) { }

    public ngOnInit() {
        this._contentService.getContent().subscribe((result) => {
            if (result.selfService !== undefined &&
                result.selfService.payg !== undefined) {
                this.content = result.selfService.payg;
            }
        });

        if (this.type.directDebit) {
            this.showDDMessage = true;
        }

        switch (this.contract.paygBand) {
            case PrePaymentBalanceTopUpUrgency.High:
                if (this.type.hasDebit || this.type.overdue || this.type.newBillAndOverdue) {
                    this.noBalance = false;
                }
                if (this.type.noBills || this.contract.paygPrepaymentEligibile) {
                    this.noBalance = true;
                }
                this.svgIconPayg = 'icon-low-graph';
                break;
            case PrePaymentBalanceTopUpUrgency.Medium:
                this.svgIconPayg = 'icon-thermometer';
                break;
            case PrePaymentBalanceTopUpUrgency.Low:
                this.svgIconPayg = 'icon-tick-in-box';
                break;
            case PrePaymentBalanceTopUpUrgency.Unavailable:
                this.svgIconPayg = 'icon-warning';
                // if unvailable don't show the dd message.
                this.showDDMessage = false;
                break;
            default:
                break;

        }

        this.contextualMessageHeader = this.content.contextualMessageHeader[PrePaymentBalanceTopUpUrgency[this.contract.paygBand]];
        this.contextualMessage = this.content.contextualMessageContent[PrePaymentBalanceTopUpUrgency[this.contract.paygBand]];
        if (this.contract.paygPrepaymentEligibile) {
            this.contextualMessageHeader = `Top up by ${this.longDate(moment(this.contract.paygPrepaymentEligibile))} to maximise your first bonus credit.`;
            this.contextualMessage = 'To get the best value out of your plan, keep your account topped up and in credit.';
        }

        this.firstPrepaymentDueDate = this.longDate(moment(this.contract.paygPrepaymentEligibile));

    }

    public longDate(date: moment.Moment | Date): string {
        return moment(date).format('DD MMM');
    }
}
