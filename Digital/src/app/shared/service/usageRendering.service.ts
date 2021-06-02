import { Injectable } from '@angular/core';
import * as moment from 'moment';

import { UsageDataModel } from '../model/usage/usageData.model';
import { UsageGraphItemViewModel } from '../model/usage/usageGraphItemView.model';
import { UsageGraphViewModel } from '../model/usage/usageGraphView.model';
import { UsageGranularity } from './../model/usage/usageGranularity.model';
import { IUsageRenderingService } from './contract/iusageRendering.service';

const smallValueThreshold: number = 10;
const smallValueThresholdAxis: number = 20;

@Injectable()
export class UsageRenderingService implements IUsageRenderingService {

    private debugMode: boolean = true;

    public getChartDataFromUsageInfo( usageInfo: UsageDataModel, graphGranularity ): UsageGraphViewModel {

        // Reset
        let graphMaxValue = 0;
        let chartData = new UsageGraphViewModel();
        let currentMonth: number = -1;

        for ( let item of usageInfo.costs ) {
            if ( item.value > graphMaxValue ) {
                graphMaxValue = item.value;
            }
        }

        // Granularity specific variables
        let chartHeightDesktop: number = 0;
        let chartHeightMobile: number = 0;
        let amountOfGridLines: number = 0;
        let graphCeilingPadding: number = 0; // The percentage of padding between graph maximum item and top of graph.

        if (graphGranularity === UsageGranularity.monthly || graphGranularity === UsageGranularity.basic) {
            amountOfGridLines = 4;
            chartHeightDesktop = 288;
            chartHeightMobile = 256;
            graphCeilingPadding = 20;
        } else if (graphGranularity === UsageGranularity.daily) {
            amountOfGridLines = 3;
            chartHeightDesktop = 214;
            chartHeightMobile = 214;
            graphCeilingPadding = 20;
        } else if (graphGranularity === UsageGranularity.hourly) {
            amountOfGridLines = 2;
            chartHeightDesktop = 75;
            chartHeightMobile = 75;
            graphCeilingPadding = 5;
        }

        chartData.graphCeilingValue = ( ( ( graphMaxValue / 100 ) * graphCeilingPadding ) + graphMaxValue );

        this.debug(`graphMaxValue=${graphMaxValue}, graphCeilingValue=${chartData.graphCeilingValue}`);

        if (graphGranularity === UsageGranularity.daily) {
            // Add the out of data range placeholders
            for (let i = 0; i <= 6; i++ ) {
                let newChartItem = new UsageGraphItemViewModel();
                newChartItem.isEndOfDataRangePlaceholder = true;
                newChartItem.index = chartData.graphItems.length;
                chartData.graphItems.push(newChartItem);

            }
        }

        // Generate the items for the graph
        for (let i of Object.keys(usageInfo.costs)) {

            let usageItem = usageInfo.costs[i];
            let associatedConsumption = usageInfo.consumption[i];

            let newChartItem = new UsageGraphItemViewModel();
            newChartItem.usageDatum = usageItem;

            if ( newChartItem.usageDatum.value < 0 ) {
                newChartItem.usageDatum.value = 0;
            }

            // set the cost and consumption values
            newChartItem.valueCost = usageItem.value;

            if ( newChartItem.valueCost < 0 ) {
                newChartItem.valueCost = 0;
            } else if ( newChartItem.valueCost < 10 ) {
                newChartItem.valueCost = +newChartItem.valueCost.toFixed( 2 );
            } else {
                newChartItem.valueCost = Math.round( newChartItem.valueCost );
            }

            newChartItem.barHeightDesktop = (( newChartItem.valueCost / chartData.graphCeilingValue ) * chartHeightDesktop );
            newChartItem.barHeightMobile = (( newChartItem.valueCost / chartData.graphCeilingValue ) * chartHeightMobile );

            newChartItem.estimatedRead = usageItem.estimatedRead;
            if (usageItem.estimatedRead) {
                chartData.hasMissingReads = true;
            }

            newChartItem.startDateTime = usageItem.startDateTime;
            newChartItem.endDateTime = usageItem.endDateTime;

            // Find corresponding value for consumption

            if ( ( associatedConsumption.startDateTime  === usageItem.startDateTime ) &&
                 ( associatedConsumption.endDateTime    === usageItem.endDateTime ) ) {

                newChartItem.valueConsumption = associatedConsumption.value;

            } else {
                console.error( 'ERROR: Could not find associated consumption record for the cost record ' + usageItem.startDateTime + ' - ' + usageItem.endDateTime );
            }

            let startDate = moment( usageItem.startDateTime );
            let endDate = moment( usageItem.endDateTime );

            if ( graphGranularity === UsageGranularity.basic  || graphGranularity === UsageGranularity.monthly ) {

                // calculate averages
                let daysInSelectedPeriod = endDate.diff( startDate, 'days' ) + 1;
                if ( daysInSelectedPeriod > 0 ) {
                    newChartItem.daysOfData = daysInSelectedPeriod;
                    newChartItem.averageConsumption = this.calculateAverage(daysInSelectedPeriod, newChartItem.valueConsumption);
                    newChartItem.averageCost = this.calculateAverage(daysInSelectedPeriod, newChartItem.valueCost);
                }

                let startDateFormat = ( startDate.year() === endDate.year() ? 'D MMM' : 'D MMM YYYY' );
                let timeSpanTitleStart = moment( usageItem.startDateTime ).format( 'MMM' );
                let timeSpanTitleEnd = moment( usageItem.endDateTime ).format( 'MMM' );

                if ( timeSpanTitleStart === timeSpanTitleEnd ) {
                    newChartItem.timeSpanTitle = timeSpanTitleStart;
                    newChartItem.timeSpanTitleMobile = timeSpanTitleStart;
                } else {
                    newChartItem.timeSpanTitle = timeSpanTitleStart + ' - ' + timeSpanTitleEnd;
                    newChartItem.timeSpanTitleMobile = timeSpanTitleStart + '-' + timeSpanTitleEnd;
                }
                if ( graphGranularity === UsageGranularity.monthly ) {
                    newChartItem.timeSpanTitleInsight = startDate.format( 'MMMM YYYY' ); // For monthly graph, only nonth and year need to show
                } else {
                    newChartItem.timeSpanTitleInsight = startDate.format( startDateFormat ) + ' - ' + endDate.format( 'D MMM YYYY' );
                }

            } else if (graphGranularity === UsageGranularity.daily) {

                let thisMonth = startDate.month();
                if (thisMonth !== currentMonth) {
                    if (currentMonth !== -1) {
                        newChartItem.isFirstOfNewMonth = true;
                    }
                    currentMonth = thisMonth;
                }

            }

            newChartItem.index = chartData.graphItems.length;
            chartData.graphItems.push( newChartItem );
        }

        // Grid Lines
        let axisDecimalPlaces = 2;
        if ( graphMaxValue > smallValueThresholdAxis ) {
            axisDecimalPlaces = 0;
        }

        for (let i = 1; i <= amountOfGridLines; i++) {
            let percentile = (i) / (amountOfGridLines) * 100;
            let axisValue = ((percentile * chartData.graphCeilingValue) / 100);
            this.debug(`i=${i}, amountOfGridLines=${amountOfGridLines}, percentile = ${percentile}, axisValue=${axisValue}`);
            chartData.yAxisLabels[i - 1] = axisValue.toFixed(axisDecimalPlaces);
        }

        return chartData;
    }

    public calculateAverage(daysInSelectedPeriod: number, value: number): string {
        return this.formatValueToString( value / daysInSelectedPeriod );
    }

    public formatValueToString( value: number ): string {

        let formattedValue = '0';

        if ( value < smallValueThreshold ) {
            formattedValue = value.toFixed( 2 );
            let fractionSplit = formattedValue.split( '.' );

            if ( fractionSplit.length === 2 && fractionSplit[1].length === 1 ) {
                formattedValue += '0';
            }

        } else {
            formattedValue = Math.round( value ).toString();
        }

        return formattedValue;
    }

    private debug(msg: any) {
        if (this.debugMode) {
            console.log('*** USAGE RENDERING SERVICE: ' + msg);
        }
    }

}
