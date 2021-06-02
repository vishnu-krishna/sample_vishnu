import { ContractAccountNumber } from './../../../../../services/settings/model/contractAccountNumber';
import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { LinkTarget } from '../../../../../../shared/component/link/link.enum';
import { DataLayerService, EventAction, EventCategory, EventLabel, ModalName } from '../../../../../../shared/service/dataLayer.service';
import { Now } from '../../../../../../shared/service/now.service';
import { CalendarReminderModel } from '../../../../../maui/calendarReminder';
import { CalendarFrequency, CalendarType } from '../../../../../maui/calendarReminder/calendarReminder.enum';
import { FlashMessageType } from '../../../../../maui/flashMessage';
import { AccountViewModel, IAccountServiceMA } from '../../../../../services/account.service';
import { GenericStateService } from '../../../../../services/generics/genericState.service';
import { PaymentService } from '../../../../../services/payment.service';
import { InstalmentPlanFrequency, PaymentArrangementInstalmentSummaryItem } from '../../../../../services/paymentScheme/paymentSchemeApi.service';
import { BillDeliveryMethodType, PaymentMethod, SettingsAggregateModel } from '../../../../../services/settings/model';
import { IPaymentMethodsService } from '../../../../../services/settings/paymentMethods.service.interface';
import { ISettingsService } from '../../../../../services/settings/settings.service.interface';
import { IPaymentExtensionStateService } from '../../extend/services/paymentExtensionState.service';
import { FuelChipDataModel } from '../../models';
import { ClassifiedFuelChips, FuelChipService } from '../../services';
import { PaymentAssistancePlanConfirmStateModel } from '../confirm';
import { InstalmentStatus, PaymentAssistancePlanInstalmentsModel, PaymentAssistancePlanInstalmentsProgressItem } from '../instalments';
import { PaymentAssistancePlanSuccessFuelChipHeaderModel } from './fuelChipHeader';
import { PaymentAssistancePlanSuccessFuelChipsModel } from './fuelChips';
import { PromoTileType } from './paymentAssistancePlanSuccess.component.enum';
import { PaymentAssistancePlanSuccessSummaryModel } from './summary';
import { SurveyService, SurveyType } from '../../../../../services/survey.service';

@Component({
    selector: 'agl-payment-assistance-plan-success',
    templateUrl: './paymentAssistancePlanSuccess.component.html',
    styleUrls: ['./paymentAssistancePlanSuccess.component.scss']
})
export class PaymentAssistancePlanSuccessComponent implements OnInit, OnDestroy {

    public flashMessageType = FlashMessageType;

    public fuelChipHeaderModel: PaymentAssistancePlanSuccessFuelChipHeaderModel;
    public summaryModel: PaymentAssistancePlanSuccessSummaryModel;
    public instalmentsModel: PaymentAssistancePlanInstalmentsModel;
    public fuelChipsModel: PaymentAssistancePlanSuccessFuelChipsModel;

    public showLoader = true;
    public showMakeAPayment = false;
    public hasEligibleFuelChips = false;
    public showMakeAPaymentLoading = false;

    public accountNumber: string;
    public contractNumber: string;
    public firstInstalmentAmount: number;
    public calendarReminderModel: CalendarReminderModel = new CalendarReminderModel();
    public selectedCalendarType: CalendarType;
    public promoBannerHeaderCopy = 'Bill straight to your inbox';
    public promoBannerBodyCopy = 'Receive your energy bills via email and enjoy a little less clutter in your life.';
    public promoBannerFooterCopy = 'Set up eBilling';
    public promoTileToBeDisplayed = PromoTileType.none;
    public PromoTileType = PromoTileType;
    public linkTarget = LinkTarget;
    public hasShownPaymentSurvey = false;

    private subscriptions: Subscription[] = [];

    constructor(
        private now: Now,
        private fuelChipService: FuelChipService,
        private router: Router,
        private route: ActivatedRoute,
        @Inject('paymentAssistancePlanConfirmStateService') private paymentAssistancePlanConfirmStateService: GenericStateService<PaymentAssistancePlanConfirmStateModel>,
        private paymentService: PaymentService,
        private dataLayerService: DataLayerService,
        private accountService: IAccountServiceMA,
        private paymentExtensionStateService: IPaymentExtensionStateService,
        private settingsService: ISettingsService,
        private paymentMethodsService: IPaymentMethodsService,
        private surveyService: SurveyService
    ) { }

