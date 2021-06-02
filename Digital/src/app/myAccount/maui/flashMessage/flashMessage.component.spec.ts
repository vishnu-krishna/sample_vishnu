import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { FlashMessageComponent } from './flashMessage.component';
import { FlashMessageType, MauiFlashMessageModule } from './index';

describe('Flash Message Component', () => {

    let comp: FlashMessageComponent;
    let fixture: ComponentFixture<FlashMessageComponent>;
    let de: DebugElement;
    let el: HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                MauiFlashMessageModule
            ]
        });

        fixture = TestBed.createComponent(FlashMessageComponent);
        comp = fixture.componentInstance;
        de = fixture.debugElement;
    });
    it('should render the flash message component', () => {
        fixture.detectChanges();
        let expectedClass = de.query(By.css('.maui-flash-message'));
        expect(expectedClass).toBeTruthy();
    });
    it('should render the heading', () => {
        fixture.detectChanges();
        let expectedClass = de.query(By.css('.maui-flash-message__heading'));
        expect(expectedClass).toBeTruthy();
    });
    it('should render the subheading', () => {
        fixture.detectChanges();
        let expectedClass = de.query(By.css('.maui-flash-message__subheading'));
        expect(expectedClass).toBeTruthy();
    });

    describe('types', () => {
        ['Inform', 'Success', 'Error', 'Warning'].map((type) => {
            it(`should set the correct class for the flash type: ${type}`, () => {
                comp.type = FlashMessageType[type];
                fixture.detectChanges();
                let expectedClass = de.query(By.css(`.maui-flash-message--${type.toLowerCase()}`));
                expect(expectedClass).toBeTruthy();
            });
        });
    });

    describe('dismiss', () => {

        describe('when dismissable', () => {

            beforeEach(() => {
                comp.dismissable = true;
            });

            it('should show the dismiss icon', () => {
                fixture.detectChanges();
                let dismissIcon = de.query(By.css(`.maui-flash-message__dismiss`));
                expect(dismissIcon).toBeTruthy();
            });
            describe('when clicked to dismiss', () => {
                let dismissEmitterSpy;

                beforeEach(() => {
                    dismissEmitterSpy = spyOn(comp.dismiss, 'emit');
                });
                it('should dismiss the flash message', () => {
                    fixture.detectChanges();
                    let dismissIcon = de.query(By.css(`.maui-flash-message__dismiss`));
                    expect(dismissIcon).toBeTruthy();
                    expect(comp.dismissed).toBeFalsy();

                    dismissIcon.triggerEventHandler('click', {});
                    fixture.detectChanges();

                    dismissIcon = de.query(By.css(`.maui-flash-message__dismiss`));
                    expect(dismissIcon).toBeFalsy();
                    expect(comp.dismissed).toBeTruthy();
                });
                it('should emit the dismiss event', () => {
                    fixture.detectChanges();
                    let dismissIcon = de.query(By.css(`.maui-flash-message__dismiss`));

                    dismissIcon.triggerEventHandler('click', {});
                    fixture.detectChanges();

                    expect(dismissEmitterSpy).toHaveBeenCalled();
                });
            });
        });

        describe('when not dismissable', () => {

            beforeEach(() => {
                comp.dismissable = false;
            });

            it('should show not the dismiss icon', () => {
                fixture.detectChanges();
                let dismissIcon = de.query(By.css(`.maui-flash-message__dismiss`));
                expect(dismissIcon).toBeNull();
                expect(comp.dismissed).toBeFalsy();
            });
        });
    });
});
