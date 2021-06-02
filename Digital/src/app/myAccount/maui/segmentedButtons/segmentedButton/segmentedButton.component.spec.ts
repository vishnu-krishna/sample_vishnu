import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SegmentedButtonComponent } from './segmentedButton.component';

describe('Maui Segmented Button Component', () => {
    let comp: SegmentedButtonComponent;
    let fixture: ComponentFixture<SegmentedButtonComponent>;
    let de: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ SegmentedButtonComponent ],
        });

        fixture = TestBed.createComponent(SegmentedButtonComponent);
        comp = fixture.componentInstance;
        de = fixture.debugElement;
    });

    it('should display text', () => {
        // ARRANGE
        comp.value = 'monday';
        comp.text = 'Monday';

        // ACT
        fixture.detectChanges();

        // ASSERT
        const segmentedButtonText = fixture.nativeElement.querySelector('div');
        const segmentedButtonTextMobile = fixture.nativeElement.querySelector('.maui-segbtn__button-text-mobile');
        expect(segmentedButtonText.textContent).toBe(comp.text);
        expect(segmentedButtonTextMobile).toBeNull();
    });

    it('should display mobile text if specified', () => {
        // ARRANGE
        comp.value = 'monday';
        comp.text = 'Monday';
        comp.textMobile = 'Mon';

        // ACT
        fixture.detectChanges();

        // ASSERT
        const segmentedButtonText = fixture.nativeElement.querySelector('.maui-segbtn__button-text');
        const segmentedButtonTextMobile = fixture.nativeElement.querySelector('.maui-segbtn__button-text-mobile');
        expect(segmentedButtonText.textContent).toBe(comp.text);
        expect(segmentedButtonTextMobile.textContent).toBe(comp.textMobile);
    });

    it('should select button if selected is specified', () => {
        // ARRANGE
        comp.value = 'monday';
        comp.text = 'Monday';
        comp.selected = true;

        // ACT
        fixture.detectChanges();

        // ASSERT
        let segmentedButton = de.nativeElement;
        expect(segmentedButton.classList).toContain('selected');
    });

    it('should select button if button is clicked', () => {
        // ARRANGE
        comp.value = 'monday';
        comp.text = 'Monday';

        // ACT
        fixture.detectChanges();
        de.triggerEventHandler('click', null);
        fixture.detectChanges();

        // ASSERT
        let segmentedButton = de.nativeElement;
        expect(segmentedButton.classList).toContain('selected');
        expect(comp.selected).toBe(true);
    });

    it('should emit the selected button value if button is clicked', () => {
        let selectedButtonValue: string;
        comp.selectedButtonChange.subscribe((value: string) => { selectedButtonValue = value; });

        // ARRANGE
        comp.value = 'monday';
        comp.text = 'Monday';

        // ACT
        fixture.detectChanges();
        de.triggerEventHandler('click', null);
        fixture.detectChanges();

        // ASSERT
        expect(comp.selected).toBe(true);
        expect(selectedButtonValue).toBe(comp.value);
    });
});
