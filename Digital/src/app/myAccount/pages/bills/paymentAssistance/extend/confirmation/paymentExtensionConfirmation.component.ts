import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import * as moment from 'moment';
import { Subscription } from 'rxjs/Subscription';
import { DataLayerService } from '../../../../../../shared/service/dataLayer.service';
import { FuelChipContract, FuelChipContractAccountDetails } from '../../../../../maui/fuelChip';
import { FuelChipData } from '../eligibility/fuelChipData';
import { IPaymentExtensionStateService } from '../services/paymentExtensionState.service';
import { CalendarReminderModel } from '../../../../../maui/calendarReminder';
import { CalendarType } from '../../../../../maui/calendarReminder/calendarReminder.enum';
import { AglCurrencyPipe } from '../../../../../pipes/aglCurrency.pipe';

@Component({
    selector: 'agl-payment-extension-confirmation',
    templateUrl: './paymentExtensionConfirmation.component.html',
    styleUrls: ['./paymentExtensionConfirmation.component.scss']
})

export class PaymentExtensionConfirmationComponent implements OnInit, OnDestroy {
    public CalendarType = CalendarType;
    public selectedCalendarType: CalendarType;
    public fuelChipData: FuelChipData;
    public eligibleFuelChips: FuelChipData[];
    public isVicRegion: boolean;
    public isReady: boolean = false;
    public calendarReminderModel: CalendarReminderModel = new CalendarReminderModel();
    private subscriptions: Subscription[] = [];
    public get hasMoreEligibleFuelChips(): boolean {
        return !!this.eligibleFuelChips.length;
    }

    public get buttonType(): string {
        return this.hasMoreEligibleFuelChips ? 'secondary' : 'primary';
    }
    constructor(
        private paymentExtensionStateService: IPaymentExtensionStateService,
        private router: Router,
        private dataLayerService: DataLayerService
    ) {}

    public ngOnInit() {

        this.fuelChipData = this.paymentExtensionStateService.getExtendedFuelChip();
        if (this.fuelChipData) {
            this.eligibleFuelChips = this.paymentExtensionStateService.getEligibleFuelChips();
            this.assignIsVicRegion();

            // Subscribe to change of route - Lean Engage Survey will trigger if the user navigates away from the page
            this.subscriptions.push(
                this.router.events
                    .filter((event) => event instanceof NavigationStart)
                    .subscribe((val) => {
                        this.triggerLeanEngageSurvey();
                    })
            );

            this.isReady = true;
            this.createCalendarReminder(this.calendarReminderModel, this.fuelChipData);
        } else {
            this.goToOverview();
        }
    }

    // TODO move into a common function
    public createCalendarReminder(calendarReminderModel: CalendarReminderModel, fuelChipData: FuelChipData): void {

        let currencyPipe = new AglCurrencyPipe();
        // note the '%208:00' relates to the time of the event ie 8am
        const startDate = moment(fuelChipData.eligibility.dueDate).format('YYYY/MM/DD') + ' 8:00';
        // refer to DSP-23037
        const latePaymentFeeText = (!this.isVicRegion ? 'avoid late payment fees and ' : '');
        calendarReminderModel.startDate = startDate;
        calendarReminderModel.title = `AGL ${fuelChipData.fuelType} bill due`;
        calendarReminderModel.description = `A reminder that your extended AGL ${fuelChipData.fuelType} bill payment is due today.<br><br>` +
        `Amount due: ${currencyPipe.transform(fuelChipData.eligibility.totalAmountDue)}.<br><br>` +
        `To make a payment, simply visit https://agl.com.au/login and log into My Account.<br><br>` +
        `Please note: it’s important to pay by the extended due date to ${latePaymentFeeText}prevent any collections activities by AGL.<br><br>` +
        `If you need assistance or have any questions, feel free to call us anytime 24/7 on 131 245.`;
    }

    public ngOnDestroy() {
        // Clean up subscriptions - we don't want these to persist after the page is destroyed
        for (const subscription of this.subscriptions) {
            subscription.unsubscribe();
        }
    }

    public goToOverview() {
        this.router.navigate(['/overview']);
    }

    public onFuelChipSelected(accountNumber: string, contractNumber: string) {
        this.paymentExtensionStateService.selectChip(contractNumber);
        this.router.navigate([`/bills/paymentassistance/extend/confirm/${accountNumber}/${contractNumber}`]);
    }

    private assignIsVicRegion() {
        const contracts = this.fuelChipData.accountDetails.reduce((total: FuelChipContract[], current: FuelChipContractAccountDetails) => {
            return total.concat(current.contracts);
        }, []);

        const contract = contracts.find((c: FuelChipContract) => {
            return c.contractNumber === this.fuelChipData.contractNumber;
        });

        this.isVicRegion = contract.IsVicRegion;
    }

    public calendarSelected(link) {
        this.dataLayerService.trackAddCalendarReminderEvent(link, location.href, location.pathname);
        this.triggerLeanEngageSurvey();
    }
    /**
     * Based on business logic optionally open the lean engage survey
     */
    private triggerLeanEngageSurvey() {
        // Only show the survey when there are no other eligible fuel chips and how not previously been shown
        if (this.paymentExtensionStateService.shouldLeanEngageSurveyBeShown()) {
            this.paymentExtensionStateService.showLeanEngageSurveyOnSuccessfulSetup();
            this.paymentExtensionStateService.setLeanEngageSurveyShown(true);
        }
    }
}
