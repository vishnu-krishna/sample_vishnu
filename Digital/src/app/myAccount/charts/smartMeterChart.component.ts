import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { PrePaymentBalanceTopUpUrgency } from '../../shared/globals/prePaymentBalanceTopUpUrgency';
import { ContentService } from '../../shared/service/content.service';
import { DataLayerService } from '../../shared/service/dataLayer.service';
import { Now } from '../../shared/service/now.service';
import { ContractViewModel } from '../services/account.service';
import { BillDescriptionService } from '../services/billDescription.service';

@Component({
    selector: 'agl-smart-meter-chart',
    templateUrl: './smartMeterChart.component.html',
    styleUrls: ['./smartMeterChart.component.scss']
})

export class SmartMeterChartComponent implements OnInit {
    @Input() public width: number;
    @Input() public lineWidth: number;
    @Input() public backgroundColor;
    @Input() public contract: ContractViewModel;
    @Input() public allContractsRestricted: boolean;

    @ViewChild('canvas') public canvasElement: ElementRef;

    public hasElectricVehicle: Boolean;
    public percent: number;
    public showProjection: Boolean = true;
    public subHeadingText: string;
    public daysToGo: string;
    public costToDate: number;
    public currentBillStartDate: string;
    public currentBillEndDate: string;
    private costChange: number;
    private costSign: number;

    // PayG Logic
    private toolTipHeader: string;
    private toolTipBody: string;
    private usageToolTip: Array<{ [key: string]: string }>;
    private canvas: any;
    private ctx: CanvasRenderingContext2D;
    private animationStep: number = 2;
    private animationFrameInMs: number = 1000 / 60;

    constructor(private now: Now,
                private contentService: ContentService,
                private dataLayerService: DataLayerService,
                private billDescriptionService: BillDescriptionService) {
    }

    public ngOnInit() {

        if (this.contract.isPayg) {
            this.dataLayerService.pushPayg(this.checkPaygBand());
        }
        this.contentService.getContent().subscribe((result) => {
            if (result.selfService && result.selfService.toolTips) {
                this.usageToolTip = result.selfService.toolTips.usageTooltip;
                if (this.usageToolTip) {
                    this.toolTipHeader = this.usageToolTip['header'];
                    this.toolTipBody = this.usageToolTip['description'];
                }
            }
        });
        this.canvas = this.canvasElement.nativeElement;
        this.ctx = this.canvas.getContext('2d');

        this.canvas.width = this.width * 2;
        this.canvas.height = 205 * 2;
        this.ctx.scale(2, 2);
        this.costToDate = this.baselineAmount(this.contract.costToDate);

        this.showProjection = this.costToDate !== this.contract.projectedBill;

        let change = this.contract.usageCostThisWeek - this.contract.usageCostLastWeek;
        this.costSign = Math.sign(change);
        this.costChange = Math.abs(change);

        let todayDate = this.now.date();
        let currentBillStartDate = moment(this.contract.currentBillStartDate).startOf('day');
        let currentBillEndDate = moment(this.contract.currentBillEndDate).startOf('day');
        let startDateFormat = currentBillStartDate.year() === currentBillEndDate.year() ? 'D MMM' : 'D MMM YY';
        this.currentBillStartDate = currentBillStartDate.format('D MMM');
        this.currentBillEndDate = currentBillEndDate.format('D MMM');

        let billingPeriodDays = currentBillEndDate.diff(currentBillStartDate, 'days');
        let billingPeriodElapsed = todayDate.diff(currentBillStartDate, 'days');
        let percent = Math.round((billingPeriodElapsed / billingPeriodDays) * 100);

        if (percent > 100) { percent = 100; }
        if (percent < 0) { percent = 0; }

        this.percent = percent;
        let animDisabled = localStorage.getItem('selfService.disableAnimation') === 'true';

        if (animDisabled) {
            this.drawChart(this.percent);
        } else {
            this.animateToPercentage(0, 0, this.percent);
        }

        let daysDelta: number = currentBillEndDate.diff(todayDate, 'days');

        if (daysDelta > 0) {
            let pluralise = Math.abs(daysDelta) === 1 ? '' : 's';
            this.daysToGo = `${daysDelta} day${pluralise} to go`;
        }

        this.hasElectricVehicle = !!this.contract.hasElectricVehicle;

        this.subHeadingText = this.billDescriptionService.dateRangeDescription(this.contract.currentBillStartDate, this.contract.currentBillEndDate);
    }

    public baselineAmount(amount: number) {
        return amount < 0 ? 0 : amount;
    }

    public get contractIsInactive(): boolean {
        return !this.allContractsRestricted && this.contract.isRestricted;
    }

    public animateToPercentage(startValue: number, currentValue: number, endValue: number) {
        if (currentValue <= endValue) {
            this.drawChart(currentValue);
            currentValue += this.animationStep;
            setTimeout(() =>
                    this.animateToPercentage(startValue, currentValue, endValue),
                this.animationFrameInMs);
        }
    }

    public drawChart(percentValue) {
        let gradientStart = '#001CB0';
        let gradientEnd = '#26DEEA';
        let backgroundColor = '#F1F1F1';

        let lineWidth = 15;
        let startAngle = 0.9 * Math.PI;
        let endAngle = 2.1 * Math.PI;

        let width = this.width || 250;
        let centreX = width / 2;
        let centreY = centreX;
        let radius = (width / 2) - (lineWidth / 2);
        let isAnticlockwise = false;

        let valueAngle = (startAngle + ((endAngle - startAngle) * (percentValue / 100))) % (2 * Math.PI);

        let ctx = this.ctx;

        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        ctx.lineWidth = lineWidth;
        ctx.lineCap = 'round';
        ctx.strokeStyle = backgroundColor;
        ctx.beginPath();
        ctx.arc(centreX, centreY, radius, startAngle, endAngle, isAnticlockwise);
        ctx.stroke();
        ctx.closePath();

        // Don't draw the line
        if (percentValue <= 0) {
            return;
        }

        let gradient = ctx.createLinearGradient(0, 0, 200, 0);
        gradient.addColorStop(0, gradientStart);
        gradient.addColorStop(1, gradientEnd);
        ctx.strokeStyle = gradient;
        ctx.beginPath();
        ctx.arc(centreX, centreY, radius, startAngle, valueAngle, isAnticlockwise);
        // Call the function to fix the date in right position based on the arc.
        ctx.stroke();
        ctx.closePath();
    }

    public checkPaygBand() {
        switch (this.contract.paygBand) {
            case PrePaymentBalanceTopUpUrgency.Unavailable:
                return 'Unavailable';
            case PrePaymentBalanceTopUpUrgency.High:
                return 'Debit';
            case PrePaymentBalanceTopUpUrgency.Medium:
                return 'Low Credit';
            case PrePaymentBalanceTopUpUrgency.Low:
                return 'High Credit';
            default:
                return '';
        }
    }
}
