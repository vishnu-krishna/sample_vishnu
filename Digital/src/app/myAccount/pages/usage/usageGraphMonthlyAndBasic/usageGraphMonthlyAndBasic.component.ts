/* tslint:disable:no-access-missing-member */
import { AfterViewInit, Component, EventEmitter, HostListener, OnDestroy, OnInit, Output } from '@angular/core';
import * as moment from 'moment';
import { Subscription } from 'rxjs/Subscription';
import { IAccountServiceMA } from '../../../../myAccount/services/account.service';
import { UsageLoadContractInModalMessage } from '../../../../shared/messages/usageLoadContractInModal.message';
import { UsageLoadNewContractMessage } from '../../../../shared/messages/usageLoadNewContract.message';
import { UsageModalMessage } from '../../../../shared/messages/usageModalMessage.message';
import { UsageDataModel } from '../../../../shared/model/usage/usageData.model';
import { UsageGranularity } from '../../../../shared/model/usage/usageGranularity.model';
import { UsageGraphItemViewModel } from '../../../../shared/model/usage/usageGraphItemView.model';
import { UsageInsightMonthAverages } from '../../../../shared/model/usage/usageInsightMonthAverages.model';
import { UsageInsightMonthPeaks } from '../../../../shared/model/usage/usageInsightMonthPeaks.model';
import { UsageInsightMonthSummary } from '../../../../shared/model/usage/usageInsightMonthSummary.model';
import { ApiService } from '../../../../shared/service/api.service';
import { IMessageBusService } from '../../../../shared/service/contract/imessageBus.service';
import { IUsageService } from '../../../../shared/service/contract/iusage.service';
import { IUsageRenderingService } from '../../../../shared/service/contract/iusageRendering.service';
import { UsageGraphBaseComponent } from '../usageGraphBase/usageGraphBase.component';
import { AglTwoDecimalPipe } from '../../../pipes/aglTwoDecimal.pipe';

import { FeatureFlagService } from '../../../../myAccount/services/featureFlag.service';

@Component({
    selector: 'agl-usage-graph',
    templateUrl: './usageGraphMonthlyAndBasic.component.html',
    styleUrls: ['./usageGraphMonthlyAndBasic.component.scss'],
    providers: [AglTwoDecimalPipe]
})
export class UsageGraphMonthlyAndBasicComponent extends UsageGraphBaseComponent implements OnInit, OnDestroy, AfterViewInit {

    @Output() public isBillFreqChanged = new EventEmitter<any>();

    public debugMode: boolean = false;
    public chartHeight: number = 300; // the desired height of the graph (used for calculations)
    public currentBillFreq: string;
    public scrollSpeed: number;
    public isChartError: boolean = false; // True if an error has occured within the data loading or processing
    public isDailyUsageModalDisplayed: boolean = false;
    public isToolTipVisible: boolean = false;
    public gasUnitMeasurement: string;
    public hideWeekendInsight: boolean = false;
    private loadNewGraphSubscription: Subscription;

    constructor(
        protected _usageService: IUsageService,
        protected _usageRenderingService: IUsageRenderingService,
        protected _messageBusService: IMessageBusService,
        protected _apiService: ApiService,
        protected _accountService: IAccountServiceMA,
        private aglTwoDecimalPipe: AglTwoDecimalPipe,
        private _featureFlagService: FeatureFlagService
    ) {
        super(
            _usageService,
            _usageRenderingService,
            _messageBusService,
            _apiService
        );
        this.graphId = 'usage-graph-basicmonthly';
        this.itemWidthDesktop = 80;
        this.itemWidthTablet = 60;
        this.itemWidthMobile = 40;
    }

    @HostListener('window:resize', ['$event'])
    public onResize(event) {
        if (this.isViewportChangeRequired()) {
            this.initResize();
        }
    }

    public ngOnInit() {
        this._accountService.getName()
            .subscribe(
                (name) => {
                    this.name = name;
                    this.initComponent();
                }
            );
    }

