import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from '../../../../modal/modal.service';
import { BillSmoothingSetupModalComponent } from '../billSmoothingSetupModal/billSmoothingSetupModal.component';

import { AccountDetailComponentModel } from '../../../../../myAccount/settings/accountDetail/accountDetail.component';
import { SetUpBillSmoothingResultMessage } from '../../../../../shared/messages/setUpBillSmoothingResultMessage';
import { IMessageBusService } from '../../../../../shared/service/contract/imessageBus.service';
import { BillSmoothingService } from '../billSmoothing.service';

@Component({
    selector: 'agl-billsmoothing-setup-button',
    templateUrl: './billSmoothingSetupButton.component.html',
    styleUrls: ['./billSmoothingSetupButton.component.scss']
})
export class BillSmoothingSetupButtonComponent implements OnInit {
    @Input() public hasMultiAccount: boolean;
    @Input() public accountInformation: AccountDetailComponentModel;
    @Input() public fuelInformation;

    private setupSuccessful: boolean;

    constructor(
        private modalService: ModalService,
        private messageBusService: IMessageBusService
    ) {}

    public ngOnInit() {
        this.messageBusListener();
    }

    public setupBillSmoothing() {
        const comp = this;
        this.modalService.activate({
            title: '',
            message: '',
            cancelText: '',
            okText: '',
            modalType: 'component',
            component: BillSmoothingSetupModalComponent,
            componentData: [this.hasMultiAccount, this.accountInformation, this.fuelInformation],
            fullScreen: true
        })
        .then((isPositive: boolean) => {
            if (!isPositive && comp.setupSuccessful) {
                comp.setupSuccessful = false;
                BillSmoothingService.showLeanEngageSurveyOnSuccessfulSetup();
            }
        });
    }

    private messageBusListener() {
        this.setupSuccessful = false;
        this.messageBusService.listen(SetUpBillSmoothingResultMessage).subscribe(
            (result) => {
                this.setupSuccessful = true;
            }
        );
    }
}
