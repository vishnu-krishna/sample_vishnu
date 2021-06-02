 /* tslint:disable:no-access-missing-member */
import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { UsageGraphItemMessage } from '../../../../shared/messages/usageGraphItem.message';
import { UsageDataModel } from '../../../../shared/model/usage/usageData.model';
import { UsageGranularity } from '../../../../shared/model/usage/usageGranularity.model';
import { UsageGraphItemViewModel } from '../../../../shared/model/usage/usageGraphItemView.model';
import { ApiService } from '../../../../shared/service/api.service';
import { IMessageBusService } from '../../../../shared/service/contract/imessageBus.service';
import { IUsageService } from '../../../../shared/service/contract/iusage.service';
import { IUsageRenderingService } from '../../../../shared/service/contract/iusageRendering.service';
import { ContractViewModel, IAccountServiceMA } from '../../../services/account.service';
import { UsageGraphBaseComponent } from '../usageGraphBase/usageGraphBase.component';

@Component({
    selector: 'agl-usage-graph-hourly',
    templateUrl: './usageGraphHourly.component.html',
    styleUrls: ['./usageGraphHourly.component.scss'],
})
export class UsageGraphHourlyComponent extends UsageGraphBaseComponent implements OnInit, OnDestroy, OnChanges {

    @Input() public ContractAccount: ContractViewModel;

    public usageGraphItemSubscription: Subscription;
    public selectedDay: Date;
    public timeOfDayUsage = [];
    public maxTimeOfDay: MaxTimeOfDayModel;
    public isGraphLoading: boolean = false;
    public showHourlyGraph: boolean = true;
    public isNoHourly: boolean;
    public isNoDaily: boolean;

    constructor(
        protected _usageService: IUsageService,
        protected _usageRenderingService: IUsageRenderingService,
        protected _messageBusService: IMessageBusService,
        protected _apiService: ApiService,
        protected _accountService: IAccountServiceMA,
    ) {
        super(
            _usageService,
            _usageRenderingService,
            _messageBusService,
            _apiService
        );

        this.itemWidthDesktop = 12;
        this.itemWidthTablet = 12;
        this.itemWidthMobile = 12;
        this.deviceType = 'desktop'; // Hourly graph only uses one viewport for all views.
        this.maxTimeOfDay = {
            value: 0,
            names: [],
            message: '',
            startTime: '',
            endTime: ''
        };
        this.graphGranularity = UsageGranularity.hourly;

        this.usageGraphItemSubscription = this._messageBusService.listenWithLatest(UsageGraphItemMessage).subscribe(
            (result) => {
                this.selectedDay = result.usageGraphItem.startDateTime;
                console.log('HOURLY GRAPH selectedDay: ', this.selectedDay);
                if ( this.selectedDay ) {
                    this.loadHourlyUsage();
                } else {
                    this.isNoDaily = true;
                    this.isNoHourly = false;
                    this.showHourlyGraph = false;
                }
            }
        );
    }

    public ngOnChanges() {
        if (this.ContractAccount) {
            this.activeContract = this.ContractAccount;
        }
    }

    public loadHourlyUsage() {
        if ( this.activeContract ) {
            if ( this.activeContract.contractNumber) {
                if ( this.selectedDay ) {
                    this._usageService.GetHourlyForDate( this.activeContract.contractNumber, new Date( this.selectedDay ) )
                    .subscribe(
                        (result) => {
                            if ( result ) {
                                this.showHourlyGraph = true;
                                this.isNoHourly = false;
                                this.parseUsageForChart(result);
                            } else {
                                this.showHourlyGraph = false;
                                this.isNoHourly = true;
                                this.isNoDaily = false;
                            }
                        },
                        (error) => {
                            this.updateLoadingState(false);
                        }
                    );
                }
            }
        }
    }

    public selectGraphItem(item: UsageGraphItemViewModel) {
        console.log('Hourly item selected - no action');
    }

    public updateScrollJump() {
        return;
    }

    public renderGraph() {
        if (this.isChartInitialised()) {
            console.log('Render Graph - There are ' + this.chartData.graphItems.length + ' item(s) in the chart');
            this.screenWidth = window.innerWidth;
            this.setWidth(this.screenWidth);
            if ( this.chartHasItems ) {
                this.selectedGraphItem = this.chartData.graphItems[ this.chartData.graphItems.length - 1 ];
                this.currentGraphIndex = this.selectedGraphItem.index;
                this.selectGraphItem( this.selectedGraphItem );
            }
        }
        this.updateLoadingState( false );
    }

    public parseUsageForChart( usageInfo: UsageDataModel,  ) {

        this.chartData = this._usageRenderingService.getChartDataFromUsageInfo( usageInfo, this.graphGranularity );
        this.yAxisLabels = this.chartData.yAxisLabels;
        this.graphCeilingValue = this.chartData.graphCeilingValue;
        this.prepareTimeOfDayUsage();

        // Render the graph and initialise the controls
        this.initResize();
    }