    public ngOnDestroy() {
        if (this.loadNewGraphSubscription) {
            this.loadNewGraphSubscription.unsubscribe();
        }
    }

    public ngAfterViewInit() {
        this.initHammerJS();
    }

    public initResize() {
        this.renderGraph();
        this.initScrollButtons();
    }

    public selectGraphItem(item: UsageGraphItemViewModel) {

        this.selectedGraphItem = null;
        this.isPanning = true;
        this.selectedGraphItem = item;
        this.widgetAnimationMask = true;

        setTimeout(() => {
            this.selectedWidgetItem = item;
            this.widgetAnimationMask = false;
        }, 250);

        if (window.innerWidth >= 992) {
            this.graphScrollOffset = (this.selectedGraphItem.index * this.graphItemPixelWidth * -1) + 10;
        } else {
            this.graphScrollOffset = (this.selectedGraphItem.index * this.graphItemPixelWidth * -1);
        }
        this.currentGraphIndex = this.selectedGraphItem.index;
        this.initScrollButtons();
        this.isPanning = false;
        this.prepareGraphInsight();
        this.getSmartInsightMsg();

    }

    public updateScrollJump() {
        if (this.isDesktop()) {
            this.scrollMultiplier = 3;
        } else {
            this.scrollMultiplier = 1;
        }
    }

    public prepareGraphInsight() {
        this.usageInsightMonthSummary = new UsageInsightMonthSummary();
        if (this.activeContract.isSmartMeter) {
            this.setSmartInsightMonthlySummary();
        } else {
            this.setBasicInsightSummary();
        }
    }

    public getSmartInsightMsg() {
        // initialising the variables
        this.usageInsightMonthPeaks = new UsageInsightMonthPeaks();
        this.usageInsightMonthAverages = new UsageInsightMonthAverages();
        this.selectedInsightItemIndex = 0; // Resetting the index of widget so that when selecting different graph item
        this.getDailyUsageForSelectedMonth();
    }

    public getDailyUsageForSelectedMonth() {
        this._usageService.GetDailyForMonth(this.activeContract, this.selectedGraphItem.startDateTime)
            .subscribe(
                (result) => {
                    this.setUsageInsightMonthlyDetails(result);
                }
            );
    }

    public detectBillFreqChange() {
        if (this.chartHasItems(true)) {
            this.currentBillFreq = this.determineBillFreq(
                this.chartData.graphItems[0].usageDatum.startDateTime,
                this.chartData.graphItems[0].usageDatum.endDateTime);

            for (let i = 0; i < this.chartData.graphItems.length - 1; i++) {
                let billFreqDays = this.determineBillFreq(
                    this.chartData.graphItems[i].usageDatum.startDateTime,
                    this.chartData.graphItems[i].usageDatum.endDateTime);
                if (billFreqDays !== this.currentBillFreq) {
                    this.isBillFreqChanged.emit(true);
                    break;
                }
            }
        }
    }

    public determineBillFreq(startDate: Date, endDate: Date) {
        let stDate = moment(startDate);
        let enDate = moment(endDate);
        let result = enDate.diff(stDate, 'days');
        if ( result > 83 && result < 97 ) {
            return 'Quarterly';
        } else
        if ( result > 53 && result < 67) {
            return 'Bi-Monthly';
        } else
        if (result > 23 && result < 37) {
            return 'Monthly';
        }
    }

    public initComponent() {
        this.loadNewGraphSubscription = this._messageBusService.listenWithLatest(UsageLoadNewContractMessage).subscribe(
            (result) => {
                if (!result.Contract.hasElectricVehicle) {
                    if (this.activeContract !== result.Contract) {
                        this.updateLoadingState(true);
                        this.activeContract = result.Contract;

                        // Set unit measurement.
                        this.gasUnitMeasurement = this.activeContract.unitMeasurement;
                        if (result.Contract.isSmartMeter) {
                            this.graphGranularity = UsageGranularity.monthly;
                            this.loadMonthlyUsage();
                        } else {
                            this.graphGranularity = UsageGranularity.basic;
                            this.loadBasicUsage();
                        }
                    } else {
                        console.warn('A request was made to open the contract that is already being viewed. Aborting this request.');
                    }
                } else {
                    this.updateLoadingState(false);
                }
            }
        );
    }

