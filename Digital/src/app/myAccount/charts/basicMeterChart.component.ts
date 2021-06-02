import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { BillViewModel, ContractViewModel }  from '../services/account.service';

/**
 * Bar chart component, use this componenet where a bar chart is required.
 *
 * @export
 * @class BarComponent
 * @implements {OnInit}
 */
@Component({
    selector: 'agl-basic-meter-chart',
    templateUrl: './basicMeterChart.component.html',
    styleUrls: ['./basicMeterChart.component.scss'],
})

export class BasicMeterChartComponent implements OnInit {

    @Input() public contract: ContractViewModel;
    @Input() public allContractsRestricted: boolean;

    /**
     * True if the contract has a billing history
     */
    public hasBillHistory: boolean;

    /**
     * The switch for the no data message
     */
    public noData: boolean = false;

    /**
     * Is it electricity or gas switch
     * @type {Boolean}
     */
    public fuelTypeSwitch: boolean;

    /**
     * The number of bills returned as a string
     * @type {string}
     */
    public chartHeading: string;

    /**
     * new chart bar
     * @memberof BasicMeterChartComponent
     */

    public chartBars: ChartBar[];
    public bills: BillViewModel[];

    /**
     * On intilisation of component tidy the inputs from the front.
     */
    public ngOnInit() {
        this.bills = this.contract.bills;

        if (this.contract.hasBillHistory) {
            this.bills = this.getLatestBillsAsc(this.bills, 3);
            this.zeroNegativeBillCharges(this.bills);
            this.noData = !this.bills || this.bills.length === 0;
            this.chartHeading = this.buildHeading(this.bills);
            this.chartBars = this.buildBars(this.bills);
        }
    }

    public get contractIsInactive(): boolean {
        return !this.allContractsRestricted && this.contract.isRestricted;
    }

    /**
     * Gets the latest bills and sorts.
     * @param  {BillViewModel[]} bills   The bills
     * @param  {number}          howMany How many bills
     * @return {BillViewModel[]}         The array we use to build the graph.
     */
    private getLatestBillsAsc(bills: BillViewModel[], howMany: number): BillViewModel[] {
        bills.sort((d1, d2) => {
            return new Date(d2.issuedDate.toString()).valueOf() - new Date(d1.issuedDate.toString()).valueOf();
        });
        bills = bills.slice(0, howMany);
        bills.reverse();

        let padCount = howMany - bills.length;
        for (let pad = 1; pad <= padCount; pad++) {
            bills.unshift(null);
        }

        return bills;
    }

    /**
     * Negative bills
     * @param  {BillViewModel[]} bills The bills
     * @return {Number}               The bill to be 0 value
     */
    private zeroNegativeBillCharges(bills: BillViewModel[]) {
        for (let bill of bills) {
            if (bill && bill.newCharges < 0) {
                bill.newCharges = 0;
            }
        }
    }

    /**
     * Build the bars for the charts.
     * @param  {BillViewModel[]} bills The bills
     * @return {ChartBar[]}            tidyArray
     */
    private buildBars(bills: BillViewModel[]): ChartBar[] {
        let chartBars: ChartBar[] = [];

        if (typeof bills === 'undefined') { return; }

        let highestCharge = 0;

        for (let bill of bills) {
            if (bill && (bill.newCharges > highestCharge)) {
                highestCharge = bill.newCharges;
            }
        }

        for (let bill of bills) {
            if (!bill) {
                chartBars.push(null);
            } else {
                let percentage = 0;

                // Handle negative charges, set amount to zero
                if (bill.newCharges < 0) {
                    bill.newCharges = 0;
                }

                let ratio = bill.newCharges / highestCharge;

                // Ok so if the new charges and the highest value = the same (when all last bills are negative)
                // then set the ratio to 0.
                if (bill.newCharges === 0 && highestCharge === 0) {
                    ratio = 0;
                }

                // Handle the negative values.
                if (bill.newCharges < 0) {
                    ratio = 0;
                }

                let valuePercentage = ratio * 100;

                percentage = Math.round(valuePercentage);

                let date = moment(bill.issuedDate).format('DD MMM');
                let value = `$${bill.newCharges.toFixed(2)}`;
                let chartBar: ChartBar = new ChartBar(date, value, percentage);
                chartBars.push(chartBar);
            }
        }

        return chartBars;
    }

    /**
     * Show the bill titles based on the amount of objects
     * This is a special case as we append 2 blank objects
     * so we add in + 2 to get the correct titles.
     *
     * @param  {BillViewModel[]} bills the bills
     * @return {string}                the bill heading string
     */
    private buildHeading(bills: BillViewModel[]): string {
        let heading = '';
        if (bills !== null && typeof bills !== 'undefined') {
            let billList = [];

            for (let key of bills) {
              if (key !== null) {
                  billList.push(key);
              }
            }

            if (billList.length >= 3) {
                heading = 'Last 3 bills';
            }

            if (billList.length === 2) {
                heading = 'Last 2 bills';
            }

            if (billList.length === 1) {
                heading = 'Previous bill';
            }
        }
        return heading;
    }
}

class ChartBar {
    public date: string;
    public value: any;
    public percentage: number;
    constructor(date: string, value: any, percentage: number) {
        this.date = date;
        this.value = value;
        this.percentage = percentage;
    }
}