    public ngOnInit() {
        if (this.promoTileToBeDisplayed === PromoTileType.smsPay) {
            this.promoBannerHeaderCopy = 'Add SMS Pay to your account';
            this.promoBannerBodyCopy = 'Peace of mind is front of mind with SMS Pay. Set it up now to pay your bills by text.';
            this.promoBannerFooterCopy = 'Set up SMS Pay';
        }

        this.subscriptions.push(this.route.params.subscribe((routeParams) => {

            // Extract route parameters
            this.accountNumber = routeParams.contractAccountNumber;
            this.contractNumber = routeParams.contractNumber;

            this.subscriptions.push(
                Observable.forkJoin(
                    this.fuelChipService.init(),
                    this.settingsService.getSettings(),
                    this.paymentMethodsService.getPaymentMethods()
                )
                    .finally(() => (this.showLoader = false))
                    .subscribe(([classifiedFuelChips, settings, paymentMethods]) => {
                        this.createModels(this.accountNumber, this.contractNumber, classifiedFuelChips);
                        this.createCalendarReminder(this.calendarReminderModel, this.summaryModel, this.instalmentsModel, this.fuelChipHeaderModel);
                        this.promoTileToBeDisplayed = this.getPromoTileType(settings, paymentMethods, this.accountNumber);

                        if (this.promoTileToBeDisplayed === PromoTileType.smsPay) {
                            this.promoBannerHeaderCopy = 'Add SMS Pay to your account';
                            this.promoBannerBodyCopy = 'Peace of mind is front of mind with SMS Pay. Set it up now to pay your bills by text.';
                            this.promoBannerFooterCopy = 'Set up SMS Pay';
                        }
                    }
                    ));
        }));

        this.subscriptions.push(
            this.router.events
                .filter((event) => event instanceof NavigationStart)
                .subscribe((val) => {
                    this.triggerLeanEngageSurvey();
                })
        );
    }

    public getPromoTileType(settings: SettingsAggregateModel, paymentMethods: PaymentMethod[], accountNumber: string): PromoTileType {
        const hasEBilling = this.getEBillingStatus(settings, accountNumber);
        const hasSMSPay = this.getSmsPayStatus(paymentMethods, accountNumber);
        if (!hasEBilling) {  // Customer is Not on eBilling and doesn't mater if they are on SMS pay or not
            return PromoTileType.eBilling;
        } else if (hasEBilling && !hasSMSPay) { // Customer is on eBilling, and NOT on SMS pay
            return PromoTileType.smsPay;
        }
        return PromoTileType.none;
    }

    private getEBillingStatus(settings: SettingsAggregateModel, accountNumber: string): boolean {

        if (settings) {
            return !!settings.billDeliveryMethodList.find((bdm) => bdm.contractAccountNumber === accountNumber && bdm.billDeliveryMethod !== undefined && bdm.billDeliveryMethod === BillDeliveryMethodType.Email);
        } else {
            return false;
        }

    }

    private getSmsPayStatus(paymentMethods: PaymentMethod[], accountNumber: string): boolean {

        let result = false;
        if (paymentMethods) {
            result = paymentMethods.some((pm) => {
                return !!(pm.oneTouchPayContractAccounts.find((smsPayAccount) => smsPayAccount === Number(accountNumber)));
            });
        }
        return result;
    }

    public promoBannerLink(displayedTile: PromoTileType): string {
        if (displayedTile === PromoTileType.eBilling) {
            return `/settings/notifications`;
        } else {
            return `/settings/smspay`;
        }
    }

