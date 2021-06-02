import { Component, Input, OnInit } from '@angular/core';
import { SetUpBillSmoothingResultMessage } from '../../../../../shared/messages/setUpBillSmoothingResultMessage';
import { DataLayerService, ModalName, PageChannel, PageType, SiteSubSection } from '../../../../../shared/service/dataLayer.service';
import { ModalService } from '../../../../modal/modal.service';
import { BillDeliveryMethodType } from '../../../../services/settings/model/billDeliveryMethodType';
import { BillSmoothingService } from '../billSmoothing.service';

@Component({
    selector: 'agl-billsmoothing-setup-successful',
    templateUrl: './billSmoothingSetupSuccessful.component.html',
    styleUrls: ['./billSmoothingSetupSuccessful.component.scss']
})
export class BillSmoothingSetupSuccessfulComponent implements OnInit {

    @Input() public billDeliveryMethodType: BillDeliveryMethodType;
    @Input() public isDirectDebit: boolean;
    @Input() public setUpBillSmoothingResultMessage: SetUpBillSmoothingResultMessage;
    @Input() public accountNumber: number;
    public firstRow: string;
    public secondRow: string;
    public fuelAndErrors: string[];

    constructor(
        public modalService: ModalService,
        public billSmoothingService: BillSmoothingService,
        public dataLayerService: DataLayerService
    ) { }

    public ngOnInit() {
        let frequency = this.setUpBillSmoothingResultMessage.frequency;
        let startDate = BillSmoothingService.generateLongDate(this.setUpBillSmoothingResultMessage.startDate);
        let billDeliveryMethod = this.billDeliveryMethodType === BillDeliveryMethodType.Email ? 'email' : 'letter';

        let fuelSuccessfullySaved = this.setUpBillSmoothingResultMessage.saveResultDetails.filter((detail) => detail.isSuccessful);
        let fuelNotSuccessfullySaved = this.setUpBillSmoothingResultMessage.saveResultDetails.filter((detail) => !detail.isSuccessful);
        let fuelAndAmounts = fuelSuccessfullySaved.map((detail) => `$${detail.amount} for ${detail.fuel}`);
        this.fuelAndErrors = fuelNotSuccessfullySaved.map((detail) => detail.fuel);
        this.fuelAndErrors.forEach((fuelAndError) => {
            let errorDescription = `Sorry, we couldn't set up Bill Smoothing for ${fuelAndError}.`;
            this.dataLayerService.pushInlineErrorEvent(ModalName.BillSmoothingSuccessSetup, errorDescription);
        });

        this.firstRow = `You\'ll receive your Bill Smoothing welcome pack and confirmation ${billDeliveryMethod}.`;
        this.secondRow = this.isDirectDebit
            ? `We'll debit your ${frequency.toLowerCase()} payments of ${fuelAndAmounts.join(' and ')} from your nominated account starting <strong>${startDate}</strong>.`
            : `${frequency} payments of ${fuelAndAmounts.join(' and ')} will be due starting <strong>${startDate}</strong>.`;

        this.dataLayerService.pushNewPageEvent(
            ModalName.BillSmoothingSuccessSetup,
            PageChannel.ManageAccount,
            PageType.Modal,
            SiteSubSection.BillSmoothing,
            [this.accountNumber.toString()]);
    }

    public close() {
        this.modalService.close();
        BillSmoothingService.showLeanEngageSurveyOnSuccessfulSetup();
    }
}
