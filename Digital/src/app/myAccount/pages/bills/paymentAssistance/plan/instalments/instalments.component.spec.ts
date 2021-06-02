import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ComponentFixture } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { PaymentAssistancePlanInstalmentsComponent } from './instalments.component';
import { PaymentAssistancePlanInstalmentsModule } from './instalments.module';
import { PaymentAssistancePlanInstalmentsModel } from '.';

describe('Payment Assistance Plan Instalments Component', () => {
    const instalmentsSelector = By.css('.payment-assistance-plan-instalments');
    const headerTextSelector = By.css('payment-assistance-plan-instalments__body-header');

    const instalmentsModel: PaymentAssistancePlanInstalmentsModel = {
        progressItems: []
    };

    let comp: PaymentAssistancePlanInstalmentsComponent;
    let fixture: ComponentFixture<PaymentAssistancePlanInstalmentsComponent>;
    let de: DebugElement;

    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [
                PaymentAssistancePlanInstalmentsModule
            ]
        });

        fixture = TestBed.createComponent(PaymentAssistancePlanInstalmentsComponent);
        comp = fixture.componentInstance;
        de = fixture.debugElement;

    });

    describe('instalmentsSelector is NOT populated', () => {
        it('should not show the component', () => {
            // ARRANGE
            comp.instalmentsModel = undefined;

            // ACT
            fixture.detectChanges();

            // ASSERT
            expect(de.query(instalmentsSelector)).toBeNull();
        });

    });

    describe('instalmentsSelector is populated', () => {

        beforeEach(() => {
            comp.instalmentsModel = instalmentsModel;
        });

        it('should show the component', () => {
            // ACT
            fixture.detectChanges();

            // ASSERT
            expect(de.query(instalmentsSelector)).toBeDefined();
        });

    });

    describe('Instalment header', () => {
        it ('should display header if passed in as an @Input()', () => {
            // ARRANGE
            comp.headerText = 'I am a header';

            // ACT
            fixture.detectChanges();

            // ASSERT
            const headerTextElement = fixture.nativeElement.querySelector('.payment-assistance-plan-instalments__body-header');
            expect(headerTextElement).not.toBeNull();
            expect(headerTextElement.textContent).toMatch(comp.headerText);
        });

        it ('should not display header if not passed in as an @Input()', () => {
            // ARRANGE
            comp.headerText = undefined;

            // ACT
            fixture.detectChanges();

            // ASSERT
            const headerTextElement = fixture.nativeElement.querySelector('.payment-assistance-plan-instalments__body-header');
            expect(headerTextElement).toBeNull();
        });
    });

});
