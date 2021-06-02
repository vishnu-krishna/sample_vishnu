import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AccountViewModel } from '../../../../myAccount/services/account.service';
import { IDecisioningService } from '../../../../myAccount/services/contract/idecisioning.service';
import { ApiService } from '../../../service/api.service';

@Component({
    selector: 'agl-payment-smspay-banner',
    templateUrl: './paymentSmsPayBanner.component.html',
    styleUrls: ['./paymentSmsPayBanner.component.scss']
})
export class PaymentSmsPayBannerComponent implements OnInit {
    @Input() public accounts: AccountViewModel[];
    @Output() public setupSmsPayEvent: EventEmitter<boolean> = new EventEmitter();

    public accountNumberSmsPayPanel: object;
    public showSmsPayPanel: boolean;

    constructor(
        private apiService: ApiService,
        private router: Router,
        public decisioningService: IDecisioningService
    ) { }

    public ngOnInit() {
        this.decisioningService.checkSmsPayBannerVisibility(true)
        .subscribe (
            (showSmsPayBannerResult: boolean) => {
               this.showSmsPayPanel = showSmsPayBannerResult;
        });
    }

    public onClickSetupSmsPay() {
        // When the modal closes, it navigates back.
        // Pushing the smspay url onto the history here prevents this back navigation from returning to overview page.
        this.router.navigate(['/settings/smspay']).then(() => {
            window.history.pushState(window.history.state, window.document.title, window.location.href);
            this.setupSmsPayEvent.emit(true);
        });
    }

}
