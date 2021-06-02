import { AfterContentChecked, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { SetUpBillSmoothingResultMessage } from '../../../../../../shared/messages/setUpBillSmoothingResultMessage';
import { ApiService } from '../../../../../../shared/service/api.service';
import { IMessageBusService } from '../../../../../../shared/service/contract/imessageBus.service';
import { DataLayerService, EventAction, EventCategory, EventLabel, ModalName } from '../../../../../../shared/service/dataLayer.service';
import { IAccountServiceMA } from '../../../../../services/account.service';
import { BillSmoothingFrequency, BillSmoothingFuelDisplayModel } from '../../billSmoothing.model';
import { BillSmoothingService } from '../../billSmoothing.service';
import { MonthlyDatePickerDateViewModel, MonthlyDatePickerViewModel } from './monthlyDatePicker/monthlyDatePickerViewModel.model';

@Component({
    selector: 'agl-bill-smoothing-setup-fuel-item',
    templateUrl: './billSmoothingSetupFuelItem.component.html',
    styleUrls: ['./billSmoothingSetupFuelItem.component.scss'],
})
export class BillSmoothingSetupFuelItemComponent implements OnInit, OnChanges, AfterContentChecked {
    public isSelected: boolean = false;
    public displayContent: boolean = false;
    public selectedDate: string;
    public selectedDay: string;
    public selectedDateOrdinal: string;
    public isLoading: boolean;
    public isDirectDebit: boolean;
    // style bindings
    public height: number = 0;
    // monthly date picker
    public isMonthlyOpen: boolean = false;
    public monthlyDatePickerViewModel: MonthlyDatePickerViewModel;
    // savePaymentScheme error
    public isSavePaymentSchemeError: boolean = false;
    public savePaymentSchemeErrorHeading: string = `Sorry, we couldn't set up Bill Smoothing.`;
    public startInformationSubtext: string;
    public billCycleChangeMessage: string;

    @Input() public frequency;
    @Input() public billSmoothingFuels: BillSmoothingFuelDisplayModel[];
    @Input() public selectedFrequency: BillSmoothingFrequency;
    @Output() public notify: EventEmitter<BillSmoothingFrequency> = new EventEmitter<BillSmoothingFrequency>();
    @ViewChild('content') public elementView: ElementRef;

    public days = [
        DayOfWeek.Monday,
        DayOfWeek.Tuesday,
        DayOfWeek.Wednesday,
        DayOfWeek.Thursday,
        DayOfWeek.Friday
    ];
    public dates = [];
    private startDate: Date;
    private twoWeeksInDays: number = 14;

    constructor(
        private api: ApiService,
        private accountService: IAccountServiceMA,
        private messageBusService: IMessageBusService,
        private cdRef: ChangeDetectorRef,
        private billSmoothingService: BillSmoothingService,
        private dataLayerService: DataLayerService
    ) { }

    public ngOnInit() {
        let paymentOption = this.billSmoothingFuels[0].paymentOptions.find((x) => x.frequency === this.frequency.toString());
        this.isDirectDebit = this.billSmoothingFuels[0].hasDirectDebit;

        if (paymentOption.frequency === BillSmoothingFrequency.Monthly.toString()) {
            this.populateMonthlyDates();
        } else {
            let date = new Date();
            this.startDate = date;
            let dayOfWeek = BillSmoothingService.generateDayFromDate(date);

            if (dayOfWeek === DayOfWeek.Saturday.toString()) {
                dayOfWeek = DayOfWeek.Monday.toString();
                this.startDate = moment(date).add(2, 'day').toDate();
            } else if (dayOfWeek === DayOfWeek.Sunday.toString()) {
                dayOfWeek = DayOfWeek.Monday.toString();
                this.startDate = moment(date).add(1, 'day').toDate();
            }

            this.selectedDay = dayOfWeek;
            this.populateWeeklyAndFortnightlyDates(); // populate weekly and fortnightly dates
        }

        this.startInformationSubtext = this.billSmoothingService.getStartInformationSubtext(
            this.frequency,
            this.isDirectDebit,
            this.selectedDay,
            this.selectedDateOrdinal);

        this.billCycleChangeMessage = this.billSmoothingService.generateBillCycleChangeMessage(this.billSmoothingFuels);
    }

    public ngOnChanges() {
        this.isSelected = this.frequency === this.selectedFrequency;
        this.billCycleChangeMessage = this.billSmoothingService.generateBillCycleChangeMessage(this.billSmoothingFuels);
        if (this.isSelected) {
            setTimeout(() => {
                this.displayContent = true;
            }, 300);
        } else {
            this.displayContent = false;
        }
    }

    public ngAfterContentChecked(): void {
        if (!this.isSelected) {
            this.height = 0;
        } else {
            // Change the height to trigger a transition when content changes/disappears.
            this.cdRef.detectChanges();
            this.height = this.elementView.nativeElement.offsetHeight;
        }
    }

    public populateWeeklyAndFortnightlyDates() {
        // populate weekly and fortnightly dates
        this.dates = [];
        let selectedDateHasBeenPicked = false;

        let paymentOption = this.billSmoothingFuels[0].paymentOptions.find((x) => x.frequency === this.frequency.toString());
        let minDate = new Date(paymentOption.minDate);
        let maxDate = new Date(paymentOption.maxDate);
        let excludedDates = paymentOption.excludedDates.map((date) => new Date(date).toISOString());

        while (BillSmoothingService.generateDayFromDate(minDate) !== this.selectedDay) {
            minDate.setDate(minDate.getDate() + 1);
        }

        let validDate = minDate;
        while (validDate <= maxDate) {
            if (excludedDates.indexOf(validDate.toISOString()) === -1) {
                let formattedValidDate = moment(validDate).format('DD MMM YYYY');
                if (validDate >= moment(this.startDate).add(this.twoWeeksInDays - 1, 'day').toDate() && !selectedDateHasBeenPicked) {
                    selectedDateHasBeenPicked = true;
                    this.selectedDate = formattedValidDate;
                }
                this.dates.push(formattedValidDate);
            }
            validDate = moment(validDate).add(1, 'week').toDate();
        }
        if (!selectedDateHasBeenPicked) {
            this.selectedDate = this.dates[1];
        }

        this.startInformationSubtext = this.billSmoothingService.getStartInformationSubtext(
            this.frequency,
            this.isDirectDebit,
            this.selectedDay,
            null);
    }

    public populateMonthlyDates() {
        let paymentOption = this.billSmoothingFuels[0].paymentOptions.find((x) => x.frequency === this.frequency.toString());
        let minDate = new Date(paymentOption.minDate);
        let maxDate = new Date(paymentOption.maxDate);
        const excludedDates = paymentOption.excludedDates.map((d) => new Date(d));
        this.monthlyDatePickerViewModel = new MonthlyDatePickerViewModel(minDate, maxDate, excludedDates);
        this.setSelectionFromMonthlyDatePicker();
    }

    public onMonthlySelectorOpen(event) {
        this.isMonthlyOpen = true;
        event.preventDefault();
    }

    public onMonthlySelectorSelect(date: MonthlyDatePickerDateViewModel) {
        this.monthlyDatePickerViewModel.SelectedDate = date;
        this.setSelectionFromMonthlyDatePicker();
        this.isMonthlyOpen = false;

        this.startInformationSubtext = this.billSmoothingService.getStartInformationSubtext(
            this.frequency,
            this.isDirectDebit,
            this.selectedDay,
            this.selectedDateOrdinal);
    }

    public onMonthlySelectorClose() {
        this.isMonthlyOpen = false;
    }

    public generateAmountPerFuel() {
        let amountPerFuels = [];
        amountPerFuels = this.billSmoothingFuels.map((fuelType) => {
            let estimateAmount = fuelType.paymentOptions.find((x) => x.frequency === this.frequency.toString());

            if (estimateAmount) {
                return ({
                    amount: estimateAmount.amount,
                    fuel: fuelType.fuel
                });
            }
        });
        return amountPerFuels;
    }

    public toggleOpen(): void {
        if (this.frequency === this.selectedFrequency) {
            this.notify.emit(BillSmoothingFrequency.None);
        } else {
            this.dataLayerService.pushClickEvent(ModalName.BillSmoothingSetup, EventCategory.BillSmoothing, EventAction.BillSmoothingFrequencySelection, this.generateEventLabel());
            this.notify.emit(this.frequency);
        }
        this.height = this.isSelected ? 0 : this.elementView.nativeElement.offsetHeight;
    }

    public savePaymentScheme() {
        this.isLoading = true;
        let paymentSchemeArray = {
            paymentSchemes: []
        };

        paymentSchemeArray.paymentSchemes = this.billSmoothingFuels.map((fuelType) => {
            let paymentOption = fuelType.paymentOptions.find((x) => x.frequency === this.frequency.toString());
            return {
                contractNumber: fuelType.contractNumber,
                frequency: this.frequency,
                amount: paymentOption.amount,
                firstPaymentDate: new Date(this.selectedDate).toISOString()
            };
        });

        this.api.postBillSmoothingScheme(this.billSmoothingFuels[0].contractAccountNumber.toString(), paymentSchemeArray)
            .finally(() => {
                this.isLoading = false;
            }).subscribe((response) => {
                if (response.results.every((r) => !r.isSuccess)) {
                    this.isSavePaymentSchemeError = true;
                } else if (response.results.some((r) => r.isSuccess)) {
                    this.accountService.refreshAccounts();
                    let setUpBillSmoothingResultMessage = new SetUpBillSmoothingResultMessage();
                    setUpBillSmoothingResultMessage.startDate = new Date(this.selectedDate);
                    setUpBillSmoothingResultMessage.frequency = this.frequency.toString();
                    setUpBillSmoothingResultMessage.saveResultDetails = response.results.map((result) => {
                        let fuelType = this.billSmoothingFuels.find((f) => f.contractNumber === result.contractNumber);
                        let paymentOption = fuelType.paymentOptions.find((x) => x.frequency === this.frequency.toString());
                        return {
                            isSuccessful: result.isSuccess,
                            fuel: fuelType.fuel,
                            amount: Number(paymentOption.amount)
                        };
                    });
                    this.messageBusService.broadcast(setUpBillSmoothingResultMessage);
                }
            },
            (error) => {
                this.isSavePaymentSchemeError = true;
            });
    }

    private setSelectionFromMonthlyDatePicker() {
        const selectedDate = this.monthlyDatePickerViewModel.SelectedDate;
        if (selectedDate) {
            this.selectedDateOrdinal = selectedDate.Ordinal;
            this.selectedDate = selectedDate.Full;
            this.selectedDay = selectedDate.Weekday;
        } else {
            this.selectedDateOrdinal = '';
            this.selectedDate = '';
            this.selectedDay = '';
        }
    }

    private generateEventLabel(): EventLabel {
        const billSmoothingFrequencyToEventLabelMap = {
            [BillSmoothingFrequency.Weekly]: EventLabel.Weekly,
            [BillSmoothingFrequency.Fortnightly]: EventLabel.Fortnightly,
            [BillSmoothingFrequency.Monthly]: EventLabel.Monthly
        };
        return billSmoothingFrequencyToEventLabelMap[this.frequency] || EventLabel.None;
    }
}

export enum DayOfWeek {
    Sunday = <any> 'Sunday',
    Monday = <any> 'Monday',
    Tuesday = <any> 'Tuesday',
    Wednesday = <any> 'Wednesday',
    Thursday = <any> 'Thursday',
    Friday = <any> 'Friday',
    Saturday = <any> 'Saturday'
}
