import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import * as moment from 'moment';

import { BillSmoothingLearnMoreComponent } from '../../shared/component/billSmoothingLearnMore/billSmoothingLearnMore.component';
import { Now } from '../../shared/service/now.service';
import { RedLineApiService } from '../../shared/service/redLineApi.service';
import { ModalService } from '../modal/modal.service';
import { DayPluralPipe } from '../pipes/dayPlural.pipe';
import { BillViewModel, ContractViewModel } from '../services/account.service';
import { PaymentService } from '../services/payment.service';
import { ManageEnergyInsightsComponentModel } from '../pages/settings/notifications/manageEnergyInsights/manageEnergyInsightsComponentModel';
import { EnergyInsightsService } from '../services/energyInsights.service';
import { BillHistoryViewModel } from './billHistoryViewModel';
import { UsageBreakdownBillPeriod } from '../services/settings/model/usageBreakdownBillPeriod';
import { BillDescriptionService } from '../services/billDescription.service';

declare let leanengage: any;

@Component({
    selector: 'agl-bill-history',
    templateUrl: './billhistory.component.html',
    styleUrls: ['./billhistory.component.scss']
})
export class BillHistoryComponent implements OnInit {

    @Input() public contract: ContractViewModel;
    @Input() public address: string;

    public paymentAddress: string;
    public height: number;
    public billWidgetHeight: number = 60;

    // Bill row fields below
    public isPaid: boolean;
    public isOverdue: boolean;
    public payNowText: string;
    public paidText: string;
    public overdueText: string;
    public isCredit: boolean;
    public actionText: string;
    public billList: BillHistoryViewModel[];
    public filteredBills: BillHistoryViewModel[] = [];
    public clickCount: number = 1;
    public loadAllBills: boolean = false;
    public firstBillMessage: string;
    public billsPerPage: number = 12;
    public nextBillIssued: string;
    public showEllipsesContent = false;
    public positionClass;
    public energyInsightsEligibility: ManageEnergyInsightsComponentModel[] = [];
    public isEnergyInsightsDisagEnabled: boolean = false;
    private billCountLimit: number = 3;

    constructor(
        public energyInsightsService: EnergyInsightsService,
        public router: Router,
        private redLine: RedLineApiService,
        private paymentService: PaymentService,
        private modalService: ModalService,
        private billDescriptionService: BillDescriptionService,
    ) {
    }

    public ngOnInit() {
        this.setBills(this.contract.bills, this.billCountLimit);

        this.nextBillIssued = this.billDescriptionService.nextBillIssuedIn(
            this.contract.currentBillEndDate,
            'Your next bill will be issued soon.',
            'Your next bill is on the way, check back soon.',
            'Your next bill will be issued in',
            '.'
        );

        this.energyInsightsService.modelUpdated.subscribe(
            (model: ManageEnergyInsightsComponentModel[]) => {
                this.energyInsightsEligibility = this.energyInsightsService.energyInsightsEligibility;
                this.isEnergyInsightsDisagEnabled = this.energyInsightsService.isEnergyInsightsDisagEnabled;
                this.billList.map((bill: BillHistoryViewModel) => {
                    bill.showEllipses = this.hasEIData(this.contract, bill.startDate, bill.endDate);
                });
            }
        );
    }

    /**
     * Open a bill PDF in a new window/tab
     * @param  {any} bill
     */
    public openBillPdfInNewWindow(bill: any): void {
        if (bill.fxPrintDoc && !bill.billPdfLoading && !bill.billPdfLoadFailed) {
            bill.billPdfLoading = true;
            // Create a new window before the ajax call to stop the popup blocker
            let hWindow = window.open('', '_blank');
            hWindow.document.write(require('../static/pdf.html'));
            this.redLine.getBillPdfUrl(this.contract.contractNumber, bill.fxPrintDoc)
                .subscribe(
                (url) => {
                    hWindow.document.location.href = url;
                    bill.billPdfLoading = false;
                    bill.billPdfLoadFailed = false;
                },
                (err) => {
                    hWindow.close();
                    bill.billPdfLoading = false;
                    bill.billPdfLoadFailed = true;
                },
                () => {
                    bill.billPdfLoading = false;
                    bill.billPdfLoadFailed = false;
                }
                );
        }
    }