    public parseUsageForChart( usageInfo: UsageDataModel ) {

        this.chartData = this._usageRenderingService.getChartDataFromUsageInfo( usageInfo, this.graphGranularity );

        if (this.chartData && this.chartData.graphItems && this.chartData.graphItems.length > 0) {

            this.yAxisLabels = this.chartData.yAxisLabels;
            this.graphCeilingValue = this.chartData.graphCeilingValue;

            if (this.activeContract.isSmartMeter) {

                let lastChartItem = this.chartData.graphItems[this.chartData.graphItems.length - 1];
                this._usageService.GetDailyForMonth(this.activeContract, lastChartItem.startDateTime).subscribe(
                    (result) => {

                        if (result && result.costs) {

                            let daysInSelectedMonth = moment(lastChartItem.startDateTime).daysInMonth();
                            let daysOfDataInSelectedMonth = result.costs.length;
                            lastChartItem.daysOfData = daysOfDataInSelectedMonth;
                            if (result.costs.length !== daysInSelectedMonth) {
                                lastChartItem.incompleteData = true;
                                lastChartItem.averageConsumption =
                                    this._usageRenderingService.calculateAverage(daysOfDataInSelectedMonth, lastChartItem.valueConsumption);
                                lastChartItem.averageCost =
                                    this._usageRenderingService.calculateAverage(daysOfDataInSelectedMonth, lastChartItem.valueCost);
                            }

                        }

                        this.initResize();
                        this.detectBillFreqChange();
                    }
                );

            } else {
                this.insertFutureItemPlaceholder();
                this.initResize();
                this.detectBillFreqChange();
            }
        }

    }

    public loadBasicUsage() {
        this._usageService.GetBasic(this.activeContract.contractNumber)
            .subscribe(
                (result) => {
                    this.parseUsageForChart(result);
                },
                (error) => {
                    this.updateLoadingState(false);
                    this.isChartError = true;
                }
            );
    }

    public loadMonthlyUsage() {
        this._usageService.GetMonthly(this.activeContract.contractNumber)
            .subscribe(
                (result) => {
                    this.parseUsageForChart(result);
                },
                (error) => {
                    this.updateLoadingState(false);
                    this.isChartError = true;
                }
            );
    }

    public showFutureItemPlaceHolder(index: number): boolean {
        if (this.graphGranularity === UsageGranularity.basic) {
            if (this.chartData && this.chartData.graphItems) {
                return (index === this.chartData.graphItems.length - 1);
            }
        }
        return false;
    }

    public insertFutureItemPlaceholder() {

        // If we have chart data to present
        let futureChartItem = new UsageGraphItemViewModel();
        futureChartItem.isFutureItemPlaceholder = true;

        if (this.chartData.graphItems.length === 0) {

            futureChartItem.timeSpanTitle = '- -';
            futureChartItem.timeSpanTitleMobile = '- -';
            futureChartItem.timeSpanTitleInsight = '';

        } else {
            let billingDurationMonths: number;
            let lastChartItem = this.chartData.graphItems[this.chartData.graphItems.length - 1];

            let startDateFinalBillingPeriod = moment( lastChartItem.usageDatum.startDateTime );
            let endDateFinalBillingPeriod = moment( lastChartItem.usageDatum.endDateTime );

            let billingDuration: string = this.determineBillFreq( startDateFinalBillingPeriod.toDate(), endDateFinalBillingPeriod.toDate() );
            if  ( billingDuration === 'Monthly') {
                billingDurationMonths = 1;
            } else if ( billingDuration === 'Bi-Monthly') {
                billingDurationMonths = 2;
            } else if ( billingDuration === 'Quarterly' ) {
                billingDurationMonths = 3;
            }

            let startDateFormat = (moment(lastChartItem.usageDatum.startDateTime).add( 1, 'M').year() ===
            moment(lastChartItem.usageDatum.endDateTime).add(1, 'M').year() ? 'D MMM' : 'D MMM YYYY');

            futureChartItem.timeSpanTitleInsight =
                moment(lastChartItem.usageDatum.endDateTime)
                    .add(1, 'd').format(startDateFormat) + ' - ';
        }

        futureChartItem.index = this.chartData.graphItems.length;
        this.chartData.graphItems.push(futureChartItem);

    }

