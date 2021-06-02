 /* tslint:disable:no-access-missing-member */
import { AfterViewInit, Component, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';
import findLast from 'lodash-es/findLast';
import * as moment from 'moment';
import { Subscription } from 'rxjs/Subscription';
import { UsageGraphItemMessage } from '../../../../shared/messages/usageGraphItem.message';
import { UsageLoadContractInModalMessage } from '../../../../shared/messages/usageLoadContractInModal.message';
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
    selector: 'agl-usage-graph-daily',
    templateUrl: './usageGraphDaily.component.html',
    styleUrls: ['./usageGraphDaily.component.scss'],
})
export class UsageGraphDailyComponent extends UsageGraphBaseComponent implements OnInit, OnDestroy, AfterViewInit {

    @Input() public ContractAccount: ContractViewModel;
    @Output() public itemSelected: EventEmitter<UsageGraphItemViewModel> = new EventEmitter<UsageGraphItemViewModel>();

    public startingMonth: Date;
    private loadNewGraphSubscription: Subscription;

    constructor(
        protected _usageService: IUsageService,
        protected _usageRenderingService: IUsageRenderingService,
        protected _messageBusService: IMessageBusService,
        protected _apiService: ApiService,
        protected _accountService: IAccountServiceMA
    ) {
        super(
            _usageService,
            _usageRenderingService,
            _messageBusService,
            _apiService
        );
        this.graphId = 'usage-graph-daily';
        this.itemWidthDesktop = 22;
        this.itemWidthTablet = 36;
        this.itemWidthMobile = 36;

        this.graphGranularity = UsageGranularity.daily;

        this.loadNewGraphSubscription = this._messageBusService.listenWithLatest(UsageLoadContractInModalMessage).subscribe(
            (result) => {
                this.startingMonth = result.SelectedMonth;
                if (this.activeContract !== result.Contract) {
                    this.updateLoadingState(true);
                    console.log('UsageGraphMonthlyAndBasicComponent -> UsageLoadNewContractMessage for contract = ' + result.Contract.contractNumber);
                    this.activeContract = result.Contract;
                    console.log('ACTIVE CONTRACT: ', this.activeContract);
                    if (result.Contract.isSmartMeter) {
                        this.loadDailyUsage();
                    }
                } else {
                    this.selectStartingItem();
                }
            }
        );

    }

    public selectGraphItem(item: UsageGraphItemViewModel) {

        let usageGraphItemMessage = new UsageGraphItemMessage(item);
        this._messageBusService.broadcast( usageGraphItemMessage );
        this.itemSelected.emit(item);

        this.isPanning = true;
        this.selectedGraphItem = item;
        this.widgetAnimationMask = true;

        console.log( 'CURRENT GRAPH ITEM: ', this.currentGraphIndex);
        console.log( 'NEWLY SELECTED GRAPH ITEM: ', this.selectedGraphItem.index);
        console.log( 'SELECTED GRAPH ITEM: ', this.selectedGraphItem);

        this.graphScrollOffset = this.selectedGraphItem.index * this.graphItemPixelWidth * -1;
        this.currentGraphIndex = this.selectedGraphItem.index;
        this.initScrollButtons();
        this.isPanning = false;
    }

    public updateScrollJump() {
        if (this.isDesktop()) {
            this.scrollMultiplier = 8;
        } else {
            this.scrollMultiplier = 2;
        }
    }

    @HostListener('window:resize', ['$event'])
    public onResize(event) {
        if (this.isViewportChangeRequired()) {
            this.initResize();
        }
    }

    public loadDailyUsage() {
        this._usageService.GetDaily(this.activeContract.contractNumber)
            .subscribe(
                (result) => {
                    this.parseUsageForChart(result);
                },
                (error) => {
                    this.updateLoadingState(false);
                }
            );
    }

    public renderGraph() {
        if (this.isChartInitialised()) {
            console.log('Render Graph - There are ' + this.chartData.graphItems.length + ' item(s) in the chart');
            this.screenWidth = window.innerWidth;
            this.setWidth(this.screenWidth);
            this.selectStartingItem();
        }
        this.updateLoadingState(false);
    }

    public parseUsageForChart( usageInfo: UsageDataModel ) {

        this.chartData = this._usageRenderingService.getChartDataFromUsageInfo( usageInfo, this.graphGranularity );
        this.yAxisLabels = this.chartData.yAxisLabels;
        this.graphCeilingValue = this.chartData.graphCeilingValue;
        // Render the graph and initialise the controls
        this.initResize();
    }

    public initResize() {
        this.renderGraph();
        this.initScrollButtons();
    }

    public ngOnInit() {
        this._accountService.getName().subscribe(
            (name) => {
                this.name = name;
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

    /**
     * Selects the starting item for viewing the graph
     */
    private selectStartingItem() {
        if (this.chartData && this.chartData.graphItems && this.chartData.graphItems.length > 0) {
            let lastDailyItemOfMonth: UsageGraphItemViewModel;
            if (this.startingMonth) {
                let month = moment(this.startingMonth);
                lastDailyItemOfMonth = findLast(this.chartData.graphItems, (item) => {
                    return moment(item.startDateTime).isSame(month, 'month');
                });
            }
            if (lastDailyItemOfMonth) {
                this.selectedGraphItem = lastDailyItemOfMonth;
            } else {
                this.selectedGraphItem = this.chartData.graphItems[this.chartData.graphItems.length - 1];
            }
            this.currentGraphIndex = this.selectedGraphItem.index;
            this.selectGraphItem(this.selectedGraphItem);
        }
    }

}