    /**
     * Displays bill period dates.
     * @param  {string} startDate Bill Issue Date
     * @param  {string} endDate   Bill Due Date
     * @return {string}           Bill Issue Date to Bill Due Date
     */
    public longDateRange(startDate, endDate): string {
        // 4 May to 3 Jun 2016
        let currentBillStartDate = moment(startDate).startOf('day');
        let currentBillEndDate = moment(endDate).startOf('day');
        // let startDateFormat = currentBillStartDate.year() === currentBillEndDate.year() ? 'D MMM' : 'D MMM YYYY';
        return currentBillStartDate.format('D MMM') + ' to ' + currentBillEndDate.format('D MMM YYYY');
    }

    /**
     * If more than 3 bills, show more bills button is visible.
     * @return {Boolean}
     */
    public showMoreBillsButton(): Boolean {
        return this.contract.bills.length > this.billCountLimit;
    }

    /**
     * If there are no bills, show next bill issue message.
     * @return {Boolean}
     */
    public thereAreNoBills(): Boolean {
        return this.contract.bills.length === 0;
    }

    /**
     * Set number of bills to display.
     * @param  {Array<BillViewModel>}   billArray      The bills
     * @param  {number}                 billsDisplayed Max number of bills to display
     * @return {[billObject[]]}                 tidy bills
     */
    public setBills(bills: BillViewModel[], billsDisplayed: number): void {
        for (let i = 0; i < bills.length; i++) {
            if (this.filteredBills.length < this.clickCount * billsDisplayed) {
                let bill = bills[i];
                let billObject: BillHistoryViewModel = new BillHistoryViewModel();

                if (bill.newCharges < 0) {
                    billObject.totalDue = (-(bill).newCharges).toFixed(2).toString() + ' CR';
                    billObject.isInCredit = true;
                } else {
                    billObject.totalDue = bill.newCharges.toFixed(2).toString();
                }

                billObject.dateRange = this.longDateRange(bill.startDate, bill.endDate);
                if (bill.startDate) {
                    billObject.startDate = bill.startDate.toString();
                }
                if (bill.endDate) {
                    billObject.endDate = bill.endDate.toString();
                }
                billObject.days = this.days(bill.startDate, bill.endDate);
                billObject.billId = String(this.contract.contractNumber) + moment(bill.startDate).format('YYYYMMDD');
                billObject.fxPrintDoc = bill.fxPrintDoc;
                billObject.billStatus = this.getBillStatus(this.contract, bill, bills[0].newCharges, i);

                this.filteredBills.push(billObject);
            }
        }

        this.billList = this.filteredBills;
        this.actionText = 'See more';

        // If >3 bills, set initial height for transition to work.
        if (this.filteredBills.length >= 3) {
            this.height = 180;
        }
        let pluralise = new DayPluralPipe();
        this.firstBillMessage = this.contract.currentBillDaysUntilDue > 0 ? `in ${pluralise.transform(this.contract.currentBillDaysUntilDue.toString())}` : 'shortly';
    }

    public hasEIData(contract: ContractViewModel, startDate: string, endDate: string): boolean {
        let EIDataList: UsageBreakdownBillPeriod[];
        let length: number;
        let currentEIContract: ManageEnergyInsightsComponentModel;
        if (this.energyInsightsService.energyInsightsEligibility) {
            currentEIContract = this.energyInsightsService.energyInsightsEligibility.find((eIContract: ManageEnergyInsightsComponentModel) => {
                return eIContract.contractNumber === contract.contractNumber;
            });
        }
        if (currentEIContract) {
            EIDataList = currentEIContract.availableUsageBreakdownBillPeriods.filter((period: UsageBreakdownBillPeriod) => {
                const startOfDay = moment(startDate).startOf('day').format('YYYY-MM-DD').toString();
                return period.billStartDate === startOfDay;
            });
        }
        if (EIDataList) {
            length = EIDataList.length;
        }
        return !!length;
    }

