import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { ModalService } from '../../../modal/modal.service';
import {
    BillSmoothingAccountModel,
    BillSmoothingFuelDisplayModel
} from './billSmoothing.model';
import { BillSmoothingService } from './billSmoothing.service';

import { BillSmoothingLearnMoreComponent } from '../../../../shared/component/billSmoothingLearnMore/billSmoothingLearnMore.component';
import { SetUpBillSmoothingResultMessage } from '../../../../shared/messages/setUpBillSmoothingResultMessage';
import { IMessageBusService } from '../../../../shared/service/contract/imessageBus.service';
import { DataLayerService } from '../../../../shared/service/dataLayer.service';

@Component({
    selector: 'agl-settings-billsmoothing',
    templateUrl: './billSmoothing.component.html',
    styleUrls: ['./billSmoothing.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class BillSmoothingComponent implements OnInit {
    public accountModels: BillSmoothingAccountModel[] = [];

    public hasMultiAccount: boolean = false;
    public fuelInformation: BillSmoothingFuelDisplayModel[];
    public loading: boolean = true;

    constructor(
        public billSmoothingService: BillSmoothingService,
        private modalService: ModalService,
        private messageBusService: IMessageBusService,
        private dataLayerService: DataLayerService
    ) { }

    public ngOnInit() {
        this.messageBusListener();
        this.generateView();
    }

    public generateView() {
        // The flag turns on the functions to hide chat buttons and alter alert messages to reduce workload of call centre.
        this.billSmoothingService.turnOnChangesToReduceWorkloadOfCallCentre = true;

        this.billSmoothingService.generateBillSmoothingViewModel()
            .map((accountModels: BillSmoothingAccountModel[]) => {
                this.billSmoothingService.updateChatButtonsToReduceWorkloadOfCallCentre(accountModels);

                this.billSmoothingService.removeButtonLinesForLivePersonIntegration(accountModels);

                return accountModels;
            })
            .finally(() => {
                this.loading = false;
            }).subscribe(
                (accounts: BillSmoothingAccountModel[]) => {
                    this.accountModels = accounts;
                    if (accounts.length > 1) { this.hasMultiAccount = true; }
                },
                (error) => {
                    console.error('An error occurred retrieving payment methods from the estimates service.', error);
                }
            );
    }

    public openLearnMoreModal() {
        this.modalService.activate({
            title: '',
            message: '',
            cancelText: '',
            okText: '',
            modalType: 'component',
            component: BillSmoothingLearnMoreComponent,
            fullScreen: true
        });
    }

    private messageBusListener() {
        this.messageBusService.listen(SetUpBillSmoothingResultMessage).subscribe(
            (result) => {
                this.generateView();
            },
            (error) => {
                console.error('An error occurred', error);
            }
        );
    }
}
