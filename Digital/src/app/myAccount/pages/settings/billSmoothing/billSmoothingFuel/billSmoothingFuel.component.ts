import { Component, Input, OnInit } from '@angular/core';
import { PaymentService } from '../../../../services/payment.service';
import { BillSmoothingFrequency, BillSmoothingFuelDisplayModel } from '../billSmoothing.model';
import { BillSmoothingService } from '../billSmoothing.service';

@Component({
    selector: 'agl-billsmoothing-fuel',
    templateUrl: './billSmoothingFuel.component.html',
    styleUrls: ['./billSmoothingFuel.component.scss']
})
export class BillSmoothingFuelComponent implements OnInit {
    @Input() public fuelInformation: BillSmoothingFuelDisplayModel;
    @Input() public hasDuplicateFuels: boolean;

    public fortnightlyPayment: string;
    public nextPaymentAmount: number;
    public nextPaymentDate: string;
    public previousPaymentAmount: number;
    public previousPaymentDate: string;
    public isWeeklyPayment: boolean;
    public isFortnightlyPayment: boolean;
    public isMonthlyPayment: boolean;

    constructor(
        private billSmoothingAccountsService: BillSmoothingService,
        private paymentService: PaymentService,
    ) { }

    public ngOnInit() {
        if (!this.fuelInformation.hasBillSmoothing) {
            if (this.fuelInformation.paymentOptions) {
                this.fortnightlyPayment = this.fuelInformation.paymentOptions.find((p) => p.frequency === BillSmoothingFrequency.Fortnightly.toString()).amount;
            }
        }

        if (this.fuelInformation.hasBillSmoothing) {
            this.isWeeklyPayment = this.fuelInformation.paymentScheme.frequency === BillSmoothingFrequency.Weekly.toString();
            this.isFortnightlyPayment = this.fuelInformation.paymentScheme.frequency === BillSmoothingFrequency.Fortnightly.toString();
            this.isMonthlyPayment = this.fuelInformation.paymentScheme.frequency === BillSmoothingFrequency.Monthly.toString();

            if (this.fuelInformation.paymentScheme.nextPayment) {
                this.nextPaymentAmount = Math.round(this.fuelInformation.paymentScheme.nextPayment.amount);
                this.nextPaymentDate = BillSmoothingService.generateLongDate(this.fuelInformation.paymentScheme.nextPayment.date);
            } else if (this.fuelInformation.paymentScheme.previousPayment) {
                this.previousPaymentAmount = Math.round(this.fuelInformation.paymentScheme.previousPayment.amount);
                this.previousPaymentDate = BillSmoothingService.generateLongDate(this.fuelInformation.paymentScheme.previousPayment.date);
            }
        }
    }

    public openPaymentPopup() {
        this.paymentService.openPaymentModal(this.fuelInformation.paymentContractInfo, this.fuelInformation.paymentOverdue, this.fuelInformation.paymentContractInfo.addressRaw).subscribe();
    }
}