    public renderGraph() {
        if (this.isChartInitialised()) {
            this.screenWidth = window.innerWidth;
            this.setWidth(this.screenWidth);
            this.selectStartingItem();
        }
        this.updateLoadingState(false);
    }

    public selectStartingItem() {
        if (this.graphGranularity === UsageGranularity.basic) {
            if (this.chartData.graphItems.length === 1) {
                this.selectedGraphItem = this.chartData.graphItems[this.chartData.graphItems.length - 1];
            } else {
                this.selectedGraphItem = this.chartData.graphItems[this.chartData.graphItems.length - 2];
            }
        } else {
            if (this.chartData.graphItems.length > 0) {
                this.selectedGraphItem = this.chartData.graphItems[this.chartData.graphItems.length - 1];
            }
        }
        this.currentGraphIndex = this.selectedGraphItem.index;
        this.selectGraphItem(this.selectedGraphItem);
    }

    public triggerUsageModalOpenClose($event) {
        this.isDailyUsageModalDisplayed = $event;
        if ($event === true) {
            let usageModalMessage = new UsageModalMessage('shown');
            this._messageBusService.broadcast( usageModalMessage );
            setTimeout(() => {
                this._messageBusService.broadcast(new UsageLoadContractInModalMessage(this.activeContract, this.selectedGraphItem.startDateTime));
            }, 400);
            document.body.style.overflow = 'hidden';
        }
    }

    // Right arrow click event
    public nextSmartInsightMessage() {
        // This check is to hide the Weekend average if it is undefined or NaN.
        if (this.selectedInsightItemIndex === this.smartInsightPeakIndex && this.hideWeekendInsight) {
            this.selectedInsightItemIndex = this.smartInsightSummaryIndex;
        } else if (this.selectedInsightItemIndex === this.smartInsightWeekendAverageIndex) {
            this.selectedInsightItemIndex = this.smartInsightSummaryIndex;
        } else {
            this.selectedInsightItemIndex += 1;
        }
    }

    // Left arrow click event
    public previousSmartInsightMessage() {
        // This check is to hide the Weekend average if it is undefined or NaN.
        if (this.selectedInsightItemIndex === this.smartInsightSummaryIndex) {
            if (this.hideWeekendInsight) {
                this.selectedInsightItemIndex = this.smartInsightPeakIndex;
            } else {
                this.selectedInsightItemIndex = this.smartInsightWeekendAverageIndex;
            }
        } else {
            this.selectedInsightItemIndex -= 1;
        }
    }

