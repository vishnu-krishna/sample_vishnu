import { DebugElement } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { PaymentAssistancePlanOptionsSuggestionsComponent } from './suggestions.component';
import { PaymentAssistancePlanOptionsSuggestionsModule } from './suggestions.module';
import { PaymentArrangementInstalmentSuggestion } from '../../../../../../services/paymentScheme/paymentSchemeApi.service';
import { FrequencyOption } from '../../../../../../services/paymentScheme/instalmentPlanOptions.service';

describe('Payment Assistance Plan Options Suggestions Component', () => {
    let comp: PaymentAssistancePlanOptionsSuggestionsComponent;
    let fixture: ComponentFixture<PaymentAssistancePlanOptionsSuggestionsComponent>;
    let de: DebugElement;

    const frequencyOptionWeekly = new FrequencyOption('Weekly', 'Weekly', false);
    const instalmentSuggestion1: PaymentArrangementInstalmentSuggestion = {
        instalmentAmount: 100,
        numberOfInstalments: 5
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                PaymentAssistancePlanOptionsSuggestionsModule
            ]
        });

        fixture = TestBed.createComponent(PaymentAssistancePlanOptionsSuggestionsComponent);
        comp = fixture.componentInstance;
        de = fixture.debugElement;
    });

    describe('formatRadioButtonLabelLeft()', () => {

        describe(`when instalmentSuggestion has numberOfInstalments: '${instalmentSuggestion1.numberOfInstalments}' and frequencyOption is '${frequencyOptionWeekly.value}'`, () => {

            const expectedCopy = `${instalmentSuggestion1.numberOfInstalments} ${frequencyOptionWeekly.value.toLowerCase()} instalments`;

            it(`should return '${expectedCopy}`, () => {
                // ACT
                const copy = comp.formatRadioButtonLabelLeft(instalmentSuggestion1, frequencyOptionWeekly);

                // ASSERT
                expect(copy).toBe(`${expectedCopy}`);
            });

        });
    });

    describe('formatRadioButtonLabelRight()', () => {

        describe(`when instalmentSuggestion has numberOfInstalments: '${instalmentSuggestion1.numberOfInstalments}' and frequencyOption is '${frequencyOptionWeekly.value}'`, () => {

            const expectedCopy = `/week for ${instalmentSuggestion1.numberOfInstalments} weeks`;

            it(`should return '${expectedCopy}`, () => {
                // ACT
                const copy = comp.formatRadioButtonLabelRight(instalmentSuggestion1, frequencyOptionWeekly);

                // ASSERT
                expect(copy).toBe(`${expectedCopy}`);
            });

        });
    });

    describe('expandClicked()', () => {

        describe('when showAll is false and expandClicked is called', () => {

            it('should set showAll to true', () => {
                // ARRANGE
                comp.showAll = false;

                // ACT
                comp.expandClicked();

                // ASSERT
                expect(comp.showAll).toBeTruthy();

            });

        });

        describe('when showAll is true and expandClicked is called', () => {

            it('should set showAll to false', () => {
                // ARRANGE
                comp.showAll = true;

                // ACT
                comp.expandClicked();

                // ASSERT
                expect(comp.showAll).toBeFalsy();

            });

        });
    });

    describe('onSelectedNumberOfInstalmentsChanged()', () => {

        describe(`when instalmentSuggestion has numberOfInstalments: '${instalmentSuggestion1.numberOfInstalments}'`, () => {

            const numberOfInstalments = instalmentSuggestion1.numberOfInstalments;

            it(`should emit selectedNumberOfInstalmentsChanged passing '${numberOfInstalments}' as a parameter`, () => {
                // ARRANGE
                spyOn(comp.selectedNumberOfInstalmentsChanged, 'emit');

                // ACT
                comp.onSelectedNumberOfInstalmentsChanged(numberOfInstalments.toString());

                // ASSERT
                expect(comp.selectedNumberOfInstalmentsChanged.emit).toHaveBeenCalledWith(numberOfInstalments);
            });

        });
    });

});