    public prepareTimeOfDayUsage() {
        let timeOfDayUsageValue: number[] = [];
        timeOfDayUsageValue['night'] = 0;
        timeOfDayUsageValue['morning'] = 0;
        timeOfDayUsageValue['noon'] = 0;
        timeOfDayUsageValue['evening'] = 0;
        this.maxTimeOfDay.value = 0;
        this.maxTimeOfDay.names = [];

        for ( let i = 0; i < 24; i ++ ) {
            if ( i >= 0 && i < 6) {
                timeOfDayUsageValue['night'] += this.chartData['graphItems'][i]['valueCost'];
            } else if ( i >= 6 && i < 12) {
                timeOfDayUsageValue['morning'] += this.chartData['graphItems'][i]['valueCost'];
            } else if ( i >= 12 && i < 18 ) {
                timeOfDayUsageValue['noon'] += this.chartData['graphItems'][i]['valueCost'];
            } else  if ( i >= 18 && i < 24) {
                timeOfDayUsageValue['evening'] += this.chartData['graphItems'][i]['valueCost'];
            }
        }

        this.timeOfDayUsage['morning'] = this._usageRenderingService.formatValueToString( timeOfDayUsageValue['morning'] );
        this.timeOfDayUsage['noon'] = this._usageRenderingService.formatValueToString( timeOfDayUsageValue['noon'] );
        this.timeOfDayUsage['evening'] = this._usageRenderingService.formatValueToString( timeOfDayUsageValue['evening'] );
        this.timeOfDayUsage['night'] = this._usageRenderingService.formatValueToString( timeOfDayUsageValue['night'] );

        if ( this.timeOfDayUsage['night'] >= this.maxTimeOfDay.value ) {
            this.maxTimeOfDay.names[0] = 'night';
            this.maxTimeOfDay.startTime = '12am';
            this.maxTimeOfDay.endTime = '6am';
            this.maxTimeOfDay.value = this.timeOfDayUsage['night'];
        }

        if ( this.timeOfDayUsage['morning'] >= this.maxTimeOfDay.value ) {
            if ( this.timeOfDayUsage['morning'] === this.maxTimeOfDay.value ) {
                    this.maxTimeOfDay.names[this.maxTimeOfDay.names.length]  = 'morning';
            } else {
                this.maxTimeOfDay.names = [];
                this.maxTimeOfDay.names[0] = 'morning';
                this.maxTimeOfDay.startTime = '6am';
                this.maxTimeOfDay.endTime = '12pm';
                this.maxTimeOfDay.value = this.timeOfDayUsage['morning'];
            }
        }

        if ( this.timeOfDayUsage['noon'] >= this.maxTimeOfDay.value ) {
            if ( this.timeOfDayUsage['noon'] === this.maxTimeOfDay.value ) {
                this.maxTimeOfDay.names[this.maxTimeOfDay.names.length] = 'afternoon';
            } else {
                this.maxTimeOfDay.names = [];
                this.maxTimeOfDay.startTime = '12pm';
                this.maxTimeOfDay.endTime = '6pm';
                this.maxTimeOfDay.names[0] = 'afternoon';
                this.maxTimeOfDay.value = this.timeOfDayUsage['noon'];
            }
        }

        if ( this.timeOfDayUsage['evening'] >= this.maxTimeOfDay.value ) {
            if ( this.timeOfDayUsage['evening'] === this.maxTimeOfDay.value ) {
                this.maxTimeOfDay.names[this.maxTimeOfDay.names.length]  = 'evening';
            } else {
                this.maxTimeOfDay.names = [];
                this.maxTimeOfDay.startTime = '6pm';
                this.maxTimeOfDay.endTime = '12am';
                this.maxTimeOfDay.names[0] = 'evening';
                this.maxTimeOfDay.value = this.timeOfDayUsage['evening'];
            }
        }

        // Coping the first value which will be default.
        if (this.maxTimeOfDay.names && this.maxTimeOfDay.names.length !== 4) {
            let message = '';
            if ( this.maxTimeOfDay.names.length === 1 ) {
                message = ` the ${this.maxTimeOfDay.names[0]} between ${this.maxTimeOfDay.startTime} - ${this.maxTimeOfDay.endTime}` ;
            } else {
                message = ` the ${this.maxTimeOfDay.names[0]}`;
            }

            if ( this.maxTimeOfDay.names.length > 1 ) {
                for (let i = 1; i < this.maxTimeOfDay.names.length; i ++) {
                    if ( i === this.maxTimeOfDay.names.length - 1) {
                        message += ` and  ${this.maxTimeOfDay.names[i]}`;
                    } else {
                        message += `,  ${this.maxTimeOfDay.names[i]}`;
                    }
                }
            }
            this.maxTimeOfDay.message = `Your electricity usage is highest during ${message}.`;
        } else {
            this.maxTimeOfDay.message = 'Your energy usage is consistent throughout the day.';
        }
    }

    public initResize() {
        this.renderGraph();
        this.initScrollButtons();
    }

    public ngOnInit() {
        this._accountService.getName().subscribe(
            (name) => {
                this.name = name;
                this.name.firstName = this.name.firstName.toLowerCase();
            }
        );
    }

    public ngOnDestroy() {
        if (this.usageGraphItemSubscription) {
            this.usageGraphItemSubscription.unsubscribe();
        }
    }
}

export class MaxTimeOfDayModel {
    public value: number;
    public names: string[];
    public startTime: string;
    public endTime: string;
    public message: string;
}
