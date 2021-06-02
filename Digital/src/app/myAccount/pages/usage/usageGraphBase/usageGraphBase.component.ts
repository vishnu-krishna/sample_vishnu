import { ViewChild } from '@angular/core';
import * as hammerjs from 'hammerjs';

import { UsageDataModel } from '../../../../shared/model/usage/usageData.model';
import { UsageGranularity } from '../../../../shared/model/usage/usageGranularity.model';
import { UsageGraphItemViewModel } from '../../../../shared/model/usage/usageGraphItemView.model';
import { UsageGraphViewModel } from '../../../../shared/model/usage/usageGraphView.model';
import { UsageInsightMonthAverages } from '../../../../shared/model/usage/usageInsightMonthAverages.model';
import { UsageInsightMonthPeaks } from '../../../../shared/model/usage/usageInsightMonthPeaks.model';
import { UsageInsightMonthSummary } from '../../../../shared/model/usage/usageInsightMonthSummary.model';
import { ApiService } from '../../../../shared/service/api.service';
import { IMessageBusService } from '../../../../shared/service/contract/imessageBus.service';
import { IUsageService } from '../../../../shared/service/contract/iusage.service';
import { IUsageRenderingService } from '../../../../shared/service/contract/iusageRendering.service';
import { AccountOwnerModel, ContractViewModel } from '../../../services/account.service';

export abstract class UsageGraphBaseComponent {

    @ViewChild('chartViewPortItems') public chartViewPortItems: any;
    @ViewChild('chartViewPort') public chartViewPort: any;

    public graphId: string;
    public name: AccountOwnerModel;
    public deviceType: string = '';
    public activeContract: ContractViewModel;
    public chartData: UsageGraphViewModel; // The master view model that contains the chart data
    public selectedGraphItem: UsageGraphItemViewModel; // The selected item of the graph
    public selectedWidgetItem: UsageGraphItemViewModel; // The selected item of the width. A different object is used to allow us to transition the text
    public graphScrollOffset: number = 0; // The current X-axis scroll offset in pixels
    public graphCurrentScrollOffset: string;
    public graphMaxValue: number = 0; // the value of the largest item in the data set
    public graphCeilingValue: number = 0; // the value we want to use as the chart height (generally the max value plus padding)
    public graphGranularity: UsageGranularity; // The granularity of the graph data we are currently showing (eg, Hourly, Daily, Weekly)
    public currentGraphIndex: number;
    public isScrollRightDisabled: boolean = false; // Indicates if there are no more items to the right, and if we are able to scroll in that direction
    public isScrollLeftDisabled: boolean = false;  // Indicates if there are no more items to the left, and if we are able to scroll in that direction
    public graphItemPixelWidth: number = 0; // The pixel width of a single graph item (used for scrolling and snap-to)
    public chartViewPortItemsWidth: number; // The width of each individual item in the graph. This changes depending on the browser width and is needed for calculations
    public scrollMultiplier: number = 1;
    public isPanning: boolean = false;
    public lastTimeStamp: any = 0;
    public lastDeltaX = 0;
    public newBarIndex: number = 0;
    public panEvents = [];
    public yAxisLabels = [];
    public isPersonalizedMsgDisplay: boolean = true;
    public smallValueThreshold: number = 10;
    public smallValueThresholdAxis: number = 20;
    public widgetAnimationMask: boolean = false; // True when we are changing the data in the insights widget
    public usageChargeDescription: string;
    public screenWidth: number;
    public isGraphLoading: boolean = true; // True if the requested graph data is currently loading
    public usageInsightMonthSummary: UsageInsightMonthSummary;
    public usageInsightMonthPeaks: UsageInsightMonthPeaks;
    public usageInsightMonthAverages: UsageInsightMonthAverages;
    public isCurrentbillPeriodSelected: boolean = false; // True if the selected bar in the graph is the current bill period
    public readonly smartInsightSummaryIndex: number = 0;
    public readonly smartInsightPeakIndex: number = 1;
    public readonly smartInsightWeekendAverageIndex: number = 2;
    public selectedInsightItemIndex: number = 0;
    public isMonthlyDetailsDisplayed: boolean = false;

    // Chart item widths
    public itemWidthDesktop: number = 0;
    public itemWidthTablet: number = 0;
    public itemWidthMobile: number = 0;

    constructor(protected _usageService: IUsageService,
                protected _usageRenderingService: IUsageRenderingService,
                protected _messageBusService: IMessageBusService,
                protected _apiService: ApiService) {

    }

    public abstract selectGraphItem(item: UsageGraphItemViewModel);

    public abstract updateScrollJump();

    // PAN & SCROLL
    public initHammerJS() {
        if (this.graphId) {
            let stage = document.getElementById(this.graphId);
            let mc = new hammerjs.Manager(stage);
            let Pan = new hammerjs.Pan({ direction: Hammer.DIRECTION_HORIZONTAL, threshold: 0 });
            mc.add(Pan);
        } else {
            console.warn('Graph ID is not set');
        }
    }

    public pan(event) {
        this.isPanning = true;
        if (event.timeStamp - this.lastTimeStamp > 300) { // New Pan event
            this.lastDeltaX = 0;
            this.panEvents = [];
        }
        // Still Panning
        this.panEvents.push(event);
        this.graphScrollOffset = Math.max(Math.min(0, this.graphScrollOffset + event.deltaX - this.lastDeltaX), (this.chartData.graphItems.length - 1) * this.graphItemPixelWidth * -1);
        this.newBarIndex = Math.round(( this.graphScrollOffset / this.graphItemPixelWidth ) * -1);
        this.lastDeltaX = event.deltaX;
        this.lastTimeStamp = event.timeStamp;
    }

