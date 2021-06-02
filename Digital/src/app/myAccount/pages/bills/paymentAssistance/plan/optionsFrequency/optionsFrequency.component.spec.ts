import { FrequencyOption } from './../../../../../services/paymentScheme/instalmentPlanOptions.service';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { PaymentAssistancePlanOptionsFrequencyComponent } from './optionsFrequency.component';
import { PaymentAssistancePlanOptionsFrequencyModule } from './optionsFrequency.module';
import { DebugElement } from '@angular/core';
import { AssertionError } from 'assert';

describe('Payment Assistance Plan Options Frequency Component', () => {
    const frequencyOptionWeekly = new FrequencyOption('Weekly', 'Weekly', false);
    const frequencyOptionFortnightly = new FrequencyOption('Fortnightly', 'Fortnightly', false);
    const frequencyOptionMonthly = new FrequencyOption('Monthly', 'Monthly', false);
    const testDateAsString = '2018-04-20';
    const frequencyOptions = [
        frequencyOptionWeekly,
        frequencyOptionFortnightly,
        frequencyOptionMonthly
    ];

    let comp: PaymentAssistancePlanOptionsFrequencyComponent;
    let fixture: ComponentFixture<PaymentAssistancePlanOptionsFrequencyComponent>;
    let de: DebugElement;

    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [
                PaymentAssistancePlanOptionsFrequencyModule
            ]
        });

        fixture = TestBed.createComponent(PaymentAssistancePlanOptionsFrequencyComponent);
        comp = fixture.componentInstance;
        de = fixture.debugElement;

    });

    describe('onFrequencyOptionChanged()', () => {

        beforeEach(() => {
            // ARRANGE
            spyOn(comp.frequencyOptionChanged, 'emit');
            comp.optionsFrequencyModel.frequencyOptions = frequencyOptions;

        });

        describe(`when frequencyOptionValue is '${frequencyOptionWeekly.value}'`, () => {

            it(`should emit frequencyOptionChanged with a parameter of the the '${frequencyOptionWeekly.value}' FrequencyOption`, () => {
                // ACT
                comp.onFrequencyOptionChanged(frequencyOptionWeekly.value);

                // ASSERT
                expect(comp.frequencyOptionChanged.emit).toHaveBeenCalledWith(frequencyOptionWeekly);

            });

        });

        describe(`when frequencyOptionValue is '${frequencyOptionFortnightly.value}'`, () => {

            it(`should emit frequencyOptionChanged with a parameter of the the '${frequencyOptionFortnightly.value}' FrequencyOption`, () => {
                // ACT
                comp.onFrequencyOptionChanged(frequencyOptionFortnightly.value);

                // ASSERT
                expect(comp.frequencyOptionChanged.emit).toHaveBeenCalledWith(frequencyOptionFortnightly);

            });

        });

        describe(`when frequencyOptionValue is '${frequencyOptionMonthly.value}'`, () => {

            it(`should emit frequencyOptionChanged with a parameter of the the '${frequencyOptionMonthly.value}' FrequencyOption`, () => {
                // ACT
                comp.onFrequencyOptionChanged(frequencyOptionMonthly.value);

                // ASSERT
                expect(comp.frequencyOptionChanged.emit).toHaveBeenCalledWith(frequencyOptionMonthly);

            });

        });
    });

    describe('onDateOptionChanged()', () => {

        describe(`when todays date '${testDateAsString}' is passed in as a parameter`, () => {

            it(`should emit dateOptionChanged passing the date as '${testDateAsString}'`, () => {

                // ARRANGE
                spyOn(comp.dateOptionChanged, 'emit');

                // ACT
                comp.onDateOptionChanged(testDateAsString);

                // ASSERT
                expect(comp.dateOptionChanged.emit).toHaveBeenCalledWith(testDateAsString);

            });

        });
    });

    describe('formatFirstInstalmentCopy()', () => {

        describe(`when there is only a single frequencyOption passed in ('Weekly')`, () => {

            const expectedCopy = 'Your first weekly instalment will be due';

            it(`should return '${expectedCopy}`, () => {

                // ACT
                const copy = comp.formatFirstInstalmentCopy([frequencyOptionWeekly]);

                // ASSERT
                expect(copy).toBe(expectedCopy);

            });

        });

        describe(`when multiple frequencyOptions are passed in`, () => {

            const expectedCopy = 'Your first instalment will be due';

            it(`should return '${expectedCopy}`, () => {

                // ACT
                const copy = comp.formatFirstInstalmentCopy(frequencyOptions);

                // ASSERT
                expect(copy).toBe(expectedCopy);

            });

        });
    });

});