    // TODO move into a common function
    public createCalendarReminder(
        calendarReminderModel: CalendarReminderModel,
        summaryModel: PaymentAssistancePlanSuccessSummaryModel,
        instalmentsModel: PaymentAssistancePlanInstalmentsModel,
        fuelChipHeaderModel: PaymentAssistancePlanSuccessFuelChipHeaderModel
    ): void {

        let interval = 1;
        let frequency: CalendarFrequency = <any> summaryModel.frequency;
        // note the ' 8:00' relates to the time of the event ie 8am
        const startDate = moment(instalmentsModel.progressItems[0].dueDate).format('YYYY/MM/DD') + ' 8:00';
        // note the 'T140000Z' relates to the end time of the event ie 8am for the recurring event and it needs to be in the format
        const endDate = moment(instalmentsModel.progressItems[instalmentsModel.progressItems.length - 1].dueDate).format('YYYYMMDD') + 'T140000Z';

        calendarReminderModel.startDate = startDate;
        calendarReminderModel.title = `AGL ${fuelChipHeaderModel.fuelChip.fuelType} instalment due`;
        calendarReminderModel.description = `A reminder that your AGL ${fuelChipHeaderModel.fuelChip.fuelType} instalment is due.<br><br>` +
            `To make a payment, simply visit https://agl.com.au/login and log into My Account.<br><br>` +
            `Please note: it’s important to pay your instalments to get back on track.<br><br>` +
            `If you need further assistance or have any questions, feel free to call us anytime 24/7 on 131 245.`;

        if (frequency === <any> InstalmentPlanFrequency.Fortnightly) {
            interval = 2;
            frequency = CalendarFrequency.Weekly;
        }
        calendarReminderModel.frequency = frequency;
        calendarReminderModel.interval = interval;
        calendarReminderModel.endDate = endDate;
    }

    public ngOnDestroy() {
        this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    }

    public makeAPaymentClicked = () => {
        this.showMakeAPaymentLoading = true;

        const accountNumber = this.accountNumber;
        const contractNumber = this.contractNumber;
        const amount = this.firstInstalmentAmount;

        this.subscriptions.push(
            this.accountService.getAccounts()
                .subscribe((accounts) => {
                    this.openPaymentModal(accounts, accountNumber, contractNumber, amount);
                    this.dataLayerService.pushPaymentAssistancePaymentMadeEvent(location.href, location.pathname);
                })
        );
    }

    public goToOverviewClicked = () => this.router.navigate(['/overview']);

    public onFuelChipSelected = ($event: { accountNumber: string, contractNumber: string }) => {
        this.paymentExtensionStateService.clearSelectedFuelChip();
        this.router.navigate([`/bills/paymentassistance/choose/${$event.accountNumber}/${$event.contractNumber}`], { queryParamsHandling: 'preserve' });
    }

    public openPaymentModal = (accounts: AccountViewModel[], accountNumber: string, contractNumber: string, amount: number) => {
        const contract = this.getAccountContract(accounts, accountNumber, contractNumber);
        const address = contract.address;
        this.dataLayerService.pushClickEvent(ModalName.None, EventCategory.AccountsPush, EventAction.ClickAction, EventLabel.MakePayment);
        this.paymentService.openPaymentModal(contract, amount, address).subscribe(
            () => {
                this.showMakeAPaymentLoading = false;
                this.hasShownPaymentSurvey = true;
            });
    }

    public getAccountContract = (accounts: AccountViewModel[], accountNumber: string, contractNumber: string) => {
        const account = accounts.find((a) => a.accountNumber === accountNumber);
        const contract = account.contracts.find((c) => c.contractNumber === contractNumber);
        return contract;
    }

    public createModels = (accountNumber: string, contractNumber: string, classifiedFuelChips: ClassifiedFuelChips) => {
        // Create fuel chip models
        const fuelChip = this.fuelChipService.getFuelChip(accountNumber, contractNumber);
        this.fuelChipsModel = this.createFuelChipsModel(classifiedFuelChips);
        this.fuelChipHeaderModel = this.createFuelChipHeaderModel(fuelChip);
        this.hasEligibleFuelChips = this.checkEligibleFuelChipsExist(classifiedFuelChips);

        // Check to see if we have a state object from the Confirm screen
        if (this.paymentAssistancePlanConfirmStateService.hasState()) {
            // State object detected
            const state = this.paymentAssistancePlanConfirmStateService.getState();
            this.createStateBasedModels(state);
        } else {
            this.router.navigate(['/bills']);
        }
    }