    public setBasicInsightSummary() {

        let previousBillDifference: number = 0;

        if ( this.isPersonalizedMsgDisplay ) {
            this.usageInsightMonthSummary.summary = `Hi ${this.capitalizeFirstLetter(this.name.firstName.toLowerCase())},`;
        }

        if ( !this.selectedGraphItem.isFutureItemPlaceholder && !this.activeContract.isInFlight ) {
            this.usageInsightMonthSummary.isHighlightDisplayed = true;
            if ( this.isPersonalizedMsgDisplay ) {
                this.usageInsightMonthSummary.summary += ' your ';
            } else {
                this.usageInsightMonthSummary.summary = 'Your ';
            }
            this.usageInsightMonthSummary.summary = this.usageInsightMonthSummary.summary + ` usage charge for this bill was $${this.aglTwoDecimalPipe.transform(this.selectedGraphItem.valueCost)}.`;

            if ( this.currentGraphIndex !== 0 ) {
                previousBillDifference = (this.selectedGraphItem.valueCost - this.chartData.graphItems[this.currentGraphIndex - 1].valueCost);
                if ( previousBillDifference > 0 ) {
                    this.usageInsightMonthSummary.comparisonPhrase = 'more than period before';
                    this.usageInsightMonthSummary.usageCostIcon = 'svg/icon_high_arrow.svg';
                } else if (previousBillDifference < 0) {
                    this.usageInsightMonthSummary.comparisonPhrase = 'lower than period before';
                    this.usageInsightMonthSummary.usageCostIcon = 'svg/icon_low_arrow.svg';
                } else {
                    this.usageInsightMonthSummary.comparisonPhrase = 'difference from previous bill';
                }
                this.usageInsightMonthSummary.usageCostDifference = this._usageRenderingService.formatValueToString(Math.abs(previousBillDifference));
            } else {
                this.usageInsightMonthSummary.isHighlightDisplayed = false;
            }
        }

        if ( this.selectedGraphItem.isFutureItemPlaceholder && !this.activeContract.isInFlight ) {
            if ( this.isPersonalizedMsgDisplay ) {
                this.usageInsightMonthSummary.summary += ' we ';
            } else {
                this.usageInsightMonthSummary.summary = 'We ';
            }
            this.usageInsightMonthSummary.isHighlightDisplayed = false;
            this.usageInsightMonthSummary.summary +=  `haven't issued this bill yet. Check back once you receive this bill to see how much energy you have used.`;
        }

        if ( this.activeContract.isInFlight ) {
            if ( this.isPersonalizedMsgDisplay ) {
                this.usageInsightMonthSummary.summary += ' welcome ';
            } else {
                this.usageInsightMonthSummary.summary = 'Welcome ';
            }
            this.usageInsightMonthSummary.isHighlightDisplayed = false;
            this.usageInsightMonthSummary.summary += `to AGL! We're busy working on getting you set up. Check back soon to see how much energy you have used.`;
        }
        if ( this.chartData.graphItems.length === 0 ) {
            if ( this.isPersonalizedMsgDisplay ) {
                this.usageInsightMonthSummary.summary += ' welcome ';
            } else {
                this.usageInsightMonthSummary.summary = 'Welcome ';
            }
            this.usageInsightMonthSummary.isHighlightDisplayed = false;
            this.usageInsightMonthSummary.summary +=  `to AGL! We haven't issued this bill yet. Check back once you receive this bill to see how much energy you have used.`;
        }
    }

    public setSmartInsightMonthlySummary() {

        /* For first Insight - Values for the Current period is setting default view*/
        // If condition for current bill period and previous bill periods
        if ( this.selectedGraphItem.incompleteData ) {
            if ( this.isPersonalizedMsgDisplay ) {
                this.usageInsightMonthSummary.summary = `Hi ${this.capitalizeFirstLetter(this.name.firstName.toLowerCase())}, your usage charge so far this month is $${this.selectedGraphItem.valueCost.toFixed(2)}.`;
            } else {
                this.usageInsightMonthSummary.summary = `Your usage charge so far this month is $${this.selectedGraphItem.valueCost.toFixed(2)}.`;
            }

            this.usageInsightMonthSummary.usageRemainingDays = moment(this.selectedGraphItem.startDateTime).daysInMonth() - this.selectedGraphItem.daysOfData;
            this.usageInsightMonthSummary.comparisonPhrase = 'remaining';
        } else {

            this.usageInsightMonthSummary.summary = `Your usage charge this month was $${this.aglTwoDecimalPipe.transform(this.selectedGraphItem.valueCost)}.`;

            if (this.currentGraphIndex !== 0 ) {

                let previousBillDifference: number = (this.selectedGraphItem.valueCost - this.chartData.graphItems[this.currentGraphIndex - 1].valueCost);

                this.usageInsightMonthSummary.usageCostDifference = this._usageRenderingService.formatValueToString(Math.abs(previousBillDifference));

                if (previousBillDifference > 0) {
                    this.usageInsightMonthSummary.comparisonPhrase = 'higher than month before';
                    this.usageInsightMonthSummary.usageCostIcon = 'svg/icon_high_arrow.svg';
                } else if (previousBillDifference < 0) {
                    this.usageInsightMonthSummary.comparisonPhrase = 'lower than month before';
                    this.usageInsightMonthSummary.usageCostIcon = 'svg/icon_low_arrow.svg';
                } else {
                    this.usageInsightMonthSummary.comparisonPhrase = 'difference from previous month';
                }

            }
        }
    }