    public graphItemSelected(item: UsageGraphItemViewModel) {
        this.isPersonalizedMsgDisplay = false;
        this.selectGraphItem(item);
    }

    public updateLoadingState(newLoadingState: boolean) {
        this.isGraphLoading = newLoadingState;
    }

    public panEnd(event) {
        if (this.isPanning) {
            this.isPanning = false;
            this.selectGraphItem(this.chartData.graphItems[this.newBarIndex]);
        }
    }

    public scrollLeft(scrollUnits = 1) {
        if (this.chartHasItems()) {
            this.isPersonalizedMsgDisplay = false;
            if (this.currentGraphIndex > 0) {
                let newGraphIndex = Math.max(0, this.currentGraphIndex - this.scrollMultiplier);
                let newItemToSelect = this.chartData.graphItems[newGraphIndex];
                this.selectGraphItem(newItemToSelect);
            }
            this.initScrollButtons();
        }
    }

    public scrollRight(scrollUnits = 1) {
        if (this.chartHasItems()) {
            this.isPersonalizedMsgDisplay = false;
            if (this.currentGraphIndex >= 0) {
                let newGraphIndex = Math.min(this.chartData.graphItems.length - 1, this.currentGraphIndex + this.scrollMultiplier);
                let newItemToSelect = this.chartData.graphItems[newGraphIndex];
                this.selectGraphItem(newItemToSelect);
            }
            this.initScrollButtons();
        }
    }

    public isDesktop(): boolean {
        return (this.deviceType === 'desktop_large' || this.deviceType === 'desktop_small');
    }

    public chartHasItems(ignoreOutOfRangePlaceholders: boolean = false) {
        if (this.chartData && this.chartData.graphItems) {
            if (ignoreOutOfRangePlaceholders) {
                return this.chartData.graphItems.filter((item) => {
                    return item.isFutureItemPlaceholder !== true && item.isEndOfDataRangePlaceholder !== true;
                }).length > 0;
            } else {
                return (this.chartData.graphItems.length > 0);
            }
        }
        return false;
    }

    public isChartInitialised() {
        return (this.chartData && this.chartData.graphItems);
    }

    public initScrollButtons() {
        if (this.chartHasItems()) {
            if (this.selectedGraphItem.index === this.chartData.graphItems.length - 1) {
                this.isScrollRightDisabled = true;
            } else {
                this.isScrollRightDisabled = false;
            }
            if (this.selectedGraphItem.index === 0) {
                this.isScrollLeftDisabled = true;

            } else {
                this.isScrollLeftDisabled = false;
            }
        }
    }

    public setWidth(width: number) {
        if (this.chartHasItems()) {
            let graphItemsEitherSideOfGunsight: number;
            if (this.graphGranularity === UsageGranularity.basic || this.graphGranularity === UsageGranularity.monthly) {
                graphItemsEitherSideOfGunsight = this.chartData.graphItems.length + 8;
            } else if (this.graphGranularity === UsageGranularity.hourly) {
                return;
            } else {
                graphItemsEitherSideOfGunsight = this.chartData.graphItems.length + 30;
            }

            this.getDeviceType(width);
            this.updateScrollJump();
            if (this.isDesktop()) {
                this.graphItemPixelWidth = this.itemWidthDesktop;
                this.chartViewPortItemsWidth = graphItemsEitherSideOfGunsight * this.graphItemPixelWidth;
            } else if (this.deviceType === 'tablet') {
                this.graphItemPixelWidth = this.itemWidthTablet;
                this.chartViewPortItemsWidth = graphItemsEitherSideOfGunsight * this.graphItemPixelWidth;
            } else if (this.deviceType === 'mobile') {
                this.graphItemPixelWidth = this.itemWidthMobile;
                this.chartViewPortItemsWidth = graphItemsEitherSideOfGunsight * this.graphItemPixelWidth;
            }
        }
    }

    public getDeviceType(width: number) {
        let newDeviceType: string;
        if (width >= 1200) {
            newDeviceType = 'desktop_large';
        } else if (width >= 992) {
            newDeviceType = 'desktop_small';
        } else if (width >= 768) {
            newDeviceType = 'tablet';
        } else if (width < 768) {
            newDeviceType = 'mobile';
        }
        if (newDeviceType !== this.deviceType) {
            console.log('Device Viewport has changed. TODO: Recalculate graph layout');
        }
        this.deviceType = newDeviceType;
    }

    public calculateGraphItemSize(item: UsageGraphItemViewModel): number {
        if (item) {
            if (this.deviceType === 'mobile') {
                if (item.barHeightMobile > 1) {
                    return item.barHeightMobile;
                } else {
                    return 1;
                }
            } else {
                if (item.barHeightDesktop > 1) {
                    return item.barHeightDesktop;
                } else {
                    return 1;
                }
            }
        }
        return 0;
    }

    public isViewportChangeRequired(): boolean {
        let width = window.innerWidth;
        let newDeviceType: string;
        if (width >= 1200) {
            newDeviceType = 'desktop_large';
        } else if (width >= 992) {
            newDeviceType = 'desktop_small';
        } else if (width >= 768) {
            newDeviceType = 'tablet';
        } else if (width < 768) {
            newDeviceType = 'mobile';
        }
        if (newDeviceType !== this.deviceType) {
            this.deviceType = newDeviceType;
            return true;
        }
        return false;
    }

    public haveAnyDailyDataForSelectedMonth(usageInfo: UsageDataModel) {
        if (usageInfo.costs && usageInfo.costs.length > 0) { // Show the Daily graph even if data is available for one day for a month
            return true;
        } else {
            return false;
        }
    }

    public capitalizeFirstLetter(stringValue) {
        return stringValue.charAt(0).toUpperCase() + stringValue.slice(1);
    }

}