    public checkEligibleFuelChipsExist = (classifiedFuelChips: ClassifiedFuelChips): boolean =>
        !!classifiedFuelChips.eligibleFuelChips.length

    public isDateToday = (date: Date): boolean =>
        date ? moment(date).isSame(moment(this.now.date()), 'day') : true

    public createFuelChipHeaderModel = (fuelChip: FuelChipDataModel): PaymentAssistancePlanSuccessFuelChipHeaderModel =>
        ({ fuelChip: fuelChip })

    public createFuelChipsModel = (classifiedFuelChips: ClassifiedFuelChips): PaymentAssistancePlanSuccessFuelChipsModel =>
        ({ classifiedFuelChips: classifiedFuelChips })

    public createInstalmentsModel = (instalments: PaymentArrangementInstalmentSummaryItem[]): PaymentAssistancePlanInstalmentsModel => {
        const progressItems = this.mapPaymentArrangementInstalmentSummaryItems(instalments);
        return {
            progressItems: progressItems
        };
    }

    public mapPaymentArrangementInstalmentSummaryItems = (summaryItems: PaymentArrangementInstalmentSummaryItem[]): PaymentAssistancePlanInstalmentsProgressItem[] => {
        return summaryItems.reduce((progressItems: PaymentAssistancePlanInstalmentsProgressItem[], summaryItem: PaymentArrangementInstalmentSummaryItem, index: number) => {
            const instalmentStatus = (index === 0) ? InstalmentStatus.Due : InstalmentStatus.Upcoming;
            const instalmentDate = new Date(summaryItem.instalmentDate);
            const progressItem = new PaymentAssistancePlanInstalmentsProgressItem(summaryItem.instalmentAmount, instalmentDate, instalmentStatus);

            progressItems.push(progressItem);

            return progressItems;
        }, []);
    }

    public createSummaryModel = (state: PaymentAssistancePlanConfirmStateModel, firstInstalmentDate: Date): PaymentAssistancePlanSuccessSummaryModel => {
        return {
            totalDue: state.totalDue,
            frequency: state.frequency,
            startDate: state.startDate,
            firstInstalmentDue: firstInstalmentDate
        };
    }

    public createStateBasedModels = (state: PaymentAssistancePlanConfirmStateModel) => {
        const instalments = state.paymentArrangementInstalmentSummary.instalments;
        const firstInstalmentDate = this.getFirstInstalmentDate(instalments);
        this.firstInstalmentAmount = this.getFirstInstalmentAmount(instalments);

        // Create state based models
        this.instalmentsModel = this.createInstalmentsModel(instalments);
        this.summaryModel = this.createSummaryModel(state, firstInstalmentDate);

        // Only show the payment button if the first instalment date is today
        this.showMakeAPayment = this.isDateToday(firstInstalmentDate);
    }

    public getFirstInstalmentDate = (instalments: PaymentArrangementInstalmentSummaryItem[]) =>
        !!instalments.length ? new Date(instalments[0].instalmentDate) : null

    public getFirstInstalmentAmount = (instalments: PaymentArrangementInstalmentSummaryItem[]): number =>
        !!instalments.length ? instalments[0].instalmentAmount : 0

    public backClicked = () => window.history.back();

    public showPromoTile(): boolean {
        return this.promoTileToBeDisplayed !== PromoTileType.none;
    }

    public calendarSelected(link) {
        this.triggerLeanEngageSurvey();
        this.dataLayerService.trackAddCalendarReminderEvent(link, location.href, location.pathname);
    }

    public triggerLeanEngageSurvey() {
        if (this.shouldShowSurvey()) {
            this.surveyService.showFeedbackSurvey(SurveyType.instalmentPlanSuccess);
        }
    }

    public shouldShowSurvey(): boolean {
        const hasNoEligibleFuelChipsAndHasShownPaymentSurvey = !this.hasEligibleFuelChips && this.hasShownPaymentSurvey;
        if (this.hasEligibleFuelChips || hasNoEligibleFuelChipsAndHasShownPaymentSurvey) {
            return false;
        }
        return true;
    }
}