    public setUsageInsightMonthlyDetails(usageInfo: UsageDataModel) {
        this.usageInsightMonthPeaks.usageCost = 0;
        let weekendCost = 0;
        let weekdayCost = 0;
        let weekendDayCount = 0;
        let weekDayCount = 0;
        this.isMonthlyDetailsDisplayed = this.haveAnyDailyDataForSelectedMonth(usageInfo);
        if ( this.isMonthlyDetailsDisplayed ) {
            for (let cost of usageInfo.costs) {
                if ( this.usageInsightMonthPeaks.usageCost < cost.value ) {
                    this.usageInsightMonthPeaks.usageCost = cost.value;
                    this.usageInsightMonthPeaks.peakDate = cost.startDateTime;
                }
                let currentDay = moment(cost.startDateTime).format('dddd');
                if ( currentDay === 'Sunday' || currentDay === 'Saturday' ) {
                    weekendCost += cost.value;
                    weekendDayCount++;
                } else {
                    weekdayCost += cost.value;
                    weekDayCount++;
                }
            }
        }
        // Setting the Insight messages for monthly peak values
        this.usageInsightMonthPeaks.summary = `You used the most electricity on ${moment(this.usageInsightMonthPeaks.peakDate).format('dddd D MMMM')}.`;
        this.usageInsightMonthPeaks.usageCost = +this.usageInsightMonthPeaks.usageCost.toFixed(2);

        // Setting the Insight messages for the weekend and weekday averages
        let weekdayAverage = (weekdayCost / weekDayCount);
        let weekendAverage = (weekendCost / weekendDayCount);
        // Hide the weekend average insight if the data weekend average is NaN or undefined.
        if (isNaN(weekendAverage)) {
            this.hideWeekendInsight = true;
        } else {
            this.hideWeekendInsight = false;
            this.usageInsightMonthAverages.weekendAverageCost = weekendAverage.toFixed(2);
        }
        this.usageInsightMonthAverages.weekdayAverageCost = weekdayAverage.toFixed(2);
        this.usageInsightMonthAverages.averageCostDifference = (weekendAverage - weekdayAverage);
        if ( this.usageInsightMonthAverages.averageCostDifference > 0 ) {
            this.usageInsightMonthAverages.summary = ` You use an average of $${Math.abs(this.usageInsightMonthAverages.averageCostDifference).toFixed(2)} more electricity on the weekends.`;
        } else if ( this.usageInsightMonthAverages.averageCostDifference < 0 ) {
            this.usageInsightMonthAverages.summary = `You use an average of $${Math.abs(this.usageInsightMonthAverages.averageCostDifference).toFixed(2)} less electricity on the weekends.`;
        } else {
            this.usageInsightMonthAverages.summary = `Your electricity usage is the same on the weekends and weekdays.`;
        }
    }

    public onMouseOver( visible: boolean ) {
        this.isToolTipVisible = visible;
    }

}
