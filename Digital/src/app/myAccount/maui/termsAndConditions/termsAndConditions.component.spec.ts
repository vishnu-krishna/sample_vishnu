import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MauiTermsAndConditionsModule } from './index';
import { TermsAndConditionsComponent } from './termsAndConditions.component';

describe('Terms and Conditions Component', () => {
    let comp: TermsAndConditionsComponent;
    let fixture: ComponentFixture<TermsAndConditionsComponent>;
    let de: DebugElement;
    let el: HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                MauiTermsAndConditionsModule
            ]
        });

        fixture = TestBed.createComponent(TermsAndConditionsComponent);
        comp = fixture.componentInstance;
        de = fixture.debugElement;
    });

    it('should hide native checkbox but the element is present in the DOM', () => {
        fixture.detectChanges();
        let expectedClass = de.query(By.css('.maui-terms-and-conditions-control__checkbox-hide'));
        expect(expectedClass).toBeTruthy();
    });

    it('should render checkbox', () => {
        fixture.detectChanges();
        let expectedClass = de.query(By.css('.maui-terms-and-conditions-control__customcheckbox'));
        expect(expectedClass).toBeTruthy();
    });

    it('should render the terms and conditions link', () => {
        fixture.detectChanges();
        let expectedClass = de.query(By.css('.maui-terms-and-conditions--text'));
        expect(expectedClass).toBeTruthy();
    });

    it('should render default checked', () => {
        comp.isChecked = true;
        fixture.detectChanges();
        let expectedClass = de.query(By.css('.maui-terms-and-conditions-control__customcheckbox--checked'));
        expect(expectedClass).toBeTruthy();
    });

    it('should emit event when isChecked is changed', (done) => {
        comp.checked.subscribe((isChecked) => {
            expect(isChecked).toBe(true);
            done();
        });

        const changes: any = { isChecked: { currentValue: true } };

        comp.ngOnChanges(changes);
    });

    it('should trigger event when checkbox is checked when it is clicked', () => {
        let checkBoxElement = de.query(By.css('.maui-terms-and-conditions-control__customcheckbox'));
        expect(checkBoxElement).toBeTruthy();
        expect(comp.isChecked).toBeFalsy();

        checkBoxElement.triggerEventHandler('click', {});
        fixture.detectChanges();

        let expectedClass = de.query(By.css('.maui-terms-and-conditions-control__customcheckbox--checked'));
        expect(expectedClass).toBeTruthy();
        expect(comp.isChecked).toBeTruthy();
    });

    describe('when checked initially', () => {
        it('should uncheck the checkbox when clicked', () => {
            comp.isChecked = true;
            fixture.detectChanges();
            let checkBoxElement = de.query(By.css('.maui-terms-and-conditions-control__customcheckbox'));
            expect(checkBoxElement).toBeTruthy();
            expect(comp.isChecked).toBeTruthy();

            checkBoxElement.triggerEventHandler('click', {});
            fixture.detectChanges();

            let expectedClass = de.query(By.css('.maui-terms-and-conditions-control__customcheckbox--checked'));
            expect(expectedClass).toBeNull();
            expect(comp.isChecked).toBeFalsy();
        });
    });
});
