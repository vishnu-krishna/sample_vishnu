import { Component, Input } from '@angular/core';

@Component({
    selector: 'agl-payment-assistance-plan-instalments-left-pane',
    templateUrl: './leftPane.component.html',
    styleUrls: ['./leftPane.component.scss']
})
export class PaymentAssistancePlanInstalmentsLeftPaneComponent {
    @Input() public primaryMessage: string;
    @Input() public secondaryMessage: string;
    @Input() public isPrimaryMessageGrey: boolean;
}
