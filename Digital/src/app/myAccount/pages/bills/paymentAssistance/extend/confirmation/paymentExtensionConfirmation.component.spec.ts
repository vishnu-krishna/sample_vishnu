import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import * as moment from 'moment';
import { DataLayerService } from '../../../../../../shared/service/dataLayer.service';
import { CalendarReminderModel, MauiCalendarReminderModule } from '../../../../../maui/calendarReminder';
import { MauiFuelChipFuelType } from '../../../../../maui/fuelChip';
import { PaymentExtensionStateMockService } from '../../../../../services/mock/paymentExtensionState.mock.service';
import { PaymentExtensionContractEligibility, PaymentExtensionIneligibilityReasons } from '../../../../../services/paymentScheme/paymentExtensionEligibility.service';
import { FuelChipData } from '../eligibility/fuelChipData';
import { IPaymentExtensionStateService } from '../services/paymentExtensionState.service';
import { PaymentExtensionConfirmationComponent } from './paymentExtensionConfirmation.component';
import { PaymentExtensionConfirmationModule } from './paymentExtensionConfirmation.module';

describe('payment extension confirmation component', () => {
    let paymentExtensionStateService: IPaymentExtensionStateService;
    let router: Router;
    let component: PaymentExtensionConfirmationComponent;
    let fixture: ComponentFixture<PaymentExtensionConfirmationComponent>;
    let de: DebugElement;
    let dataLayerService: DataLayerService;

    beforeEach(() => {

        const routes: Routes = [
            { path: 'overview', redirectTo: '' }
        ];

        const dataLayerServiceStub = {
            trackAddCalendarReminderEvent: (addEventUrl: string, href: string, pathName: string) => {
                throw new Error('trackAddCalendarReminderEvent is not implemented');
            }
        };

        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule.withRoutes(routes),
                PaymentExtensionConfirmationModule,
                MauiCalendarReminderModule
            ],
            providers: [
                { provide: IPaymentExtensionStateService, useClass: PaymentExtensionStateMockService },
                { provide: DataLayerService, useValue: dataLayerServiceStub }
            ]
        });

        fixture = TestBed.createComponent(PaymentExtensionConfirmationComponent);
        component = fixture.componentInstance;
        de = fixture.debugElement;

        paymentExtensionStateService = de.injector.get(IPaymentExtensionStateService);
        router = de.injector.get(Router);
        dataLayerService = de.injector.get(DataLayerService);
    });

    it('should redirect back to overview page if getExtendedFuelChip() is undefined', () => {
        // arrange
        spyOn(paymentExtensionStateService, 'getExtendedFuelChip').and.returnValue(undefined);
        spyOn(router, 'navigate');

        // act
        component.ngOnInit();

        // assert
        expect(router.navigate).toHaveBeenCalledWith(['/overview']);
    });

    it('should navigate to overview page when goToOverview() is called', () => {
        // arrange
        spyOn(router, 'navigate');

        // act
        component.goToOverview();

        // assert
        expect(router.navigate).toHaveBeenCalledWith(['/overview']);
    });

    it('should select fuel chip and navigate to confirmation page when onFuelChipSelected() is called', () => {
        // arrange
        const accountNumber = '22';
        const contractNumber = '111';
        spyOn(router, 'navigate');
        spyOn(paymentExtensionStateService, 'selectChip');

        // act
        component.onFuelChipSelected(accountNumber, contractNumber);

        // assert
        expect(paymentExtensionStateService.selectChip).toHaveBeenCalledWith(contractNumber);
        expect(router.navigate).toHaveBeenCalledWith([`/bills/paymentassistance/extend/confirm/${accountNumber}/${contractNumber}`]);
    });

    it('should load data on init', () => {
        // arrange
        const start = moment().format('YYYY/MM/DD') + '%208:00'; // note the '%208:00' relates to the time of the event
        const eligibility = new PaymentExtensionContractEligibility('111', false, PaymentExtensionIneligibilityReasons.None, 1, new Date());
        const selectedFuelChipIsVicRegion = true;
        const selectedFuelChip = <FuelChipData> {
            contractNumber: '3333',
            accountDetails: [
                {
                    contracts: [
                        {
                            contractNumber: '3333',
                            IsVicRegion: selectedFuelChipIsVicRegion
                        }
                    ]
                }
            ],
            eligibility
        };
        const eligibleFuelChips = [
            { contractNumber: '1111' },
            { contractNumber: '2222' }
        ];
        let calendarReminderModel: CalendarReminderModel = new CalendarReminderModel();
        calendarReminderModel.title = 'testTitle';
        calendarReminderModel.description = 'testDescription';
        calendarReminderModel.startDate = start;

        spyOn(paymentExtensionStateService, 'getExtendedFuelChip').and.returnValue(selectedFuelChip);
        spyOn(paymentExtensionStateService, 'getEligibleFuelChips').and.returnValue(eligibleFuelChips);
        spyOn(paymentExtensionStateService, 'shouldLeanEngageSurveyBeShown').and.returnValue(false);

        // act
        component.calendarReminderModel = calendarReminderModel;
        component.ngOnInit();

        // assert
        expect(component.fuelChipData).toEqual(selectedFuelChip);
        expect(component.eligibleFuelChips.map((c) => ({ contractNumber: c.contractNumber }))).toEqual(eligibleFuelChips);
        expect(component.isVicRegion).toBe(selectedFuelChipIsVicRegion);
    });

    describe('lean engage survey', () => {

        beforeEach(() => {

            const selectedFuelChipIsVicRegion = true;
            const selectedFuelChip = {
                contractNumber: '3333',
                accountDetails: [
                    {
                        contracts: [
                            {
                                contractNumber: '3333',
                                IsVicRegion: selectedFuelChipIsVicRegion
                            }
                        ]
                    }
                ],
                eligibility: {
                    dueDate: new Date()
                },
                isVicRegion: (): boolean => {
                    return true;
                }
            };
            const eligibleFuelChips = [];

            spyOn(paymentExtensionStateService, 'getExtendedFuelChip').and.returnValue(selectedFuelChip);
            spyOn(paymentExtensionStateService, 'getEligibleFuelChips').and.returnValue(eligibleFuelChips);
        });

        it('should show survey when navigating to the overview page when goToOverview() is called', () => {
            // arrange
            spyOn(paymentExtensionStateService, 'shouldLeanEngageSurveyBeShown').and.returnValue(true);
            spyOn(paymentExtensionStateService, 'showLeanEngageSurveyOnSuccessfulSetup');
            spyOn(paymentExtensionStateService, 'setLeanEngageSurveyShown');

            // act
            component.ngOnInit();
            component.goToOverview();

            // assert
            expect(paymentExtensionStateService.showLeanEngageSurveyOnSuccessfulSetup).toHaveBeenCalled();
            expect(paymentExtensionStateService.setLeanEngageSurveyShown).toHaveBeenCalledWith(true);
        });

        it('should show survey when user navigates away from the page using global navigation', () => {
            // arrange
            spyOn(paymentExtensionStateService, 'shouldLeanEngageSurveyBeShown').and.returnValue(true);
            spyOn(paymentExtensionStateService, 'showLeanEngageSurveyOnSuccessfulSetup');
            spyOn(paymentExtensionStateService, 'setLeanEngageSurveyShown');

            // act
            component.ngOnInit();
            router.navigate(['/overview']);

            // assert
            expect(paymentExtensionStateService.showLeanEngageSurveyOnSuccessfulSetup).toHaveBeenCalled();
            expect(paymentExtensionStateService.setLeanEngageSurveyShown).toHaveBeenCalledWith(true);
        });

        it('should show survey when user adds a calendar entry', () => {
            // arrange
            const link = 'DUMMY LINK';
            spyOn(paymentExtensionStateService, 'shouldLeanEngageSurveyBeShown').and.returnValue(true);
            spyOn(paymentExtensionStateService, 'showLeanEngageSurveyOnSuccessfulSetup');
            spyOn(paymentExtensionStateService, 'setLeanEngageSurveyShown');
            spyOn(dataLayerService, 'trackAddCalendarReminderEvent').and.returnValue(null);

            // act
            component.ngOnInit();
            component.calendarSelected(link);

            // assert
            expect(paymentExtensionStateService.showLeanEngageSurveyOnSuccessfulSetup).toHaveBeenCalled();
            expect(paymentExtensionStateService.setLeanEngageSurveyShown).toHaveBeenCalledWith(true);
        });
    });

    describe('analytics tracking', () => {
        it('add analytics tracking event when adding calendar event', () => {
            // arrange
            const link = 'DUMMY LINK';
            const calendarType = 'yahoo';
            const accountNumber = '1';
            const contractNumber = '2';
            const totalAmountDue = 10;
            const eligibility = new PaymentExtensionContractEligibility(contractNumber, true, PaymentExtensionIneligibilityReasons.None, totalAmountDue);
            const fuelChipData = new FuelChipData(accountNumber, contractNumber, MauiFuelChipFuelType.Electricity, null, eligibility, null);
            component.fuelChipData = fuelChipData;
            spyOn(dataLayerService, 'trackAddCalendarReminderEvent').and.returnValue(null);
            spyOn(fuelChipData, 'isVicRegion').and.returnValue(true);
            spyOn(paymentExtensionStateService, 'shouldLeanEngageSurveyBeShown').and.returnValue(true);
            spyOn(paymentExtensionStateService, 'showLeanEngageSurveyOnSuccessfulSetup');
            spyOn(paymentExtensionStateService, 'setLeanEngageSurveyShown');

            // act
            component.calendarSelected(link);

            // assert
            expect(dataLayerService.trackAddCalendarReminderEvent).toHaveBeenCalledWith(link, jasmine.any(String), jasmine.any(String));
        });
    });
});
