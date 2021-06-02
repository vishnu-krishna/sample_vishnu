import { Component, OnInit } from '@angular/core';
import { AccountDetailComponentModel } from '../../../../../myAccount/settings/accountDetail/accountDetail.component';
import { SetUpBillSmoothingResultMessage } from '../../../../../shared/messages/setUpBillSmoothingResultMessage';
import { IMessageBusService } from '../../../../../shared/service/contract/imessageBus.service';
import { DataLayerService, ModalName, PageChannel, PageType, SiteSubSection } from '../../../../../shared/service/dataLayer.service';
import { ModalService } from '../../../../modal/modal.service';
import { BillDeliveryMethodType } from '../../../../services/settings/model/billDeliveryMethodType';
import { BillSmoothingFuelDisplayModel } from '../billSmoothing.model';
import { BillSmoothingService } from '../billSmoothing.service';

@Component({
    selector: 'agl-billsmoothing-setup-modal',
    templateUrl: './billSmoothingSetupModal.component.html',
    styleUrls: ['./billSmoothingSetupModal.component.scss']
})
export class BillSmoothingSetupModalComponent implements OnInit {
    public args;

    public address: string;
    public hasMultiAccount: boolean;
    public acctInfo: AccountDetailComponentModel;
    public fuelInfo: BillSmoothingFuelDisplayModel[];
    public hasGasFuel: boolean;
    public hasElecFuel: boolean;
    public displayRadioButtons: boolean;
    public fuelTypes = [];
    public selectedValue: BillSmoothingFuelDisplayModel[] = [];

    public setupSuccessful: boolean = false;
    public billDeliveryMethodType: BillDeliveryMethodType;
    public setUpBillSmoothingResultMessage: SetUpBillSmoothingResultMessage;

    constructor(
        public billSmoothingService: BillSmoothingService,
        public modalService: ModalService,
        public messageBusService: IMessageBusService,
        public dataLayerService: DataLayerService
    ) { }

    public ngOnInit() {
        this.generateModalView();
        this.generateFuelSelector();
        this.messageBusListener();
        this.billDeliveryMethodType = this.fuelInfo[0].billDeliveryMethod;
        this.dataLayerService.pushNewPageEvent(
            ModalName.BillSmoothingSetup,
            PageChannel.ManageAccount,
            PageType.Modal,
            SiteSubSection.BillSmoothing,
            [this.acctInfo.contractAccountNumber]
        );
    }

    public isSelected(fuelType: BillSmoothingFuelDisplayModel[]): boolean {
        if (fuelType.map((elem) => elem.contractNumber ).join('-') === this.selectedValue.map((elem) => elem.contractNumber ).join('-')) {
            return true;
        }
        return false;
    }

    public generateEstimates(fuelInfo: BillSmoothingFuelDisplayModel[]) {
        this.selectedValue = fuelInfo;
    }

    public generateModalView() {
        this.args = [].concat.apply([], this.args);
        this.hasMultiAccount = this.args.shift();
        this.acctInfo = this.args.shift();
        this.fuelInfo = this.args;
        this.address = this.acctInfo.supplyAddresses.length > 1 ? 'and associated addresses' : this.acctInfo.supplyAddresses[0];
    }

    public generateFuelSelector() {
        if (this.isOneELecAndOneGas()) {
            this.displayRadioButtons = true;
            this.fuelTypes.push(
                {
                    value: [this.fuelInfo[0], this.fuelInfo[1]],
                    viewValue: 'Electricity and Gas'
                },
                {
                    value: [this.fuelInfo[0]],
                    viewValue: this.fuelInfo[0].fuel
                },
                {
                    value: [this.fuelInfo[1]],
                    viewValue: this.fuelInfo[1].fuel
                });
            this.selectedValue = [this.fuelInfo[0], this.fuelInfo[1]];
        } else {
            this.selectedValue = [this.fuelInfo[0]];
        }
    }

    public isOneELecAndOneGas(): boolean {
        return this.fuelInfo.length === 2 && this.fuelInfo[0].fuel !== this.fuelInfo[1].fuel;
    }

    public messageBusListener() {
        this.messageBusService.listen(SetUpBillSmoothingResultMessage).subscribe(
            (result) => {
                this.setUpBillSmoothingResultMessage = result;
                this.setupSuccessful = true;
            },
            (error) => {
                console.error('An error occurred', error);
            }
        );
    }
}
