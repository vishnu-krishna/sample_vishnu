import { EventEmitter, DebugElement, Component } from '@angular/core';
import { ToggleComponent } from './toggle.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MauiToggleModule } from './toggle.module';

describe('Maui Toggle Component', () => {
    let comp: ToggleComponent;
    let fixture: ComponentFixture<ToggleComponent>;
    let de: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ MauiToggleModule ]
        });

        fixture = TestBed.createComponent(ToggleComponent);
        comp = fixture.componentInstance;
        de = fixture.debugElement;
    });

    it('should display toggle ON if the default value is set to true', () => {
        // ARRANGE
        comp.toggleValue = true;

        // ACT
        fixture.detectChanges();

        // ASSERT
        const toggleInput = fixture.nativeElement.querySelector('.maui-toggle--active__input');
        expect(toggleInput.checked).toBe(true);
    });

    it('should display toggle OFF by default', () => {
        // ACT
        fixture.detectChanges();

        // ASSERT
        const toggleInput = fixture.nativeElement.querySelector('.maui-toggle--active__input');
        expect(toggleInput.checked).toBe(false);
    });

    it('should show the loading state which shows the spinner and hides the toggle', () => {
        // ARRANGE
        comp.isLoading = true;

        // ACT
        fixture.detectChanges();

        // ASSERT
        const loadingSpinner = fixture.nativeElement.querySelector('.maui-toggle-loading');
        const toggle = fixture.nativeElement.querySelector('.maui-toggle--active');
        expect(loadingSpinner).toBeDefined();
        expect(toggle).toBeNull();
    });

    it('should not emit click event if in a loading state', () => {
        // ARRANGE
        comp.isLoading = true;
        spyOn(comp.toggleValueChange, 'emit');

        // ACT
        de.triggerEventHandler('click', null);
        fixture.detectChanges();

        // ASSERT
        expect(comp.toggleValueChange.emit).not.toHaveBeenCalled();
    });

    it('should not emit click event if in a disabled state', () => {
        // ARRANGE
        comp.isDisabled = true;
        spyOn(comp.toggleValueChange, 'emit');

        // ACT
        de.triggerEventHandler('click', null);
        fixture.detectChanges();

        // ASSERT
        let disabledToggle = fixture.nativeElement.querySelector('.maui-toggle--disabled');
        let activeToggle = fixture.nativeElement.querySelector('.maui-toggle--active');
        expect(comp.toggleValueChange.emit).not.toHaveBeenCalled();
        expect(disabledToggle).toBeDefined();
        expect(activeToggle).toBeNull();
    });

    it('should emit the toggle value if the element is clicked', () => {
         // ARRANGE
         let toggleValue: boolean;
         comp.toggleValueChange.subscribe((value: boolean) => { toggleValue = value; });

         // ACT
         fixture.detectChanges();
         const toggle = de.nativeElement.querySelector('.maui-toggle--active__input');
         toggle.click();
         fixture.detectChanges();

         // ASSERT
         expect(comp.toggleValue).toBe(true);
         expect(toggleValue).toBe(comp.toggleValue);
    });
});
