import { Component, Input, OnInit } from '@angular/core';
import { Color } from '../../../../../../maui/progressTracker/progressItems/verticalProgressItem/verticalProgressItem.model';

@Component({
    selector: 'agl-payment-assistance-plan-instalments-right-pane',
    templateUrl: './rightPane.component.html',
    styleUrls: ['./rightPane.component.scss']
})

export class PaymentAssistancePlanInstalmentsRightPaneComponent implements OnInit {
    @Input() public primaryMessageStatus: string;
    @Input() public primaryMessageDueDate: string;
    @Input() public secondaryMessage: string;
    @Input() public tertiaryMessage: string;
    @Input() public color: Color;
    @Input() public isPrimaryMessageGrey: boolean;
    public isTertiaryMessageRed: boolean;
    public isTertiaryMessageGreen: boolean;

    public ngOnInit(): void {
        this.isTertiaryMessageRed = this.color === Color.Red;
        this.isTertiaryMessageGreen = this.color === Color.Green;
    }
}
