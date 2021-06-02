import {
    animate,
    state,
    style,
    transition,
    trigger } from '@angular/animations';
import { Location } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { UsageModalMessage } from '../../../../shared/messages/usageModalMessage.message';
import { UsageGraphItemViewModel } from '../../../../shared/model/usage/usageGraphItemView.model';
import { IMessageBusService } from '../../../../shared/service/contract/imessageBus.service';
import { IUsageService } from '../../../../shared/service/contract/iusage.service';
import { IUsageRenderingService } from '../../../../shared/service/contract/iusageRendering.service';
import { ContractViewModel } from '../../../services/account.service';

@Component({
    selector: 'agl-usage-modal',
    templateUrl: './usageModal.component.html',
    styleUrls: ['./usageModal.component.scss'],
    animations: [
        trigger('loadedState', [
            state('hidden', style({
                transform: 'translateY(75%)',
            })),
            state('shown', style({
                transform: 'translateY(0%)',
                width: '100%'
            })),
            transition('* => *', animate('.3s'))
        ])
    ]
})

export class UsageModalComponent implements AfterViewInit {

    @Output() public isDailyUsageModalDisplayed = new EventEmitter<any>();
    @Input() public activeContract: ContractViewModel;

    public valueCost: string;
    public valueConsumption: string;
    public selectedGraphItem: UsageGraphItemViewModel;
    public monthSoFarCost: string;
    public monthSoFarConsumption: string;
    public isMonthComplete: boolean;
    public visibility = 'hidden';
    public isEstimatedMessageReadMore: boolean = false;
    private locationSubscription: Subscription;

    constructor(
        protected _usageService: IUsageService,
        private _messageBusService: IMessageBusService,
        protected _usageRenderingService: IUsageRenderingService,
        private location: Location
    ) { }

    public ngAfterViewInit() {
        console.log('Modal activeContract: ', this.activeContract );
        this._messageBusService.listenWithLatest(UsageModalMessage).subscribe(
            (result) => {
                this.visibility = result.visibility;
            }
        );

        // Support browser back button by pushing an extra url into the browser history
        window.history.pushState(window.history.state, window.document.title, window.location.href);

        // Listen for navigation change (if the subscription doesn't already exist)
        if (!this.locationSubscription) {
            this.locationSubscription = <Subscription> this.location.subscribe(() => {
                this.cleanUpSubscriptions();
                this.usageModalClose(true);
            });
        }
    }

    public prepareStatsWidget() {
        if ( this.selectedGraphItem ) {
            if ( this.selectedGraphItem.valueCost ) {
                if (this.selectedGraphItem.valueCost === 0 ) {
                    this.valueCost = '- -';
                } else {
                    this.valueCost = this._usageRenderingService.formatValueToString( this.selectedGraphItem.valueCost );
                }
            } else {
                this.valueCost = '- -';
            }
            if ( this.selectedGraphItem.valueConsumption ) {
                if (this.selectedGraphItem.valueConsumption === 0 ) {
                    this.valueConsumption = '- -';
                } else {
                    this.valueConsumption = this._usageRenderingService.formatValueToString( this.selectedGraphItem.valueConsumption );
                }
            } else {
                this.valueConsumption = '- -';
            }
        }
    }

    public onDailyGraphItemSelected($event: UsageGraphItemViewModel) {
        if ($event) {

            this.selectedGraphItem = $event;
            this.prepareStatsWidget();
            this.monthSoFarCost = '- -';
            this.monthSoFarConsumption = '- -';
            this.isMonthComplete = false;

            this._usageService.GetMonthlyForDay(this.activeContract, this.selectedGraphItem.startDateTime)
                .subscribe(
                    (result) => {
                        if (result && result.costs && result.consumption) {
                            if (result.costs.length === 1 && result.consumption.length === 1) {
                                let monthlyCost = result.costs[0];
                                let monthlyConsumption = result.consumption[0];
                                this.monthSoFarCost = this._usageRenderingService.formatValueToString(monthlyCost.value);
                                this.monthSoFarConsumption = this._usageRenderingService.formatValueToString(monthlyConsumption.value);
                                this._usageService.HaveCompleteDailyDataForMonth(this.activeContract, this.selectedGraphItem.startDateTime).subscribe(
                                    (hasComplete) => {
                                        this.isMonthComplete = hasComplete;
                                    }
                                );
                            }
                        }
                    }
                );
        }
    }

    public usageModalClose(browserBackButtonClicked: boolean = false) {

        // For non browser back closing of the dialog we need to clean up the top level history
        if (!browserBackButtonClicked) {
            this.location.back();
        }

        this.visibility = 'hidden';
        setTimeout(() => {
            this.isDailyUsageModalDisplayed.emit(false);
            document.body.style.overflow = 'auto';
        }, 300);
    }

    public usageEstimatedMessageReadMore(result) {
        this.isEstimatedMessageReadMore = result;
    }

    private cleanUpSubscriptions() {
        // Make sure that subscriptions are removed if the component is destroyed
        if (this.locationSubscription) {
            this.locationSubscription.unsubscribe();
            this.locationSubscription = undefined;
        }
    }
}