    /**
     * On click, should show more bills.
     * @return {filteredBills[]} Array tidied with more bills loaded
     */
    public showMoreBills() {
        this.filteredBills.length = 0;
        this.setBills(this.contract.bills, this.billsPerPage);

        this.height = this.filteredBills.length * this.billWidgetHeight;
        this.clickCount++;

        if (this.filteredBills.length === this.contract.bills.length) {
            this.actionText = 'There are no more bills to display';
            this.loadAllBills = true;
        }
        this.billList.map((bill) => {
            bill.showEllipses = this.hasEIData(this.contract, bill.startDate, bill.endDate);
        });
    }

    /**
     * Show the modal for payment within dashboard
     * @param  object data Any object passed from the page
     * @return promise  The confirmation of closure.
     */
    public openPaymentPopup() {
        this.paymentService.openPaymentModal(this.contract, this.contract.currentBalance + this.contract.paymentOverdue, this.address).subscribe();

    }

    public onClickViewBill(bill: BillHistoryViewModel): void {
        const startDate = moment(bill.startDate).startOf('day').format('YYYY-MM-DD').toString();
        const endDate = moment(bill.endDate).startOf('day').format('YYYY-MM-DD').toString();
        this.energyInsightsService.selectedBillStartDate = startDate;
        this.energyInsightsService.selectedBillEndDate = endDate;
        this.energyInsightsService.selectedContract = this.contract;
        this.router.navigate(['/energyinsights']);
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

    public toggleEllipsesButton(event, i: number) {
        this.billList.map((bill, index) => {
            if (index === i) {
                this.adjustEllipsesButtonPosition(event);
                bill.showEllipsesContent = !bill.showEllipsesContent;
            } else {
                bill.showEllipsesContent = false;
            }
        });
    }

    private adjustEllipsesButtonPosition(event): void {
        this.positionClass = 'bottom';
        const ellipsesButtonContentHeight = 120;
        const yThreshold = event.view.innerHeight - ellipsesButtonContentHeight;
        if (event.y < yThreshold) {
            this.positionClass = 'bottom';
        } else {
            this.positionClass = 'top';
        }
    }

    /**
     * Set the bill's pay status
     * @param  {ContractViewModel} contract   The contract
     * @param  {BillViewModel}     bill       The billObject
     * @param  {number}            index      Which bill
     * @param  {[billObject[]]}    billObject The tidied set of bills
     * @return {string}                       The bill status
     */
    private getBillStatus(contract: ContractViewModel, bill: BillViewModel, firstBillNewCharges: number, index: number): string {
        let totalToPay = contract.currentBalance + contract.paymentOverdue;

        if (contract.instalmentPlan ||
            contract.isBillSmoothingV2 ||
            contract.isPayg) {
            return '';
        }

        if (totalToPay > firstBillNewCharges) {
            return '';
        }

        if (totalToPay <= 0) {
            return 'Paid';
        }

        if (totalToPay <= bill.newCharges && index === 0) {
            return 'Pay now';
        }

        return 'Paid';
    }

    /**
     * Displays bill period in days.
     * @param  {string} startDate Bill Issue Date
     * @param  {string} endDate   Bill Due Date
     * @return {string}           Number of days
     */
    private days(startDate, endDate): string {
        let start = moment(startDate);
        let end = moment(endDate);
        let numberOfDays = -start.diff(end, 'days') + 1;
        let plural = (numberOfDays === 1) ? '' : 's';
        return `${numberOfDays} day${plural}`;
    }
}
